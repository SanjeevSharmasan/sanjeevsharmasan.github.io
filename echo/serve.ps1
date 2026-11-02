param(
  [int]$Port = 5173,
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.mjs'  = 'text/javascript; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'
  '.ico'  = 'image/x-icon'
  '.woff2'= 'font/woff2'
  '.txt'  = 'text/plain; charset=utf-8'
  '.md'   = 'text/markdown; charset=utf-8'
  '.map'  = 'application/json'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try {
  $listener.Start()
} catch {
  Write-Host "Could not bind http://localhost:$Port/ - is another server already running?" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "  Echo - local transcription studio" -ForegroundColor White
Write-Host "  http://localhost:$Port" -ForegroundColor Cyan
Write-Host "  Serving: $root" -ForegroundColor DarkGray
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

if (-not $NoBrowser) { Start-Process "http://localhost:$Port" | Out-Null }

$utf8 = [System.Text.Encoding]::UTF8

while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
  } catch {
    break
  }

  $request = $context.Request
  $response = $context.Response

  try {
    $urlPath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
    if ($urlPath -eq '/' -or $urlPath -eq '') { $urlPath = '/index.html' }
    $relative = $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
    $full = [System.IO.Path]::GetFullPath((Join-Path $root $relative))

    if (-not $full.StartsWith([System.IO.Path]::GetFullPath($root), [System.StringComparison]::OrdinalIgnoreCase)) {
      $response.StatusCode = 403
      $bytes = $utf8.GetBytes('Forbidden')
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
      continue
    }

    if (-not (Test-Path -LiteralPath $full -PathType Leaf)) {
      $response.StatusCode = 404
      $bytes = $utf8.GetBytes("Not found: $urlPath")
      $response.ContentType = 'text/plain; charset=utf-8'
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
      continue
    }

    $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
    $response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
    $response.Headers.Add('Cache-Control', 'no-cache')
    $response.Headers.Add('Cross-Origin-Opener-Policy', 'same-origin')

    $bytes = [System.IO.File]::ReadAllBytes($full)
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } catch {
    try { $response.StatusCode = 500 } catch { }
  } finally {
    try { $response.OutputStream.Close() } catch { }
    try { $response.Close() } catch { }
  }
}

$listener.Stop()
$listener.Close()
