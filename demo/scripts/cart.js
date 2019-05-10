/**
 * 购物车页面js 
 */
	window.onload = function(){
		//页面加载 获取购物车的数据  展示到页面上
		let storageTxt = localStorage.getItem("prolist");
		console.log(storageTxt);
		if( storageTxt != null ){
			let str = "";
			let storageArr = JSON.parse( storageTxt );
			storageArr.forEach( (shopinfo) => {
				str += '<div class="shop-item clearfix">'+
							'<p class="fl"><input type="checkbox" class="ck"/></p>'+
							'<img class="fl" src="images/list/'+ shopinfo.src +'" alt="" />'+
							'<p class="fl">'+ shopinfo.name +'</p>'+
							'<span class="fl">'+ shopinfo.price +'元</span>'+
							'<p class="fl count" '+
								'data-id="'+ shopinfo.id +'" '+
								'data-price="'+ shopinfo.price +'" data-count="'+ shopinfo.count +'"'+
								'data-name="'+ shopinfo.name +'" data-src="'+ shopinfo.src +'"'+
								'>'+
								'<span class="updateCount" data-number="1">+</span>'+
								'<span class="shop-count">'+ shopinfo.count +'</span>'+
								'<span class="updateCount" data-number="-1">-</span>'+
							'</p>'+
							'<em class="fl sumPrice">'+ (shopinfo.count * shopinfo.price) +'元</em>'+
							'<i class="fl delBtn">删除</i>'+
						'</div>';
			} )
			//显示数据到页面上
			$(".shoplist").html( str );
			
			//结算
			function jiesuan(){
				let money = 0;
				let count = 0;
				//结算被选中的复选框的商品数量和金额
				$(".ck:checked").each( function(){
					count += Number( $(this).parent().parent().find(".shop-count").html() );
					money += parseInt( $(this).parent().parent().find(".sumPrice").html() );
				} )
				//将得到的数据显示到页面上
				$(".count2").html( count );
				$(".money2").html( money );
			}
			//点击每一个复选框 完成结算功能
			$(".ck").click( function(){
				jiesuan();
			} )
			//全选
			$("#selectAll").click(function(){
				$(".ck").prop( "checked" , $(this).prop("checked") );
				jiesuan();
			})
			//删除 
			$(".shoplist").on( "click" , ".delBtn" , function(){
				//根据id确定要删除的商品   
				let pid = $(this).parent().find( ".count" ).data("id");
				storageArr.forEach( (pro,index) => {
					if( pid == pro.id ){
						//页面同步删除
						$(this).parent().remove();
						//操作数组删除
						storageArr.splice( index,1 );
						//重新将修改后的数组存入到数据库中
						localStorage.setItem( "prolist" , JSON.stringify( storageArr ) );
						
						jiesuan();
						return;
					}
				} )
			} )
			
			//加减操作
			//思路 ： 确定当前操作的商品  根据编号
			$(".updateCount").click(function(){
				//获取当前操作的商品编号
				let pid = $(this).parent().data("id");
				
				//确认操作符号  使用data-number值确定
				let num = Number($(this).data("number"));
				
				//取出当前操作的商品数量
				let count =Number( $(this).parent().find(".shop-count").html() ) ;
				
				if( count === 1 && num === -1 ){
					return ;
				}
				//根据当前的编号去数据库（storage）中查找  找到后将该商品对应的数量count属性加1或减1
				storageArr.forEach( (pro) => {
					if( pid == pro.id ){
						//操作pro.count属性值 加 num
						pro.count += num;
						//将修改后的数组重新存入到数据库中
						localStorage.setItem( "prolist" , JSON.stringify( storageArr ) );
						//页面数据同步修改
						$(this).parent().find(".shop-count").html( pro.count );
						$(this).parent().next().html( pro.count * pro.price + "元" );
						jiesuan();
						return ;
					}
				} )
			})
		}
	}