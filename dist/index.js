'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.iterator');
require('core-js/modules/es.array.map');
require('core-js/modules/es.object.to-string');
require('core-js/modules/es.promise');
require('core-js/modules/es.regexp.to-string');
require('core-js/modules/es.string.iterator');
require('core-js/modules/web.dom-collections.iterator');

/**
 * 图片加载完成监听
 *
 * @param {String} url 图片地址
 * 
 * 返回promise
 */
var loadImage = function loadImage(url) {
  return new Promise(function (resolve, reject) {
    // eslint-disable-next-line no-console
    // console.log('--loadImage--', url)
    var image = new Image();

    image.onload = function () {
      // eslint-disable-next-line no-console
      // console.log('--loadImage--end--', url)
      resolve(url);
      image = undefined;
    };

    image.onerror = function () {
      return reject(url);
    };

    image.src = url;
  });
};
/**
 * 批量图片加载完成监控
 * 
 * 单个地址和地址数组都可以
 * 
 * @param {String | Array} params 图片地址
 * 
 * 返回promise
 */

var loaderUrls = function loaderUrls(params) {
  var urls = [];

  switch (Object.prototype.toString.call(params)) {
    case '[object String]':
      urls = [params];
      break;

    case '[object Array]':
      urls = babelHelpers.toConsumableArray(params);
      break;

    default:
      urls = [];
  }

  var promiseAll = urls.map(function (url) {
    return loadImage(url);
  });
  return Promise.all(promiseAll);
};
/**
 * 在元素背景图中提取图片地址
 * @param {HTMLElement} ele 元素
 * 
 * 返回地址
 */

var cssUrl = function cssUrl(ele) {
  var urlPre = window.getComputedStyle(ele).backgroundImage; // 提取出来的地址是 url(http://xxxxx)所以要截取字符串

  return urlPre.substring(5, urlPre.length - 2);
};
/**
 * 批量元素图片加载完成监控
 * 
 * 也可以是单个元素，但是仅支持div标签
 * 
 * @param {Array<HTMLElement> | HTMLDivElement} eles 元素数组
 * 
 * 返回promise
 */

var eleLoaderImages = function eleLoaderImages(eles) {
  var urls = [];

  switch (Object.prototype.toString.call(eles)) {
    case '[object HTMLDivElement]':
      urls = cssUrl(eles);
      break;

    case '[object Array]':
      urls = eles.map(function (ele) {
        return cssUrl(ele);
      });
      break;

    default:
      urls = [];
  }

  return loaderUrls(urls);
};

exports.cssUrl = cssUrl;
exports.eleLoaderImages = eleLoaderImages;
exports.loadImage = loadImage;
exports.loaderUrls = loaderUrls;
