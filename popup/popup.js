$(function () {
    $.get('/manifest.json', function (data) {
        window.manifest = JSON.parse(data);
        $('#version').text('גרסא ' + window.manifest.version);
    });

    chrome.storage.local.get(function (storage) {
        if (!storage.numberTopics) {
            chrome.storage.local.set({numberTopics: 5}, function() {
                refresh();
            });
        } else {
            refresh();
        }
    });

    $('#refresh').click(refresh);
});

function refresh() {
    var $ul = $("#lastTopics ul");

    $ul.html('');
    $.get('http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/', function (data) {
        var items = $(data).find('item');

        chrome.storage.local.get(function (storage) {
            for (var i = 0; i < storage.numberTopics; i++) {
                var title = $(items[i]).find('title').text();
                var link = $(items[i]).find('link').text();

                $ul.append('<li><a target="_blank" href="' + link + '">' + title + '</a></li>');
            }
        });
    });
}