(async () => {
	const lang = (await browser.storage.local.get()).lang;
	document.getElementById('lang').value = lang ? lang : '';
})();

document.getElementById('form').addEventListener('submit', async e => {
	e.preventDefault();
	browser.storage.local.set({
		lang: document.getElementById('lang').value
	});
});