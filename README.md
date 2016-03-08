# mooc-ExerciseMdf
openedx的xblock开发，用于修改Github上的题目，操作系统课程使用

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

## 相关问题
- 安装完毕之后，并没有在Studio中找到我安装的XBlock
 - 请确认用户`www-data`对路径`/edx/app/edxapp/lib/python2.7/site-package/exercisemdf`以及`/edx/app/edxapp/lib/python2.7/site-package/exercisemdf_xblock.egg-info`有读权限，如果之前的配置没有问题，那么大多数情况是因为OpenEdx对新安装的XBlock没有读权限
