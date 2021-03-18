window.addEventListener('DOMContentLoaded', () => {
	'use strict';
	//Tabs
	const header = document.querySelector('.info-header'),
		tab = document.querySelectorAll('.info-header-tab'),
		infoTabContent = document.querySelectorAll('.info-tabcontent');

	const hideContent = (a = 1) => {
		for (let i = a; i < infoTabContent.length; i++) {
			infoTabContent[i].classList.remove('show');
			infoTabContent[i].classList.add('hide');
		}
	};
	hideContent();

	const showContent = (b) => {
		if (infoTabContent[b].classList.contains('hide')) {
			infoTabContent[b].classList.remove('hide');
			infoTabContent[b].classList.add('show');
		}
	};

	header.addEventListener('click', (event) => {
		let target = event.target;

		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideContent(0);
					showContent(i);
					break;
				}
			}
		}
	});

	// TIMER
	let deadLine = "02-27-2022";

	function getTimeRemaining(endTime) {
		let t = Date.parse(endTime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(id, endTime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endTime);

			function addZero(num) {
				if (num <= 9) {
					return '0' + num;
				} else {
					return num;
				}
			}

			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}
	}
	setClock('timer', deadLine);

	//MODAL WINDOW 

	let more = document.querySelector('.more'),
		overLay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		dscrptBtn = document.querySelectorAll('.description-btn');

	more.addEventListener('click', () => {
		overLay.style.display = 'block';
		more.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', () => {
		overLay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	dscrptBtn.forEach(item => {
		item.addEventListener('click', () => {
			overLay.style.display = 'block';
			item.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});

	// FORM

	let message = {
		loading: 'Loading...',
		success: 'Thank you! We will contact you soon!',
		failure: 'Something is wrong...'
	};

	let form = document.querySelector('.main-form'),
		contactForm = document.querySelector('#form'),
		input = document.getElementsByTagName('input'),
		statusMessage = document.createElement('div');
	statusMessage.classList.add('status');

	function sendRequest(data) {
		data.addEventListener('submit', function (e) {
			e.preventDefault();
			data.appendChild(statusMessage);
			let formData = new FormData(data);

			function postData() {
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();

					request.open('POST', 'server.php');
					request.setRequestHeader('Content-type', 'application/json');
					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4) {
							if (request.readyState == 200 && request.readyState < 300) {
								resolve();
							} else {
								reject();
							}
						}
					};
					let obj = {};
					formData.forEach(function (value, key) {
						obj[key] = value;
					});
					let json = JSON.stringify(obj);
					request.send(json);
				});
			}

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			}

			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => statusMessage.innerHTML = message.success)
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput);
		});
	}
	sendRequest(form);
	sendRequest(contactForm);

	// SLIDES

	let sliderIndex = 1,
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		slidesWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlider(sliderIndex);

	function showSlider(n) {
		if (n > slides.length) {
			sliderIndex = 1;
		}

		if (n < 1) {
			sliderIndex = slides.length;
		}

		slides.forEach(item => item.style.display = 'none');
		dots.forEach(item => item.classList.remove('dot-active'));

		slides[sliderIndex - 1].style.display = 'block';
		dots[sliderIndex - 1].classList.add('dot-active');
	}

	function plusSlides(n) {
		showSlider(sliderIndex += n);
	}

	function currentSlides(n) {
		showSlider(sliderIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSlides(-1);
	});

	next.addEventListener('click', function () {
		plusSlides(1);
	});

	slidesWrap.addEventListener('click', function (event) {
		for (let i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlides(i);
			}
		}
	});

	// CALC

	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		total = document.getElementById('total'),
		personSum = 0,
		daySum = 0,
		totalSum = 0;

	total.innerHTML = 0;

	persons.addEventListener('change', function () {
		personSum = +this.value;
		totalSum = (personSum * daySum) * 4000;

		if (persons.value == '' || persons.value == 0) {
			total.innerHTML = 0;
		} else {
			total.innerHTML = totalSum;
		}
	});

	restDays.addEventListener('change', function () {
		daySum = +this.value;
		totalSum = (personSum * daySum) * 4000;

		if (restDays.value == '' || restDays.value == 0) {
			total.innerHTML = 0;
		} else {
			total.innerHTML = totalSum;
		}
	});

	place.addEventListener('change', function () {
		if (persons.value == '' || restDays.value == '') {
			total.innerHTML = 0;
		} else {
			let a = totalSum;
			total.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});







});