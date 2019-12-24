(async () => {
	const lang = (await browser.storage.local.get()).lang;
	const engine = (await browser.storage.local.get()).engine;
	document.getElementById('lang').value = lang ? lang : '';
	document.getElementById('engine').value = engine ? engine : 'google';
})();

document.getElementById('form').addEventListener('submit', async e => {
	e.preventDefault();
	browser.storage.local.set({
		lang: document.getElementById('lang').value,
		engine: document.getElementById('engine').value
	});
});