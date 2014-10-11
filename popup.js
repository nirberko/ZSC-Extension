var notificationState = true;

$(document).ready(function () {
    $.ajax({
        url: 'http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/',
        type: 'GET',
        dataType: 'xml',
        success: parseXml
    });

    $("a").click(function(){
        chrome.tabs.create({ url: $(this).attr('href') });
        return false;
    });

    chrome.storage.local.get('notificationState', function (state) {
        if (state != 'undefined') {
            notificationState = state.notificationState;

            var $notifications = $('#notifications');

            if (notificationState) {
                $notifications.addClass('not-enable').removeClass('not-disable');
            } else {
                $notifications.addClass('not-disable').removeClass('not-enable');
            }
        }
    });

    $("#notifications").click(function() {
        var $notifications = $('#notifications');
        if (notificationState) {
            chrome.storage.local.set({'notificationState': false});
            $notifications.addClass("not-disable").removeClass("not-enable");
            notificationState = false;
        }
        else{
            chrome.storage.local.set({'notificationState': true});
            $notifications.addClass("not-enable").removeClass("not-disable");
            notificationState = true;
        }
    });
});

function parseXml(xml) {
    var items = $(xml).find("item");

    for (var i = 0; i < 5; i++)
    {
        var title = $(items[i]).find("title").text();
        var link = $(items[i]).find("link").text();

        $("#lastTopics").find("ul").append("<li><a href='" + link + "'>" + title + "</a></li>");
    }

    $("ul a").click(function(){
        chrome.tabs.create({ url: $(this).attr("href") });
    });
}