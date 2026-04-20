# Quant-Elite - AI-Powered Math Learning Platform

A modern, responsive marketing website for the Quant-Elite mobile application - an intelligent math quiz and learning platform with AI mentorship.

## 📁 Project Structure

```
my_website/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy page
├── style.css           # Styling and responsive design
├── script.js           # JavaScript for interactivity
└── README.md          # This file
```

## ✨ Features

### 1. **Hero Section**
- Eye-catching banner with app name and description
- Call-to-action buttons for user engagement
- Responsive design for all screen sizes

### 2. **Features Showcase**
- **Live Mentor AI**: Voice-based AI guidance for math problems
- **Voice-Powered Learning**: Speech-to-text and text-to-speech support
- **Comprehensive Quiz Library**: Vast collection of math problems
- **Reward System**: Coin-based achievement tracking
- **Performance Tracking**: Quiz history and analytics
- **Multi-Language Support**: Learn in your preferred language

### 3. **About Section**
- App description and mission focused on math education
- Developer introduction: **Santosh TechWorks**
- Professional styling with gradient background

### 4. **Contact Section**
- Contact form for user inquiries
- Form validation and feedback messages
- Responsive design

### 5. **Navigation**
- Sticky navigation bar
- Smooth scrolling between sections
- Mobile-friendly hamburger menu
- Links to all main sections and privacy policy

### 6. **Privacy Policy**
- Comprehensive privacy policy document
- Covers data collection, usage, and user rights
- CCPA and GDPR compliance information
- Developer contact information

### 7. **Footer**
- Copyright information
- Developer credit
- Quick links

## 🎨 Design Features

- **Modern Gradient Design**: Purple and indigo color scheme
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and scroll animations
- **Professional Typography**: Clean, readable fonts
- **Accessibility**: Semantic HTML and good contrast ratios
- **Performance**: Optimized CSS and minimal JavaScript

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser to view the website.

### Option 2: Local Server (Recommended)
For better development experience, use a local server:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 Color Palette

- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Accent**: `#ec4899` (Pink)
- **Dark Background**: `#0f172a`
- **Light Background**: `#f8fafc`

## ℹ️ About Quant-Elite App

Quant-Elite is an AI-powered math learning platform featuring:
- **Live Mentor AI**: Real-time voice-based guidance from AI mentors
- **Advanced Quiz Engine**: Comprehensive math problem library
- **Speech Recognition**: Ask questions using your voice
- **Firebase Backend**: Secure cloud storage and synchronization
- **Reward System**: Earn coins and track achievements
- **Multi-Language**: Support for multiple languages
- **Analytics**: Detailed performance tracking and insights

## 🔧 Customization

### Change App Name
Search for "Quant-Elite" and replace with your app name in:
- `index.html` (multiple places)
- `privacy.html`
- `style.css` (if needed)

### Modify Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Update Features
Edit the feature cards in the Features section of `index.html` (lines ~90-120)

### Add More Sections
Simply add new `<section>` elements and corresponding CSS in `style.css`

## 📧 Contact Form

The contact form on the landing page:
- Validates all required fields
- Checks email format
- Shows success/error messages
- Currently simulates submission (production would need backend)

To add real email functionality, integrate with:
- SendGrid
- Mailgun
- AWS SES
- Or any email service API

## 🔒 Privacy Policy

The privacy policy included covers:
- Information collection and usage
- Data security measures
- User rights (GDPR, CCPA)
- Third-party services
- Contact information

Update the contact details and customize as needed for your actual policies.

## 📞 Contact Information

**Developer**: Santosh TechWorks

For updates to the privacy policy or website, modify:
- Privacy email: `quantelitesupport@gmail.com` (in privacy.html)
- Footer information (in index.html and privacy.html)

## 🎓 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

© 2026 Quant-Elite. All rights reserved.

Developed by **Santosh TechWorks**

---

**Happy coding!** Feel free to customize this website to match your specific needs.
