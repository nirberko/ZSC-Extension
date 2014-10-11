$(function () {
    $.get('http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/', function (data) {
        var items = $(data).find('item');

        for (var i = 0; i < 5; i++) {
            var title = $(items[i]).find('title').text();
            var link = $(items[i]).find('link').text();

            $("#lastTopics ul").append('<li><a target="_blank" href="' + link + '">' + title + '</a></li>');
        }
    });

    $.get('/manifest.json', function (data) {
        window.manifest = JSON.parse(data);
        $('#version').text('גרסא ' + window.manifest.version);
    });
});