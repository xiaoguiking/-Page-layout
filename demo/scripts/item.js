/**
 * 详情页item 
 * 放大镜
 */ 
$(function () {
  //获取下层的bottom li
  let $btmList = $("#bottom li");
  //获取small 的div
  let $small = $(".small");
  //获取小图
  let $smallImg = $small.children("img");
  //获取大图的div
  let $big = $("#big");
  //获取大图
  let $bigImg = $big.children('img');
  //获取阴影遮罩
  let $mask = $("#mask");
  //最大的div
  let $mirror = $('#mirror');
  let $phoneList = $(".phoneCol").children('img');

  //选项卡  操作小图
  $btmList.mouseenter(function () {
    let index = $(this).index();
    $smallImg.eq(index).show().siblings().hide();
    $bigImg.eq(index).show().siblings().hide();

  });
  /*购物操作小图*/
  $phoneList.click(function(){
    let index = $(this).index()-1;
    $smallImg.eq(index).show().siblings().hide();
    console.log( $smallImg.eq(index));
 });
  //鼠标操作小图区域
  $small.on({
    "mouseenter": function () {
      $big.show();
      $mask.show();
    },
    "mouseleave": function () {
      $big.hide();
      $mask.hide();
    },
    "mousemove": function (evt) {
      let e = evt || event;
      let x = e.pageX - $mirror.offset().left - $mask.width() / 2;
      let y = e.pageY - $mirror.offset().top - $mask.height()/ 2;
    
      
      /*边界线*/
      let maxL = $small.width() - $mask.width();
      let maxT = $small.height() - $mask.height();

      x = Math.min(Math.max(0, x), maxL);
      y = Math.min(Math.max(0, y), maxT);
      $mask.css({
        left: x,
        top: y
      })
      //大图宽度/小图宽度 = 
      // 大图显示区宽度 / mask显示区宽度 = 
      // 大图left / mask的left
      let bigImgLeft = x * $big.width() / $mask.width() ;
      let bigImgTop = y * $big.height() / $mask.height();
    
      $bigImg.css({
        left: -bigImgLeft ,
        top: -bigImgTop
      })
    }
  })
})

// 选项卡
choiceTwo ()
function choiceTwo (){
  let $ctList = $(".ct-nav li");
  let $ct = $(".ct");
  $ctList.mouseenter(function(){
     let index = $(this).index();
     $ct.eq(index).addClass('active').siblings().removeClass("active")
                  
  });

}

