const dictionaries = {
	cdict: {
		name: 'cdict字典',
		query: text => `https://cdict.net/?q=${text}`
	},
	cambridge {
		name: 'cambridge_dictionary',
		query: text => `https://dictionary.cambridge.org/us/dictionary/english-chinese-traditional/${text}`
	},
	merriam_webster: {
		name: 'merriam_webster_dict',
		query: text => `https://www.merriam-webster.com/dictionary/${text}`
	},	
	kimo: {
		name: '奇摩字典',
		query: text => `http://tw.dictionary.yahoo.com/dictionary?p=${text}`
	},
	moedict: {
		name: '萌典',
		query: text => `http://www.moedict.tw/${text}`
	},
	goo: {
		name: 'goo辞書',
		query: text => `http://dictionary.goo.ne.jp/srch/all/${text}/m0u/`
	},
	google: {
		name: 'Google Translate',
		query: text => `https://translate.google.com/#en/zh-TW/${text}`
	}
};

const createMenu = id => {
    const { name } = dictionaries[id];
    browser.menus.create({
      id,
      title: `${name}: %s`,
      contexts: ['selection'],
      icons: {
          "16": `assets/${id}.ico`
      }
    });
};

createMenu('kimo'); // only enable kimo before implement options

browser.menus.onClicked.addListener(function(info, tab) {
  const id = info.menuItemId;
  if (dictionaries[id]) {
	browser.pageAction.setIcon({
		tabId: tab.id,
		path: {
			"16": `assets/${id}.ico`
		}
	});
    browser.pageAction.setPopup({
        tabId: tab.id,
        popup: dictionaries[id].query(info.selectionText)
    })
  }
  browser.pageAction.show(tab.id);
  browser.pageAction.openPopup();
});
