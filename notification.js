var first = true;
var notificationState = true;

function checkNotState () {
    chrome.storage.local.get('notificationState', function (state) {
        if (state != "undefined") {
            notificationState = state.notificationState;
        }
    });
}

$(function(){
    checkNotState();

    setInterval(function () {
        $.ajax({
            url: 'http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/',
            type: 'GET',
            dataType: "xml",
            success: TopicNotification
        });
    }, 30000);
});

function showNotification (msg) {
    var style = "display: none; position: fixed; right: 20px; bottom: 20px; background: white; font-size: 12px !important; font: normal 12px tahoma, helvetica, arial, sans-serif; ";
    style += "cursor: default; -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,0.2); box-shadow: 0 0 10px 0 rgba(0,0,0,0.2); z-index: 99999999999999999999999999999999999999";

    $("body").append("<div id='zscforumnotification' style='"+style+"'><img style='height: 50px; float: right' src='https://pbs.twimg.com/profile_images/517409680159547392/gYATBZbW.png' /> <span style='float: right; display: inline-block; padding: 17px 10px 0 10px'>"+msg+"</span></div>");

    $("#zscforumnotification").fadeIn("fast");

    setTimeout(function(){
        $("#zscforumnotification").fadeOut("fast", function(){
            $("#zscforumnotification").remove();
        });
    }, 10000);
}

function TopicNotification(xml) {
    checkNotState();

    if (notificationState) {
        var items = $(xml).find("item");

        var i = 1;

        $(items).each(function () {
            if (i == 1) {
                var lastLink = $(this).find("link").text();
                var lastTitle = $(this).find("title").text();

                chrome.storage.local.get('lastTopic', function (topic) {
                    if (topic.lastTopic != "undefined ") {
                        if (first == false) {
                            if (topic.lastTopic[1] != lastLink) {
                                var html = "<strong style='color: red'>יש נושא חדש בפורום: <a href='" + lastLink + "' style='color: black; text-decoration: none; font-size: 12px !important'>" + lastTitle + "</a></strong>";
                                showNotification(html);
                            }
                        }
                    }
                });
                if (first) {
                    first = false;
                }
                chrome.storage.local.set({'lastTopic': [lastTitle, lastLink]});
            }
            i++;
        });
    }
}