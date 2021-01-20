let currCategory = '';

readyFunctions.push(() => {
    const categoryMenu = document.querySelector('.menu');
    const categoryList = document.querySelector('.menu__category-menu');
    const categories = categoryList.querySelectorAll('a');

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
});

function switchList (categoryName) {
    const currList = document.querySelector('.item-list--visible');
    const targetList = document.querySelector(`.item-list#${categoryName}`);

    currList.classList.remove('item-list--visible');
    targetList.classList.add('item-list--visible');
}

function setCategoryLabel (categoryName) {
    setTimeout(() => {
        const targetCategoryLabel = document.querySelector(`[data-target="${categoryName}"]`).parentNode;
        targetCategoryLabel.scrollIntoView(true);
    }, 500);

    console.log(targetCategoryLabel);


    // categoryList.scrollTop = '50px';
}
