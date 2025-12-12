# Dynamic Carousel Banner - Image Management Guide

## Overview
Your website now features a dynamic rotating carousel banner that displays 6 professional images below the navigation header and above the profile section.

**Features:**
- ✅ Auto-rotates every 5 seconds
- ✅ Manual navigation with arrow buttons (← →)
- ✅ Click dot indicators (1-6) to jump to specific slide
- ✅ Pauses on mouse hover
- ✅ Fully responsive (mobile & desktop)
- ✅ Smooth fade transitions

---

## Current Carousel Images

The carousel currently displays 6 images in this order:

| # | Filename | Title | Purpose |
|---|----------|-------|---------|
| 1 | `carousel-1-global-operations.png` | Global Capability Center Leadership | Geographic expertise |
| 2 | `carousel-2-diverse-teams.png` | 60+ FTE \| 25+ Countries | Leadership scope |
| 3 | `carousel-3-digital-transformation.png` | 95%+ STP \| RPA & AI/ML Adoption | Digital innovation |
| 4 | `carousel-4-working-capital.png` | $10M+ Working Capital Unlocked | Financial impact |
| 5 | `carousel-5-gcc-governance.png` | Tower Setup & Governance | Structural expertise |
| 6 | `carousel-6-leadership.png` | 21+ Years Global Finance Leadership | Experience & vision |

---

## How to Change Carousel Images

### Step 1: Prepare Your Images
- Image dimensions: **1600 x 600 pixels** (16:9 aspect ratio)
- Format: **PNG or JPG** (PNG recommended for quality)
- File size: **< 500 KB per image** (optimize for web performance)
- Content: Professional, high-quality images

### Step 2: Upload New Images
1. Go to your GitHub repository
2. Navigate to `/assets/images/` folder
3. Upload or replace the carousel image files:
   - `carousel-1-global-operations.png`
   - `carousel-2-diverse-teams.png`
   - `carousel-3-digital-transformation.png`
   - `carousel-4-working-capital.png`
   - `carousel-5-gcc-governance.png`
   - `carousel-6-leadership.png`

**OR locally:**
```bash
# Navigate to your project
cd /workspaces/sanjeevsharmasan.github.io

# Replace images in the assets/images folder
# Then commit and push
git add assets/images/
git commit -m "Update carousel images"
git push origin main
```

### Step 3: Update Carousel Titles (Optional)
To change the text that appears in the carousel, edit the image alt text in `index.html`:

**Location:** Lines ~545-565 (in the main carousel HTML section)

**Example:**
```html
<div class="carousel-slide">
    <img src="assets/images/carousel-1-global-operations.png" alt="YOUR NEW TITLE HERE">
</div>
```

The alt text serves as the image description for accessibility.

### Step 4: Deploy Changes
```bash
git add assets/images/
git commit -m "Update carousel images - [your description]"
git push origin main
```

After pushing, GitHub Pages will automatically deploy your changes within 1-2 minutes.

---

## Image Recommendations

### Image Types to Use:
✅ **Professional Team Photos** - Shows leadership breadth
✅ **Infographics** - Illustrates processes or achievements
✅ **Charts/Metrics** - Displays quantified impact
✅ **Maps** - Shows geographic coverage
✅ **Organization Diagrams** - Demonstrates structures
✅ **Professional Headshots** - Personal connection

### What NOT to Use:
❌ Low-resolution images
❌ Personal/casual photos
❌ Unbranded screenshots
❌ Heavily watermarked images
❌ Images with distracting backgrounds

### Design Tips:
- Use **consistent color palette** (blues, teals, greens from your site)
- Keep **text overlays minimal** and readable
- Ensure **high contrast** for text readability
- Use **professional fonts**
- Add **subtle gradients** or overlays for depth
- Maintain **consistent aspect ratio** (16:9)

---

## Carousel Settings (Advanced)

### Change Rotation Speed
**Default:** 5 seconds per image

To change, find this line in `index.html` (around line 1070):
```javascript
autoRotateTimer = setTimeout(autoRotate, 5000); // Change 5000 to desired milliseconds
```

**Examples:**
- 3 seconds: `3000`
- 5 seconds: `5000` (current)
- 7 seconds: `7000`
- 10 seconds: `10000`

### Disable Auto-Rotate (Keep Manual Only)
Comment out or remove the auto-rotate initialization:
```javascript
// startAutoRotate(); // Comment this line to disable auto-rotation
```

### Change Dot Indicator Style
Modify CSS around line 570-585 for the `.dot` styling to customize colors, size, or appearance.

---

## Carousel HTML Structure

For reference, here's how the carousel is implemented:

**HTML Location:** Lines ~545-586 (in `index.html`)

```html
<!-- Dynamic Rotating Carousel Banner -->
<div class="carousel-container">
    <div class="carousel-wrapper">
        <div class="carousel-slide active">
            <img src="assets/images/carousel-1-global-operations.png" alt="description">
        </div>
        <!-- Additional slides (2-6) -->
    </div>

    <!-- Navigation Controls -->
    <button class="carousel-nav carousel-prev" onclick="changeSlide(-1)">
        <i class="fas fa-chevron-left"></i>
    </button>
    <button class="carousel-nav carousel-next" onclick="changeSlide(1)">
        <i class="fas fa-chevron-right"></i>
    </button>

    <!-- Dot Indicators -->
    <div class="carousel-dots">
        <span class="dot active" onclick="currentSlide(1)"></span>
        <!-- Additional dots (2-6) -->
    </div>
</div>
```

**CSS Location:** Lines ~520-600 (`.carousel-container`, `.carousel-slide`, `.carousel-nav`, `.dot`, etc.)

**JavaScript Location:** Lines ~1065-1115 (carousel functions and auto-rotate logic)

---

## Troubleshooting

### Images Not Showing
1. **Verify file names** - Must exactly match HTML src attributes
2. **Check file location** - Images must be in `/assets/images/` folder
3. **Clear browser cache** - Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
4. **Hard refresh** - Ctrl+Shift+R or Cmd+Shift+R

### Carousel Not Rotating
1. Check browser console for JavaScript errors (F12 → Console tab)
2. Verify all 6 `.carousel-slide` divs are present in HTML
3. Ensure carousel JavaScript is loading correctly

### Images Stretched or Distorted
1. **Resize images to 1600 x 600 pixels** (exact dimensions)
2. Use image editor (Photoshop, Canva, GIMP, etc.)
3. Use online tool: [Pixlr](https://pixlr.com) or [Photopea](https://photopea.com)

### Poor Image Quality
1. **Optimize for web** - Reduce file size while maintaining quality
2. Use tools: [TinyPNG](https://tinypng.com) or [Compressor.io](https://compressor.io)
3. Use PNG format for best quality
4. Target < 500 KB per image

---

## Browser Compatibility

✅ **Fully supported on:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)

---

## Performance Considerations

- **Carousel CSS**: Inline in `<style>` tag (~100 lines)
- **Carousel JS**: Inline in `<script>` tag (~50 lines)
- **Total added weight**: Minimal (~2 KB of code)
- **Image optimization**: Recommended < 500 KB per image

### Optimization Tips:
1. Use **WebP format** if browser support allows
2. **Compress images** using tools like TinyPNG
3. **Use exact dimensions** (1600 x 600 px)
4. **Lazy load** images if you add many more carousels elsewhere

---

## Quick Checklist for Image Updates

- [ ] Images are 1600 x 600 pixels
- [ ] File size < 500 KB each
- [ ] File names match exactly (carousel-1.png, carousel-2.png, etc.)
- [ ] Images are in `/assets/images/` folder
- [ ] HTML alt text is descriptive
- [ ] CSS styling is professional
- [ ] Changes committed to Git
- [ ] Changes pushed to origin/main
- [ ] GitHub Pages updated (wait 1-2 min)
- [ ] Tested on desktop and mobile browsers

---

## Questions or Issues?

If you encounter any problems:
1. Check the browser console (F12 → Console)
2. Verify file names and paths
3. Clear browser cache and reload
4. Try in different browser
5. Review this guide's troubleshooting section

---

**Last Updated:** December 12, 2025
**Carousel Version:** 1.0
**Status:** ✅ Production Ready
