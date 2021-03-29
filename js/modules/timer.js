function timer() {
  // Timer
	const deadLine = "02-27-2022";

	const getTimeRemaining = (endTime) => {
		const total = Date.parse(endTime) - Date.parse(new Date()),
			seconds = Math.floor((total / 1000) % 60),
			minutes = Math.floor((total / 1000 / 60) % 60),
			hours = Math.floor((total / (1000 * 60 * 60)));

		return {
			total,
			hours,
			minutes,
			seconds
		};
	};

	const addZero = (num) => {
		if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	};

	const setClock = (selector, endTime) => {
		const timer = document.getElementById(selector),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			const t = getTimeRemaining(endTime);
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
	};

	setClock('timer', deadLine);
}

export default timer;