// Announce shopping feedback without blocking touch navigation.
function announceStoreStatus(message) {
    let status = document.getElementById('store-status');
    if (!status) {
        status = document.createElement('div');
        status.id = 'store-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.style.cssText = 'position:fixed;left:50%;bottom:calc(82px + env(safe-area-inset-bottom, 0px));z-index:3000;transform:translateX(-50%);max-width:calc(100vw - 32px);padding:12px 18px;border-radius:10px;background:#071d35;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.22);text-align:center';
        document.body.appendChild(status);
    }
    status.textContent = message;
    status.hidden = false;
    clearTimeout(status._hideTimer);
    status._hideTimer = setTimeout(() => { status.hidden = true; }, 2600);
}

// Cart Management
const Cart = {
    items: [],

    init() {
        try {
            const storedCart = localStorage.getItem('cityCycleCart');
            const parsedCart = storedCart ? JSON.parse(storedCart) : [];
            this.items = Array.isArray(parsedCart) ? parsedCart.filter(item => item && item.id && Number(item.quantity) > 0) : [];
        } catch (error) {
            this.items = [];
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
        announceStoreStatus('Added to cart.');
    },

    removeItem(productId, color = null) {
        this.items = this.items.filter(item => !(item.id === productId && (item.selectedColor || null) === (color || null)));
        this.save();
        this.updateCartCount();
        // Trigger a re-render if on cart page (callback if needed)
    },

    save() {
        try {
            localStorage.setItem('cityCycleCart', JSON.stringify(this.items));
        } catch (error) {
            announceStoreStatus('Cart storage is unavailable in this browser session.');
        }
    },

    updateCartCount() {
        const countSpan = document.querySelector('.cart-count');
        if (countSpan) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            countSpan.textContent = totalItems;
            countSpan.setAttribute('aria-label', `${totalItems} items in cart`);
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

    // Keep contact, phone and shop directions available throughout the storefront.
    const contactActions = document.createElement('nav');
    contactActions.className = 'floating-contact-actions';
    contactActions.setAttribute('aria-label', 'Contact City Cycle Mart');
    contactActions.innerHTML = `
        <nav class="contact-widget-links" id="contact-widget-links" aria-label="Contact options">
            <a class="float-whatsapp" href="https://wa.me/917511103323" target="_blank" rel="noopener" aria-label="WhatsApp City Cycle Mart"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a>
            <a class="float-call" href="tel:+918590858064" aria-label="Call City Cycle Mart"><i class="fas fa-phone" aria-hidden="true"></i><span>Call</span></a>
            <a class="float-directions" href="https://www.google.com/maps/dir/?api=1&destination=11.7324349%2C75.7065688" target="_blank" rel="noopener" aria-label="Get directions to City Cycle Mart"><i class="fas fa-location-dot" aria-hidden="true"></i><span>Directions</span></a>
        </nav>
        <button type="button" class="contact-widget-toggle" aria-expanded="false" aria-controls="contact-widget-links" aria-label="Open contact options"><i class="fas fa-comment-dots" aria-hidden="true"></i></button>
    `;
    document.body.appendChild(contactActions);

    const contactToggle = contactActions.querySelector('.contact-widget-toggle');
    const contactLinks = contactActions.querySelector('.contact-widget-links');
    function closeContactWidget() {
        contactActions.classList.remove('is-open');
        contactToggle.setAttribute('aria-expanded', 'false');
        contactToggle.setAttribute('aria-label', 'Open contact options');
    }
    contactToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = contactActions.classList.toggle('is-open');
        contactToggle.setAttribute('aria-expanded', String(isOpen));
        contactToggle.setAttribute('aria-label', isOpen ? 'Close contact options' : 'Open contact options');
    });
    contactLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeContactWidget));
    document.addEventListener('click', event => { if (!contactActions.contains(event.target)) closeContactWidget(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeContactWidget(); });
    window.addEventListener('resize', () => { if (window.matchMedia('(min-width: 577px)').matches) closeContactWidget(); }, { passive: true });

    // Hide the mobile widget while shopping controls or key content are on screen.
    const protectedSelectors = ['.hero-slider', '.hero', '#product-detail-container', '.product-grid', '#product-list', '#featured-products-grid', '.related-products-viewport', '.filters', '.filter-controls', '.filter-dropdown-container', '.category-directory', '.cart-container', '.cart-item', '.cart-summary', '.checkout-container', 'footer.ccm-footer'];
    if ('IntersectionObserver' in window) {
        const visibleProtectedContent = new Set();
        const protectedObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) visibleProtectedContent.add(entry.target);
                else visibleProtectedContent.delete(entry.target);
            });
            const hasProtectedContent = visibleProtectedContent.size > 0;
            contactActions.classList.toggle('is-obscured', hasProtectedContent);
            if (hasProtectedContent) closeContactWidget();
        }, { root: null, threshold: 0.01, rootMargin: '0px 0px -48px 0px' });
        protectedSelectors.forEach(selector => document.querySelectorAll(selector).forEach(element => protectedObserver.observe(element)));
    }

    const popularCarousel=document.getElementById('popular-carousel');
    const carouselTrack=document.getElementById('popular-carousel-track');
    const carouselDots=document.getElementById('popular-carousel-dots');
    if(popularCarousel&&carouselTrack&&carouselDots){
        const pdfSlides=[
            {name:'Your Next Ride Starts Here',alt:'City Cycle Mart Your Next Ride Starts Here campaign banner',src:'images/brand-sliders/brand-slide-11.png',ratio:'1017 / 246',width:1017,href:null,ctaBottom:'0%'},
            {name:'CAYA',alt:'CAYA bicycle advertisement',src:'images/brand-sliders/brand-slide-01.png',ratio:'506 / 268',width:506,href:'brand.html?name=Caya',ctaBottom:'6%'},
            {name:'Hero Cycles',alt:'Hero Cycles bicycle advertisement',src:'images/brand-sliders/brand-slide-02.png',ratio:'501 / 268',width:501,href:'brand.html?name=Hero',ctaBottom:'6%'},
            {name:'Hercules',alt:'Hercules bicycle advertisement',src:'images/brand-sliders/brand-slide-03.png',ratio:'504 / 268',width:504,href:'products.html?search=Hercules',ctaBottom:'6%'},
            {name:'Alpha',alt:'Alpha bicycle advertisement',src:'images/brand-sliders/brand-slide-04.png',ratio:'506 / 238',width:506,href:'brand.html?name=Alpha',ctaBottom:'9%'},
            {name:'Addo India',alt:'Addo India bicycle advertisement',src:'images/brand-sliders/brand-slide-05.png',ratio:'501 / 238',width:501,href:'brand.html?name=Addo-India',ctaBottom:'9%'},
            {name:'Avrox',alt:'Avrox bicycle advertisement',src:'images/brand-sliders/brand-slide-06.png',ratio:'504 / 238',width:504,href:'brand.html?name=Avrox',ctaBottom:'9%'},
            {name:'Lotus',alt:'Lotus bicycle advertisement',src:'images/brand-sliders/brand-slide-07.png',ratio:'506 / 238',width:506,href:'products.html?search=Lotus',ctaBottom:'9%'},
            {name:'BLA (Bruce)',alt:'BLA Bruce bicycle advertisement',src:'images/brand-sliders/brand-slide-08.png',ratio:'501 / 238',width:501,href:'brand.html?name=Bruce',ctaBottom:'9%'},
            {name:'Coco',alt:'Coco bicycle advertisement',src:'images/brand-sliders/brand-slide-09.png',ratio:'504 / 238',width:504,href:'brand.html?name=Coco',ctaBottom:'9%'},
            {name:'BSA',alt:'BSA bicycle advertisement',src:'images/brand-sliders/brand-slide-10.png',ratio:'506 / 246',width:506,href:'brand.html?name=BSA',ctaBottom:'14%'}
        ];
        const slides=[];const dots=[];
        pdfSlides.forEach((item,index)=>{
            const slide=document.createElement('article');slide.className='pdf-ad-slide'+(index===0?' is-active':'');slide.setAttribute('role','group');slide.setAttribute('aria-roledescription','slide');slide.setAttribute('aria-label',(index+1)+' of '+pdfSlides.length+': '+item.name);slide.setAttribute('aria-hidden',index===0?'false':'true');
            const image=document.createElement('img');image.className='pdf-ad-image';image.src=item.src;image.alt=item.alt;image.loading=index===0?'eager':'lazy';image.decoding='async';if(index===0)image.fetchPriority='high';slide.appendChild(image);
            if(item.href){const link=document.createElement('a');link.className='pdf-ad-shop-hitbox';link.href=item.href;link.setAttribute('aria-label','Shop '+item.name+' bicycles');link.style.bottom=item.ctaBottom;slide.appendChild(link);}
            carouselTrack.appendChild(slide);slides.push(slide);
            const dot=document.createElement('button');dot.type='button';dot.className='pdf-ad-dot'+(index===0?' is-active':'');dot.setAttribute('aria-label','Show advertisement '+(index+1)+': '+item.name);dot.setAttribute('aria-pressed',index===0?'true':'false');dot.addEventListener('click',()=>showPdfSlide(index,true));carouselDots.appendChild(dot);dots.push(dot);
        });
        let activeIndex=0,autoTimer=null;
        const stopTimer=()=>{if(autoTimer!==null){window.clearInterval(autoTimer);autoTimer=null;}};
        const startTimer=()=>{stopTimer();if(document.hidden||popularCarousel.matches(':hover')||popularCarousel.contains(document.activeElement))return;autoTimer=window.setInterval(()=>{if(!popularCarousel.isConnected){stopTimer();return;}showPdfSlide(activeIndex+1,false);},3000);};
        function showPdfSlide(index,manual){activeIndex=(index+slides.length)%slides.length;carouselTrack.style.setProperty('--pdf-slide-ratio',pdfSlides[activeIndex].ratio);popularCarousel.style.setProperty('--pdf-ad-native-width',pdfSlides[activeIndex].width+'px');slides.forEach((slide,i)=>{const active=i===activeIndex;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',active?'false':'true');});dots.forEach((dot,i)=>{const active=i===activeIndex;dot.classList.toggle('is-active',active);dot.setAttribute('aria-pressed',active?'true':'false');});carouselTrack.setAttribute('aria-live',manual?'polite':'off');if(manual)startTimer();}
        carouselTrack.style.setProperty('--pdf-slide-ratio',pdfSlides[0].ratio);
        popularCarousel.querySelector('.pdf-ad-prev').addEventListener('click',()=>showPdfSlide(activeIndex-1,true));popularCarousel.querySelector('.pdf-ad-next').addEventListener('click',()=>showPdfSlide(activeIndex+1,true));
        popularCarousel.addEventListener('mouseenter',stopTimer);popularCarousel.addEventListener('mouseleave',startTimer);popularCarousel.addEventListener('focusin',stopTimer);popularCarousel.addEventListener('focusout',event=>{if(!popularCarousel.contains(event.relatedTarget))startTimer();});
        let touchStartX=null;popularCarousel.addEventListener('touchstart',event=>{stopTimer();touchStartX=event.changedTouches[0].clientX;},{passive:true});popularCarousel.addEventListener('touchend',event=>{if(touchStartX===null)return;const delta=event.changedTouches[0].clientX-touchStartX;if(Math.abs(delta)>45)showPdfSlide(activeIndex+(delta<0?1:-1),true);else startTimer();touchStartX=null;},{passive:true});
        popularCarousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPdfSlide(activeIndex-1,true);}if(event.key==='ArrowRight'){event.preventDefault();showPdfSlide(activeIndex+1,true);}});document.addEventListener('visibilitychange',startTimer);startTimer();
    }

    const featuredGrid = document.getElementById('featured-products-grid');
    if (featuredGrid && typeof products !== 'undefined' && Array.isArray(products)) {
        products.slice(0, 7).forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            const enquiry = 'Hi City Cycle Mart, I am interested in the ' + product.name + '. Please share the price and availability.';
            card.innerHTML = `
                <button type="button" class="share-btn-card" onclick="Share.product(products.find(p => p.id === ${product.id}), event)" title="Share Product" aria-label="Share ${product.name}"><i class="fas fa-share-alt" aria-hidden="true"></i></button>
                <a class="product-card-link" href="product-detail.html?id=${product.id}">
                    ${Number.isFinite(Number(product.mrp)) && Number(product.mrp) > Number(product.price) ? `<span class="product-discount-badge">${Math.round((Number(product.mrp) - Number(product.price)) / Number(product.mrp) * 100)}% off</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price-row"><span class="product-price">₹${Number(product.price).toLocaleString('en-IN')}</span>${Number(product.mrp) > Number(product.price) ? `<span class="product-mrp">MRP ₹${Number(product.mrp).toLocaleString('en-IN')}</span>` : ''}</div>
                    </div>
                </a>
                <div class="product-card-actions">
                    <button type="button" class="btn add-to-cart-card-btn" title="Add ${product.name} to cart" aria-label="Add ${product.name} to cart"><i class="fas fa-cart-plus" aria-hidden="true"></i><span class="card-action-full">Add to Cart</span><span class="card-action-compact" aria-hidden="true">Cart</span></button>
                    <a class="btn whatsapp-card-btn" href="https://wa.me/917511103323?text=${encodeURIComponent(enquiry)}" target="_blank" rel="noopener" aria-label="WhatsApp ${product.name}"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a>
                    <button type="button" class="btn buy-now-card-btn" title="Buy ${product.name} now" aria-label="Buy ${product.name} now"><i class="fas fa-bolt" aria-hidden="true"></i> Buy Now</button>
                    
                </div>
            `;
            card.querySelector('.add-to-cart-card-btn').addEventListener('click', () => Cart.addItem(product));
            card.querySelector('.buy-now-card-btn').addEventListener('click', () => { window.location.href = 'checkout.html?id=' + product.id; });
            featuredGrid.appendChild(card);
        });
    }

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });
        const closeMenu = () => { navLinks.classList.remove('active'); hamburger.setAttribute('aria-expanded', 'false'); };
        navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
        document.addEventListener('click', event => { if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) closeMenu(); });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
        window.addEventListener('resize', () => { if (window.matchMedia('(min-width: 768px)').matches) closeMenu(); }, { passive: true });
    }

    // Hero Slider Logic
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        if (slides.length === 0) return;

        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => { dot.classList.remove('active'); dot.setAttribute('aria-pressed', 'false'); });

        // Handle index bounds
        if (index >= slides.length) currentSlideIndex = 0;
        if (index < 0) currentSlideIndex = slides.length - 1;

        // Add active class to current slide and dot
        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].setAttribute('aria-pressed', 'true');
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

    // Hero Slider Swipe Support
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        let heroTouchStartX = 0;
        let heroTouchEndX = 0;

        sliderContainer.addEventListener('touchstart', e => {
            heroTouchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        sliderContainer.addEventListener('touchend', e => {
            heroTouchEndX = e.changedTouches[0].screenX;
            if (heroTouchEndX < heroTouchStartX - 40) {
                nextSlide();
                resetTimer();
            }
            if (heroTouchEndX > heroTouchStartX + 40) {
                currentSlideIndex--;
                showSlide(currentSlideIndex);
                resetTimer();
            }
        }, {passive: true});
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
function getProductSearchText(product) {
    const specs = Object.values(product.specs || {}).join(' ');
    const features = Array.isArray(product.features) ? product.features.join(' ') : '';
    return [product.name, product.brand, product.category, product.code, product.description, features, specs]
        .filter(value => typeof value === 'string' && value.trim())
        .join(' ')
        .toLocaleLowerCase();
}

window.executeSearch = function() {
    const searchInput = document.getElementById('global-search-input');
    if (!searchInput) return;
    const query = searchInput.value.trim();
    if (!query) {
        searchInput.focus();
        return;
    }
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
        const searchBar = searchInput.parentElement;
        searchBar.style.position = 'relative';
        
        // Create suggestion box
        const suggestionBox = document.createElement('div');
        suggestionBox.id = 'search-suggestions';
        suggestionBox.setAttribute('role', 'listbox');
        suggestionBox.setAttribute('aria-label', 'Product suggestions');
        searchInput.setAttribute('aria-autocomplete', 'list');
        searchInput.setAttribute('aria-controls', 'search-suggestions');
        suggestionBox.style.position = 'absolute';
        suggestionBox.style.top = '100%';
        suggestionBox.style.left = '0';
        suggestionBox.style.width = '100%';
        suggestionBox.style.backgroundColor = 'white';
        suggestionBox.style.border = '1px solid #ddd';
        suggestionBox.style.borderTop = 'none';
        suggestionBox.style.borderRadius = '0 0 10px 10px';
        suggestionBox.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        suggestionBox.style.display = 'none';
        suggestionBox.style.zIndex = '1000';
        suggestionBox.style.maxHeight = '300px';
        suggestionBox.style.overflowY = 'auto';
        
        searchBar.appendChild(suggestionBox);

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            suggestionBox.innerHTML = '';
            
            if (query.length > 0 && typeof products !== 'undefined') {
                const matches = products.filter(p => getProductSearchText(p).includes(query)).slice(0, 5);
                
                if (matches.length > 0) {
                    matches.forEach(p => {
                        const item = document.createElement('div');
                        item.style.padding = '10px 15px';
                        item.style.cursor = 'pointer';
                        item.style.borderBottom = '1px solid #eee';
                        item.style.display = 'flex';
                        item.style.alignItems = 'center';
                        item.style.gap = '10px';
                        item.style.transition = 'background-color 0.2s';
                        
                        item.innerHTML = `
                            <img src="${p.image}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 5px;">
                            <div>
                                <div style="font-weight: 600; font-size: 0.9rem; color: #333;">${p.name}</div>
                                <div style="font-size: 0.8rem; color: #777;">₹${p.price}</div>
                            </div>
                        `;
                        
                        item.addEventListener('mouseenter', () => item.style.backgroundColor = '#f9f9f9');
                        item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
                        item.setAttribute('role', 'option');
                        item.setAttribute('tabindex', '0');
                        item.setAttribute('aria-label', `${p.name}, ₹${Number(p.price).toLocaleString('en-IN')}`);
                        item.querySelector('img').alt = '';
                        item.querySelector('img').loading = 'lazy';
                        item.addEventListener('click', () => { window.location.href = `product-detail.html?id=${p.id}`; });
                        item.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); window.location.href = `product-detail.html?id=${p.id}`; } });
                        
                        suggestionBox.appendChild(item);
                    });
                    suggestionBox.style.display = 'block';
                } else {
                    suggestionBox.style.display = 'none';
                }
            } else {
                suggestionBox.style.display = 'none';
            }
        });
        
        // Hide when losing focus
        searchInput.addEventListener('blur', () => {
            setTimeout(() => { if (!suggestionBox.contains(document.activeElement)) suggestionBox.style.display = 'none'; }, 120);
        });
        // Show when focusing if there's text
        searchInput.addEventListener('focus', () => {
            if (suggestionBox.innerHTML !== '') {
                suggestionBox.style.display = 'block';
            }
        });

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { suggestionBox.style.display = 'none'; searchInput.blur(); return; }
            if (e.key === 'Enter') {
                e.preventDefault();
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









