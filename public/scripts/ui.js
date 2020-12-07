let readyFunction = function() {
	const addItemInput = document.querySelector('.add-item__input');
	const addItemComponent = document.querySelector('.add-item');
	const cancelButton = document.querySelector('.add-item__cancel');

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
}

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}
