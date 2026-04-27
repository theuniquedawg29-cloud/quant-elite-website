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
            navLinks.classList.toggle('active');
        });
    }

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
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

    // More conversational responses with direct links and emails
    const personalResponses = {
        greet: isHindi
            ? `नमस्ते! मैं <strong>सिद्धांत</strong> हूँ, संतोष टेकवर्क्स का AI मैनेजर। 😊<br><br>
               मैं यहाँ आपकी सहायता के लिए हूँ। आप मुझसे <strong>Quant-Elite</strong> ऐप, हमारी <strong>वेबसाइट सेवाओं</strong>, या हमारे संस्थापक <strong>संतोष जी</strong> के बारे में पूछ सकते हैं।<br><br>
               आज मैं आपकी किस प्रकार मदद कर सकता हूँ?`
            : `Hello! I'm <strong>Siddhant</strong>, the AI Manager at Santosh TechWorks. 😊<br><br>
               I'm here to guide you through our ecosystem. You can ask me about the <strong>Quant-Elite</strong> app, our <strong>development services</strong>, or the vision of our founder, <strong>Santosh</strong>.<br><br>
               How can I assist you today?`,

        about: isHindi
            ? `<strong>Quant-Elite</strong> गणित सीखने का एक क्रांतिकारी प्लेटफॉर्म है:<br><br>
               • <strong>34,000+ प्रश्न:</strong> GATE, CAT और JEE के स्तर के अभ्यास सवाल।<br>
               • <strong>AI मेंटर:</strong> मैं (सिद्धांत) आपको हर सवाल का विस्तृत समाधान दूंगा।<br>
               • <strong>गेमिफिकेशन:</strong> सिक्के जीतें, नए अध्याय अनलॉक करें और अपनी रैंक सुधारें।<br><br>
               क्या आप इसे आज़माना चाहेंगे? आप इसे यहाँ से डाउनलोड कर सकते हैं: <a href="https://indusapp.store/2xanb2rz" target="_blank" style="color: #6366f1; font-weight: bold;">Indus Appstore</a>`
            : `<strong>Quant-Elite</strong> is a revolutionary math learning platform designed for excellence:<br><br>
               • <strong>34,000+ Questions:</strong> Extensive practice material for GATE, CAT, and JEE standards.<br>
               • <strong>AI Mentorship:</strong> I (Siddhant) provide voice-enabled explanations for every problem.<br>
               • <strong>Gamification:</strong> Earn coins, unlock chapters, and climb the leaderboard.<br><br>
               Ready to start? Download it here: <a href="https://indusapp.store/2xanb2rz" target="_blank" style="color: #6366f1; font-weight: bold;">Get it on Indus Appstore</a>`,

        download: isHindi
            ? `निश्चित रूप से! आप <strong>Quant-Elite</strong> को इन लिंक्स से डाउनलोड कर सकते हैं:<br><br>
               🚀 <strong>Indus Appstore:</strong> <a href="https://indusapp.store/2xanb2rz" target="_blank" style="color: #6366f1;">यहाँ क्लिक करें</a><br>
               📦 <strong>Direct APK:</strong> <a href="https://uptodown.com/" target="_blank" style="color: #6366f1;">Uptodown से लें</a><br><br>
               जल्द ही हम Google Play Store पर भी लाइव होंगे!`
            : `Absolutely! You can download <strong>Quant-Elite</strong> using these links:<br><br>
               🚀 <strong>Indus Appstore:</strong> <a href="https://indusapp.store/2xanb2rz" target="_blank" style="color: #6366f1; font-weight: bold;">Download Now</a><br>
               📦 <strong>Direct APK:</strong> <a href="https://uptodown.com/" target="_blank" style="color: #6366f1; font-weight: bold;">Get it on Uptodown</a><br><br>
               We'll be on the Google Play Store very soon!`,

        creator: isHindi
            ? `<strong>संतोष चौबे</strong> Santosh TechWorks के संस्थापक और मुख्य डेवलपर हैं। 👨‍💻<br><br>
               वे एक Full-Stack Architect और AI स्पेशलिस्ट हैं जो डिब्रूगढ़, असम से हैं। उनका मिशन उन्नत शिक्षा को AI के माध्यम से हर छात्र तक पहुँचाना है।<br><br>
               आप उन्हें सीधे यहाँ संपर्क कर सकते हैं: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a>`
            : `<strong>Santosh Choubey</strong> is the founder and lead developer of Santosh TechWorks. 👨‍💻<br><br>
               He is a Full-Stack Architect and AI Integration Specialist based in Dibrugarh, Assam. His mission is to democratize advanced education through personalized AI tutoring.<br><br>
               You can connect with him directly at: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a>`,

        support: isHindi
            ? `सहायता के लिए आप हमें कभी भी लिख सकते हैं! 🤝<br><br>
               📧 <strong>ईमेल:</strong> <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a><br>
               हम आमतौर पर 24 घंटे के भीतर जवाब देते हैं। आप नीचे दिए गए 'Contact' फॉर्म का भी उपयोग कर सकते हैं।`
            : `I'm here to help! 🤝<br><br>
               📧 <strong>Email:</strong> <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a><br>
               We typically respond within 24 hours. You can also use the 'Contact' form at the bottom of the page!`,

        whoAreYou: isHindi
            ? `मैं <strong>सिद्धांत</strong> हूँ, आपका डिजिटल साथी। संतोष टेकवर्क्स में मेरा काम आपकी मदद करना और हमारे ऐप्स के बारे में जानकारी देना है। मुझे संतोष जी ने अत्याधुनिक AI तकनीक से बनाया है। 😊`
            : `I'm <strong>Siddhant</strong>, your digital companion. My role at Santosh TechWorks is to assist you and provide information about our ecosystem. I was created by Santosh using advanced AI technologies. 😊`,

        services: isHindi
            ? `हम निम्नलिखित प्रीमियम डिजिटल सेवाएं प्रदान करते हैं:<br><br>
               • <strong>App Development:</strong> Flutter/Dart आधारित हाई-परफॉरमेंस ऐप्स।<br>
               • <strong>AI Integration:</strong> आपके बिजनेस में स्मार्ट बॉट्स और LLM जोड़ना।<br>
               • <strong>Web Architecture:</strong> स्केलेबल और सुरक्षित वेबसाइट्स।<br><br>
               चर्चा के लिए संपर्क करें: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1;">यहाँ लिखें</a>`
            : `We offer a suite of premium digital services:<br><br>
               • <strong>App Development:</strong> High-performance apps built with Flutter & Dart.<br>
               • <strong>AI Integration:</strong> Embedding smart agents and LLMs into workflows.<br>
               • <strong>Web Architecture:</strong> Scalable and secure web solutions.<br><br>
               Let's collaborate: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">Email us</a>`,

        fallback: isHindi
            ? `क्षमा करें, मैं पूरी तरह समझ नहीं पाया। 😅<br><br>
               आप मुझसे इनके बारे में पूछ सकते हैं:<br>
               • Quant-Elite क्या है?<br>
               • ऐप डाउनलोड कैसे करें?<br>
               • संतोष कौन है?<br>
               • सपोर्ट के लिए ईमेल क्या है?`
            : `I'm not sure I understood that correctly. 😅<br><br>
               Try asking about:<br>
               • What is Quant-Elite?<br>
               • How to download the app?<br>
               • Who is Santosh?<br>
               • What is your support email?`
    };

    if (val.includes('hello') || val.includes('hi') || val.includes('नमस्ते')) return personalResponses.greet;
    if (val.includes('who are you') || val.includes('तुम कौन') || val.includes('siddhant') || val.includes('सिद्धांत')) return personalResponses.whoAreYou;
    if (val.includes('santosh') || val.includes('creator') || val.includes('founder') || val.includes('संतोष') || val.includes('who made') || val.includes('कौन बनाया')) return personalResponses.creator;
    if (val.includes('download') || val.includes('डाउनलोड') || val.includes('link') || val.includes('app')) return personalResponses.download;
    if (val.includes('email') || val.includes('connect') || val.includes('contact') || val.includes('ईमेल') || val.includes('संपर्क') || val.includes('support') || val.includes('help')) return personalResponses.support;
    if (val.includes('quant-elite') || val.includes('about') || val.includes('क्या है')) return personalResponses.about;
    if (val.includes('services') || val.includes('offer') || val.includes('काम')) return personalResponses.services;

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
