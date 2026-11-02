@echo off
title Echo - transcription studio
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" %*
pause
