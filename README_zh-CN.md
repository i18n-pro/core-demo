
# 版本说明
当前示例对应的是 `v3` 版本，其他版本如下
* v2
   * [Open in CodeSandbox](https://codesandbox.io/p/github/i18n-pro/core-demo/v2?file=README_zh-CN.md)
   * [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/github/i18n-pro/core-demo/tree/v2?file=README_zh-CN.md)


# 概述
这是一个 `i18n-pro` 应用在 `React` 上的一个简单示例，由于当前库是一个纯 `JavaScript` 的库，没有任务其他框架或库的逻辑有关联，因此在其他的UI库（例如 `Vue` ）使用方式没有不同
# 特别说明
如果要正常体验模拟服务端响应的话，下图红色部分，需要确保正常已开启了两个服务![示例图片](https://s3.bmp.ovh/imgs/2023/06/01/9454bc713e431739.png)两个服务分别是：
1. 前端页面的服务（端口：5173），用于展示示例
2. 后端接口服务（端口：8080），用于接收并相应点击按钮的请求



如果当前是通过 `CodeSandBox` 打开的，两个服务默认可以正常启动，可以在这个位置看到已打开的服务列表![示例图片](https://s3.bmp.ovh/imgs/2023/06/01/4f1545b5d2dd01e9.png)

如果是通过 `StackBlitz` 打开的，默认只能一个终端启动一个服务，但是可以新建一个终端，来启动另一个服务，默认启动是**前端页面的服务（端口：5173）**

添加终端操作如下：![示例图片](https://s3.bmp.ovh/imgs/2023/06/01/309bee8bb93b8ff9.png)在新终端输入如下命令来启动**后端接口服务（端口：8080）**
```bash
npm run server
```
效果如下：![示例图片](https://s3.bmp.ovh/imgs/2023/06/02/4e7d3f425b3e6ff0.png)