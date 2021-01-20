let currCategory = '';

readyFunctions.push(() => {
    const categoryMenu = document.querySelector('.menu');
    const categoryList = document.querySelector('.menu__category-menu');
    const categories = categoryList.querySelectorAll('a');
    const randomToast = document.querySelector('.random-toast');
    const randomButton = document.querySelector('.menu__randomize');

    currCategory = `${categories[0].innerText}`;

    categoryList.addEventListener('wheel', (e) => {
        e.preventDefault();
    });

    categoryList.addEventListener('click', (e) => {
        e.preventDefault();
        if (!categoryMenu.classList.contains('menu--open')){
            categoryMenu.classList.add('menu--open');
        } else {
            categoryMenu.classList.remove('menu--open');
        }
    });

    for (let category of categories) {
        category.addEventListener('click', (e) => {
            e.preventDefault();
            if (categoryMenu.classList.contains('menu--open')) {
                const targetCategory = category.getAttribute('data-target');
                switchList(targetCategory);
                setCategoryLabel(targetCategory)
            }
        });
    }

    randomButton.addEventListener('click', (e) => {
        const itemList = document.querySelector('.item-list--visible').querySelectorAll('.item-list__label');
        const randomIndex = Math.floor(Math.random() * itemList.length);
        const randomItem = itemList[randomIndex].innerText;
        randomToast.classList.remove('random-toast--visible');

        setTimeout(() => {
            randomToast.children[0].innerText = randomItem;
            randomToast.classList.add('random-toast--visible');
        }, 200);
    });
});

function switchList (categoryName) {
    const currList = document.querySelector('.item-list--visible');
    const targetList = document.querySelector(`.item-list#${categoryName}`);
    const randomButton = document.querySelector('.random-toast');

    currList.classList.remove('item-list--visible');
    targetList.classList.add('item-list--visible');
    randomButton.classList.remove('random-toast--visible');
}

function setCategoryLabel (categoryName) {
    const targetCategoryLabel = document.querySelector(`[data-target="${categoryName}"]`).parentNode;

    setTimeout(() => {
        targetCategoryLabel.scrollIntoView(true);
    }, 500);
}
