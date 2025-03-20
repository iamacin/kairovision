/**
 * Configuration des images du site
 * Pour utiliser vos propres images :
 * 1. Placez vos images dans le dossier public/assets/images/
 * 2. Mettez à jour les chemins ci-dessous
 */

const images = {
  // Images principales
  logo: '/assets/images/kairo-logo.png',
  hero: '/assets/optimized/home-hero.webp',
  mockup: '/assets/images/platform-preview.jpg',

  // Logos des partenaires
  partners: {
    wave: '/assets/partners/wave-logo.png',
    bicis: '/assets/partners/bicis.webp',
  },

  // Images des propriétés
  properties: {
    // Vous pouvez utiliser des chemins locaux ou des URLs
    // Exemple local : property1: '/assets/images/properties/ma-propriete.jpg'
    property1: '/assets/images/properties/property1.jpg',
    property2: '/assets/images/properties/property2.jpg',
    property3: '/assets/images/properties/property3.jpg',
  },

  // Images des quartiers
  neighborhoods: {
    almadies: '/assets/images/neighborhoods/almadies.jpg',
    plateau: '/assets/images/neighborhoods/plateau.jpg',
    ngor: '/assets/images/neighborhoods/ngor.jpg',
    mermoz: '/assets/images/neighborhoods/mermoz.jpg',
  },

  // Photos des agents
  agents: {
    agent1: '/assets/images/agents/agent1.jpg',
    agent2: '/assets/optimized/agent2.webp',
    agent3: '/assets/images/agents/agent3.jpg',
  }
};

module.exports = { images }; 