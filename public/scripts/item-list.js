readyFunctions.push(() => {
    const items = document.querySelectorAll('.item-list>li');
    let touchposition = {
        x: 0,
        y: 0
    };

    // todo: start creating the ability to reorder items
    // for (thisItem of items) {
    //     thisItem.addEventListener('touchstart', (e) => {
    //         if (!e.target.classList.contains('item-list__check')) {
    //             touchstartHandler(thisItem, e);
    //         }
    //     });

    //     thisItem.addEventListener('touchmove', (e) => {
    //         if (!e.target.classList.contains('item-list__check')) {
    //             dragItem(thisItem, e);
    //         }
    //         // e.preventDefault();
    //     });
    // }
});

function dragItem (item, touchEvent) {
    console.log(touchEvent);
}

function touchstartHandler (item, touchEvent) {
    console.log(touchEvent);
    touchposition.changedtouches[0]
}
