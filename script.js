// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Sélectionner tous les éléments à animer
    const animatedElements = document.querySelectorAll('.feature-card, .step, .partner-logo');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion du formulaire d'inscription à la liste d'attente
    const waitlistForm = document.querySelector('.waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // Simuler l'envoi du formulaire
                showMessage('Merci de vous être inscrit ! Nous vous contacterons bientôt.', 'success');
                emailInput.value = '';
            } else {
                showMessage('Veuillez entrer une adresse e-mail valide.', 'error');
            }
        });
    }

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            
            if (name === '') {
                showMessage('Veuillez entrer votre nom.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Veuillez entrer une adresse e-mail valide.', 'error');
                return;
            }
            
            // Simuler l'envoi du formulaire
            showMessage('Merci pour votre inscription ! Nous vous contacterons dès que Kairo sera lancé.', 'success');
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
        });
    }

    // Basculement de langue
    const languageButtons = document.querySelectorAll('.language-toggle button');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Ici, vous pourriez implémenter la logique de changement de langue
            // Pour l'instant, affichons juste un message
            const language = this.textContent;
            showMessage(`La langue a été changée en ${language}. Cette fonctionnalité sera bientôt disponible.`, 'info');
        });
    });

    // Navigation fixe au défilement
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop) {
            // Défilement vers le bas
            header.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

// Fonction pour valider une adresse e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour afficher un message
function showMessage(message, type) {
    // Vérifier si un message existe déjà
    let messageContainer = document.querySelector('.message-container');
    
    // Si le conteneur n'existe pas, le créer
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.body.appendChild(messageContainer);
    }
    
    // Créer le message
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Ajouter le message au conteneur
    messageContainer.appendChild(messageElement);
    
    // Supprimer le message après 3 secondes
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
            
            // Si c'est le dernier message, supprimer le conteneur
            if (messageContainer.children.length === 0) {
                messageContainer.remove();
            }
        }, 300);
    }, 3000);
}

// Ajouter des styles CSS pour les messages
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    .message-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .message {
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease forwards;
    }
    
    .message.success {
        background-color: #4CAF50;
    }
    
    .message.error {
        background-color: #f44336;
    }
    
    .message.info {
        background-color: #8a2be2;
    }
    
    .message.fade-out {
        animation: fadeOut 0.3s ease forwards;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    header.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 20px rgba(138, 43, 226, 0.15);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(messageStyles); 