// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navButtons.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Onglets de la liste d'attente
    const searchTabs = document.querySelectorAll('.search-tab');
    if (searchTabs.length > 0) {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Retirer la classe active de tous les onglets
                searchTabs.forEach(t => t.classList.remove('active'));
                // Ajouter la classe active à l'onglet cliqué
                this.classList.add('active');
                
                // Adapter le formulaire en fonction du type d'utilisateur
                const userType = this.getAttribute('data-tab');
                updateWaitlistForm(userType);
            });
        });
    }

    // Fonction pour mettre à jour les filtres selon le type d'utilisateur
    function updateWaitlistForm(userType) {
        const waitlistBtn = document.querySelector('.waitlist-button');
        const filterSelect = document.querySelector('.filter-select:first-child');
        const infoText = document.querySelector('.waitlist-info');

        if (waitlistBtn && filterSelect && infoText) {
            if (userType === 'agent') {
                filterSelect.innerHTML = `
                    <option value="">Nombre de propriétés</option>
                    <option value="1-5">1-5 propriétés</option>
                    <option value="6-20">6-20 propriétés</option>
                    <option value="21-50">21-50 propriétés</option>
                    <option value="50+">Plus de 50 propriétés</option>
                `;
                infoText.textContent = "Soyez parmi les premiers agents à présenter vos biens sur notre plateforme moderne.";
            } else if (userType === 'promoteur') {
                filterSelect.innerHTML = `
                    <option value="">Type de projet</option>
                    <option value="residence">Résidence</option>
                    <option value="villa">Villas</option>
                    <option value="appartement">Appartements</option>
                    <option value="mixte">Projet mixte</option>
                    <option value="autre">Autre</option>
                `;
                infoText.textContent = "Présentez vos projets immobiliers à des clients qualifiés et augmentez votre visibilité.";
            } else if (userType === 'client') {
                filterSelect.innerHTML = `
                    <option value="">Vous recherchez à</option>
                    <option value="acheter">Acheter</option>
                    <option value="louer">Louer</option>
                    <option value="investir">Investir</option>
                `;
                infoText.textContent = "Soyez notifié dès que notre plateforme sera disponible et découvrez les meilleures offres en avant-première.";
            }
        }
    }

    // Bouton "Rejoindre la liste d'attente"
    const waitlistButton = document.querySelector('.waitlist-button');
    if (waitlistButton) {
        waitlistButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.querySelector('.search-input').value;
            const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
            
            if (!isValidEmail(email)) {
                showMessage('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simuler l'inscription à la liste d'attente
            showMessage(`Votre inscription à la liste d'attente en tant que ${activeTab} a bien été prise en compte !`, 'success');
            document.querySelector('.search-input').value = '';
            
            // Ici, vous pourriez ajouter du code pour envoyer l'email à votre système
            // Par exemple avec une requête fetch vers une API
            console.log(`Nouveau membre sur liste d'attente: ${email} (${activeTab})`);
        });
    }

    // Boutons "J'aime" pour les propriétés
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    if (favoriteBtns.length > 0) {
        favoriteBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault(); // Empêcher la navigation si le bouton est dans un lien
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    // Passer de l'icône vide à l'icône pleine
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    showMessage('Propriété ajoutée à vos favoris', 'success');
                } else {
                    // Passer de l'icône pleine à l'icône vide
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    showMessage('Propriété retirée de vos favoris', 'info');
                }
            });
        });
    }

    // Toggle de langue
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        const languageOptions = languageToggle.querySelectorAll('span');
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Retirer la classe active de toutes les options
                languageOptions.forEach(opt => opt.classList.remove('active'));
                // Ajouter la classe active à l'option cliquée
                this.classList.add('active');
                
                const language = this.textContent;
                showMessage(`La langue a été changée en ${language}. Cette fonctionnalité sera bientôt disponible.`, 'info');
            });
        });
    }

    // Formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                showMessage('Merci de vous être inscrit à notre newsletter !', 'success');
                emailInput.value = '';
            } else {
                showMessage('Veuillez entrer une adresse e-mail valide.', 'error');
            }
        });
    }

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
    const animatedElements = document.querySelectorAll('.property-card, .neighborhood-card, .step, .mockup-browser');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animation spéciale pour le mockup
    const mockupBrowser = document.querySelector('.mockup-browser');
    if (mockupBrowser) {
        mockupBrowser.addEventListener('mouseover', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg)';
        });
        
        mockupBrowser.addEventListener('mouseout', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg)';
        });
    }

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
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Défilement vers le bas
            header.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Effet parallaxe sur l'image hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < 800) {
                hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
            }
        }
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
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
    
    .message.success {
        background-color: rgba(76, 175, 80, 0.85);
    }
    
    .message.error {
        background-color: rgba(244, 67, 54, 0.85);
    }
    
    .message.info {
        background-color: rgba(138, 43, 226, 0.85);
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

    /* Animation pour hamburger */
    .hamburger.active .line:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .line:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .line:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(messageStyles); 