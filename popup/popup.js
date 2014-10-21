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
	
	$("#takeScreenshot").click(function(){
		var today = new Date(),
			day = today.getDate(),
			month = today.getMonth()+1,
			year = today.getFullYear(),
			hours = today.getHours(),
			mins = today.getMinutes(),
			today = day+'-'+month+'-'+year+' ('+hours+'-'+mins+')';
		
		chrome.tabs.captureVisibleTab(null, {"format":"png"}, function(screenshotUrl) {
			chrome.downloads.download({
			  url: screenshotUrl,
			  filename: today+".png"
			});
		});
	});
});

function refresh() {
    var $ul = $("#lastTopics ul");

    $.get('http://www.zsc.co.il/index.php/rss/forums/1-zsc-rss/', function (data) {
        var items = $(data).find('item');

        chrome.storage.local.get(function (storage) {
            $ul.html('');

            for (var i = 0; i < storage.numberTopics; i++) {
                var title = $(items[i]).find('title').text();
                var link = $(items[i]).find('link').text();

                $ul.append('<li><a target="_blank" href="' + link + '">' + title + '</a></li>');
            }
        });
    });
}