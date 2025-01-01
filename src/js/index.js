import { cards } from "./cards.js";
const vw = innerWidth;

const menuMob = () => {
    const btnMenu = document.querySelector('div.btnMenu');
    const navBar = document.querySelector('nav.navBar');
    const menu = document.querySelector('ul.links');
    const links = document.querySelectorAll('ul li');
    const img = btnMenu.querySelector('img');
    const div  = `<div class="fundoEscuro"></div>`;
    let isOpen = false;

    const closeMenu = () => {
        menu.style.display = 'none';
        img.src = 'src/assets/images/icon-hamburger.svg';
        navBar.childNodes[7].remove();
        
    }

    const showMenu = () => {
        menu.style.display = 'flex';
        img.src = 'src/assets/images/icon-close-menu.svg';
        navBar.insertAdjacentHTML('beforeend', div);
    };

    btnMenu.addEventListener('click', () => {
        if(!isOpen) {
            isOpen = true;
            showMenu();
        } else {
            isOpen = false;
            closeMenu();
        }
    });

    links.forEach((btn => {
        btn.addEventListener('click', closeMenu);
    }));

};

vw > 1024 ? '' : menuMob();


(() => {
    const btnBack = document.querySelector('button.btn');
    const main = document.querySelector('main');
    const btnSelect = document.querySelectorAll('.btnProject');
    const background = `<div class="fundoEscuro"></div>`;
    const priceTotal = document.querySelector('.priceToatl');
    const backersTotal = document.querySelector('.backersTotal');
    const progressBar = document.querySelector('.barProgresso');
    const left = document.querySelectorAll('.left');


    const showSelectProject = (btnSelect) => {
        main.insertAdjacentHTML('beforeend', background);
        main.insertAdjacentHTML('beforeend', cards.cardBack);

        const btnClose = document.querySelector('main div.btnClose');
        const cardOptons = document.querySelectorAll('.cardOpton');
        const btnContinue = document.querySelectorAll('.btnContinue');
        const inputPrice = document.querySelectorAll('input[type="number"]');
        const backLeft = document.querySelectorAll('.backLeft');

        const leftS = +left[0].innerText.replace('left', '');
        const leftBs = +left[1].innerText.replace('left', '');
        
        backLeft[0].innerHTML = `${leftS} <span>left</span>`;
        backLeft[1].innerHTML = `${leftS} <span>left</span>`;
        backLeft[2].innerHTML = `${leftBs} <span>left</span>`;
        backLeft[3].innerHTML = `${leftBs} <span>left</span>`;

        btnContinue.forEach(btn => {
            btn.addEventListener('click', () => {
                showCheck(inputPrice, btn)
            })
        });

        btnClose.addEventListener('click', closeSelectProject);

        cardOptons.forEach(card => {

            card.addEventListener('click', () => {
                if(card.classList.contains('carOff')) {
                    return
                } 
                
                card.classList.add('active');
                
            });
            
            
        });

        if (btnSelect.id === 'btn1') {
            cardOptons[1].classList.add('active');
        }else if(btnSelect.id === 'bntS2') {
            cardOptons[2].classList.add('active');
        }
    }

    const closeSelectProject = () => {
        const background = document.querySelector('main div.fundoEscuro');
        const SelectProject = document.querySelector('main section.containerBackProject');

        background.remove();
        SelectProject.remove();
    }

    const showCheck = (inputPrice, btn) => {
        const totalPrice = +priceTotal.innerText.replace('$', ' ').replace(',', '.');
        const totalBackers = +backersTotal.innerText.replace(',', '');
        
        let price = 0;

        if (btn.id === 'stand') {
            price = +inputPrice[0].value
            const leftS = +left[0].innerText.replace('left', '');
            left[0].innerHTML = `${leftS - 1} <span>left</span>`;

        } else if (btn.id === 'blackEdition') {
            price = +inputPrice[1].value;
            const leftBs = +left[1].innerText.replace('left', '');
            left[1].innerHTML = `${leftBs - 1} <span>left</span>`;

        }
        
        priceTotal.innerHTML = totalPrice + price
        backersTotal.innerHTML = totalBackers + 1

        if ((totalPrice + price) > 100.000) {
            progressBar.style.width = '100%'
        } else {
            let total = parseInt(((totalPrice + price) / 100.000) * 100)
            progressBar.style.width = `${total}%`
            
        }
        

        
        closeSelectProject();
        main.insertAdjacentHTML('beforeend', background);
        main.insertAdjacentHTML('beforeend', cards.cardCheck);

        const btnCloseCheck = document.querySelector('.btnCheck')

        btnCloseCheck.addEventListener('click', () => {
            const background = document.querySelector('main div.fundoEscuro');
            const SelectCheck = document.querySelector('main section.containerCheck');

            background.remove();
            SelectCheck.remove();
        });

    }

    btnBack.addEventListener('click', showSelectProject);

    btnSelect.forEach(btn => {
        btn.addEventListener('click', () => {
            showSelectProject(btn)
        });
    });

})();

