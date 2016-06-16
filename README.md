# mooc-ExerciseMdf
openedx的xblock开发，用于修改Github上的题目，操作系统课程使用。

- 在Open edX上访问这个XBlock：[链接][xblock-location]
- 对应的Github库：[chyyuu/os_course_exercise_library][question-repo]

## 使用方法说明
这个XBlock提供五种类型题目的编辑功能(新建，编辑)，五种类型的题目主要分别如下：

|类型| 描述 |
|---|---|
|判断题|选择题，只有两个选项(对，错)，只有一个正确答案|
|单选题|选择题，一般4个选项，只有一个正确答案|
|多选题|选择题，一般4个选项，至少有一个正确答案|
|填空题|填空题，一题可以有多个空，每个空的答案一般较短|
|问答题|填空题，一题对应一个答题区域，答案一般较长|

在使用XBlock时，通过`新建`按钮来选择创建的题目类型，大部分题目根据提示即可完成编辑。需要一提的是填空题的编辑，因为每个题目里有多个空，我们通过字母编号(A,B,C等)来为每一个填空编号，在编辑时，通过`添加选项`按钮来增加编号。


## XBlock部署方法
**需要服务器上已经部署OpenEdx,并且开启自定义XBlock的功能,否则部署的XBlock在OpenEdx Studio上不会显示**

把代码clone到服务器，并将所有者设为`edxapp`
```
$ git clone https://github.com/Heaven1881/mooc-ExerciseMdf.git
$ sudo chown -R edxapp:edxapp mooc-ExerciseMdf/
```

安装XBlock
```
$ sudo -u edxapp /edx/bin/pip.edxapp install /path/to/your/xblock
```

在文件夹`/edx/var/edxapp/staticfiles/`下新建文件夹`exercisemdf/`，并将文件夹`staticfiles/`下的文件夹拷贝到`/edx/var/edxapp/staticfiles/`中，同时增加所有人对其的读权限
```
$ sudo mkdir -p /edx/var/edxapp/staticfiles/exercisemdf
$ sudo cp -r staticfiles/* /edx/var/edxapp/staticfiles/exercisemdf/
$ sudo chmod a+r -R /edx/var/edxapp/staticfiles/exercisemdf/
```

在Studio中把在线代码编辑器block添加到课程的高级设置中。
 0. 登录到Studio,打开你的课程
 0. settings->Advanced Setting
 0. 在"advanced_modules"的值后添加"exercisemdf"

重启edx服务
```
$ sudo /edx/bin/supervisorctl -c /edx/etc/supervisord.conf restart edxapp:
```

重启之后就可以在Studio中看到并使用该组件

### 相关问题
- 安装完毕之后，并没有在Studio中找到安装的XBlock
 - 请确认用户`www-data`对路径`/edx/app/edxapp/lib/python2.7/site-package/exercisemdf`以及`/edx/app/edxapp/lib/python2.7/site-package/exercisemdf_xblock.egg-info`有读权限，如果之前的配置没有问题，那么大多数情况是因为OpenEdx对新安装的XBlock没有读权限

[xblock-location]:http://crl.ptopenlab.com:8811/courses/Tsinghua/CS101/2015_T1/courseware/65a2e6de0e7f4ec8a261df82683a2fc3/fa72699c288f40c7b7342369889c2042/
[question-repo]:https://github.com/chyyuu/os_course_exercise_library
