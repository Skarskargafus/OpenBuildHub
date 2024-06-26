function checkAnimation() {
    var elements = document.querySelectorAll('.animated');
    elements.forEach(function(element) {
      if (isElementInViewport(element)) {
        element.classList.add('in-view');
      }
    });
  }
  
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  window.addEventListener('scroll', checkAnimation);
  window.addEventListener('load', checkAnimation);