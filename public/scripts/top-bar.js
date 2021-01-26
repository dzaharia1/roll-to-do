readyFunctions.push(() => {
	const addItemInput = document.querySelector('.add-item__input');
	const addItemComponent = document.querySelector('.add-item');
	const cancelButton = document.querySelector('.add-item__cancel');
	const addButton = document.querySelector('.add-item__add');
	const selectAllButton = document.querySelector('.edit-items__select-all');
	const deleteButton = document.querySelector('.edit-items__delete');
	const checkSeenButton = document.querySelector('.edit-items__check-seen');

	addItemInput.addEventListener('focus', () => {
		addItemComponent.classList.add('add-item--active');
	});

	addItemInput.addEventListener('blur', () => {
		if (addItemInput.value == '') {
			clearAddComponent();
		}
	});

	addItemInput.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			submitItem();
		}
	});

	cancelButton.addEventListener('click', () => {
		clearAddComponent();
	});

	addButton.addEventListener('click', () => {
		submitItem();
	});

	selectAllButton.addEventListener('click', (e) => {
		const checkboxes = document.querySelector('.item-list--visible').querySelectorAll('.item-list__selector');
		setEditBarCount(checkboxes.length);

		for (let checkbox of checkboxes) {
			checkbox.checked = selectAllButton.checked;
		}
		if (!selectAllButton.checked) {
			resetEditBar();
			hideEditBar();
			closeAllEditPanels();
		}
	});

	deleteButton.addEventListener('click', deleteSelected);

	checkSeenButton.addEventListener('click', checkCheckedSeen);
});

function submitItem () {
	const addItemInput = document.querySelector('.add-item__input');
	const itemList = document.querySelector('.item-list--visible');
	const currCategory = itemList.id;
	const slug = addItemInput.value.replace(/\s+/g, '').toLowerCase();

	APIRequest('POST', 'additem', currCategory, addItemInput.value);

	appendListItem(addItemInput.value, slug);
	addItemInput.value = '';
	addItemInput.focus();
	itemList.scrollTop = 0;

}

function appendListItem (itemText, itemSlug) {
	const itemList = document.querySelector('.item-list--visible');
	let newNode = document.createElement('li');
	let itemLabel = document.createElement('label');
	let itemCheckBox = document.createElement('input');
	let itemEditPanel = document.createElement('div');
	let itemEditPanelDelete = document.createElement('button');
	let itemEditPanelEdit = document.createElement('button');
	let itemEditPanelSelect = document.createElement('input');

	itemEditPanel.classList.add('item-list__edit-panel');
	itemEditPanelDelete.classList.add('item-list__delete-button');
	itemEditPanelDelete.addEventListener('click', deleteItem);
	itemEditPanelEdit.classList.add('item-list__edit-button');
	itemEditPanelSelect.classList.add('item-list__selector');
	itemEditPanelSelect.addEventListener('click', selectItem);
	itemEditPanelSelect.setAttribute('type', 'checkbox');
	itemEditPanel.appendChild(itemEditPanelSelect);
	itemEditPanel.appendChild(itemEditPanelEdit);
	itemEditPanel.appendChild(itemEditPanelDelete);

	itemLabel.innerText = itemText;
	itemLabel.classList.add('item-list__label');

	itemCheckBox.setAttribute('type', 'checkbox');
	itemCheckBox.classList.add('item-list__check');
	itemCheckBox.id = itemText.replace(/\s+/g, '').toLowerCase();
	itemCheckBox.addEventListener('click', setItemSeen);

	newNode.classList.add('item-list__item');
	newNode.id = itemSlug;
	newNode.appendChild(itemEditPanel);
	newNode.appendChild(itemLabel);
	newNode.appendChild(itemCheckBox);

	itemList.prepend(newNode);
}

function clearAddComponent() {
	const addItemInput = document.querySelector('.add-item__input');
	const addItemComponent = document.querySelector('.add-item');

	addItemInput.value = '';
	addItemInput.blur();
	addItemComponent.classList.remove('add-item--active');
}

function showEditBar () {
	console.log('showing edit bar');
	const editBar = document.querySelector('.edit-items');
	const addBar = document.querySelector('.add-item');
	editBar.classList.add('edit-items--visible');
	addBar.classList.remove('add-item--visible');
}

function hideEditBar () {
	const editBar = document.querySelector('.edit-items');
	const addBar = document.querySelector('.add-item');
	addBar.classList.add('add-item--visible');
	editBar.classList.remove('edit-items--visible');
}

function incrementEditBar () {
	const editBarCount = document.querySelector('.edit-items__selected-count');
	editBarCount.innerText = `${parseInt(editBarCount.innerText) + 1} items selected`;
}

function decrementEditBar () {
	const editBarCount = document.querySelector('.edit-items__selected-count');
	editBarCount.innerText = `${parseInt(editBarCount.innerText) - 1} items selected`;
}

function setEditBarCount (count) {
	const editBarCount = document.querySelector('.edit-items__selected-count');
	editBarCount.innerText = `${count} items selected`;
}

function resetEditBar () {
	const editBarCount = document.querySelector('.edit-items__selected-count');
	const selectAllButton = document.querySelector('.edit-items__select-all');
	editBarCount.innerText = `0 items selected`;
	selectAllButton.checked = false;
}

function getEditBarCount () {
	return parseInt(document.querySelector('.edit-items__selected-count').innerText);
}

function deleteSelected () {
	const currList = document.querySelector('.item-list--visible')

	for (let check of currList.querySelectorAll('.item-list__selector')) {
		if (check.checked) {
			deleteItem(check);
		}
	}

	closeAllEditPanels();
	hideEditBar();
}

function checkCheckedSeen () {
	const list = document.querySelector('.item-list--visible');
	const checks = list.querySelectorAll('.item-list__selector');
	const currCategory = list.id;
	let listString = '';

	for (let check of checks) {
		if (check.checked) {
			check.parentNode.parentNode.querySelector('.item-list__check').checked = true;
			APIRequest('PUT', 'setstatus', currCategory, check.parentNode.parentNode.id, 'true');
		}
	}

	closeAllEditPanels();
	hideEditBar();
}
