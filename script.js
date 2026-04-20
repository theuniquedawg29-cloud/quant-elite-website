// Smooth scroll navigation
function scrollToSection(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks) {
                navLinks.style.display = 'none';
            }
        });
    });
});

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formMessage = document.getElementById('formMessage');

    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    // Validate form
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (in a real app, this would send to a server)
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Clear success message after 5 seconds
        setTimeout(() => {
            showFormMessage('', '');
        }, 5000);
    }, 1500);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    } else {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
}

// Scroll animations (optional - reveals elements as you scroll)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
