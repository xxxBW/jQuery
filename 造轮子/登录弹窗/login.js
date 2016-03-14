/*
* popWindow 0.1
* Date: 2016-03-14
* author: xxxBW
*/
;(function($){
$.fn.popWindow = function(options){
	// 属性，参数
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
		},
		// 遮罩层css
		shadowBoxCss: {
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			background: '#000',
			opacity: '0.7'
		},
		// 弹出框css
		loginBoxCss: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			width: '400px',
			height: '250px',
			'margin-top': '-125px',
			'margin-left': '-200px',
			border: '1px solid #ddd',
			background: '#fff',
			opacity: '1',
			'z-index': 1000
		},
		// 头部修饰
		loginHeadCss: {
			background: 'rgb(247,247,247)',
			padding: '10px'
		},
		loginTitleCss: {
			'font-size': '1.5em',
			color: 'rgb(102,102,102)'
		},
		// 表单样式
		loginFormCss: {
			margin: '10px'
		},
		inputCss: {
			width: '100%',
			height: '2em',
			'line-height': '2em',
			'margin-bottom': '1em'
		},
		sunmitButtonCss: {
			'font-size': '1.3em',
			width: '100%',
			height: '2em',
			'line-height': '2em',
			color: '#ffffff',
			border: 'none',
			'-moz-border-radius': '4px',
			'-webkit-border-radius': '4px',
			'border-radius': '4px',
			'margin-top': '1em',
			background: 'rgb(68,144,247)'
		}
	}
	var options = $.extend(defaults,options);
	this.each(function(){
		// 如果该类的div存在，则删除掉该div
		if($('.shadow-box')) {
			$('.shadow-box').remove();
		
		
		// 生成html结构
		var popWindow = '<div class="pop-box">' +
			'<div class="login-box">' +
				'<div class="login-head">' +
					'<h1 class="login-title">' + options.title + '</h1>' +
					'<a href="#"></a>' +
				'</div>' +
				'<form id="login-form">' +
					'<input type="text" class="input-box" id="name" placeholder="账号">' +
					'<input type="password" class="input-box" id="password" placeholder="密码">' +
					'<input type="submit" value="登录" id="submit-button">' +
				'</form>' +
			'</div>' +
			'<div class="shadow-box"></div>' +
		'</div>';
		
		// 添加样式
		$('body').append(popWindow);
		$('.pop-box').css(defaults.popBoxCss);
		$('.shadow-box').css(defaults.shadowBoxCss);
		$('.login-box').css(defaults.loginBoxCss);
		$('.login-head').css(defaults.loginHeadCss);
		$('.login-title').css(defaults.loginTitleCss);
		$('#login-form').css(defaults.loginFormCss);
		$('.input-box').css(defaults.inputCss);
		$('#submit-button').css(defaults.sunmitButtonCss);
		
		// 显示弹窗
		$(this).click(function(){
			$('.pop-box').fadeIn(1500);
			$(document.body).css('overflow','hidden');
		});
		
		// 阻止事件冒泡，防止点击登录窗口的事件冒泡到遮罩层
		
		$('.login-box').click(function(event){
			event.stopPropagation();
		});

		// 隐藏弹窗
		$('.shadow-box').click(function(event){
			$('.pop-box').fadeOut(1500);
			$(document.body).css('overflow','auto');
		});
	});
};
})(jQuery);

