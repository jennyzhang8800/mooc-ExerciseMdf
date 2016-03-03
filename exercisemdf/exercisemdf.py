# coding:utf-8
# author:luofuwen
import pkg_resources

from gitRepo import ExerciseRepo
from conf import Config
from lib_util import Util
from xblock.core import XBlock
from xblock.fragment import Fragment
import urllib2
import json
import base64


class ExerciseMdfXBlock(XBlock):
    """
    功能:
        1. 向题库增加题目
        2. 修改现有题目
    """
    logger = Util.custom_logger({
        'logFile': Config.logFile,
        'logFmt': Config.logFmt,
        'logName': 'ExerciseMdfXBlockLog'
    })

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.
    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        """
        The primary view of the ExerciseMdfXBlock, shown to students
        when viewing courses.
        """
        HTML_FILE = "static/index.html"

        html = self.resource_string(HTML_FILE)
        frag = Fragment(html.format(self=self))
        frag.add_javascript(self.resource_string("static/index.js"))

        frag.initialize_js('ExerciseMdfXBlock')
        return frag

    @XBlock.json_handler
    def getQuestionJson(self, data, suffix=''):
        q_number = int(data['q_number'])
        url = Config.questionJsonUrl % {
            'qDir': ((q_number - 1) / 100) + 1,
            'qNo': q_number,
        }
        try:
            #req = urllib2.Request(url)
            res_data = urllib2.urlopen(url)
            res = res_data.read()
            res = json.loads(res)
            if 'content' in res:
                content = json.loads(base64.b64decode(res['content']))
                self.logger.info('getQuestionJson [qNo=%d] [url=%s]' % (q_number, url))
                return {'code': 0, 'desc': 'ok', 'res': content}
            elif res['message'] == 'Not Found':
                self.logger.info('ERROR getQuestionJson [qNo=%d] [msg=%s] [url=%s]' % (q_number, res['message'], url))
                return {'code': 1, 'type': 'error', 'desc': u'题号为%d的题目不存在' % q_number}
            else:
                self.logger.info('ERROR getQuestionJson [qNo=%d] [msg=%s] [url=%s]' % (q_number, res['message'], url))
                return {'code': 1, 'error': 'error', 'dese': 'Error occurs when loading %d.json message: %s' % (q_number, res['message'])}
        # except urllib2.HTTPError as e:
        #     self.logger.exception('ERROR getQuestionJson [qNo=%d] [status=%d] [url=%s]' % (q_number, e.code, url))
        #     if (e.code == 404):
        #         return {
        #             'code': 1,
        #             'type': 'error',
        #             'desc': u'题号为%d的题目不存在' % q_number
        #         }
        except Exception as e:
            self.logger.exception('ERROR getQuestionJson [qNo=%d] [desc=%s] [url=%s]' % (q_number, str(e), url))
            return {
                'code': 1,
                'type': 'error',
                'desc': str(e),
            }

    @XBlock.json_handler
    def setQuestionJson(self, data, suffix=''):
        try:
            repo = ExerciseRepo(Config.localRepoDir)
            repo.setUser({'email': Config.commitEmail, 'name': Config.commitName})
            # 简单检查题目是否合理
            lenOfAnswer = len(data['answer'].strip())
            questionType = data['type']
            if lenOfAnswer == 0:
                return {'code': 2, 'type': 'warning', 'desc': '答案不能为空'}
            if questionType == 'single_answer' and lenOfAnswer != 1:
                return {'code': 2, 'type': 'warning', 'desc': '单选题的答案个数仅有一个'}

            data['status'] = 'ok'

            if not data['q_number']:
                data['q_number'] = repo.getMaxQNo() + 1
            repo.setExercise(data)
            self.logger.info('setQuestionJson [qNo=%d] [%s]' % (data['q_number'], json.dumps(data)))
            return {'code': 0, 'q_number': data['q_number']}
        except Exception as e:
            self.logger.exception('ERROR setQuestionJson [qNo=%d] [desc=%s] [%s]' % (data['q_number'], str(e), json.dumps(data)))
            return {'code': 1, 'type': 'error', 'desc': '发生错误, %s' % str(e)}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ExerciseMdfXBlock",
             """<exercisemdf/>
             """),
            ("Multiple ExerciseMdfXBlock",
             """<vertical_demo>
                <exercisemdf/>
                <exercisemdf/>
                <exercisemdf/>
                </vertical_demo>
             """),
        ]
