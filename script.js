// Sample product data
const products = [
    {
        id: 1,
        name: "Romantic Red Rose Bouquet",
        price: 49.99,
        image: "./assets/Pinterest.jpeg",
        description: "Classic arrangement of fresh red roses",
        category: "bouquets"
    },
    {
        id: 2,
        name: "Sunshine Sunflower Bundle",
        price: 39.99,
        image: "./assets/download (1).jpeg",
        description: "Bright and cheerful sunflowers bundle",
        category: "bouquets"
    },
    {
        id: 3,
        name: "Spring Tulip Collection",
        price: 34.99,
        image: "./assets/springTULIPS.jpeg",
        description: " Color-ful mix of fresh and newly plucked spring  tulips",
        category: "bouquets"
    },
    {
        id: 4,
        name: "Elegant White Lily Display",
        price: 54.99,
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Sophisticated white lily arrangement",
        category: "arrangements"
    },
    {
        id: 5,
        name: "Luxury Mixed Flower Box",
        price: 89.99,
        image: "./assets/LuxaryFlower.jpeg",
        description: "Premium flowers in an elegant box",
        category: "arrangements"
    },
    {
        id: 6,
        name: "Peace Lily Plant",
        price: 29.99,
        image: "./assets/Peace Lily.jpeg",
        description: "Air-purifying indoor plant",
        category: "plants"
    },
    {
        id: 7,
        name: "Orchid Garden",
        price: 65.99,
        image: "./assets/download (2).jpeg",
        description: "Beautiful potted orchid arrangement",
        category: "plants"
    },
    {
        id: 8,
        name: "Rainbow Rose Collection",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Stunning multicolored rose arrangement",
        category: "bouquets"
    },
    {
        id: 9,
        name: "Seasonal Garden Basket",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: "Beautiful collection of Seasonal flowers in a rustic basket",
        category: "arrangements"
    }
    // {
    //     id: 8,
    //     name: "Flower Collection",
    //     price: 79.99,
    //     image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    //     description: "Stunning Single flowers",
    //     category: "single flower"
    // }
];

// Cart functionality
let cart = [];
let cartTotal = 0;

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.getElementById('total-amount');

// Display products
function displayProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="cta-button add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        showNotification('Item added to cart!');
    }
}

// Update cart
function updateCart() {
    cartCount.textContent = cart.length;
    cartTotal = cart.reduce((total, item) => total + item.price, 0);
    totalAmount.textContent = cartTotal.toFixed(2);
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Item removed from cart!');
}

// Toggle cart modal
cartIcon.addEventListener('click', () => {
    cartModal.classList.toggle('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
        cartModal.classList.remove('active');
    }
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Contact form submission and validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Field validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]*$/,
            message: {
                required: 'Please enter your name',
                minLength: 'Name must be at least 2 characters long',
                pattern: 'Name can only contain letters and spaces'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: {
                required: 'Please enter your email address',
                pattern: 'Please enter a valid email address'
            }
        },
        phone: {
            required: true,
            pattern: /^\+?[\d\s-]{10,}$/,
            message: {
                required: 'Please enter your phone number',
                pattern: 'Please enter a valid phone number'
            }
        },
        subject: {
            required: true,
            minLength: 4,
            message: {
                required: 'Please enter a subject',
                minLength: 'Subject must be at least 4 characters long'
            }
        },
        message: {
            required: true,
            minLength: 10,
            message: {
                required: 'Please enter your message',
                minLength: 'Message must be at least 10 characters long'
            }
        }
    };

    // Update business hours status
    function updateBusinessHours() {
        const statusBadge = document.querySelector('.status-badge');
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        
        const isWeekday = day >= 1 && day <= 5;
        const isOpen = isWeekday ? 
            (hour >= 9 && hour < 19) : // 9 AM - 7 PM weekdays
            (hour >= 10 && hour < 18); // 10 AM - 6 PM weekends

        statusBadge.textContent = isOpen ? 'Currently Open' : 'Currently Closed';
        statusBadge.style.background = isOpen ? '#e8f5e9' : '#ffebee';
        statusBadge.style.color = isOpen ? '#2e7d32' : '#c62828';
    }

    // Initialize and update every minute
    updateBusinessHours();
    setInterval(updateBusinessHours, 60000);

    // Form validation and submission
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add floating label behavior
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });

        // Real-time validation
        // Debounce the validation
        let debounceTimeout;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                validateInput(input);
            }, 300); // Wait for 300ms of no typing before validating
        });
    });

    function validateInput(input) {
        const rules = validationRules[input.name];
        const value = input.value.trim();
        
        if (!rules) return true; // No validation rules for this field
        
        // Check required
        if (rules.required && value === '') {
            showInputError(input, rules.message.required);
            return false;
        }
        
        // Check minLength
        if (rules.minLength && value.length < rules.minLength) {
            showInputError(input, rules.message.minLength);
            return false;
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            showInputError(input, rules.message.pattern);
            return false;
        }
        
        hideInputError(input);
        return true;
    }

    function showInputError(input, message) {
        const inputGroup = input.parentElement;
        const existingError = inputGroup.querySelector('.error-message');
        
        if (!existingError) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            inputGroup.appendChild(errorDiv);
        }
        
        input.classList.add('error');
    }

    function hideInputError(input) {
        const inputGroup = input.parentElement;
        const errorDiv = inputGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const invalidInputs = [];
        
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
                invalidInputs.push(input.name);
            }
        });

        if (!isValid) {
            showNotification(`Please check the following fields: ${invalidInputs.join(', ')}`, 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon i');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        submitBtn.disabled = true;
        
        // Disable all form inputs during submission
        formInputs.forEach(input => input.disabled = true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank you for your message!</h3>
                <p>We'll get back to you shortly.</p>
            `;
            
            // Hide the form and show success message
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.parentElement.appendChild(successMessage);
                contactForm.style.display = 'none';
                successMessage.style.display = 'flex';
                setTimeout(() => successMessage.style.opacity = '1', 50);
            }, 300);
            
            // Reset form for next use
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('has-value');
                hideInputError(input);
            });
            
            // Remove success message and show form after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                    contactForm.style.display = 'flex';
                    setTimeout(() => contactForm.style.opacity = '1', 50);
                }, 300);
            }, 5000);
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button and form state
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
            submitBtn.disabled = false;
            formInputs.forEach(input => input.disabled = false);
        }
    });
}

// Featured Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderContainer = document.querySelector('.slider-container');
const sliderDots = document.querySelector('.slider-dots');

// Create slider dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

function moveSlider(direction) {
    updateSlide('remove');
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % slides.length;
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    updateSlide('add');
    updateSliderPosition();
}

function goToSlide(index) {
    updateSlide('remove');
    currentSlide = index;
    updateSlide('add');
    updateSliderPosition();
}

function updateSlide(action) {
    slides[currentSlide].classList[action]('active');
    document.querySelectorAll('.slider-dot')[currentSlide].classList[action]('active');
}

function updateSliderPosition() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Initialize first slide
slides[0].classList.add('active');

// Auto-slide with pause on hover
let slideInterval = setInterval(() => moveSlider('next'), 5000);

sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => moveSlider('next'), 5000);
});

// Product filtering
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts(filter);
    });
});

function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            updateNavigation(entry.target.id);
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

function updateNavigation(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling with active state
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerOffset = 80; // Height of your fixed header
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        updateNavigation(targetId.slice(1));
    });
});

// Animate statistics when in view
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        updateCount();
    });
}

// Show/hide feature details
function showFeatureDetails(feature) {
    const details = feature.querySelector('.feature-details');
    details.style.opacity = '1';
    details.style.visibility = 'visible';
    details.style.transform = 'translateY(0)';
}

function hideFeatureDetails(feature) {
    const details = feature.querySelector('.feature-details');
    details.style.opacity = '0';
    details.style.visibility = 'hidden';
    details.style.transform = 'translateY(10px)';
}

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    let currentSlide = 0;

    function goToSlide(index) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Update current slide
        currentSlide = index;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            // Reset the interval when manually changing slides
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000);
        });
    });

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 3000);

    // Pause auto-advance on hover
    const heroSection = document.querySelector('#home');
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 3000);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
    initHeroSlider();
    
    // Initialize the first section as active
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
    
    // Add event listeners for slider arrows
    document.querySelector('.slider-arrow.prev').addEventListener('click', () => moveSlider('prev'));
    document.querySelector('.slider-arrow.next').addEventListener('click', () => moveSlider('next'));
});





// https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80