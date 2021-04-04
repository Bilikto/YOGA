import postData from '../services/services.js';

function form(formSelector, contactFormSelector, inputSelector) {
  // Form
	const message = {
		loading: 'Loading...',
		success: 'Thank you! We will contact you soon!',
		failure: 'Something goes wrong...'
	};

	const form = document.querySelector(formSelector),
		contactForm = document.querySelector(contactFormSelector),
		input = document.getElementsByTagName(inputSelector);

	const statusMessage = document.createElement('div');
	statusMessage.classList.add('status');
	statusMessage.innerHTML = message.loading;

	const sendRequest = (form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			form.appendChild(statusMessage);

			const formData = new FormData(form);
			const obj = {};
			formData.forEach((value, key) => {
				obj[key] = value;
			});
			const json = JSON.stringify(obj);

			const clearInput = () => {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			};

			postData(json) 
				.then(() => {
					statusMessage.innerHTML = message.success;
				})
				.catch(() => {
					statusMessage.innerHTML = message.failure;
				})
				.finally(clearInput);
		});
	};

	sendRequest(form);
	sendRequest(contactForm);
}

export default form;