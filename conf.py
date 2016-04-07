# coding:utf-8
# author:luofuwen


class Config():
    # local git repo config
    localRepoDir = '/var/www/data/os_course_exercise_library'
    localJsonFile = '%(localRepoDir)s/data/json/%(qDir)d/%(qNo)d.json'
    commitDir = 'data/json/*'
    commitEmail = 'user@example.com'
    commitName = 'www-data'
    commitText = 'debug: update %(qNo)d.json'

    # github config
    questionJsonUrl = 'https://api.github.com/repos/chyyuu/os_course_exercise_library/contents/data/json/%(qDir)d/%(qNo)d.json'

    # log config
    logFile = '/tmp/exercisemdf_block.log'
    logFmt = '%(asctime)s - %(filename)s:%(lineno)s - %(name)s - %(message)s'
