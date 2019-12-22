browser.contextMenus.create({
	id: 'selection',
	title: 'Translate (T̲)',
	contexts: ['selection']
});

browser.contextMenus.onClicked.addListener(function(info)
{
	switch (info.menuItemId)
	{
		case 'selection':
			translate(info.selectionText);
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