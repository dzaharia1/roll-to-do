readyFunctions.push(() => {
    const checkBoxes = document.querySelectorAll('.item-list__check');
    const editPanels = document.querySelectorAll('.item-list__edit-panel');
    const itemSelectors = document.querySelectorAll('.item-list__selector');
    const itemDeleteButtons = document.querySelectorAll('.item-list__delete-button');
    const itemEditButtons = document.querySelector('.item-list__edit-button');

    for (let checkbox of checkBoxes) {
        checkbox.addEventListener('click', setItemSeen)
    }

    for (let panel of editPanels) {
        panel.addEventListener('click', (e) => {
            if (e.path[0] == panel) {
                const panelParent = panel.parentNode;
                toggleEditPanel(panelParent);
            }
        });
    }

    for (let itemSelector of itemSelectors) {
        itemSelector.addEventListener('click', (e) => {
            if (itemSelector.checked) {
                showEditBar();
                incrementEditBar();
                openAllEditPanels();
            } else {
                decrementEditBar();
                if (getEditBarCount() === 0) {
                    hideEditBar();
                    closeAllEditPanels();
                    openEditPanel(itemSelector.parentNode.parentNode);
                }
            }
        })
    }

    for (let button of itemDeleteButtons) {
        button.addEventListener('click', deleteItem);
    }
});

function toggleEditPanel (listItem) {
    if (listItem.classList.contains('item-list__item--edit-mode')) {
        listItem.classList.remove('item-list__item--edit-mode');
    } else {
        listItem.classList.add('item-list__item--edit-mode');
    }
}

function openEditPanel (listItem) {
    listItem.classList.add('item-list__item--edit-mode');
}

function closeEditPanel (listItem) {
    listItem.classList.remove('item-list__item--edit-mode');
}

function closeAllEditPanels () {
    for (let item of document.querySelectorAll('.item-list__item')) {
        const checkbox = item.querySelector('.item-list__selector');
        closeEditPanel(item);
        checkbox.checked = false;
    }
    while (getEditBarCount() > 0) {
        decrementEditBar();
    }
}

function openAllEditPanels () {
    for (let item of document.querySelectorAll('.item-list__item')) {
        openEditPanel(item);
    }
}

function deleteItem (button) {
    const currCategory = document.querySelector('.item-list--visible').id;
    const itemSlug = button.parentNode.parentNode.id;
    const parentItem = button.parentNode.parentNode;

    console.log(itemSlug);
    closeEditPanel(parentItem);
    parentItem.classList.add('item-list__item--deleted');
    setTimeout(() => {
        parentItem.parentNode.removeChild(parentItem);
    }, 500);

    APIRequest ('DELETE', 'delete', currCategory, itemSlug);
}

function setItemSeen (e) {
    const checkbox = e.srcElement;
    const itemName = checkbox.id;
    const currCategory = document.querySelector('.item-list--visible').id;
    APIRequest ('PUT', 'setstatus', currCategory, itemName, `${checkbox.checked}`);
}
