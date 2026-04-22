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

function sendSuggestedMessage(topic) {
    let message = "";
    if (topic === 'About Quant-Elite') message = "Tell me about Quant-Elite";
    if (topic === 'How to Download') message = "How can I download the app?";
    if (topic === 'Contact Support') message = "What is the support email?";
    if (topic === 'AI Mentor') message = "Who is Siddhant?";
    if (topic === 'Services') message = "What services does Quant-Elite and Santosh TechWorks offers?";
    if (topic === 'Santosh') message = "Who is Santosh?";)
    const input = document.getElementById('chat-input');
    input.value = message;
    sendChatMessage();
}

function getBotResponse(input) {
    const val = input.toLowerCase();

    if (val.includes('hello') || val.includes('hi') || val.includes('नमस्ते')) {
        return "नमस्ते! मैं सिद्धांत हूँ। आप नीचे दिए गए सुझावों (Suggestions) पर क्लिक करके भी जानकारी पा सकते हैं। <br> Hello! I'm Siddhant. You can also click the suggestions below to get quick info.";
    }

    if (val.includes('quant-elite') || val.includes('about')) {
        return "<strong>Quant-Elite</strong> एक एडवांस मैथ लर्निंग प्लेटफॉर्म है। इसमें 34,000+ सवाल, AI मेंटर और रियल-TIME मॉक टेस्ट हैं। <br> <strong>Quant-Elite</strong> is an advanced math learning platform featuring 34,000+ questions, an AI mentor, and real-time mock tests.";
    }

    if (val.includes('download') || val.includes('how to')) {
        return "आप इसे <strong>Google Play Store</strong>, <strong>Indus Appstore</strong>, या <strong>Uptodown</strong> से डाउनलोड कर सकते हैं। लिंक ऊपर 'Apps' सेक्शन में उपलब्ध हैं। <br> You can download it via Google Play, Indus Appstore, or Uptodown. Links are in the 'Apps' section above.";
    }

    if (val.includes('email') || val.includes('support') || val.includes('contact')) {
        return "हमसे संपर्क करने के लिए <strong>theuniquedawg29@gmail.com</strong> पर ईमेल करें। <br> For support, email us at <strong>theuniquedawg29@gmail.com</strong>.";
    }

    if (val.includes('siddhant') || val.includes('who is')) {
        return "मैं <strong>Siddhant</strong> हूँ, एक AI पावर्ड मेंटर। मैं Gemini 2.5 का उपयोग करके आपके गणित के सवालों का आसान जवाब देता हूँ। <br> I am <strong>Siddhant</strong>, an AI-powered mentor. I use Gemini 2.5 to provide easy math explanations.";
    }
    if (val.includes('services') || val.includes('Santosh TechWorks')) {
        return "<strong>Quant-Elite</strong> provides expert math resources, while <strong>Santosh TechWorks</strong> offers IT solutions, software development, and digital innovation. <br> <strong>Quant-Elite</strong> गणित के संसाधन प्रदान करता है, और <strong>Santosh TechWorks</strong> आईटी समाधान और सॉफ्टवेयर विकास सेवाएं प्रदान करता है।";
    }
      if (val.includes('santosh') || val.includes('who is')) {
         return "<strong>Santosh Choubey</strong> is a passionate developer and the visionary founder of Santosh TechWorks. He is dedicated to creating the comprehensive <strong>Quant-Elite</strong> application, focusing on cross-platform development and digital innovation to make quality education accessible. <br> <strong>संतोष चौबे</strong> एक उत्साही डेवलपर और Santosh TechWorks के संस्थापक हैं। उन्होंने <strong>Quant-Elite</strong> जैसे व्यापक एप्लिकेशन को विकसित करने में अपना पूरा प्रयास लगाया है, जो क्रॉस-प्लेटफॉर्म और डिजिटल नवाचार पर आधारित है।";
    }

    return "माफ़ कीजिये, मैं इसे समझ नहीं पाया। कृपया 'Support Email' जैसे बटन का उपयोग करें। <br> Sorry, I didn't catch that. Please use buttons like 'Support Email' for better assistance.";
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
