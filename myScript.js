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
  
});