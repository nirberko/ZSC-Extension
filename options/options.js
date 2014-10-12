$(function() {
    chrome.storage.local.get(function(storage) {
        var $form = $('form');
        $form.find('input[name=showNotifications]').prop('checked', storage.showNotifications)
        $form.find('input[name=updateTime]').val(storage.updateTime);
    });

    $('form').submit(function(event) {
        var $this = $(this);
        chrome.storage.local.set({
            showNotifications: $this.find('input[name=showNotifications]').prop('checked'),
            updateTime: Number($this.find('input[name=updateTime]').val()) * 1000
        });

        event.preventDefault();
    });
});