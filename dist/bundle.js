/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
  //Calculator
  const persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        total = document.getElementById('total');
  let personSum = 0,
      daySum = 0,
      totalSum = 0;

  const changeTotal = elem => {
    if (elem.value == '' || elem.value == 0) {
      total.innerHTML = 0;
    } else {
      total.innerHTML = totalSum;
    }
  };

  persons.addEventListener('change', function () {
    personSum = +this.value;
    totalSum = personSum * daySum * 100;
    changeTotal(persons);
  });
  restDays.addEventListener('change', function () {
    daySum = +this.value;
    totalSum = personSum * daySum * 100;
    changeTotal(restDays);
  });
  place.addEventListener('change', () => {
    if (persons.value == '' || restDays.value == '') {
      total.innerHTML = 0;
    } else {
      total.innerHTML = totalSum * this.options[this.selectedIndex].value;
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");


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

  const sendRequest = form => {
    form.addEventListener('submit', e => {
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

      (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.default)(json).then(() => {
        statusMessage.innerHTML = message.success;
      }).catch(() => {
        statusMessage.innerHTML = message.failure;
      }).finally(clearInput);
    });
  };

  sendRequest(form);
  sendRequest(contactForm);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(btnInfo, modalSelector, btnClose, btnDescr, animationCLass) {
  //Modal window
  const moreInfoBtn = document.querySelector(btnInfo),
        modal = document.querySelector(modalSelector),
        closeBtn = document.querySelector(btnClose),
        descrBtns = document.querySelectorAll(btnDescr);

  const openModal = () => {
    modal.style.display = 'block';
    moreInfoBtn.classList.add(animationCLass);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.style.display = 'none';
    moreInfoBtn.classList.remove(animationCLass);
    document.body.style.overflow = '';
  };

  moreInfoBtn.addEventListener('click', () => {
    openModal();
  });
  closeBtn.addEventListener('click', () => {
    closeModal();
  });
  modal.addEventListener('click', e => {
    if (e.target == modal || e.target.hasAttribute('data-close')) {
      closeModal();
    }
  });
  document.documentElement.addEventListener('keydown', e => {
    if (e.code == 'Escape' && modal.style.display == 'block') {
      closeModal();
    }
  });
  descrBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slides(selectors, prevArrow, nextArrow, dotsParent, dotsSelector, classActive) {
  //Slides
  const slides = document.querySelectorAll(selectors),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slidesWrap = document.querySelector(dotsParent),
        dots = document.querySelectorAll(dotsSelector);
  let sliderIndex = 1;

  const showSlider = n => {
    if (n > slides.length) {
      sliderIndex = 1;
    }

    if (n < 1) {
      sliderIndex = slides.length;
    }

    slides.forEach(slide => {
      slide.style.display = 'none';
    });
    dots.forEach(dot => {
      dot.classList.remove(classActive);
    });
    slides[sliderIndex - 1].style.display = 'block';
    dots[sliderIndex - 1].classList.add(classActive);
  };

  const plusSlides = n => {
    showSlider(sliderIndex += n);
  };

  const currentSlides = n => {
    showSlider(sliderIndex = n);
  };

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });
  next.addEventListener('click', () => {
    plusSlides(1);
  });
  slidesWrap.addEventListener('click', e => {
    const target = e.target;

    for (let i = 0; i < dots.length + 1; i++) {
      if (target.classList.contains('dot') && target == dots[i - 1]) {
        currentSlides(i);
      }
    }
  });
  showSlider(sliderIndex);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabParent, tabSelector, tabContent) {
  //Tabs
  const header = document.querySelector(tabParent),
        tab = document.querySelectorAll(tabSelector),
        infoTabContent = document.querySelectorAll(tabContent);

  const hideContent = (a = 1) => {
    for (let i = a; i < infoTabContent.length; i++) {
      infoTabContent[i].classList.remove('show');
      infoTabContent[i].classList.add('hide');
    }
  };

  hideContent();

  const showContent = b => {
    if (infoTabContent[b].classList.contains('hide')) {
      infoTabContent[b].classList.remove('hide');
      infoTabContent[b].classList.add('show');
    }
  };

  header.addEventListener('click', event => {
    let target = event.target;

    if (target && target.classList.contains(tabSelector.slice(1))) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideContent(0);
          showContent(i);
          break;
        }
      }
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(selector, deadLine) {
  // Timer
  const getTimeRemaining = endTime => {
    const total = Date.parse(endTime) - Date.parse(new Date()),
          seconds = Math.floor(total / 1000 % 60),
          minutes = Math.floor(total / 1000 / 60 % 60),
          hours = Math.floor(total / (1000 * 60 * 60));
    return {
      total,
      hours,
      minutes,
      seconds
    };
  };

  const addZero = num => {
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

  setClock(selector, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function postData(data) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    request.send(data);
    request.addEventListener('load', () => {
      if (request.status == 200) {
        console.log("Done");
        resolve();
      } else {
        console.log("Request failed..");
        throw new Error(`new Error ${request.status}: ${request.statusText}`);
      }
    });
    request.addEventListener('error', () => {
      reject();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./js/mainScript.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_form_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form.js */ "./js/modules/form.js");
/* harmony import */ var _modules_slides_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slides.js */ "./js/modules/slides.js");
/* harmony import */ var _modules_calculator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calculator.js */ "./js/modules/calculator.js");






window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__.default)('.info-header', '.info-header-tab', '.info-tabcontent');
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_1__.default)('timer', '02-27-2022');
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_2__.default)('.more', '.overlay', '.popup-close', '.description-btn', 'more-splash');
  (0,_modules_form_js__WEBPACK_IMPORTED_MODULE_3__.default)('.main-form', '#form', 'input');
  (0,_modules_slides_js__WEBPACK_IMPORTED_MODULE_4__.default)('.slider-item', '.prev', '.next', '.slider-dots', '.dot', 'dot-active');
  (0,_modules_calculator_js__WEBPACK_IMPORTED_MODULE_5__.default)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map