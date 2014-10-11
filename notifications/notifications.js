chrome.notifications.onClicked.addListener(function (url) {
    window.open(url);
});

var lastUpdate;

function rss () {
    $.ajax({
        type: 'GET',
        url: 'http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/',
        dataType: 'xml',
        success: function (data) {
            var $xml = $(data),
                $items = $xml.find('item');

            if (!lastUpdate) {
                for (var i = 0; i < 3; i++) {
                    var $item = $items.eq(i),
                        pubDate = new Date($item.find('pubDate').text());

                    addNotification($item);
                }
            } else {
                $items.each(function() {
                    var $item = $(this),
                        pubDate = new Date($item.find('pubDate').text());

                    if (pubDate > lastUpdate) {
                        addNotification($item);
                    }
                });
            }


            lastUpdate = new Date($xml.find('pubDate:first').text());

            setTimeout(rss, 10000);
        },
        error: function () {
            chrome.notifications.create('error', {
                type: 'basic',
                title: 'שגיאה בסנכרון',
                message: 'ההתחברות לZSC לא הצליחה. מנסה שוב בעוד 20 שניות.',
                iconUrl: '/icons/128.png'
            }, function () {
                setTimeout(rss, 20000);
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
