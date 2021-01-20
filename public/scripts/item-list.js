readyFunctions.push(() => {
    const items = document.querySelectorAll('.item-list>li');
    const checkBoxes = document.querySelectorAll('.item-list__check');

    for (let checkbox of checkBoxes) {
        checkbox.addEventListener('click', (e) => {
            let itemName = checkbox.parentNode.children[0].innerText;
            let currCategory = document.querySelector('.item-list--visible').id;
            APIRequest ('PUT', 'setstatus', currCategory, itemName, `${checkbox.checked}`)
        })
    }
});

function dragItem (item, touchEvent) {
    console.log(touchEvent);
}

function touchstartHandler (item, touchEvent) {
    console.log(touchEvent);
    touchposition.changedtouches[0]
}
