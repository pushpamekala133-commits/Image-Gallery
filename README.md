# Image Gallery with Filters

A responsive image gallery application with dynamic filtering, search functionality, pagination, and a lightbox viewer. Perfect for showcasing photos with categories and easy navigation.

## Features

- **Image Display**: Responsive grid layout with smooth animations
- **Category Filters**: Filter images by category (Nature, Landscape, Urban)
- **Search Functionality**: Real-time search through titles, categories, and descriptions
- **Pagination**: Browse images page by page or view all at once
- **Lightbox Viewer**: Full-screen image viewing with navigation
- **Image Info**: Title, category tag, and description for each image
- **Responsive Design**: Mobile-first design with breakpoints for all screen sizes
- **Keyboard Navigation**: Arrow keys and Escape support in lightbox
- **Statistics**: Real-time count of total and displaying images
- **Smooth Animations**: Fade-in effects and hover transitions

## Project Structure

```
image-gallery/
├── index.html (HTML structure)
├── styles.css (Responsive styling)
├── script.js (Gallery logic and interactions)
└── README.md (Documentation)
```

## Installation & Usage

### 1. **Basic Setup**
   - Download all files (index.html, styles.css, script.js)
   - Place them in the same directory
   - Open `index.html` in a web browser

### 2. **Customizing Image Data**
   Edit the `imageData` array in `script.js` to add your own images:

   ```javascript
   const imageData = [
       { 
           id: 1, 
           src: 'image-url-here', 
           title: 'Image Title', 
           category: 'nature', 
           description: 'Image description' 
       },
       // Add more images...
   ];
   ```

### 3. **Adding New Categories**
   Simply add a new category to your image objects. Filter buttons are generated automatically!

   ```javascript
   { id: 1, src: '...', title: '...', category: 'newcategory', description: '...' }
   ```

## How It Works

### 1. **Image Data Structure**
   Each image object contains:
   - `id`: Unique identifier
   - `src`: URL to the image
   - `title`: Image title
   - `category`: Category for filtering
   - `description`: Short description

### 2. **Gallery State Management**
   The `galleryState` object tracks:
   - All images and filtered results
   - Current category and search query
   - Current page and items per page
   - Updates when filters or search changes

### 3. **Key Functions**

   **`filterGallery()`**
   - Filters images by category and search query
   - Updates the filtered images array
   - Resets pagination to page 1

   **`updateGallery()`**
   - Handles pagination logic
   - Displays images or no-results message
   - Updates image counts

   **`displayImages(images)`**
   - Renders image cards with HTML
   - Escapes HTML to prevent XSS
   - Attaches click listeners for lightbox

   **`displayPagination()`**
   - Creates pagination controls
   - Shows smart page numbers (1, ..., current ±1, ..., last)
   - Handles page navigation

   **`openLightbox(imageId)`**
   - Opens full-screen image viewer
   - Displays image info
   - Allows navigation

### 4. **Event Listeners**
   - **Filter Buttons**: Update category and refresh gallery
   - **Search Input**: Debounced to 300ms for performance
   - **Items Per Page**: Changes pagination display
   - **Lightbox Navigation**: Keyboard and button controls
   - **Image Cards**: Click to open lightbox

### 5. **Utility Functions**
   - `debounce()`: Prevents excessive filtering on quick searches
   - `escapeHtml()`: Prevents XSS by escaping user content
   - `getCategoryIcon()`: Maps categories to Font Awesome icons

## Customization Options

### Change Items Per Page Default
Edit in `script.js`:
```javascript
itemsPerPage: 12 // Change default number
```

### Modify Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #ec4899;
    /* ... more colors ... */
}
```

### Adjust Grid Columns
Edit in `styles.css`:
```css
.gallery-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* Increase minmax value for larger cards, decrease for smaller */
}
```

### Add More Categories
1. Add category to images in `imageData`
2. Add icon mapping in `getCategoryIcon()` function
3. Category buttons auto-generate from data!

## Performance Tips

- **Lazy Loading**: Images use `loading="lazy"` attribute
- **Debounced Search**: Search input debounced to 300ms to reduce filtering
- **Efficient Pagination**: Slices array instead of re-rendering all images
- **Optimized Selectors**: Uses ID selectors for frequently accessed elements

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **CSS Features Used**: Grid, Flexbox, Gradients, Animations, Backdrop Filter
- **JavaScript**: ES6+ (arrow functions, const/let, template literals)

## Features in Detail

### Search
- Searches through title, category, and description
- Real-time with 300ms debounce
- Case-insensitive matching
- Updates results and resets pagination

### Filtering
- Click category buttons to filter
- Active filter is highlighted
- "All" category shows all images
- Filter buttons auto-generate from data

### Pagination
- Displays page numbers intelligently
- Shows first, last, and near current pages
- Smart "..." ellipsis (only if gap > 1)
- Prev/Next buttons disabled at boundaries

### Lightbox
- Click any image to view full screen
- Navigation with arrow buttons
- Keyboard support: ← → arrows, ESC to close
- Click background to close
- Automatic cycling when reaching last image

### Responsive
- **Desktop (1200px+)**: 4 columns
- **Tablet (768px-1199px)**: 3 columns
- **Mobile (480px-767px)**: 2 columns
- **Small Mobile (<480px)**: 1 column

## JavaScript Concepts Used

- **Functional Programming**: Map, filter, find methods
- **Arrow Functions**: Modern syntax for callbacks
- **Template Literals**: For dynamic HTML rendering
- **Debouncing**: Performance optimization
- **Event Delegation**: Efficient event handling
- **DOM Manipulation**: Creating and updating elements
- **Keyboard Events**: For accessibility
- **Array Methods**: Slice, find, includes for data manipulation

## Improvements & Enhancements

**For Basic Usage:**
- Add real image URLs from services like Unsplash, Pexels
- Add more images (12+ for pagination to be useful)
- Customize colors to match your brand

**For Advanced Usage:**
- Fetch images from an API
- Add image upload functionality
- Implement image tagging and rating
- Add favorites/bookmarking system
- Implement image sorting options
- Add advanced filters (date, size, resolution)

## Tips for Success

1. **Use Real Images**: Gallery works better with actual photo URLs
2. **Add Descriptions**: Short descriptions improve user experience
3. **Organize Categories**: Keep categories consistent and meaningful
4. **Test Responsiveness**: Use browser DevTools to test all screen sizes
5. **SEO Optimization**: Add alt text to images for accessibility

## Security

- **XSS Prevention**: All user content escaped with `escapeHtml()`
- **Input Sanitization**: Search queries don't execute code
- **Safe HTML Rendering**: Using textContent where appropriate

## Common Issues & Solutions

**Images Not Loading?**
- Check image URLs are valid and CORS-enabled
- Use HTTPS image URLs if using HTTPS

**Search Not Working?**
- Clear browser cache
- Check browser console for errors
- Ensure search term matches image data

**Pagination Not Showing?**
- Need more than 9 images (default page size)
- Change items per page or add more images

**Lightbox Not Opening?**
- Check browser console for JavaScript errors
- Ensure click handler is attached to cards
- Verify image IDs match in data array

## Future Enhancements

- [ ] Add image upload functionality
- [ ] Implement favorites system
- [ ] Add image sharing buttons
- [ ] Implement infinite scroll
- [ ] Add image metadata display
- [ ] Integrate with API for dynamic images
- [ ] Add drag-to-reorder functionality
- [ ] Implement image comparison slider
- [ ] Add before/after gallery mode
- [ ] Implement image curation/rating system

---

**Created as part of 25 Mini Projects Series**
Perfect for portfolio showcasing and learning web development fundamentals!
