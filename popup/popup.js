$(function () {
    $.ajax({
        url: 'http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/',
        type: 'GET',
        success: function(data) {
            var items = $(data).find('item');

            for (var i = 0; i < 5; i++) {
                var title = $(items[i]).find('title').text();
                var link = $(items[i]).find('link').text();

                $("#lastTopics ul").append('<li><a target="_blank" href="' + link + '">' + title + '</a></li>');
            }
        }
    });
});