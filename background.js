browser.contextMenus.create({
	id: "selection",
	title: "Translate (T̲)",
	contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function(info)
{
	switch (info.menuItemId)
	{
		case "selection":
			translate(info.selectionText);
			break;
	}
});

browser.runtime.onMessage.addListener(translate);

function translate(text)
{
	if (text.length > 1)
	{
		browser.tabs.create({
			url: 'https://translate.google.com/#en/ru/'+encodeURIComponent(text)
		});
	}
}