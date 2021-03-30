import tabs from './modules/tabs.js';
import timer from './modules/timer.js';
import modal from './modules/modal.js';
import form from './modules/form.js';
import slides from './modules/slides.js';
import calculator from './modules/calculator.js';


window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	tabs('.info-header', '.info-header-tab', '.info-tabcontent');
	timer();
	modal();
	form();
	slides();
	calculator();

});