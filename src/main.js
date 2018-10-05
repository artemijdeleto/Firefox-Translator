addEventListener('keyup', e => {
	if (e.keyCode != 84) return;

	browser.runtime.sendMessage(getSelection().toString());
});