// Image Gallery Image Data
const imageData = [
    { id: 1, src: 'https://picsum.photos/600/400?random=1', title: 'Mountain Peak', category: 'nature', description: 'Majestic mountain covered in snow' },
    { id: 2, src: 'https://picsum.photos/600/400?random=2', title: 'Ocean Wave', category: 'nature', description: 'Powerful ocean waves crashing' },
    { id: 3, src: 'https://picsum.photos/600/400?random=3', title: 'Sunset View', category: 'landscape', description: 'Beautiful golden sunset' },
    { id: 4, src: 'https://picsum.photos/600/400?random=4', title: 'City Lights', category: 'urban', description: 'Modern city skyline at night' },
    { id: 5, src: 'https://picsum.photos/600/400?random=5', title: 'Forest Trail', category: 'nature', description: 'Path through dense forest' },
    { id: 6, src: 'https://picsum.photos/600/400?random=6', title: 'Desert Sand', category: 'landscape', description: 'Golden desert dunes' },
    { id: 7, src: 'https://picsum.photos/600/400?random=7', title: 'Northern Lights', category: 'nature', description: 'Aurora borealis dancing' },
    { id: 8, src: 'https://picsum.photos/600/400?random=8', title: 'Street Photography', category: 'urban', description: 'Candid street scene' },
    { id: 9, src: 'https://picsum.photos/600/400?random=9', title: 'Waterfall', category: 'nature', description: 'Cascading waterfall flow' },
    { id: 10, src: 'https://picsum.photos/600/400?random=10', title: 'Architecture', category: 'urban', description: 'Modern building design' },
    { id: 11, src: 'https://picsum.photos/600/400?random=11', title: 'Lake Reflection', category: 'landscape', description: 'Mirror lake reflection' },
    { id: 12, src: 'https://picsum.photos/600/400?random=12', title: 'National Park', category: 'nature', description: 'Scenic national park vista' },
    { id: 13, src: 'https://picsum.photos/seed/temple13/600/400', title: 'Ancient Temple', category: 'temple', description: 'Historic temple with intricate carvings' },
    { id: 14, src: 'https://picsum.photos/seed/varanasi14/600/400', title: 'Ganges Ghats', category: 'travel', description: 'Colorful life at the river ghats' },
    { id: 15, src: 'https://picsum.photos/seed/taj15/600/400', title: 'Taj Mahal View', category: 'travel', description: 'Iconic marble mausoleum at sunrise' },
    { id: 16, src: 'https://picsum.photos/seed/temple16/600/400', title: 'Temple Courtyard', category: 'temple', description: 'Devotees and bells in a temple courtyard' },
    { id: 17, src: 'https://picsum.photos/seed/fort17/600/400', title: 'Royal Fort', category: 'travel', description: 'Historic fort in the desert state' },
    { id: 18, src: 'https://picsum.photos/seed/backwaters18/600/400', title: 'Kerala Backwaters', category: 'travel', description: 'Serene houseboats on lush backwaters' },
    { id: 19, src: 'https://picsum.photos/seed/ruins19/600/400', title: 'Temple Ruins', category: 'temple', description: 'Ancient stone temples and ruins' },
    { id: 20, src: 'https://picsum.photos/seed/festival20/600/400', title: 'Festival Gathering', category: 'culture', description: 'Large cultural and religious gathering' },
    { id: 21, src: 'https://picsum.photos/seed/market21/600/400', title: 'Street Market', category: 'culture', description: 'Bustling market with colors and spices' },
    { id: 22, src: 'https://picsum.photos/seed/himalaya22/600/400', title: 'Himalayan Pass', category: 'travel', description: 'Snow-capped Himalayan mountain pass' },
    { id: 23, src: 'https://picsum.photos/seed/caves23/600/400', title: 'Rock-Cut Caves', category: 'culture', description: 'Ancient rock-cut cave temples and murals' },
    { id: 24, src: 'https://picsum.photos/seed/dravidian24/600/400', title: 'Dravidian Temple', category: 'temple', description: 'Colorful gopuram and sculpted deities' },
    { id: 25, src: 'https://picsum.photos/seed/palace25/600/400', title: 'City Palace', category: 'travel', description: 'Opulent palace architecture and gardens' },
    { id: 26, src: 'https://picsum.photos/seed/boat26/600/400', title: 'Sunrise Boat Ride', category: 'travel', description: 'Morning boat ride along the river' },
    { id: 27, src: 'https://picsum.photos/seed/dance27/600/400', title: 'Classical Dance', category: 'culture', description: 'Traditional classical dance performance' },
    { id: 28, src: 'https://picsum.photos/seed/spice28/600/400', title: 'Spice Bazaar', category: 'culture', description: 'Aromatic spices and vibrant stalls' },
];

// Gallery State
let galleryState = {
    allImages: imageData,
    filteredImages: imageData,
    currentCategory: 'all',
    currentPage: 1,
    itemsPerPage: 9,
    searchQuery: '',
};

// DOM Elements
const galleryContainer = document.getElementById('galleryContainer');
const filterButtons = document.getElementById('filterButtons');
const searchInput = document.getElementById('searchInput');
const itemsPerPageSelect = document.getElementById('itemsPerPage');
const totalImagesCount = document.getElementById('totalCount');
const showingImagesCount = document.getElementById('showingCount');
const noResultsDiv = document.getElementById('noResults');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxClose = document.getElementById('closeLightbox');
const lightboxPrev = document.getElementById('prevImage');
const lightboxNext = document.getElementById('nextImage');
const paginationContainer = document.getElementById('paginationContainer');

// Initialize Gallery
function initGallery() {
    // Initialize items per page from the select value
    const initialVal = itemsPerPageSelect?.value;
    if (initialVal === 'all') {
        galleryState.itemsPerPage = imageData.length;
    } else if (initialVal) {
        galleryState.itemsPerPage = parseInt(initialVal, 10) || galleryState.itemsPerPage;
    }

    createFilterButtons();
    attachEventListeners();
    updateGallery();
}

// Create Filter Buttons
function createFilterButtons() {
    const categories = ['all', ...new Set(imageData.map(img => img.category))];
    
    filterButtons.innerHTML = categories.map(category => `
        <button class="filter-btn ${category === 'all' ? 'active' : ''}" data-category="${category}">
            <i class="fas fa-${getCategoryIcon(category)}"></i>
            ${category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
    `).join('');
}

// Get Category Icon
function getCategoryIcon(category) {
    const icons = {
        'all': 'images',
        'nature': 'leaf',
        'landscape': 'mountain',
        'urban': 'city',
        'temple': 'place-of-worship',
        'travel': 'plane-departure',
        'culture': 'theater-masks',
    };
    return icons[category] || 'image';
}

// Attach Event Listeners
function attachEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.filter-btn').classList.add('active');
            galleryState.currentCategory = e.target.closest('.filter-btn').dataset.category;
            galleryState.currentPage = 1;
            filterGallery();
        });
    });

    // Search input
    searchInput.addEventListener('input', debounce((e) => {
        galleryState.searchQuery = e.target.value.toLowerCase();
        galleryState.currentPage = 1;
        filterGallery();
    }, 300));

    // Items per page
    itemsPerPageSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'all') {
            galleryState.itemsPerPage = galleryState.filteredImages.length || galleryState.allImages.length;
        } else {
            galleryState.itemsPerPage = parseInt(val, 10) || galleryState.itemsPerPage;
        }
        galleryState.currentPage = 1;
        updateGallery();
    });

    // Lightbox close
    lightboxClose.addEventListener('click', closeLightbox);

    // Lightbox background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Lightbox navigation
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') showPreviousImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Escape') closeLightbox();
    });
}

// Filter Gallery
function filterGallery() {
    let filtered = galleryState.allImages;

    // Filter by category
    if (galleryState.currentCategory !== 'all') {
        filtered = filtered.filter(img => img.category === galleryState.currentCategory);
    }

    // Filter by search query
    if (galleryState.searchQuery) {
        filtered = filtered.filter(img =>
            img.title.toLowerCase().includes(galleryState.searchQuery) ||
            img.category.toLowerCase().includes(galleryState.searchQuery) ||
            img.description.toLowerCase().includes(galleryState.searchQuery)
        );
    }

    galleryState.filteredImages = filtered;
    updateGallery();
}

// Update Gallery Display
function updateGallery() {
    const startIndex = (galleryState.currentPage - 1) * galleryState.itemsPerPage;
    let endIndex = startIndex + galleryState.itemsPerPage;

    // If items per page is "all", display all items
    if (galleryState.itemsPerPage === galleryState.filteredImages.length) {
        endIndex = galleryState.filteredImages.length;
    }

    const paginatedImages = galleryState.itemsPerPage === 999999 
        ? galleryState.filteredImages 
        : galleryState.filteredImages.slice(startIndex, endIndex);

    // Update counts
    updateCounts();

    // Display images or no results
    if (galleryState.filteredImages.length === 0) {
        displayNoResults();
    } else {
        displayImages(paginatedImages);
        displayPagination();
    }
}

// Update Counts
function updateCounts() {
    totalImagesCount.textContent = galleryState.allImages.length;
    showingImagesCount.textContent = galleryState.filteredImages.length;
}

// Display Images
function displayImages(images) {
    galleryContainer.innerHTML = images.map(image => `
        <div class="image-card" data-id="${image.id}">
            <div class="image-wrapper">
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="image-overlay">
                    <i class="fas fa-expand-alt overlay-icon"></i>
                </div>
            </div>
            <div class="image-info">
                <h3 class="image-title">${escapeHtml(image.title)}</h3>
                <span class="image-category">${image.category}</span>
                <p class="image-description">${escapeHtml(image.description)}</p>
            </div>
        </div>
    `).join('');

    noResultsDiv.classList.add('hidden');

    // Attach click listeners to image cards
    document.querySelectorAll('.image-card').forEach(card => {
        card.addEventListener('click', () => {
            const imageId = parseInt(card.dataset.id);
            openLightbox(imageId);
        });
    });
}

// Display No Results
function displayNoResults() {
    galleryContainer.innerHTML = '';
    noResultsDiv.classList.remove('hidden');
}

// Display Pagination
function displayPagination() {
    const totalPages = Math.ceil(galleryState.filteredImages.length / galleryState.itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.classList.add('hidden');
        return;
    }

    paginationContainer.classList.remove('hidden');

    let paginationHTML = `
        <button class="btn-pagination" id="prevBtn" ${galleryState.currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
        <div class="page-numbers">
    `;

    for (let i = 1; i <= totalPages; i++) {
        if (totalPages <= 5 || i === 1 || i === totalPages || (i >= galleryState.currentPage - 1 && i <= galleryState.currentPage + 1)) {
            paginationHTML += `
                <button class="page-number ${i === galleryState.currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if ((i === 2 && galleryState.currentPage > 3) || (i === totalPages - 1 && galleryState.currentPage < totalPages - 2)) {
            paginationHTML += '<span class="page-number" style="cursor: default; background: none; border: none;">...</span>';
        }
    }

    paginationHTML += `
        </div>
        <button class="btn-pagination" id="nextBtn" ${galleryState.currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;

    // Attach pagination listeners
    document.getElementById('prevBtn')?.addEventListener('click', () => {
        if (galleryState.currentPage > 1) {
            galleryState.currentPage--;
            updateGallery();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    document.getElementById('nextBtn')?.addEventListener('click', () => {
        const totalPages = Math.ceil(galleryState.filteredImages.length / galleryState.itemsPerPage);
        if (galleryState.currentPage < totalPages) {
            galleryState.currentPage++;
            updateGallery();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    document.querySelectorAll('.page-number').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.dataset.page);
            galleryState.currentPage = page;
            updateGallery();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Lightbox Functions
function openLightbox(imageId) {
    const image = galleryState.allImages.find(img => img.id === imageId);
    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = escapeHtml(image.title);
    lightboxCategory.textContent = `Category: ${image.category}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    const currentImageSrc = lightboxImage.src;
    const currentImage = galleryState.allImages.find(img => img.src === currentImageSrc);
    if (!currentImage) return;

    const currentIndex = galleryState.allImages.indexOf(currentImage);
    const previousIndex = (currentIndex - 1 + galleryState.allImages.length) % galleryState.allImages.length;
    const previousImage = galleryState.allImages[previousIndex];

    openLightbox(previousImage.id);
}

function showNextImage() {
    const currentImageSrc = lightboxImage.src;
    const currentImage = galleryState.allImages.find(img => img.src === currentImageSrc);
    if (!currentImage) return;

    const currentIndex = galleryState.allImages.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % galleryState.allImages.length;
    const nextImage = galleryState.allImages[nextIndex];

    openLightbox(nextImage.id);
}

// Utility Functions
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', initGallery);
