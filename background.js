browser.contextMenus.create({
	id: 'translate',
	title: 'Translate (T̲)',
	contexts: ['selection']
});

browser.contextMenus.create({
	id: 'newtab',
	title: 'Open Google Translate'
});

browser.contextMenus.onClicked.addListener(function (info)
{
	switch (info.menuItemId)
	{
		case 'translate':
			translate(info.selectionText);
			break;

		case 'newtab':
			browser.tabs.create({
				url: 'https://translate.google.com/'
			});
			break;
	}
});

browser.runtime.onMessage.addListener(translate);

async function translate(text)
{
	if (text.length > 1)
	{
		let lang = (await browser.storage.local.get()).lang;

		browser.tabs.create({
			url: 'https://translate.google.com/#auto/' + ((lang !== '' && lang !== undefined) ? lang : 'en') + '/' + encodeURIComponent(text)
		});
	}
}