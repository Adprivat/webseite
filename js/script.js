document.addEventListener('DOMContentLoaded', function() {
    // Theme Switching
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeSwitch.checked = true;
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.terminal-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section and make it active
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
        });
    });
    
    // Handle initial hash in URL
    function handleHash() {
        const hash = window.location.hash || '#home';
        const targetId = hash.substring(1);
        
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to target link and section
        document.querySelector(`nav a[href="${hash}"]`)?.classList.add('active');
        document.getElementById(targetId)?.classList.add('active');
    }
    
    // Handle hash change
    window.addEventListener('hashchange', handleHash);
    
    // Handle initial load
    handleHash();
    
    // Typing effect
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    const textArray = [
        "Tech-Enthusiast",
        "Problemlöser"
    ];
    
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100; // Delay between each character typing
    let erasingDelay = 50; // Delay between each character erasing
    let newTextDelay = 5000; // Delay before starting to erase text
    
    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            // Remove character
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            // Add character
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Set delay before starting to erase
            typingDelay = newTextDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word when completely erased
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            typingDelay = 500; // Delay before typing next word
        }
        
        setTimeout(type, typingDelay);
    }
    
    // Start the typing effect
    if (typedTextElement) {
        setTimeout(type, newTextDelay);
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Nur die Nachricht aus dem Formular holen
            const message = document.getElementById('message').value;
            
            // Validierung
            if (!message) {
                alert('Bitte geben Sie eine Nachricht ein.');
                return;
            }
            
            // Mail-Programm des Nutzers öffnen (nur mit Nachricht)
            const mailtoLink = 'mailto:Kontakt@adrianschultz.de?body=' + encodeURIComponent(message);
            window.location.href = mailtoLink;
            
            // Formular zurücksetzen
            contactForm.reset();
        });
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
