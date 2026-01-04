#!/usr/bin/env python3
"""Convert SVG icons to PNG format."""
import os
from PIL import Image, ImageDraw
import math

def create_clock_icon(size, filename):
    """Create a clock icon as PNG."""
    # Create image with black background
    img = Image.new('RGBA', (size, size), color=(0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    outer_radius = size // 2 - int(size * 0.1)
    inner_radius = int(size * 0.04)
    
    # Draw clock circle
    draw.ellipse(
        [center - outer_radius, center - outer_radius,
         center + outer_radius, center + outer_radius],
        outline='white',
        width=max(1, size // 48)
    )
    
    # Draw center dot
    dot_size = inner_radius
    draw.ellipse(
        [center - dot_size, center - dot_size,
         center + dot_size, center + dot_size],
        fill='white'
    )
    
    # Hour hand (pointing up-left, like 10:00)
    hour_angle = math.radians(300)  # 10 o'clock
    hour_length = outer_radius * 0.5
    hour_x = center + hour_length * math.cos(hour_angle)
    hour_y = center + hour_length * math.sin(hour_angle)
    draw.line(
        [(center, center), (hour_x, hour_y)],
        fill='white',
        width=max(1, size // 48)
    )
    
    # Minute hand (pointing right, like :00)
    minute_angle = math.radians(0)  # 0 degrees (3 o'clock position)
    minute_length = outer_radius * 0.65
    minute_x = center + minute_length * math.cos(minute_angle)
    minute_y = center + minute_length * math.sin(minute_angle)
    draw.line(
        [(center, center), (minute_x, minute_y)],
        fill='white',
        width=max(1, size // 64)
    )
    
    img.save(filename, 'PNG')
    print(f"Created {filename} ({size}x{size})")

# Create icons directory if needed
icons_dir = '/workspaces/sanjeevsharmasan.github.io/assets/icons'
os.makedirs(icons_dir, exist_ok=True)

# Generate icons
create_clock_icon(192, os.path.join(icons_dir, 'icon-192x192.png'))
create_clock_icon(512, os.path.join(icons_dir, 'icon-512x512.png'))

print("Icon generation complete!")
