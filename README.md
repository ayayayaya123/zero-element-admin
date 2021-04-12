# 业务系统开发脚手架
### 功能列表  (增加表格说明)
### 完善可视化首页配置


## 环境
```
node version 10
npm version 6
```

## 安装

> 设置淘宝镜像
```shell
$ npm config set registry https://registry.npm.taobao.org
$ npm i
```

## 以开发环境运行
```shell
npm start
# 默认运行在本地的 8000 端口
```

## 以生产环境运行
```shell
npm run build
# 然后把生成的 dist/ 拷贝到 web server 下
```

## npm un build 提示找不到模块 'webpack'
> 电脑第一次构建前端的项目的话，需要先全局安装 webpack 相关模块
```
# 以管理员 (Linux root) 运行
npm install webpack -g
npm install webpack-cli -g
```

## 如何对接API

### 运行后台API代码
> 运行详情见`README.md`说明
> 
查看后台代码 [app-crud-bundle](https://github.com/zelejs/crud-app-bundle)

### 设置后台API端口
在源代码中找到 `src/global.js`, 在开发环境中设置API端口
```
if (process.env.NODE_ENV === 'development') {
  setEndpoint('http://localhost:8080');
}
```



