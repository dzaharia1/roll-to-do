readyFunctions.push(() => {
    const checkBoxes = document.querySelectorAll('.item-list__check');

    for (let checkbox of checkBoxes) {
        checkbox.addEventListener('click', checkboxClick)
    }
});

function checkboxClick (e) {
    const checkbox = e.srcElement;
    const itemName = checkbox.id;
    const currCategory = document.querySelector('.item-list--visible').id;
    APIRequest ('PUT', 'setstatus', currCategory, itemName, `${checkbox.checked}`);

}

function dragItem (item, touchEvent) {
    console.log(touchEvent);
}

function touchstartHandler (item, touchEvent) {
    console.log(touchEvent);
    touchposition.changedtouches[0]
}
