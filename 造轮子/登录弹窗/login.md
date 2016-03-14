---
title: 登录弹窗的实现
date: 2016-03-14
---
摘要：以前要实现某些比较麻烦的功能的时候，都会去找别人写好的插件套到我们自己的页面中，虽说方便，但是这样的话对自己来说依赖性会比较强，所以今天自己写了一个比较完整的jq插件，自己也弄清楚实现插件的整个流程。

## 整体架构
``` bash
;(function($){
	$.fn.popWindow = function(options){
		var defaults = {
			<!-- 自定义参数、属性 -->
		};
		<!-- 把自定义参数和传入的参数整合到一起 -->
		var options = $.extend(defaults,options);
		this.each(function(){
			<!-- 插件代码 -->
		};
	};
})(jQuery);
```

## 关于样式
弹窗的话我们当然是希望有比较好看的样式，这样显得我们的弹窗比较有美感，所以我这里的话是把样式放到defaults里面，之后再把这些样式添加到相应的标签中。
``` bash
var defaults = {
	// 默认标题名
	title: 'hello world',
	// 整个大盒子
	popBoxCss: {
		position: 'fixed',
		left: 0,
		top: 0,
		width: '100%',
		height: '100%',
		display: 'none'
	}
}
```

## 遮罩层透明度问题
一开始的时候，遮罩层里面是内嵌弹出窗口的，就想下面这样。
``` bash
<div id="shadow">
	<div id="pop"></div>
</div>
```
于是，当我给shadow层设置opacity的时候，pop会继承shadow的opacity属性，于是pop层也产生了透明度，这个时候我一开始的想法是给pop层设置opacity为1，但是其实这时的opacity变成了pop层的opacity与shadow相乘，问题还是没有解决。
由于opacity的继承性，所以把两个div分开，就不会造成opacity的继承。像这样，于是透明度的问题就解决了。
``` bash
<div id="box">
	<div id="pop"></div>
	<div id="shadow"></div>
</div>
```

## $.extend
$.extend(defaults,options)
用法：把defaults和options里面的参数合并到defaults里面

## 事件捕获
事件捕获是指父元素的事件被子元素捕获，这个出现在如下情况
``` bash
<div id="shadow">
	<div id="pop"></div>
</div>

// js
$('#shadow').click(function(event){
	$('#pop').fadeOut(1500);
});
```
这时，当我点击pop层的时候，弹窗也会消失，虽然没有办法阻止事件捕获，但是我们可以阻止事件冒泡。在pop层阻止点击事件冒泡到shadow中。于是，点击pop层时弹窗就不会消失了。
``` bash
$('.pop').click(function(event){
	event.stopPropagation();
});
```