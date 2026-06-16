// Cart Management
const Cart = {
    items: [],

    init() {
        const storedCart = localStorage.getItem('cityCycleCart');
        if (storedCart) {
            this.items = JSON.parse(storedCart);
        }
        this.updateCartCount();
    },

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id && (item.selectedColor || null) === (product.selectedColor || null));
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.updateCartCount();
        alert('Added to cart!');
    },

    removeItem(productId, color = null) {
        this.items = this.items.filter(item => !(item.id === productId && (item.selectedColor || null) === (color || null)));
        this.save();
        this.updateCartCount();
        // Trigger a re-render if on cart page (callback if needed)
    },

    save() {
        localStorage.setItem('cityCycleCart', JSON.stringify(this.items));
    },

    updateCartCount() {
        const countSpan = document.querySelector('.cart-count');
        if (countSpan) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            countSpan.textContent = totalItems;
        }
    },

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateQuantity(productId, newQuantity, color = null) {
        const item = this.items.find(item => item.id === productId && (item.selectedColor || null) === (color || null));
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            this.save();
            this.updateCartCount();
        }
    }
};

// UI Interactions
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Hero Slider Logic
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        if (slides.length === 0) return;

        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Handle index bounds
        if (index >= slides.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = slides.length - 1;

        // Add active class to current slide and dot
        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }

    function nextSlide() {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }

    // Global function for dot clicks
    window.currentSlide = function (index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
        resetTimer();
    }

    // Automatic transition
    let sliderTimer = setInterval(nextSlide, 5000);

    function resetTimer() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(nextSlide, 5000);
    }

    // Checkout Redirection
    window.goToCheckout = function (productId = null) {
        if (productId) {
            window.location.href = `checkout.html?id=${productId}`;
        } else {
            window.location.href = 'checkout.html';
        }
    };
});

// Expose products if available (fallback)
if (typeof products !== 'undefined') {
    window.allProducts = products;
}

// Helper to format currency
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Share Functionality
const Share = {
    init() {
        this.createShareMenu();
    },

    createShareMenu() {
        if (document.getElementById('share-menu')) return;

        const overlay = document.createElement('div');
        overlay.id = 'share-overlay';
        overlay.className = 'share-menu-overlay';
        overlay.onclick = () => this.hideMenu();

        const menu = document.createElement('div');
        menu.id = 'share-menu';
        menu.className = 'share-menu';
        menu.innerHTML = `
            <div class="share-close" onclick="Share.hideMenu()"><i class="fas fa-times"></i></div>
            <h3>Share Product</h3>
            <div class="share-options">
                <div class="share-option wa" onclick="Share.toPlatform('whatsapp')">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </div>
                <div class="share-option tg" onclick="Share.toPlatform('telegram')">
                    <i class="fab fa-telegram-plane"></i>
                    <span>Telegram</span>
                </div>
                <div class="share-option ig" onclick="Share.toPlatform('instagram')">
                    <i class="fab fa-instagram"></i>
                    <span>Instagram</span>
                </div>
                <div class="share-option copy" onclick="Share.copyLink()">
                    <i class="fas fa-link"></i>
                    <span>Copy Link</span>
                </div>
                <div class="share-option more" onclick="Share.nativeShare()">
                    <i class="fas fa-share-alt" style="background-color: #3498db;"></i>
                    <span>More</span>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(menu);
        this.overlay = overlay;
        this.menu = menu;
    },

    currentProduct: null,

    product(product, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.currentProduct = product;

        // Use Web Share API if available and on mobile
        if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            this.nativeShare();
        } else {
            this.showMenu();
        }
    },

    showMenu() {
        this.overlay.classList.add('active');
        this.menu.classList.add('active');
    },

    hideMenu() {
        this.overlay.classList.remove('active');
        this.menu.classList.remove('active');
    },

    getUrl() {
        const baseUrl = 'https://citycyclemart8-cell.github.io/City-Cycle-Mart/';
        return `${baseUrl}product-detail.html?id=${this.currentProduct.id}`;
    },

    getText() {
        return `Check out this ${this.currentProduct.name} at City Cycle Mart! Only ₹${this.currentProduct.price}`;
    },

    toPlatform(platform) {
        const url = encodeURIComponent(this.getUrl());
        const text = encodeURIComponent(this.getText());
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                break;
            case 'instagram':
                // Instagram doesn't support direct URL sharing via link, usually just opens app.
                // We'll copy link and alert user.
                this.copyLink();
                alert('Link copied to clipboard! You can now paste it in your Instagram Story or DM.');
                this.hideMenu();
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');
            this.hideMenu();
        }
    },

    copyLink() {
        const url = this.getUrl();
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
            this.hideMenu();
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    },

    nativeShare() {
        if (navigator.share) {
            navigator.share({
                title: this.currentProduct.name,
                text: this.getText(),
                url: this.getUrl(),
            }).catch((error) => console.log('Error sharing', error));
        } else {
            alert('Sharing is not supported on this browser. Try copying the link!');
        }
        this.hideMenu();
    }
};

// Initialize Share
document.addEventListener('DOMContentLoaded', () => {
    Share.init();
});

// Global Search Logic
window.executeSearch = function() {
    const query = document.getElementById('global-search-input').value;
    if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
        
        // Populate search if on products page
        if (window.location.pathname.includes('products.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                searchInput.value = searchQuery;
            }
        }
    }
});
