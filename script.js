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

    // Onglets de recherche
    const searchTabs = document.querySelectorAll('.search-tab');
    if (searchTabs.length > 0) {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Retirer la classe active de tous les onglets
                searchTabs.forEach(t => t.classList.remove('active'));
                // Ajouter la classe active à l'onglet cliqué
                this.classList.add('active');
                
                // Changer le formulaire en fonction de l'onglet sélectionné
                const tabType = this.getAttribute('data-tab');
                document.querySelector('.search-button').textContent = 
                    tabType === 'acheter' ? 'Rechercher' : 
                    tabType === 'louer' ? 'Rechercher' : 'Estimer';
                
                // Changer les filtres disponibles selon le type de recherche
                updateFilters(tabType);
            });
        });
    }

    // Fonction pour mettre à jour les filtres selon le type de recherche
    function updateFilters(tabType) {
        const priceSelect = document.querySelector('.filter-select:nth-child(2)');
        if (priceSelect) {
            if (tabType === 'acheter') {
                priceSelect.innerHTML = `
                    <option value="">Prix max</option>
                    <option value="5000000">5 millions FCFA</option>
                    <option value="10000000">10 millions FCFA</option>
                    <option value="25000000">25 millions FCFA</option>
                    <option value="50000000">50 millions FCFA</option>
                    <option value="100000000">100 millions FCFA</option>
                    <option value="custom">Personnalisé</option>
                `;
            } else if (tabType === 'louer') {
                priceSelect.innerHTML = `
                    <option value="">Prix max</option>
                    <option value="200000">200 000 FCFA/mois</option>
                    <option value="350000">350 000 FCFA/mois</option>
                    <option value="500000">500 000 FCFA/mois</option>
                    <option value="750000">750 000 FCFA/mois</option>
                    <option value="1000000">1 million FCFA/mois</option>
                    <option value="custom">Personnalisé</option>
                `;
            } else if (tabType === 'estimer') {
                priceSelect.innerHTML = `
                    <option value="">Type d'estimation</option>
                    <option value="vente">Estimation de vente</option>
                    <option value="location">Estimation de location</option>
                `;
            }
        }
    }

    // Bouton "Plus de filtres"
    const advancedFilterBtn = document.querySelector('.filter-advanced-btn');
    if (advancedFilterBtn) {
        advancedFilterBtn.addEventListener('click', function() {
            // Simulation d'ouverture de modal
            alert('Les filtres avancés seront disponibles prochainement !');
        });
    }

    // Bouton de recherche
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input').value;
            const activeTab = document.querySelector('.search-tab.active').getAttribute('data-tab');
            
            if (searchInput.trim() === '') {
                showMessage('Veuillez entrer une adresse, un quartier ou une ville', 'error');
                return;
            }
            
            // Simulation de redirection vers la page de résultats
            if (activeTab === 'estimer') {
                showMessage('Service d\'estimation en cours de développement', 'info');
            } else {
                // Redirection vers la page de résultats avec les paramètres de recherche
                // window.location.href = `resultats.html?type=${activeTab}&lieu=${encodeURIComponent(searchInput)}`;
                showMessage(`Recherche de propriétés à ${activeTab} à "${searchInput}"`, 'success');
            }
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

    // Slider de témoignages
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialDots.length > 0 && testimonialSlider && testimonialCards.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Retirer la classe active de tous les points
                testimonialDots.forEach(d => d.classList.remove('active'));
                // Ajouter la classe active au point cliqué
                this.classList.add('active');
                
                // Faire défiler le slider jusqu'au témoignage correspondant
                if (index < testimonialCards.length) {
                    // Simuler un carousel simple
                    testimonialCards.forEach(card => {
                        card.style.display = 'none';
                    });
                    testimonialCards[index].style.display = 'block';
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
    const animatedElements = document.querySelectorAll('.property-card, .neighborhood-card, .step, .testimonial-card');
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