# Hero Images for Ubukwe Wedding Platform

## How to Add Your Own Images

The hero carousel in the home page uses a set of images that automatically rotate every 4 seconds. To customize these images:

### Option 1: Replace Placeholder Images
1. Add your wedding images to the `public/` folder
2. Update the `heroImages` array in `components/ui/hero-carousel.tsx`
3. Replace the placeholder URLs with your local image paths

### Option 2: Use Your Own Image URLs
1. Update the `heroImages` array in `components/ui/hero-carousel.tsx`
2. Replace the placeholder URLs with your own image URLs
3. Make sure your images are accessible and have appropriate dimensions

## Recommended Image Specifications
- **Dimensions**: 800x600 or 1200x800 pixels
- **Format**: JPG, PNG, or WebP
- **File Size**: Under 500KB for optimal loading
- **Content**: Wedding-related images (venues, decorations, ceremonies, etc.)

## Current Image Structure
Each image object contains:
```javascript
{
  src: "image-url.jpg",
  alt: "Descriptive alt text",
  title: "Image title",
  description: "Brief description"
}
```

## Customization Options
- **Autoplay Delay**: Change the `delay` value in the Swiper autoplay settings
- **Transition Effect**: Modify the `effect` property (currently "fade")
- **Navigation**: Enable/disable navigation arrows
- **Pagination**: Customize the pagination dots styling

## Example of Adding a New Image
```javascript
const heroImages = [
  // ... existing images
  {
    src: "/your-wedding-image.jpg",
    alt: "Your Wedding Description",
    title: "Your Title",
    description: "Your description"
  }
];
```

## Notes
- The first image (`/ababyinyi.jpeg`) is used as a fallback if other images fail to load
- Images automatically loop and transition with a fade effect
- The carousel is responsive and works on all device sizes
