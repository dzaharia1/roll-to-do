readyFunctions.push(() => {
	const addItemInput = document.querySelector('.add-item__input');
	const addItemComponent = document.querySelector('.add-item');
	const cancelButton = document.querySelector('.add-item__cancel');
	const addButton = document.querySelector('.add-item__add');

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
});

function submitItem () {
	const addItemInput = document.querySelector('.add-item__input');
	const itemList = document.querySelector('.item-list--visible');
	const currCategory = itemList.id;

	APIRequest('POST', 'additem', currCategory, addItemInput.value);

	appendListItem(addItemInput.value);
	addItemInput.value = '';
	addItemInput.focus();
	itemList.scrollTop = 0;

}

function appendListItem (itemText) {
	const itemList = document.querySelector('.item-list--visible');
	let newNode = document.createElement('li');
	let itemMabel = document.createElement('label');
	let itemCheckBox = document.createElement('input');

	itemMabel.innerText = itemText;
	itemMabel.classList.add('item-list__label');

	itemCheckBox.setAttribute('type', 'checkbox');
	itemCheckBox.classList.add('item-list__check');
	itemCheckBox.id = itemText.replace(/\s+/g, '').toLowerCase();
	itemCheckBox.addEventListener('click', checkboxClick);

	newNode.appendChild(itemMabel);
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
