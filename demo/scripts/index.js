/**
 *  轮播图 banner
 */
banner();
function banner() {
	let timer = null,
		index = -1,
		$ulist = $(".wrap ul li"),
		$olist = $(".wrap .circle li");
	timer = setInterval(autoPlay, 2000);
	function autoPlay() {
		index++;
		if (index == $olist.size()) {
			index = 0;
		}
		$olist.eq(index).addClass("active").siblings().removeClass("active");
		$ulist.eq(index).animate({ left: 0 }, 1000, function () {
			$(this).css("zIndex", 0).siblings().css({ "zIndex": 1, "left": 1519 })
	 
	  
		});
	}

	$olist.mouseenter(function () {
		clearInterval(timer);
		index = $(this).index()-1;
		autoPlay();
	}).mouseleave(function () {
		timer = setInterval(autoPlay, 4000);
	})

}

/**
 * 选项卡
 */
choiceOne()
function choiceOne() {
	let $alist = $(".tabNav").children();
	let $bd = $(".bd");
	$alist.mouseenter(function () {
		$(this).addClass("selected").siblings().removeClass("selected");
		let index = $(this).index();
		$bd.eq(index).addClass("bd-list")
			.siblings()
			.removeClass("bd-list");
	})
}

/**
 *  轮播图smallBanner */
smallBanner();
function smallBanner(){
	let timer = 0; 
	let index = 0;
	//获取图片
	let $smallList = $(".hotSale_l ul li");
	// console.log( $smallList );
	//获取小圆
	let $oList =$(".circle1 li"); 
	// console.log($oList);
	autoPlay()
	timer = setInterval(autoPlay,2000);
	function autoPlay(){
		index++;
		if(index === $oList.size()){
            index =0;
		}
		$oList.eq(index).addClass("current").siblings().removeClass("current");
		$smallList.eq(index).animate({left:0},1500, function(){
			$(this).css("zIndex", 0).siblings().css({ "zIndex": 1, "left": 303 })
		});
	}
	$oList.hover(function(){
		clearInterval(timer);
		index =$(this).index()-1;
		autoPlay();
	}).mouseleave(function(){
		timer = setInterval(autoPlay,2000);
	})

}