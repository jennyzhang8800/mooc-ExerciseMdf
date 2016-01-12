# coding:utf-8
# author:luofuwen
import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer
from xblock.fragment import Fragment
import urllib2


class ExerciseMdfXBlock(XBlock):
    """
    功能:
        1. 向题库增加题目
        2. 修改现有题目
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        """
        The primary view of the ExerciseMdfXBlock, shown to students
        when viewing courses.
        """
        HTML_FILE = "static/html/exercisemdf.html"
        JS_LIST = [
            "/static/js/src/exercisemdf.js",
            # "/static/js/jquery-1.11.3.js",
            "/static/bootstrap2/js/bootstrap.min.js",
        ]
        CSS_LIST = [
            "/static/css/exercisemdf.css",
            "/static/bootstrap2/css/bootstrap.min.css",
        ]

        html = self.resource_string(HTML_FILE)
        frag = Fragment(html.format(self=self))

        for cssFile in CSS_LIST:
            frag.add_css_url(cssFile)

        for jsFile in JS_LIST:
            frag.add_javascript_url(jsFile)

        frag.initialize_js('ExerciseMdfXBlock')
        return frag

    @XBlock.json_handler
    def getQuestionJson(self, data, suffix=''):
        q_number = int(data['q_number'])
        gitRepo = 'https://raw.githubusercontent.com/chyyuu/os_course_exercise_library'
        url = '%s/master/data/json/%d/%d.json' % (
            gitRepo,
            (q_number / 100) + 1,
            q_number,
        )
        try:
            req = urllib2.Request(url)
            res_data = urllib2.urlopen(req)
            res = res_data.read()
            return {
                'code': 0,
                'desc': 'ok',
                'res': eval(res),
            }
        except urllib2.HTTPError as e:
            if (e.code == 404):
                return {
                    'code': 1,
                    'type': 'error',
                    'desc': u'题号为%d的题目不存在' % q_number
                }
        except urllib2.URLError as e:
            return {
                'code': 1,
                'type': 'error',
                'desc': str(e),
            }
        return {
            'code': 99,
            'desc': 'unknown error',
        }

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
