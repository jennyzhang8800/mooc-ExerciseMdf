# coding:utf-8
# author:luofuwen


class Config():
    # local git repo config
    localRepoDir = '/www/data/os_course_exercise_library'
    localJsonFile = '%(localRepoDir)s/data/json/%(qDir)d/%(qNo)d.json'
    commitDir = 'data/json/*'
    commitEmail = 'user@example.com'
    commitName = 'www-data'
    commitText = 'debug: update %(qNo)d.json'

    # github config
    questionJsonUrl = 'https://raw.githubusercontent.com/chyyuu/os_course_exercise_library/master/data/json/%(qDir)d/%(qNo)d.json'
