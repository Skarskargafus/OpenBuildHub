document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function revealFeatures() {
      featureCards.forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('revealed')) {
          setTimeout(() => {
            card.classList.add('revealed');
          }, index * 200); // 200ms delay between each card
        }
      });
    }
  
    // Initial check on page load
    revealFeatures();
  
    // Check on scroll
    window.addEventListener('scroll', revealFeatures);
  });