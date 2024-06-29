/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function() {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});
		$(window).scroll(function() {
			if ($(this).scrollTop() > 50) {
				$('#nav').addClass('scrolled');
			} else {
				$('#nav').removeClass('scrolled');
			}
		});
	// Smooth scrolling for internal links
	$('a[href^="#"]').on('click', function(event) {
		var target = $(this.getAttribute('href'));
		if( target.length ) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 1000);
		}
	});
	// How It Works Cards
	document.addEventListener('DOMContentLoaded', () => {
		gsap.registerPlugin(ScrollTrigger);
	
		const section = document.querySelector('#how-it-works');
		const cards = section.querySelectorAll('.card');
	
		// Set initial state for all cards
		gsap.set(cards, { 
			y: '100%', 
			opacity: 0
		});
	
		// Set first card to be visible
		gsap.set(cards[0], { 
			y: '0%', 
			opacity: 1
		});
	
		// Create a timeline for the entire animation
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: 'top top',
				end: `+=${cards.length * 120}%`,
				scrub: 1,
				pin: true,
				anticipatePin: 1,
			}
		});
	
		// Add animations for each card to the timeline
		cards.forEach((card, index) => {
			// if (index === 0) return; // Skip the first card
	
			tl.to(card, { 
				y: `${index * 15}%`, // Stack cards down the screen
				opacity: 1,
				duration: .5
			});
	
			// Animate the current card's header
			tl.to(card.querySelector('.card-header'), {
				y: '-125%', // Move header up by 100% of its height
				duration: 0.5
			}, '<'); // Start at the same time as the card animation
	
			// Move the previous cards up to reveal the top of each
			if (index > 0) {
				for (let i = 0; i < index; i++) {
					tl.to(cards[i], {
						y: `-=${15}%`,
						duration: 0.5
					}, '<');
				}
			}
		});
	
		// Add a final animation to allow scrolling past the section
		tl.to({}, { duration: 0.5 });
	});
	
// Typewriter effect setup
const typewriter = document.getElementById('typewriter');
const additionalText = ["Real-time Feedback", "Exclusive Case Studies", "Peer Support", "Expert Insights"];
let i = 0;
let arrayIndex = 0;
let isDeleting = false; // Flag to track deleting state

function typeWriter() {
	if (arrayIndex < additionalText.length) {
	  let displayText = additionalText[arrayIndex].substring(0, i);
	  typewriter.innerHTML = displayText;
	  let delay = 100; // Typing speed
  
	  if (isDeleting) {
		i--; // Decrease i for deletion
		delay /= 2; // Speed up deletion
	  } else {
		i++; // Increase i for typing
	  }
  
	  // Check if typing is complete and not in deleting mode
	  if (!isDeleting && i > additionalText[arrayIndex].length) {
		delay = 1000; // Pause at end
		isDeleting = true; // Start deleting
	  } else if (isDeleting && i === -1) {
		// If the string is completely deleted
		isDeleting = false; // Reset deleting flag
		arrayIndex++; // Move to the next string
		delay = 500; // Pause before starting the next string
	  }
  
	  if (arrayIndex >= additionalText.length) {
		// If all strings have been processed, reset to start over or stop
		arrayIndex = 0; // Reset to start over
		isDeleting = false; // Ensure we're not deleting
		// delay = 5000; // Longer pause at the end
	  }
  
	  setTimeout(typeWriter, delay);
	}
  }

// Start the typewriter effect
window.onload = function() {
  typeWriter();
};
// Feature fade-in animations
document.addEventListener('DOMContentLoaded', () => {
	const featureTexts = document.querySelectorAll('.feature-text');
	const featureImages = document.querySelectorAll('.feature-image');
	const featuresContainer = document.querySelector('.features-container');
  
	const observerOptions = {
	  root: null,
	  rootMargin: '0px',
	  threshold: 0.5
	};
  
	const observer = new IntersectionObserver((entries) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  const featureIndex = entry.target.dataset.feature;
		  featureTexts.forEach(text => {
			text.style.opacity = text.dataset.feature === featureIndex ? 1 : 0;
		  });
		  featureImages.forEach(image => {
			image.style.opacity = image.dataset.feature === featureIndex ? 1 : 0;
		  });
		}
	  });
	}, observerOptions);
  
	featureImages.forEach(image => {
	  observer.observe(image);
	});
  });
	// Form validation
	$('#signup-form').on('submit', function(e) {
		e.preventDefault();
		
		var name = $('#name').val();
		var email = $('#email').val();
		var category = $('#category').val();

		if (name && email && category) {
			// Form is valid, you can submit it here
			console.log('Form submitted:', { name, email, category });
			alert('Thank you for signing up!');
			this.reset();
		} else {
			alert('Please fill out all required fields.');
		}
	});

	// Intersection Observer for fade-in animations
	if ('IntersectionObserver' in window) {
		const faders = document.querySelectorAll('.fade-in');
		const appearOptions = {
			threshold: 0.5,
			rootMargin: "0px 0px -100px 0px"
		};

		const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
			entries.forEach(entry => {
				if (!entry.isIntersecting) {
					return;
				} else {
					entry.target.classList.add('appear');
					appearOnScroll.unobserve(entry.target);
				}
			});
		}, appearOptions);

		faders.forEach(fader => {
			appearOnScroll.observe(fader);
		});
	}

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);