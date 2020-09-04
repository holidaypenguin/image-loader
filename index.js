
/**
 * 图片加载完成监听
 *
 * @param {String} url 图片地址
 * 
 * 返回promise
 */
export const loadImage = url => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-console
  // console.log('--loadImage--', url)
  let image = new Image()
  image.onload = () => {
    // eslint-disable-next-line no-console
    // console.log('--loadImage--end--', url)
    resolve(url)
    image = undefined
  }
  image.onerror = () => reject(url)
  image.src = url
})

/**
 * 批量图片加载完成监控
 * 
 * 单个地址和地址数组都可以
 * 
 * @param {String | Array} params 图片地址
 * 
 * 返回promise
 */
export const loaderUrls = (params) => {
  let urls = []
  switch (Object.prototype.toString.call(params)) {
    case '[object String]':
      urls = [params]
      break
    case '[object Array]':
      urls = [...params]
      break
    default:
      urls = []
  }

  const promiseAll = urls.map(url => loadImage(url))

  return Promise.all(promiseAll)
}

/**
 * 在元素背景图中提取图片地址
 * @param {HTMLElement} ele 元素
 * 
 * 返回地址
 */
export const cssUrl = (ele) => {
  const urlPre = window.getComputedStyle(ele).backgroundImage

  // 提取出来的地址是 url(http://xxxxx)所以要截取字符串
  return urlPre.substring(5, urlPre.length - 2)
}

/**
 * 批量元素图片加载完成监控
 * 
 * 也可以是单个元素，但是仅支持div标签
 * 
 * @param {Array<HTMLElement> | HTMLDivElement} eles 元素数组
 * 
 * 返回promise
 */
export const eleLoaderImages = (eles) => {
  let urls = []
  switch (Object.prototype.toString.call(eles)) {
    case '[object HTMLDivElement]':
      urls = cssUrl(eles)
      break
    case '[object Array]':
      urls = eles.map(ele => cssUrl(ele))
      break
    default:
      urls = []
  }

  return loaderUrls(urls)
}
