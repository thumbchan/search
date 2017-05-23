
var searchModule=(function(){
	var $searchInp=$("#searchInp"),
	$searchList=$("#searchList");
	
	//向百度的服务器发送请求，把数据获取后绑定到容器中
	function bindHTML(){
		var searchKey=$searchInp.val();
		function callback(data){
			data=data["s"];
			var str='';
			$.each(data,function(index,item) {
				if(index<=3){
					str+='<li>'+item+'</li>';
				}
			});
			if(str.length===0){
				return;
			}
			$searchList.html(str).stop().slideDown(300);
		};
		$.ajax({
			type:"get",
			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + searchKey,
			dataType:'jsonp',
			jsonp:'cb',
			success:callback
		});
	}
	function init(){
		//文本框得到焦点或者输入内容判断是否有内容。
		$searchInp.on("focus keyup keydown",function(){
			var val=$(this).val();
			if(val.length>0){
				bindHTML();
				return;
			}
			$searchList.stop().slideUp(300);
		}).on("blur",function(){//失去焦点收起框
			$searchList.stop().slideUp(300);
		});
		//给li绑定方法，把当前li内容放入文本框并隐藏框
		$searchList.on("click",function(e){
			var tar=e.target;
			tarTag=tar.tagName.toUpperCase();
			$tar=$(tar);
			if (tarTag==="LI") {
				$searchInp.val($tar.html());
				$(this).stop().slideUp(300);
			}
		});
	}
	return {init:init};
})();
searchModule.init();











//https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=8&json=1&p=3&sid=&req=2&csor=1&cb=jQuery110204258730671197277_1495516923799&_=1495516923802