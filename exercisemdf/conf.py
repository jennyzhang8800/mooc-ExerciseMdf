# coding:utf-8
# author:luofuwen


class Config():
    # local git repo config
    localRepoDir = '/www/data/os_course_exercise_library'
    localJsonFile = '%(localRepoDir)/data/json/%(qDir)/%(qNo).json'
    commitDir = 'data/json/*'
    commitEmail = 'user@example.com'
    commitName = 'www-data'
    commitText = 'debug: update %(qNo).json'

    # github config
    questionJsonUrl = 'https://raw.githubusercontent.com/chyyuu/os_course_exercise_library/master/data/json/%(qDir)/%(qNo).json'
