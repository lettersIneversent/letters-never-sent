// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Email Signup Form Handling
const signupForms = document.querySelectorAll('.signup-form');

signupForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        const originalText = button.textContent;
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        button.textContent = 'Signing up...';
        button.disabled = true;
        
        // Simulate API call (replace with actual Mailchimp integration)
        setTimeout(() => {
            // Reset form
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
            
            // Show success message
            showMessage('Thank you! Check your email for your free template.', 'success');
            
            // Track conversion (replace with actual analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'event_category': 'Email Signup',
                    'event_label': 'Closure Template'
                });
            }
        }, 2000);
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Scroll Animation for Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.post-card, .product-card, .testimonial, .lesson-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(253, 247, 240, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(253, 247, 240, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Reading Progress Bar (for blog posts)
if (document.querySelector('.blog-post-content')) {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #d53f8c, #b83280);
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const article = document.querySelector('.blog-post-content');
        if (article) {
            const rect = article.getBoundingClientRect();
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = Math.max(0, -rect.top);
            const progress = Math.min(100, (scrolled / (articleHeight - windowHeight)) * 100);
            progressBar.style.width = progress + '%';
        }
    });
}

// Social Share Buttons (if they exist)
function shareOnSocial(platform, url, text) {
    const encodedUrl = encodeURIComponent(url || window.location.href);
    const encodedText = encodeURIComponent(text || document.title);
    
    let shareUrl;
    
    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Add share button event listeners
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.dataset.platform;
        const url = btn.dataset.url;
        const text = btn.dataset.text;
        shareOnSocial(platform, url, text);
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission (replace with actual form handler)
        setTimeout(() => {
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        }, 2000);
    });
}

// Newsletter Signup Tracking
function trackNewsletterSignup() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'event_category': 'Newsletter',
            'event_label': 'Email Signup'
        });
    }
}

// Product Click Tracking
document.querySelectorAll('a[href*="gumroad"], a[href*="products"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Product',
                'event_label': link.textContent.trim()
            });
        }
    });
});

// Blog Post Reading Time Calculation
function calculateReadingTime() {
    const articles = document.querySelectorAll('.blog-post-content, .post-content');
    
    articles.forEach(article => {
        const text = article.textContent;
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / wordsPerMinute);
        
        const readingTimeElement = article.querySelector('.reading-time') || 
                                 article.parentElement.querySelector('.read-time');
        
        if (readingTimeElement) {
            readingTimeElement.textContent = `${readingTime} min read`;
        }
    });
}

// Initialize reading time calculation
document.addEventListener('DOMContentLoaded', calculateReadingTime);

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showMessage('Failed to copy to clipboard', 'error');
    });
}

// Add copy functionality to any elements with data-copy attribute
document.querySelectorAll('[data-copy]').forEach(element => {
    element.addEventListener('click', () => {
        const textToCopy = element.dataset.copy || element.textContent;
        copyToClipboard(textToCopy);
    });
});

// Lazy Loading for Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Search Functionality (if search exists)
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

if (searchInput && searchResults) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 3) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
}

function performSearch(query) {
    // Simple client-side search (replace with actual search implementation)
    const posts = [
        { title: 'The Text I Sent at 2:30 AM', url: '/blog/2am-text', excerpt: 'Eight years of waiting ended with one message...' },
        { title: 'Stop Accepting Crumbs', url: '/blog/stop-accepting-crumbs', excerpt: 'Why halfway love isn\'t love at all...' },
        { title: 'Boundaries That Stick', url: '/blog/boundaries-that-stick', excerpt: 'How to set boundaries people respect...' }
    ];
    
    const results = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result">
                <h4><a href="${result.url}">${result.title}</a></h4>
                <p>${result.excerpt}</p>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Hide search results when clicking outside
document.addEventListener('click', (e) => {
    const searchContainer = e.target.closest('.search-container');
    if (!searchContainer) {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
});

// Console message for developers
console.log(`
💕 Welcome to Letters I Never Sent 💕
Built with love for women ready to choose themselves.
`);

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});