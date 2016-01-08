/* Javascript for ExerciseMdfXBlock. */
function ExerciseMdfXBlock(runtime, element) {

    var STR_TYPE = {
        'single_answer': '单选题',
        'multi_answer': '多选题',
        'true_false': '判断题',
        'question_answer': '问答题',
        'fill_in_the_blank': '填空题',
    };

    var HAS_OPTIONS = {
        'single_answer': true,
        'multi_answer': true,
        'true_false': true,
        'question_answer': false,
        'fill_in_the_blank': false,
    };

    function updateEditPad(qJson) {
        console.info(qJson);
        // TODO 检查json状态
        var template = $('#question-detail').html($('#question-detail-template').html());

        template.find('p#q_number').text(qJson.q_number);
        template.find('p#type').text(STR_TYPE[qJson.type]);
        template.find('input#source').val(qJson.source);
        template.find('input#knowledge').val(qJson.knowledge);
        template.find('input#degree_of_difficulty').val(qJson.degree_of_difficulty);
        template.find('textarea#question').text(qJson.question);
        template.find('textarea#explain').text(qJson.explain);

        // 更新option部分
        if (HAS_OPTIONS[qJson.type]) {
            template.find('#ctrl-option-group').show();
            for (i in qJson.options) {
                var o = qJson.options[i].split('.');
                var optItem = $('\
                    <tr> \
                        <td id="opt"></td> \
                        <td><input type="text" class="option-content" id="opt-content"></td> \
                        <td><input type="checkbox" id="opt-is-right">是</td> \
                    </tr> \
                ');
                template.find('#option-list').append(optItem)
                optItem.find('#opt').text(o[0]);
                optItem.find('#opt-content').val(o[1]);
                if (qJson.answer.indexOf(o[0]) != -1) {
                    optItem.find('#opt-is-right').attr('checked', 'checked');
                }
            }
        } else {
            template.find('#ctrl-option-group').hide();
        }
    }

    //var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('#loadDataBtn', element).on('click', function(eventObject) {
        $.ajax({
            type: 'POST',
            url: '/static/test/fill_in_the_blank_test.json',
            //data: JSON.stringify({"hello": "world"}),
            success: updateEditPad
        });
    });

    $(function($) {
        /* Here's where you'd do things on page load. */
    });
}
