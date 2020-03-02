/***********************************************************************************
 ************************************TABS*******************************************
 ***********************************************************************************/
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

/***********************************************************************************
************************************TIMER*******************************************
***********************************************************************************/

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
  
});