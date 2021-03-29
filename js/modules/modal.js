function modal() {
  //Modal window
	const moreInfoBtn = document.querySelector('.more'),
  modal = document.querySelector('.overlay'),
  closeBtn = document.querySelector('.popup-close'),
  descrBtns = document.querySelectorAll('.description-btn');

  const openModal = () => {
    modal.style.display = 'block';
    moreInfoBtn.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.style.display = 'none';
    moreInfoBtn.classList.remove('more-splash');
    document.body.style.overflow = '';
  };

  moreInfoBtn.addEventListener('click', () => {
    openModal();
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  modal.addEventListener('click', (e) => {
    if (e.target == modal || e.target.hasAttribute('data-close')) {
      closeModal();
    }
  });

  document.documentElement.addEventListener('keydown', (e) => {
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

export default modal;