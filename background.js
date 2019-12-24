browser.contextMenus.create({
	id: 'translate',
	title: 'Translate (T̲)',
	contexts: ['selection']
});

browser.contextMenus.create({
	id: 'newtab',
	title: 'Open translator'
});

browser.contextMenus.onClicked.addListener(async info => {
	switch (info.menuItemId) {
		case 'translate':
			translate(info.selectionText);
			break;

		case 'newtab':
			let engine = (await browser.storage.local.get()).engine;
			let url = 'https://translate.google.com/';
			if (engine === 'yandex') {
				url = 'https://translate.yandex.ru/';
			}

			browser.tabs.create({
				url: url
			});
			break;
	}
});

browser.runtime.onMessage.addListener(translate);

async function translate(text) {
	if (text.length > 1) {
		let lang = (await browser.storage.local.get()).lang;
		lang = (lang !== '' && lang !== undefined) ? lang : 'en';
		const engine = (await browser.storage.local.get()).engine;
		let url = 'https://translate.google.com/#auto/' + lang  + '/' + encodeURIComponent(text);
		if (engine === 'yandex') {
			url = 'https://translate.yandex.ru/?lang=auto-' + lang + '&text=' + encodeURIComponent(text);
		}

		browser.tabs.create({
			url: url
		});
	}
}