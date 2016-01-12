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

    function fillTemplate(template, qJson) {
        template.find('#q_number').text(qJson.q_number);
        template.find('#type').text(STR_TYPE[qJson.type]);
        template.find('#question').attr('data-type', qJson.type);
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
                                <td><label class="checkbox"> \
                                <input type="checkbox" id="opt-is-right">是 \
                                </label></td> \
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

        // 重新设置相关的EventListener
        initJsForPad();
    }

    function getForm() {
        var json = {};
        var template = $('#question-detail');
        json.q_number = template.find('#q_number').text();
        json.type = template.find('#question').attr('data-type');
        json.source = template.find('input#source').val();
        json.knowledge = template.find('input#knowledge').val();
        json.degree_of_difficulty = template.find('input#degree_of_difficulty').val();
        json.question = template.find('textarea#question').text();
        json.explain = template.find('textarea#explain').text();
        if (HAS_OPTIONS[json.type]) {
            json.options = [];
            json.answer = '';
            template.find('#option-list').find('tr').each(function() {
                var opt = $(this).find('#opt').text();
                var content = $(this).find('#opt-content').val();
                var isRight = $(this).find('#opt-is-right').attr('checked') == 'checked'

                json.options.push(opt + '.' + content);
                if (isRight) {
                    json.answer += opt;
                }
            });
        } else {
            json.answer = json.explain;
        }
        return json;
    }

    function updateEditPad(qJson) {
        qJson = checkJson(qJson);
        if (qJson == null)
            return;
        var template = $('#question-detail').html($('#question-detail-template').html());
        fillTemplate(template, qJson);
    }

    function makeAlart(type, desc) {
        $('#alart-view').empty();
        var template = $('#alart-view').html($('#alart-' + type + '-template').html());
        template.find('#alart-desc').text(desc);
    }

    function checkJson(json) {
        if (json.code == 0) {
            if (json.res.status != 'ok') {
                makeAlart('warning', '当前题目似乎未指定答案');
            }
            return json.res;
        } else {
            console.info(json);
            if (json.code == 99) {
                makeAlart('error', 'Unkown Error');
            } else {
                makeAlart(json.type, json.desc);
            }
            return undefined;
        }
    }

    //var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    function initJsForPad() {
        $('#save-btn', element).on('click', function(eventObject) {
            var data = getForm(); console.info(data);
        });

        $('#add-option-btn', element).on('click', function(eventObject) {
            var ol = $('#question-detail #option-list');
            var optItem = $('\
                <tr> \
                    <td id="opt"></td> \
                    <td><input type="text" class="option-content" id="opt-content"></td> \
                    <td><label class="checkbox"> \
                        <input type="checkbox" id="opt-is-right">是 \
                    </label></td> \
                </tr> \
            ');
            var OPT = 'ABCDEFGHIJKLMN';
            var index = ol.children().size();
            optItem.find('#opt').text(OPT[index]);
            ol.append(optItem);
        });

        $('#remove-option-btn', element).on('click', function(eventObject) {
            $('#question-detail #option-list tr:last').remove();
        });
    }


    $('#gen_single_answer', element).on('click', function(eventObject) {
        var template = $('#question-detail').html($('#question-detail-template').html());
        fillTemplate(template, {
            'q_number': 'please wait...',
            'type': 'single_answer',
            'options': [
                'A.',
                'B.',
                'C.',
                'D.',
            ],
            'answer': '',
        });
    });

    $('#gen_multi_answer', element).on('click', function(eventObject) {
        var template = $('#question-detail').html($('#question-detail-template').html());
        fillTemplate(template, {
            'q_number': 'please wait...',
            'type': 'multi_answer',
            'options': [
                'A.',
                'B.',
                'C.',
                'D.',
            ],
            'answer': '',
        });
    });

    $('#gen_true_false', element).on('click', function(eventObject) {
        var template = $('#question-detail').html($('#question-detail-template').html());
        fillTemplate(template, {
            'q_number': 'please wait...',
            'type': 'true_false',
            'options': [
                'A.对',
                'B.错',
            ],
            'answer': '',
        });
    });

    $('#gen_question_answer', element).on('click', function(eventObject) {
        var template = $('#question-detail').html($('#question-detail-template').html());
        fillTemplate(template, {
            'q_number': 'please wait...',
            'type': 'question_answer',
        });
    });

    $('#gen_fill_in_the_blank', element).on('click', function(eventObject) {
        var template = $('#question-detail').html($('#question-detail-template').html());
        fillTemplate(template, {
            'q_number': 'please wait...',
            'type': 'fill_in_the_blank',
        });
    });

    $('#loadDataBtn', element).on('click', function(eventObject) {
        var qNo = $('#question-number').val();
        if (qNo == undefined || qNo == '') {
            makeAlart('warning', '请输入题号');
            return;
        }
        $.ajax({
            type: 'POST',
            url: runtime.handlerUrl(element, 'getQuestionJson'),
            //url: '/static/test/multi_answer_test.json',
            data: JSON.stringify({'q_number': qNo}),
            success: updateEditPad
        });
    });

    $(function($) {
        /* Here's where you'd do things on page load. */
    });
}
