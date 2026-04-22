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
               • <strong>गेमिफिकेशन:</strong> सिक्के जीतें, नए अध्याय अनलॉक करें और अपनी रैंक सुधारें।<br>
               • <strong>रीयल-टाइम एनालिसिस:</strong> अपनी गति और सटीकता को ट्रैक करें।<br><br>
               क्या आप इसे आज़माना चाहेंगे?`
            : `<strong>Quant-Elite</strong> is a revolutionary math learning platform designed for excellence:<br><br>
               • <strong>34,000+ Questions:</strong> Extensive practice material for GATE, CAT, and JEE standards.<br>
               • <strong>AI Mentorship:</strong> I (Siddhant) provide voice-enabled, plain-text explanations for every problem.<br>
               • <strong>Gamification:</strong> Earn coins, unlock chapters, and climb the leaderboard.<br>
               • <strong>Performance Analytics:</strong> Deep insights into your speed and accuracy trends.<br><br>
               Would you like to know how to get started?`,

        download: isHindi
            ? `आप <strong>Quant-Elite</strong> को इन प्लेटफॉर्म्स से डाउनलोड कर सकते हैं:<br><br>
               1. <strong>Google Play Store:</strong> एंड्रॉइड यूज़र्स के लिए मुख्य स्टोर।<br>
               2. <strong>Indus Appstore:</strong> भारत का अपना ऐप स्टोर।<br>
               3. <strong>Uptodown:</strong> डायरेक्ट APK डाउनलोड के लिए।<br><br>
               डाउनलोड करने के लिए ऊपर <strong>'Our Apps'</strong> सेक्शन पर जाएँ!`
            : `You can download <strong>Quant-Elite</strong> from the following platforms:<br><br>
               1. <strong>Google Play Store:</strong> The primary destination for Android users.<br>
               2. <strong>Indus Appstore:</strong> India's homegrown app marketplace.<br>
               3. <strong>Uptodown:</strong> For direct APK downloads and updates.<br><br>
               Simply scroll up to the <strong>'Our Apps'</strong> section for direct links!`,

        creator: isHindi
            ? `<strong>संतोष चौबे</strong> Santosh TechWorks के पीछे के विजनरी हैं। 👨‍💻<br><br>
               • <strong>स्थान:</strong> डिब्रूगढ़, असम से।<br>
               • <strong>विशेषज्ञता:</strong> Full-Stack Architect और AI स्पेशलिस्ट।<br>
               • <strong>मिशन:</strong> कठिन से कठिन गणित को AI के माध्यम से हर छात्र के लिए सुलभ बनाना।<br><br>
               वे व्यक्तिगत रूप से हर फीडबैक को पढ़ते हैं। आप उन्हें <strong>theuniquedawg29@gmail.com</strong> पर लिख सकते हैं।`
            : `<strong>Santosh Choubey</strong> is the visionary behind Santosh TechWorks. 👨‍💻<br><br>
               • <strong>Location:</strong> Based in Dibrugarh, Assam.<br>
               • <strong>Expertise:</strong> Full-Stack Architect and AI Integration Specialist.<br>
               • <strong>Mission:</strong> Democratizing advanced mathematics through personalized AI tutoring.<br><br>
               He personally oversees all development. You can reach him at <strong>theuniquedawg29@gmail.com</strong>.`,

        support: isHindi
            ? `सहायता चाहिए? हम यहाँ हैं! 🤝<br><br>
               • <strong>ईमेल:</strong> theuniquedawg29@gmail.com पर हमें लिखें।<br>
               • <strong>समय:</strong> हम आमतौर पर 24 घंटे के भीतर जवाब देते हैं।<br>
               • <strong>विषय:</strong> ऐप में बग रिपोर्ट, नए फीचर सुझाव, या व्यावसायिक पूछताछ।<br><br>
               आप नीचे दिए गए संपर्क फ़ॉर्म का भी उपयोग कर सकते हैं!`
            : `Need assistance? We've got your back! 🤝<br><br>
               • <strong>Email:</strong> Reach out to <strong>theuniquedawg29@gmail.com</strong>.<br>
               • <strong>Response Time:</strong> We typically respond within 24 hours.<br>
               • <strong>Scope:</strong> Bug reports, feature requests, or business collaborations.<br><br>
               You can also use the contact form at the bottom of this page!`,

        services: isHindi
            ? `<strong>Santosh TechWorks</strong> निम्नलिखित प्रीमियम सेवाएं प्रदान करता है:<br><br>
               • <strong>कस्टम ऐप डेवलपमेंट:</strong> Flutter और Dart के साथ हाई-परफॉरमेंस ऐप्स।<br>
               • <strong>AI इंटीग्रेशन:</strong> आपके बिजनेस में LLM और स्मार्ट बॉट्स जोड़ना।<br>
               • <strong>वेब आर्किटेक्चर:</strong> स्केलेबल और सुरक्षित वेबसाइट्स (जैसे यह वाली!)।<br>
               • <strong>डेटा एनालिटिक्स:</strong> जटिल डेटा को समझने योग्य डैशबोर्ड में बदलना।<br><br>
               क्या आप किसी प्रोजेक्ट पर चर्चा करना चाहते हैं?`
            : `<strong>Santosh TechWorks</strong> offers a suite of premium digital services:<br><br>
               • <strong>Custom App Development:</strong> High-performance mobile apps using Flutter & Dart.<br>
               • <strong>AI Integration:</strong> Embedding LLMs and smart agents into existing workflows.<br>
               • <strong>Web Architecture:</strong> Scalable, secure, and responsive web applications.<br>
               • <strong>Cloud Solutions:</strong> Infrastructure management and optimization.<br><br>
               Would you like to discuss a potential project?`,

        fallback: isHindi
            ? `क्षमा करें, मैं पूरी तरह समझ नहीं पाया। 😅<br><br>
               शायद आप इनमें से कुछ ढूंढ रहे हैं:<br>
               • Quant-Elite की विशेषताएं<br>
               • ऐप डाउनलोड कैसे करें<br>
               • संतोष जी के बारे में जानकारी<br><br>
               कृपया नीचे दिए गए बटनों का उपयोग करें या फिर से पूछें!`
            : `I'm not sure I understood that correctly. 😅<br><br>
               You might want to ask about:<br>
               • Features of Quant-Elite<br>
               • How to download the app<br>
               • About the founder, Santosh<br><br>
               Try using the suggestion buttons below for a quicker response!`
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
