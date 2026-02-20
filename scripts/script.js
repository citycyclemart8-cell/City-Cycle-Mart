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
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.updateCartCount();
        alert('Added to cart!');
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
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

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
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
