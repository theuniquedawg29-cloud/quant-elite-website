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
    if (typeof emailjs !== 'undefined') {
        emailjs.init("LX_caWw2Qsa3e8CIy");
    }
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

    const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'theuniquedawg29@gmail.com',
        message: message,
        title: "New Quant-Elite Inquiry"
    };

    emailjs.send('service_jeir34e', 'template_zoxrq4d', templateParams)
        .then(function(response) {
            showFormMessage('Message sent successfully! Santosh will get back to you soon.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, function(error) {
            console.error('FAILED...', error);
            showFormMessage('Oops! Something went wrong. Please try again.', 'error');
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
        messageDisplay.textContent = "Welcome to the family! Check your inbox soon.";
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
}

// Chatbot Logic
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbot-window');
    const chatToggle = document.getElementById('chatbot-toggle');

    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
        chatToggle.style.display = 'none';
    } else {
        chatWindow.style.display = 'none';
        chatToggle.style.display = 'flex';
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

    const userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.textContent = text;
    container.appendChild(userDiv);

    input.value = '';
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-msg';
        botDiv.innerHTML = getBotResponse(text);
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
    }, 600);
}

function sendSuggestedMessage(topic) {
    let message = "";
    if (topic === 'About Quant-Elite') message = "Tell me about Quant-Elite";
    if (topic === 'How to Download') message = "How can I download the app?";
    if (topic === 'Contact Support') message = "I need help with something";
    if (topic === 'AI Mentor') message = "Who are you, Siddhant?";
    if (topic === 'Services') message = "What services do you offer?";
    if (topic === 'Santosh') message = "Who created this?";

    const input = document.getElementById('chat-input');
    input.value = message;
    sendChatMessage();
}

function getBotResponse(input) {
    const val = input.toLowerCase().trim();
    const isHindi = /[ऀ-ॿ]/.test(input) || val.includes('नमस्ते') || val.includes('संतोष');

    const personalResponses = {
        greet: isHindi
            ? "नमस्ते! मैं <strong>सिद्धांत</strong> हूँ। मैं यहाँ संतोष जी और उनके विजन 'Quant-Elite' की ओर से आपकी मदद के लिए हूँ। आज मैं आपके लिए क्या कर सकता हूँ?"
            : "Hello! I'm <strong>Siddhant</strong>. I'm here on behalf of Santosh and his vision, Quant-Elite. How can I make your journey easier today?",

        about: isHindi
            ? "<strong>Quant-Elite</strong> सिर्फ एक ऐप नहीं, बल्कि गणित सीखने का एक नया नज़रिया है। इसमें 34,000+ सवालों के साथ मेरा (AI) मार्गदर्शन भी शामिल है।"
            : "<strong>Quant-Elite</strong> isn't just an app; it's a new way to master math. It features 34,000+ questions powered by my own AI mentorship.",

        download: isHindi
            ? "आप हमें <strong>Play Store</strong> या <strong>Indus Appstore</strong> पर खोज सकते हैं। ऊपर 'Apps' बटन दबाएं, वहां आपको सीधे लिंक मिल जाएंगे!"
            : "You can find us on the <strong>Play Store</strong> or <strong>Indus Appstore</strong>. Just click the 'Apps' button above for direct links!",

        creator: isHindi
            ? "मुझे <strong>संतोष चौबे</strong> ने बनाया है। वे एक जुनूनी डेवलपर हैं जो तकनीक के जरिए शिक्षा को सरल बनाना चाहते हैं। वे <strong>Santosh TechWorks</strong> के संस्थापक भी हैं।"
            : "I was created by <strong>Santosh Choubey</strong>. He's a passionate developer dedicated to simplifying education through tech. He is also the founder of <strong>Santosh TechWorks</strong>.",

        support: isHindi
            ? "आप संतोष जी को सीधे <strong>theuniquedawg29@gmail.com</strong> पर ईमेल कर सकते हैं। वे अपनी कम्युनिटी की बहुत परवाह करते हैं!"
            : "You can reach out to Santosh directly at <strong>theuniquedawg29@gmail.com</strong>. He truly cares about his community!",

        services: isHindi
            ? "हम <strong>Quant-Elite</strong> के जरिए शिक्षा और <strong>Santosh TechWorks</strong> के जरिए सॉफ्टवेयर डेवलपमेंट एवं डिजिटल नवाचार की सेवाएं देते हैं।"
            : "We offer educational tools via <strong>Quant-Elite</strong> and custom software/digital innovation services through <strong>Santosh TechWorks</strong>.",

        fallback: isHindi
            ? "क्षमा करें, मैं समझ नहीं पाया। क्या आप नीचे दिए गए सुझावों में से किसी एक को चुन सकते हैं? या सीधे संतोष जी को मेल करें!"
            : "I'm sorry, I didn't quite catch that. Try picking one of the suggestions below, or feel free to email Santosh directly!"
    };

    if (val.includes('hello') || val.includes('hi') || val.includes('नमस्ते')) return personalResponses.greet;
    if (val.includes('quant-elite') || val.includes('about')) return personalResponses.about;
    if (val.includes('download') || val.includes('how to')) return personalResponses.download;
    if (val.includes('santosh') || val.includes('creator') || val.includes('who made')) return personalResponses.creator;
    if (val.includes('support') || val.includes('email') || val.includes('help')) return personalResponses.support;
    if (val.includes('services') || val.includes('offer')) return personalResponses.services;
    if (val.includes('siddhant') || val.includes('who are you')) return personalResponses.creator;

    return personalResponses.fallback;
}

// Fixed Scroll animations
const observerOptions = { threshold: 0.1 };
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
