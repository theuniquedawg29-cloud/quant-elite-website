// Smooth scroll navigation
function scrollToSection(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to Top functionality
window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
});

// Initialize EmailJS with Public Key
(function() {
    emailjs.init("LX_caWw2Qsa3e8CIy"); 
})();

// Handle Contact Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Explicitly passing your new email as a parameter
    const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'theuniquedawg29@gmail.com',
        message: message,
        title: "New Quant-Elite Inquiry"
    };

    emailjs.send('service_jeir34e', 'template_zoxrq4d', templateParams)
        .then(function(response) {
            showFormMessage('Message sent to theuniquedawg29@gmail.com successfully!', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, function(error) {
            console.error('FAILED...', error);
            showFormMessage('Error sending message. Please check EmailJS settings.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Handle Newsletter Submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const messageDisplay = document.getElementById('newsletterMessage');

    if (email) {
        // Simulating newsletter signup
        messageDisplay.textContent = "Thank you for subscribing! Check your inbox soon.";
        messageDisplay.style.color = "#10b981";
        event.target.reset();

        setTimeout(() => {
            messageDisplay.textContent = "";
        }, 5000);
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    if (message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;

        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                    formMessage.style.opacity = '1';
                }, 500);
            }, 5000);
        }
    } else {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
}

// Chatbot Logic
function toggleChatbot() {
    const window = document.getElementById('chatbot-window');
    const toggle = document.getElementById('chatbot-toggle');
    if (window.style.display === 'flex') {
        window.style.display = 'none';
        toggle.style.display = 'flex';
    } else {
        window.style.display = 'flex';
        toggle.style.display = 'none';
    }
}

function handleChatKey(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-messages');
    const text = input.value.trim();

    if (!text) return;

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.textContent = text;
    container.appendChild(userDiv);

    input.value = '';
    container.scrollTop = container.scrollHeight;

    // Bot Response Logic
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-msg';
        botDiv.innerHTML = getBotResponse(text);
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
    }, 600);
}

function getBotResponse(input) {
    const val = input.toLowerCase();

    if (val.includes('hello') || val.includes('hi') || val.includes('नमस्ते') || val.includes('namaste')) {
        return "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? <br> Hello! How can I help you today?";
    }

    if (val.includes('quant-elite') || val.includes('app')) {
        return "Quant-Elite हमारा प्रमुख मैथ लर्निंग ऐप है। आप इसे ऊपर दिए गए स्टोर लिंक से डाउनलोड कर सकते हैं। <br> Quant-Elite is our flagship math app. You can download it using the store links above.";
    }

    if (val.includes('contact') || val.includes('email') || val.includes('संपर्क')) {
        return "आप हमें theuniquedawg29@gmail.com पर ईमेल कर सकते हैं। <br> You can email us at theuniquedawg29@gmail.com.";
    }

    if (val.includes('siddhant') || val.includes('ai')) {
        return "मैं सिद्धांत हूँ, आपका AI असिस्टेंट। मैं मैथ प्रॉब्लम्स सुलझाने में आपकी मदद करता हूँ। <br> I am Siddhant, your AI assistant. I help you solve math problems.";
    }

    if (val.includes('price') || val.includes('free') || val.includes('फीस')) {
        return "हमारा ऐप फ्री में उपलब्ध है, जिसमें प्रीमियम फीचर्स भी हैं। <br> Our app is available for free, with optional premium features.";
    }

    return "मुझे समझ नहीं आया। क्या आप फिर से पूछ सकते हैं? <br> I didn't quite get that. Could you please rephrase?";
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .project-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
