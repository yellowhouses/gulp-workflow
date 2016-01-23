# gulp 自动化工作流By@yangfhc3
`gulp+sass` 自动化开发流程工具
## 依赖
* `node.js`
* `ruby`
    * `compass`

## 使用
### 建立仓库
* 直接 `f**k`
* `git clone`

本仓库预定义三个分支：`mater` `dev` `gh-pages` 
### 安装模块
* 安装 `ruby` 
* 安装 `compass`
```
$ gem install compass
``` 
* 安装本地 `gulp` 模块
```
$ npm install
``` 
### 自定义配置（支持）
* 更改 `bower` 库安装位置
* 更改 `package.json` 项目配置信息
* 更改 `.gitignore`
* 自定义扩展 `gulpfile.js`

### 安装第三方库
使用 `bower` 进行包管理，默认安装位置 `src/3rd` ，`bower` 的使用[点我](https://www.zybuluo.com/yangfch3/note/274714)。

## 运行
支持以下初始运行方式：

* `npm run`
```
$ npm start
// or
$ npm run start
```
* `gulp *`
```
$ gulp build
$ gulp server
// or simple
$ gulp default
```

修改浏览器链接为：`http://localhost:3000/html/` 即可预览与 `watch-act`
## TODO

- [ ] 支持更多 `npm run` 命令，增强自动化
- [ ] 增添更多 `gulp` 插件，实现更多功能
    - [ ] md5 tag support
    - [ ] ...
- [ ] 优化文件结构
- [ ] 整合更多 `npm` 包，实现更多功能（例如：phantomJS）
- [ ] waiting more...

## Others
1. 未使用 `CSS` 浏览器前缀自动补全插件，请采用sublime提供的自动补全插件代替开发
2. 未启用 `CSS minify`，请采用sublime提供的插件压缩
3. ...