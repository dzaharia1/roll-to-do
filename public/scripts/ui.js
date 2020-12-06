let readyFunction = function() {
	console.log(`differe string`);
}

if (document.readyState != 'loading') {
	readyFunction();
}
else {
	document.addEventListener('DOMContentLoaded', readyFunction)
}
