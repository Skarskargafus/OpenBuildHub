/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
jQuery.noConflict();
$(document).ready(function() {

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
	//typewriter
	document.addEventListener('DOMContentLoaded', function() {
		var app = document.getElementById('typewriter');
	
		var typewriter = new Typewriter(app, {
			loop: true,
			delay: 75,
		});
	
		typewriter
			.typeString('Real-time Feedback')
			.pauseFor(1000)
			.deleteAll()
			.typeString('Exclusive Case Studies')
			.pauseFor(1000)
			.deleteAll()
			.typeString('Peer Support')
			.pauseFor(1000)
			.deleteAll()
			.typeString('Expert Insights')
			.pauseFor(1000)
			.start();
	});
	var TxtRotate = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	  };
	  
	  TxtRotate.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];
	  
		if (this.isDeleting) {
		  this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
		  this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
	  
		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
	  
		var that = this;
		var delta = 300 - Math.random() * 100;
	  
		if (this.isDeleting) { delta /= 2; }
	  
		if (!this.isDeleting && this.txt === fullTxt) {
		  delta = this.period;
		  this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
		  this.isDeleting = false;
		  this.loopNum++;
		  delta = 500;
		}
	  
		setTimeout(function() {
		  that.tick();
		}, delta);
	  };
	  
	  window.onload = function() {
		var elements = document.getElementsByClassName('txt-rotate');
		for (var i=0; i<elements.length; i++) {
		  var toRotate = elements[i].getAttribute('data-rotate');
		  var period = elements[i].getAttribute('data-period');
		  if (toRotate) {
			new TxtRotate(elements[i], JSON.parse(toRotate), period);
		  }
		}
		// INJECT CSS
	// 	var css = document.createElement("style");
	// 	css.type = "text/css";
	// 	css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #64FFDA }";
	// 	document.body.appendChild(css);
	//   };
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