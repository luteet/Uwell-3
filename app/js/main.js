
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageBody = document.querySelectorAll('.image-body, figure');
imageBody.forEach(imageBody => {
	const img = imageBody.querySelector('img'), style = getComputedStyle(imageBody);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=
	
	let btnToScroll = $('.scroll-link');
	if(btnToScroll && (window.location.pathname === '/' || window.location.pathname[1] === '#') ) {
		event.preventDefault();
		let section;
	
		section = document.querySelector(btnToScroll.getAttribute('href').slice(1))
	
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	
	// =-=-=-=-=-=-=-=-=-=-=-=- <FAQ> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const faqQuestion = $(".faq__question")
	if(faqQuestion) {
	
		const faqItem = faqQuestion.parentElement,
		activeFaqItem = document.querySelector('.faq__item._active');

		if(activeFaqItem) {
			if(activeFaqItem == faqItem) {
				activeFaqItem.classList.remove('_active')
			} else {
				activeFaqItem.classList.remove('_active')
				faqItem.classList.add('_active')
			}
		} else {
			faqItem.classList.add('_active')
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </FAQ> -=-=-=-=-=-=-=-=-=-=-=-=	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");

	windowSize = window.innerWidth;

}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.partners__slider')) {
	const partnersSlider = new Splide('.partners__slider', {
		type: "loop",
		autoWidth: true,
		gap: 20,
		pagination: false,
		breakpoints: {
			992: {
				gap: 10,
			}
		}
	})

	partnersSlider.mount();
}

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

let coordsY;
function scroll() {
	coordsY = Math.abs(body.getBoundingClientRect().y);
	if(coordsY > 0 && !header.classList.contains('_scroll')) {
		header.classList.add('_scroll');
	} else if(coordsY <= 0 && header.classList.contains('_scroll')) {
		header.classList.remove('_scroll');
	}
}

scroll()

document.addEventListener('scroll', scroll);

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=



const doctorCardVideoWrapper = document.querySelectorAll('.doctor-card__video--wrapper');
doctorCardVideoWrapper.forEach(doctorCardVideoWrapper => {
	const video = doctorCardVideoWrapper.querySelector('video');
	if(video) {
		if(video.getAttribute('width') && video.getAttribute('height')) {
			doctorCardVideoWrapper.style.setProperty('--aspect-ratio', Number(video.getAttribute('height')) / Number(video.getAttribute('width')) * 100 + '%');
		}
	}
})

function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				body.classList.remove('_popup-active');
				html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
				body.classList.add('_popup-active');

				if (saveHref) history.pushState('', "", id);

				setTimeout(() => {
					if (!initStart) {
						popup.classList.add('_active');
						function openFunc() {
							popupCheck = true;
							popup.removeEventListener('transitionend', openFunc);
						}
						popup.addEventListener('transitionend', openFunc)
					} else {
						popup.classList.add('_transition-none');
						popup.classList.add('_active');
						popupCheck = true;
					}

				}, 0)

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				popup.classList.remove('_active');
				function closeFunc() {
					const activePopups = document.querySelectorAll('.popup._active');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.removeEventListener('transitionend', closeFunc)
				}

				popup.addEventListener('transitionend', closeFunc)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose);
					const popup = thisTarget.closest('.popup');
					if(popup.dataset.timer) localStorage.setItem("uwell-2-application-popup", true);
					
				}

			});

			const popups = document.querySelectorAll('.popup');
			popups.forEach(popup => {
				let timer = popup.dataset.timer;
				if(timer && localStorage.getItem("uwell-2-application-popup") != "true") {
					if(Number(timer)) timer = Number(timer) * 1000;
					
					setTimeout(() => {
						open("#" + popup.getAttribute('id'));
					}, timer)
				}
			})

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()

