$(function() {
    $('form').submit(function(event) {
        var $this = $(this);
        chrome.storage.local.set({
            showNotifications: $this.find('input[name=updateTime]').prop('checked'),
            updateTime: Number($this.find('input[name=updateTime]').val()) * 1000
        });

        event.preventDefault();
    });
});