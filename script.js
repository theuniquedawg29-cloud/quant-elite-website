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
            ? "नमस्ते दोस्त! 😊 मैं <strong>सिद्धांत</strong> हूँ - संतोष जी का AI सहायक। <strong>Quant-Elite</strong> के जरिए मैं आपकी गणित की यात्रा को आसान और मजेदार बनाता हूँ। आज आपकी क्या मदद करूँ?"
            : "Hey there! 😊 I'm <strong>Siddhant</strong> - Santosh's AI sidekick. I make your math journey with <strong>Quant-Elite</strong> smooth and fun. What can I help you with today?",

        about: isHindi
            ? "मेरे प्यारे दोस्त, <strong>Quant-Elite</strong> कोई साधारण ऐप नहीं है। इसमें 34,000+ अभ्यास सवाल हैं, AI मार्गदर्शन है, और सबसे खास - संतोष जी का जुनून है! गणित को दोस्त बना देंगे हम। 💪"
            : "My friend, <strong>Quant-Elite</strong> isn't just any app. It packs 34,000+ practice questions, AI guidance, and most importantly - Santosh's passion! We'll make math your friend. 💪",

        download: isHindi
            ? "बहुत आसान! 📱 ऊपर 'Apps' बटन पर क्लिक करें। आपको <strong>Play Store</strong> और <strong>Indus Appstore</strong> दोनों के डायरेक्ट लिंक मिल जाएंगे। बस 30 सेकंड में डाउनलोड हो जाएगा!"
            : "Super easy! 📱 Just click the 'Apps' button above. You'll get direct links to both <strong>Play Store</strong> and <strong>Indus Appstore</strong>. Download in 30 seconds!",

        creator: isHindi
            ? "मेरा सृजनकर्ता <strong>संतोष चौबे</strong> हैं! 😎 वे Dibrugarh, Assam से हैं और <strong>Santosh TechWorks</strong> के संस्थापक हैं। 16 घंटे कोडिंग, गणित के शौकीन, और शिक्षा के जुनूनी। असली हीरो!"
            : "My creator is <strong>Santosh Choubey</strong>! 😎 From Dibrugarh, Assam, founder of <strong>Santosh TechWorks</strong>. Codes 16 hours, math enthusiast, education visionary. The real hero!",

        support: isHindi
            ? "कोई परेशानी? संतोष जी हमेशा तैयार हैं! 📧 सीधे <strong>theuniquedawg29@gmail.com</strong> पर मेल करें। वे अपनी कम्युनिटी को परिवार समझते हैं - 24 घंटे में जवाब मिलेगा!"
            : "Got issues? Santosh is always ready! 📧 Email him directly at <strong>theuniquedawg29@gmail.com</strong>. He treats his community like family - you'll hear back within 24 hours!",

        services: isHindi
            ? "<strong>Quant-Elite</strong> से शिक्षा और <strong>Santosh TechWorks</strong> से कस्टम ऐप्स! 📚✨ चाहे Flutter ऐप बनवाना हो या गणित का AI ट्यूटर - सब कुछ एक ही जगह!"
            : "<strong>Quant-Elite</strong> for education and <strong>Santosh TechWorks</strong> for custom apps! 📚✨ Need Flutter apps or math AI tutors? We've got you covered!",

        fallback: isHindi
            ? "हम्म... थोड़ा कन्फ्यूज हो गया। 😅 नीचे सुझावों में से कोई एक चुन लो या संतोष जी को <strong>theuniquedawg29@gmail.com</strong> पर मेल कर दो। मैं इंतज़ार करूँगा!"
            : "Hmm... got a bit confused there. 😅 Pick one of the suggestions below or email Santosh at <strong>theuniquedawg29@gmail.com</strong>. I'll be waiting!"
    };

    if (val.includes('hello') || val.includes('hi') || val.includes('नमस्ते')) return personalResponses.greet;
    if (val.includes('quant-elite') || val.includes('about') || val.includes('क्या है')) return personalResponses.about;
    if (val.includes('download') || val.includes('डाउनलोड') || val.includes('how to') || val.includes('कैसे')) return personalResponses.download;
    if (val.includes('santosh') || val.includes('creator') || val.includes('संतोष') || val.includes('who made') || val.includes('कौन बनाया')) return personalResponses.creator;
    if (val.includes('support') || val.includes('help') || val.includes('सपोर्ट') || val.includes('मदद')) return personalResponses.support;
    if (val.includes('services') || val.includes('सेवा') || val.includes('offer') || val.includes('क्या देते')) return personalResponses.services;
    if (val.includes('siddhant') || val.includes('who are you') || val.includes('तुम कौन')) return personalResponses.greet;

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
