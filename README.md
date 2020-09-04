# image-loader-progress
图片加载进度监控



> 今天在开发中发现背景图片很大，需要控制加载进度，如果是`img`可以很好的监听到，但是在css中我们该如何操作呢

> 首先是提取CSS背景图的地址，然后通过`js`监听加载进度

# 加载图片
这是监控图片加载是否完成的核心部分，最后返回一个promise
```js
import {loadImage} from 'image-loader-progress'

loadImage('http://xxxxxx').then((url) => {}, (url) => {})
```

# 批量加载图片
根据传入进来的url加载，可以是一个数组，也可以是一个字符串，最后返回一个promise
```js
import {loaderUrls} from 'image-loader-progress'

loaderUrls('http://xxxxxx')
  .then((urls) => {}, (urls) => {})

loaderUrls(['http://xxxxxx', 'http://yyyyyyyy'])
  .then((urls) => {}, (urls) => {})
```

# 提取图片地址
在css中的图片要使用特殊的方法提取，提取出来的地址是 `url(http://xxxxx)`所以要截取字符串
```js
import {cssUrl} from 'image-loader-progress'

const url = cssUrl(document.querySelector('bg'))
```

# 批量提取图片地址并批量加载图片
在元素中批量提取图片地址，也可以是单个元素（仅支持div标签），并调用批量加载图片方法
```js
import {eleLoaderImages} from 'image-loader-progress'

eleLoaderImages(document.querySelector('bg'))
  .then((urls) => {}, (urls) => {})

eleLoaderImages([document.querySelector('bg1'), document.querySelector('bg2')])
  .then((urls) => {}, (urls) => {})
```