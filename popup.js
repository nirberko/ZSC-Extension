notificationState = true;

$(document).ready(function () {
    $.ajax({
        url: 'http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/',
        type: 'GET',
        dataType: "xml",
        success: parseXml
    });

    $("a").click(function(){
        chrome.tabs.create({ url: $(this).attr("href") });
    });

    chrome.storage.local.get('notificationState', function (state) {
        if (state != "undefined") {
            notificationState = state.notificationState;

            if (notificationState) {
                $("#notifications").addClass("not-enable");
                $("#notifications").removeClass("not-disable");
            } else {
                $("#notifications").addClass("not-disable");
                $("#notifications").removeClass("not-enable");
            }
        }
    });

    $("#notifications").click(function() {
        if (notificationState) {
            chrome.storage.local.set({'notificationState': false});
            $("#notifications").addClass("not-disable");
            $("#notifications").removeClass("not-enable");
            notificationState = false;
        }
        else{
            chrome.storage.local.set({'notificationState': true});
            $("#notifications").addClass("not-enable");
            $("#notifications").removeClass("not-disable");
            notificationState = true;
        }
    });
});

function parseXml(xml) {
    var items = $(xml).find("item");

    var i = 1;

    $(items).each(function() {
        if (i <= 5) {
            var title = $(this).find("title").text();
            var link = $(this).find("link").text();

            $("#lastTopics").find("ul").append("<li><a href='" + link + "'>" + title + "</a></li>");
        }
        i++;
    });

    $("ul").find("a").click(function(){
        chrome.tabs.create({ url: $(this).attr("href") });
    });
}