$(function () {
    $.get('/manifest.json', function (data) {
        window.manifest = JSON.parse(data);
        $('#version').text('גרסא ' + window.manifest.version);
    });

    chrome.storage.local.get(function (storage) {
        if (!storage.numberTopics) {
<<<<<<< HEAD
            chrome.storage.local.set({numberTopics: 5}, function() {
=======
            chrome.storage.local.set({numberTopics: 3}, function() {
>>>>>>> origin/master
                refresh();
            });
        } else {
            refresh();
        }
    });

    $('#refresh').click(refresh);
});

function refresh() {
<<<<<<< HEAD
=======
    $("#lastTopics ul").html('');
>>>>>>> origin/master
    $.get('http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/', function (data) {
        var items = $(data).find('item');

        chrome.storage.local.get(function (storage) {
<<<<<<< HEAD
            $("#lastTopics ul").html('');

=======
>>>>>>> origin/master
            for (var i = 0; i < storage.numberTopics; i++) {
                var title = $(items[i]).find('title').text();
                var link = $(items[i]).find('link').text();

                $("#lastTopics ul").append('<li><a target="_blank" href="' + link + '">' + title + '</a></li>');
            }
        });
    });
}