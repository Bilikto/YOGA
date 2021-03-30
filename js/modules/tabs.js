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

  const showContent = (b) => {
    if (infoTabContent[b].classList.contains('hide')) {
      infoTabContent[b].classList.remove('hide');
      infoTabContent[b].classList.add('show');
    }
  };

  header.addEventListener('click', (event) => {
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

export default tabs;