/**
 *  商品列表界面 
 */ 
window.onload = function(){
    //第一步 ： 获取服务器上的数据
    let deffered = $.ajax({
        type:"get",
        url:"http://127.0.0.1/demo/data.json?_id="+new Date().getTime(),
        async:true
    });
    deffered.done(function(json){
        let titleStr = "";
        let proList = [];
        let contStr = "";
        console.log(contStr);
        for( let attr in json ){
            titleStr += `<span classify=${attr}>${ json[attr].name }</span>`;
            proList = json[attr].list;
            if( proList ){
                for( let i = 0 ; i < proList.length ; i++ ){
                    let pro = proList[i];
                    contStr += `<li>
                               <a href="item.html?pid=${pro.id}&classify=${attr}">
                                   <img src="images/list/${pro.src}" alt="" />
                                   <p>${pro.name}</p>
                                   <p>${pro.price}</p>
                               </a>
                               <button data-id=${pro.id} data-name=${pro.name} data-src=${pro.src} data-price=${pro.price}>加入购物车</button>
                           </li>`
                }
            }
        }
        
        //显示标题内容
        $(".navcenter").html( titleStr );
        //显示内容列表
        $(".shoplist").html( contStr );
        
        // <a href="item.html?pid=${pro.id}&classify=${classify}"></a>
        //为商品类别标题添加鼠标移入事件  实现选项卡功能
        $(".navcenter").on("mouseenter" , "span" , function(){
            //获取当前操作的商品类别名称 id
            let classify = $(this).attr("classify");
            let proList = json[classify].list;
            let strCon = "";
            for( let i = 0 ; i < proList.length ; i++ ){
                let pro = proList[i];
                strCon += `<li>
                             <a href="item.html?pid=${pro.id}&classify=${classify}">
                               <img src="images/list/${pro.src}" alt="" />
                                   <p>${pro.name}</p>
                                   <p>${pro.price}</p>
                               </a>
                               <button data-id=${pro.id} data-name=${pro.name} data-src=${pro.src} data-price=${pro.price}>加入购物车</button>
                           </li>`
            }
            //显示对应内容列表
            $(".shoplist").html( strCon );
        })
    })
    
    //点击按钮 实现 添加购物车功能
    //数据进行 本地存储 
    //使用委托为按钮添加事件
    $(".shoplist").on( "click" , "button" , function(){
        let flag = true;//假设值为true时 可以向数组中添加新的商品 说明当前商品在购物车中不存在
        let	arr = [];//存多个商品
        let json = {
            "id" : $(this).data("id"),
            "src" : $(this).data("src"),
            "name" :$(this).data("name"),
            "price" :$(this).data("price"),
            "count" : 1
        };//存一个商品信息
        
        //先取出storage中的数据  判断是否有数据
        let storageTxt = localStorage.getItem("prolist");
        if( storageTxt != null ){
            arr = JSON.parse( storageTxt );//转成数组 先存入到arr数组中
            //判断当前加入的商品在购物车中是否存在  使用商品编号做比较
            
            arr.forEach( (pro) => {
                if( json.id==pro.id && json.name==pro.name ){
                    //说明json商品存在购物车中的  将该商品的数量加1
                    pro.count++;
                    flag = false;
                    return;
                }
            } )
        }
        
        if( flag ){
            //将对象存入到数组中
            arr.push( json );
        }
        
        //将数组存入到localStorage中
        localStorage.setItem( "prolist" , JSON.stringify( arr ) );
        
        if( !confirm( "跳转到购物车，请按取消按钮" ) ){
           location.href = "http://127.0.0.1/demo/cart.html"
        }
    } )
}
