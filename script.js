// Theme-Switching-Funktionalität
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Lade gespeichertes Theme oder nutze System-Einstellung
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Initialisiere Theme
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.checked = currentTheme === 'light';

// Theme-Wechsel-Handler
function toggleTheme(event) {
    // Wenn das Event von einem Event-Listener kommt
    if (event && event.target.type === 'checkbox') {
        const theme = event.target.checked ? 'light' : 'dark';
        applyTheme(theme);
    } else {
        // Wenn die Funktion direkt aufgerufen wird (z.B. durch den Demo-Button)
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        // Checkbox-Status aktualisieren
        themeToggle.checked = newTheme === 'light';
    }
}

// Theme anwenden
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Event-Listener für Theme-Toggle
themeToggle.addEventListener('change', toggleTheme);

// Kontaktformular-Handler
function sendEmail(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // E-Mail-Link erstellen
    const mailtoLink = `mailto:Kontakt@adrianschultz.de?subject=Kontaktanfrage von ${email}&body=${encodeURIComponent(message)}`;
    
    // E-Mail-Client öffnen
    window.location.href = mailtoLink;
    
    // Formular zurücksetzen
    document.getElementById('contactForm').reset();
} 