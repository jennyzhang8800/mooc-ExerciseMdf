var xblockPost = undefined;

function ExerciseMdfXBlock(runtime, element) {
    xblockPost = function(ajaxData, method) {
        ajaxData.url = runtime.handlerUrl(element, method);
        ajaxData.type = 'POST';
        $.ajax(ajaxData);
    };

    $(element).on('click', '.fullscreen', function(event) {
        var frame = $('#exercisemdf')[0];
        if (frame.requestFullscreen) {
            frame.requestFullscreen();
        }
        else if (frame.mozRequestFullScreen) {
            frame.mozRequestFullScreen();
        }
        else if (frame.webkitRequestFullscreen) {
            frame.webkitRequestFullscreen();
        }
    });
}
