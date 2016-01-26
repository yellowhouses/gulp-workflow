# gulp 自动化工作流By@yangfhc3
`gulp+sass` 自动化开发流程工具
## 依赖
* `node.js`
* `ruby`
    * `compass`

## 使用
### 建立仓库
* `f**k` & `git clone`

本仓库预定义三个分支：`mater` `dev` `gh-pages` 
### 安装模块
* 安装 `ruby` ，[下载链接_windows](http://rubyinstaller.org/)
* 安装 `compass`
```
$ gem install compass
``` 
* 安装本地自动化 `Node` 模块
```
$ npm install
``` 
### 自定义配置
* 可在 `.bowerrc` 内更改 `bower` 库安装位置及其配置信息
* 可更改 `package.json` 内的项目配置信息
* 可更改 `.gitignore`（注意：不同分支的 `.gitignore` 不一样）

### 安装第三方库
使用 `bower` 进行包管理，默认安装位置 `src/3rd` ，`bower` 的使用方法[点我](https://www.zybuluo.com/yangfch3/note/274714)。

## 运行
支持以下初始运行方式：

* `npm run` 命令
```
$ npm start
// or
$ npm run start
```
* `gulp *` 命令
```
$ gulp build
$ gulp server
// or more simpled
$ gulp default
```
* 自动 `commit`
```
npm run commit
```
然后按照提示输入你的 `commit message`，即可自动提交
* 自动 `push` ：请在确认无分支冲突的情况下使用！！！
```
npm rum push
# （只 push dev分支和 gh-pages 分支的更新）
```
push master 分支
```
npm run push-master
# 将两种 push 分开是为了保持 master 的稳定
```


>`browser-Sync` 自动打开 `html` 文件夹的入口文件，修改浏览器链接为：`http://[localhost--->YourIP]:3000/html/` ，生成二维码（使用 `chrome` 相关插件 ）即可多终端预览与 `watch-act`，使用 `sublime` 的 `auto-save` 插件实现自动保存，多终端能实现同步地自动刷新！Amazing！ 


## TODO

- [x] 支持更多 `npm run` 命令，增强自动化，例如实现一键提交
- [ ] 增添更多 `gulp` 插件，实现更多功能
    - [ ] md5 tag support
    - [ ] ...
- [ ] 优化文件结构
- [ ] 整合更多 `npm` 包，实现更多功能（例如：phantomJS）
- [ ] waiting more...

## Others
1. 本工作流未使用 `CSS3` 浏览器前缀自动补全 `package` ，请采用sublime提供的自动补全插件代替开发；
2. 未启用 `CSS minify`，请采用 sublime 提供的插件压缩；
3. 推荐搭配我的 sublime 配置一起使用
4. 请在 `dev` 分支上工作或在 `dev` 上新建分支工作；自动化任务已经包含了 merge、push 和 checkout 任务，无需手动操作。
