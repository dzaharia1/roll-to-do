let readyFunction = function() {
	const addItemInput = document.querySelector('.add-item__input');
	const addItemComponent = document.querySelector('.add-item');
	const cancelButton = document.querySelector('.add-item__cancel');
	const addButton = document.querySelector('.add-item__add');

	addItemInput.addEventListener('focus', () => {
		addItemComponent.classList.add('add-item--active');
	});

	addItemInput.addEventListener('blur', () => {
		addItemComponent.classList.remove('add-item--active');
	});

	cancelButton.addEventListener('click', () => {
		addItemInput.value = '';
		addItemInput.blur();
		addItemComponent.classList.remove('add-item--active');
	});

	addButton.addEventListener('click', () => {
		addItem('movies', addItemInput.value);
	});
}

function addItem(list, itemText) {
	const itemList = document.querySelector('.item-list');
	let newNode = document.createElement('li');
	let nodeLabel = document.createElement('label');
	let nodeCheckBox = document.createElement('input')

	nodeLabel.innerText = itemText;
	nodeLabel.classList.add('item-list__label');

	nodeCheckBox.setAttribute('type', 'checkbox');
	nodeCheckBox.classList.add('item-list__check');

	newNode.appendChild(nodeLabel);
	newNode.appendChild(nodeCheckBox);

	console.log(newNode);

	itemList.prepend(newNode);
}

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}
