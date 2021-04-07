function calculator() {
  //Calculator
	const persons = document.querySelectorAll('.counter-block-input')[0],
  restDays = document.querySelectorAll('.counter-block-input')[1],
  place = document.getElementById('select'),
  total = document.getElementById('total');

  let personSum = 0,
    daySum = 0,
    totalSum = 0;

  const changeTotal = (elem) => {
    if (elem.value == '' || elem.value == 0) {
      total.innerHTML = 0;
    } else {
      total.innerHTML = totalSum;
    }
  };

  persons.addEventListener('change', function() {
    personSum = +this.value;
    totalSum = (personSum * daySum) * 100;
    changeTotal(persons);
  });

  restDays.addEventListener('change', function() {
    daySum = +this.value;
    totalSum = (personSum * daySum) * 100;
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

export default calculator;