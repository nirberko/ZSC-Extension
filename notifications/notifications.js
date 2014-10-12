chrome.notifications.onClicked.addListener(function (url) {
    window.open(url);
});

function rss () {
    chrome.storage.local.get(function (storage) {
        if (storage.showNotifications === undefined) {
            chrome.storage.local.set({showNotifications: true}, function() {
                rss();
            });
        } else if (storage.updateTime === undefined) {
            chrome.storage.local.set({updateTime: 10}, function() {
                rss();
            });
        } else if (storage.showNotifications) {
            $.ajax({
                type: 'GET',
                url: 'http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/',
                dataType: 'xml',
                success: function (data) {
                    var $xml = $(data),
                        $items = $xml.find('item');

                    if (!storage.lastUpdate) {
                        for (var i = 0; i < 3; i++) {
                            var $item = $items.eq(i),
                                pubDate = new Date($item.find('pubDate').text());

                            addNotification($item);
                        }
                    } else {
                        var lastUpdate = new Date(storage.lastUpdate);
                        $items.each(function () {
                            var $item = $(this),
                                pubDate = new Date($item.find('pubDate').text());

                            if (pubDate > lastUpdate) {
                                addNotification($item);
                            }
                        });
                    }

                    chrome.storage.local.set({lastUpdate: $xml.find('pubDate:first').text()});
                },
                error: function () {
                    chrome.notifications.create('error', {
                        type: 'basic',
                        title: 'שגיאה בסנכרון',
                        message: 'ההתחברות לZSC לא הצליחה.',
                        iconUrl: '/icons/128.png'
                    }, function () {});
                },
                complete: function () {
                    setTimeout(rss, storage.updateTime * 1000);
                }
            });
        }
    });
}

function addNotification($item) {
    var link = $item.find('link').text(),
        title = $item.find('title').text();

    chrome.notifications.create(link, {
        type: 'basic',
        title: title,
        message: 'למעבר לחץ על ההודעה',
        iconUrl: '/icons/128.png'
    }, function () {});
}

rss();