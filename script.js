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
    const chatWindow = document.getElementById('chatbot-window');
    const chatToggle = document.getElementById('chatbot-toggle');

    // Check current display state
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

function sendSuggestedMessage(topic) {
    let message = "";
    if (topic === 'About Quant-Elite') message = "Tell me about Quant-Elite";
    if (topic === 'How to Download') message = "How can I download the app?";
    if (topic === 'Contact Support') message = "What is the support email?";
    if (topic === 'AI Mentor') message = "Who is Siddhant?";
    if (topic === 'Services') message = "What services does Quant-Elite and Santosh TechWorks offers?";
    if (topic === 'Santosh') message = "Who is Santosh?";
    const input = document.getElementById('chat-input');
    input.value = message;
    sendChatMessage();
}

function getBotResponse(input) {
    const val = input.toLowerCase().trim();

    const isHindi =
        /[ऀ-ॿ]/.test(input) ||
        val.includes('नमस्ते') ||
        val.includes('कैसे') ||
        val.includes('क्या') ||
        val.includes('संतोष');

    const reply = {
        greet: isHindi
            ? "नमस्ते! मैं <strong>सिद्धांत</strong> हूँ — Quant-Elite का AI सहायक। आप मुझसे ऐप, डाउनलोड, सपोर्ट, सेवाएँ या संतोष जी के बारे में पूछ सकते हैं। नीचे दिए गए सुझावों पर क्लिक करके भी जल्दी जानकारी पा सकते हैं।"
            : "Hello! I’m <strong>Siddhant</strong> — your AI helper for Quant-Elite. You can ask me about the app, downloads, support, services, or Santosh. You can also use the suggestions below for quick help.",

        about: isHindi
            ? "<strong>Quant-Elite</strong> एक advanced math learning platform है, जहाँ आपको 34,000+ questions, AI mentor support, और real-time mock tests मिलते हैं।"
            : "<strong>Quant-Elite</strong> is an advanced math learning platform with 34,000+ questions, AI mentor support, and real-time mock tests.",

        download: isHindi
            ? "आप <strong>Quant-Elite</strong> को <strong>Google Play Store</strong>, <strong>Indus Appstore</strong>, और <strong>Uptodown</strong> से डाउनलोड कर सकते हैं। डाउनलोड लिंक ऊपर <strong>Apps</strong> सेक्शन में दिए गए हैं।"
            : "You can download <strong>Quant-Elite</strong> from <strong>Google Play Store</strong>, <strong>Indus Appstore</strong>, or <strong>Uptodown</strong>. The download links are available in the <strong>Apps</strong> section above.",

        contact: isHindi
            ? "सपोर्ट या किसी भी सहायता के लिए हमें <strong>theuniquedawg29@gmail.com</strong> पर ईमेल करें। मैं चाहूँ तो आपको सही सेक्शन तक भी गाइड कर सकता हूँ।"
            : "For support or any help, email us at <strong>theuniquedawg29@gmail.com</strong>. I can also guide you to the right section if you want.",

        siddhant: isHindi
            ? "मैं <strong>सिद्धांत</strong> हूँ — Quant-Elite का AI-powered mentor. मैं आपके सवालों को आसान भाषा में समझाने और सही जानकारी तक पहुँचने में मदद करता हूँ।"
            : "I’m <strong>Siddhant</strong> — the AI-powered mentor of Quant-Elite. I help explain things in simple language and guide you to the right information.",

        services: isHindi
            ? "<strong>Quant-Elite</strong> maths learning resources और AI guidance प्रदान करता है, जबकि <strong>Santosh TechWorks</strong> software development, IT solutions, और digital innovation services देता है।"
            : "<strong>Quant-Elite</strong> provides math learning resources and AI guidance, while <strong>Santosh TechWorks</strong> offers software development, IT solutions, and digital innovation services.",

        santosh: isHindi
            ? "<strong>संतोष चौबे</strong> एक passionate developer और <strong>Santosh TechWorks</strong> के founder हैं। उन्होंने <strong>Quant-Elite</strong> जैसे educational platform को vision के साथ बनाया है।"
            : "<strong>Santosh Choubey</strong> is a passionate developer and the founder of <strong>Santosh TechWorks</strong>. He is building <strong>Quant-Elite</strong> as a vision-driven educational platform.",

        who: isHindi
            ? "मैं <strong>सिद्धांत</strong> हूँ, आपका AI assistant. आप मुझसे Quant-Elite, downloads, support, services, या Santosh के बारे में पूछ सकते हैं।"
            : "I’m <strong>Siddhant</strong>, your AI assistant. You can ask me about Quant-Elite, downloads, support, services, or Santosh.",

        fallback: isHindi
            ? "माफ़ कीजिए, मैं आपकी बात पूरी तरह समझ नहीं पाया। आप ये पूछ सकते हैं: <br><strong>• Quant-Elite क्या है?</strong><br><strong>• App download कैसे करें?</strong><br><strong>• Support email क्या है?</strong><br><strong>• Santosh TechWorks क्या करता है?</strong>"
            : "Sorry, I didn’t fully understand that. You can ask things like: <br><strong>• What is Quant-Elite?</strong><br><strong>• How do I download the app?</strong><br><strong>• What is the support email?</strong><br><strong>• What does Santosh TechWorks do?</strong>"
    };

    if (/(^|\s)(hello|hi|hey)(\s|$)|नमस्ते/.test(val)) {
        return reply.greet;
    }

    if (val.includes('quant-elite') || val.includes('about') || val.includes('what is quant-elite') || val.includes('quant elite')) {
        return reply.about;
    }

    if (val.includes('download') || val.includes('how to download') || val.includes('install') || val.includes('कैसे डाउनलोड')) {
        return reply.download;
    }

    if (val.includes('email') || val.includes('support') || val.includes('contact') || val.includes('help')) {
        return reply.contact;
    }

    if (val.includes('siddhant') || val.includes('सिद्धांत')) {
        return reply.siddhant;
    }

    if (val.includes('services') || val.includes('santosh techworks') || val.includes('techworks')) {
        return reply.services;
    }

    if (val.includes('santosh') || val.includes('संतोष')) {
        return reply.santosh;
    }

    if (val.includes('who is') || val.includes('who are you') || val.includes('तुम कौन हो') || val.includes('आप कौन हैं')) {
        return reply.who;
    }

    return reply.fallback;
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
