var xblockPost = undefined;

function ExerciseMdfXBlock(runtime, element) {
    xblockPost = function(ajaxData, method) {
        ajaxData.url = runtime.handlerUrl(element, method);
        ajaxData.type = 'POST';
        $.ajax(ajaxData);
    };
}
