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

	addItem(addItemInput.value);
	addItemInput.value = '';
	addItemInput.focus();
	itemList.scrollTop = 0;

}

function addItem (itemText) {
	const itemList = document.querySelector('.item-list--visible');
	let newNode = document.createElement('li');
	let nodeLabel = document.createElement('label');
	let nodeCheckBox = document.createElement('input');

	nodeLabel.innerText = itemText;
	nodeLabel.classList.add('item-list__label');

	nodeCheckBox.setAttribute('type', 'checkbox');
	nodeCheckBox.classList.add('item-list__check');

	newNode.appendChild(nodeLabel);
	newNode.appendChild(nodeCheckBox);

	itemList.prepend(newNode);
}

function clearAddComponent() {
	const addItemInput = document.querySelector('.add-item__input');
	const addItemComponent = document.querySelector('.add-item');

	addItemInput.value = '';
	addItemInput.blur();
	addItemComponent.classList.remove('add-item--active');
}
