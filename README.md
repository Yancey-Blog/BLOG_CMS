# [Blog2.0 CMS](https://cms.yanceyleo.com/)

## Introduction

这是Blog2.0的后台管理系统，1.0版本直接用的是Django Admin，可塑性确实不太高（应该是我没玩透🐶）。

因为工作中有用Vue独立编写后台的经验，所以这次自己用React手撸了一个后台，用了react + react-router-4 + mobx + Google reCAPTCHA + Ant Design，说实话比起前端JS和CSS各占50%，这个后台收获还是很大的。

后期会放出一个lite版本，也就是不能上传、不能修改密码，别的都能干。

[前端文档戳这里](https://github.com/Yancey-Blog/BLOG_FE/blob/master/README.md)

因为刚毕业不久，工作时间也不多，感觉做的项目还稍显稚嫩，因此决定开源出来接受大佬们的意见。

## Detail

### Login

![Login](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20181017-193518@2x.jpg?x-oss-process=image/quality,Q_30)

因为确实没有注册的必要，所以直接把用户名和加密后的密码存在了数据库，当然后期心情好不排除弄个注册。

用到了Google reCAPTCHA，用同事大神的话来说就是装逼给自己看😂，不过用这个东西也对后面填request库和request-promise库打下了坚实的基础，嗯。

虽说是给自己用的后台，但还是考虑到一些非法操作，比如这个页面，只有email、password、Google reCAPTCHA有值才能点击登录按钮（写到这里，突然发现忘了写email、password格式校验）；点击按钮之后立即将按钮设为`disabled`来避免多次点击。

### 增删改查

![增删改查](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20181017-194950@2x.jpg?x-oss-process=image/quality,Q_30)

因为大部分模块都是类似上面这张图的架构，所以挑一个来写，就以`player`模块为例：

- 表格渲染数据，采用分页的方式；
- 通过增删改查和批量删除按钮来进行数据的操作；
- 上面说到后台是从用户的角度来写的，因此当用户未填写全信息将禁止点击按钮提交；
- 封装了一下Ali OSS的上传接口
- 点击表格中的图片（如果有），会放大显示；
- 删除和批量删除会提前弹出`是否确认删除tip`；

### Article

![Article](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20181017-195622%402x.jpg?x-oss-process=image/quality,Q_30)

这是Blog的核心功能区，除了常规的增删改查批量删除，还增加了模糊查找和按时间段查找的功能。

### Article Editor

![Article Editor](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20181017-195641@2x.jpg?x-oss-process=image/quality,Q_20)

这是Blog的核核核核核心功能区了，用来编写文章的Header Cover, Title, Summary, Content, Tags，当然我设置的这些都是必填项，所以mobx检测到如果有的项为空，也是无法提交的。

Markdown编辑器用的toast ui的，说实话用起来真蛋疼，魔改了好多地方才适合自己使用。

着重说一下上面这张图没截到的部分😂，是两个按钮，用来提交。

- 左边的按钮是`保存并留在当前页面`，实际上就是起到一个暂存的功能，而且我还加了一个功能，当点击这个按钮时会弹出一个popup，询问你是否立即发布，也就是说：

        当点击保存并留在当前页面后在点击yes，文章将会被保存到数据库，而且会被发布，并且留在当前编辑页面
        当点击保存并留在当前页面后在点击no，文章将会被保存到数据库，不会被发布，并且留在当前编辑页面
        
- 右边的按钮是纯粹的`保存`,点击后文章将会保存，然后发布，最后跳转到Article List页面。

### CV

![CV](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20181017-200923@2x.jpg?x-oss-process=image/quality,Q_30)

这个模块其实完全可以写成表格的形式，但确实写表格写烦了，所以换个口味，实际这就跟很多招聘网站的效果差不多了，其实也是增删改查，当然没去设计批量删除，感觉没意义。

### Global Setting

![Global Setting](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20181017-201201@2x.jpg?x-oss-process=image/quality,Q_30)

这里分三个模块：

- 第一个是个人基本信息，实际上有两个作用，一个是后台右上角那个地方（~~要不太空了~~😂），另一个用途是前端简历页面个人信息那个部分；
- 第二个是修改密码，我估计自己基本也不会用到这个地方，但是既然想写，那就去做好了；
- 第三个是全局配置，当然现在只有一个接口，就是全站置灰效果，后台一旦设置了置灰，那前端全站就会变成灰色，用于一些特殊的哀悼日子。

## 最后

因为最近忙着找工作，文章迁移、英文文档撰写都会在忙过这段时间之后再去实施，如果有好的工作机会可以联系我哈～

以上、よろしく。

