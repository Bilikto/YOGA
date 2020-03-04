//TABS

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	let header = document.querySelector('.info-header'),
		tab = document.querySelectorAll('.info-header-tab'),
		infoTabContent = document.querySelectorAll('.info-tabcontent');

	function hideContent(a) {
		for (let i = a; i < infoTabContent.length; i++) {
			infoTabContent[i].classList.remove('show');
			infoTabContent[i].classList.add('hide');
		}
	}
	hideContent(1);

	function showContent(b) {
		if (infoTabContent[b].classList.contains('hide')) {
			infoTabContent[b].classList.remove('hide');
			infoTabContent[b].classList.add('show');
		}
	}

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

	// MODAL WINDOW 

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
			data.addEventListener('submit', function (event) {
			event.preventDefault();
			data.appendChild(statusMessage);
	
			let request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			/*request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
			let formData = new FormData(form);
			request.send(formData);*/
	
			request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // remade in json 
	
			let formData = new FormData(data);
			let obj = {};
			formData.forEach(function (value, key) {
				obj[key] = value;
			});
	
			let json = JSON.stringify(obj);
			request.send(json); //
	
			request.addEventListener('readystatechange', function () {
				if (request.readyState < 4) {
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState === 4 && request.status == 200) {
					statusMessage.innerHTML = message.success;
				} else {
					statusMessage.innerHTML = message.failure;
				}
			});
	
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			}
		});
	}

	sendRequest(form);
	sendRequest(contactForm);
	
});
