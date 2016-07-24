$(function(){
	var canvas=null;
	var copy=null;
	var parent=$(".pattern-box")
	$(".add").click(function(){
		var w=prompt('width',900)
		var h=prompt('height',600)
		canvas=$("<canvas>").attr({width:w,height:h})
		copy=$("<div>").css({
			width:w,height:h,
			position:"absolute",top:0,left:0,zIndex:999
		})
		parent.css({width:w,height:h, border:"1px solid red",background:"#fff"}).append(canvas).append(copy);
		pat();

	})
	function pat(){
		var palt=new palette(canvas[0].getContext("2d"),canvas[0],copy[0]);
		var div=$(".left>div");
		palt.draw();
		div.click(function(){
			var attr=$(this).attr('role');
	 	if(attr===undefined){
				return;
			}
			 if(attr=="pencil"){
			 	 palt.pencil();
			   }
			if(attr=='poly'){
				var num=prompt("请输入多边形变数",5);
				palt.type=attr;
				palt.bunm=num||5;
			} else if(attr=='polystar'){
				var num=prompt("请输入多边形变数",5);
				palt.type=attr;
				palt.jnum=num||5;
			}else if(attr=="fill"||attr=="stroke"){
                 palt.style=attr;
                 $(this).css({background:"red"})

			}else if(attr=="fillStyle"){
                $(this).find("input").change(function(){
                 	palt.fillStyle=this.value;
                 	  $(this).css({background:"red"})
                 })
			}else if(attr=="strokeStyle"){
                 $(this).find("input").change(function(){
                 	palt.strokeStyle=this.value;
                 	  $(this).css({background:"red"})
                 })
			}else if(attr=="num"){
                 $(this).find("input").change(function(){
                 	palt.lineWidth=this.value;
                 })
			}else{
			palt.type=attr;	

			}
			palt.draw();
			for (var i = 0; i < $(".iconfont").length; i++) {
				 $(this).eq(i).css({background:"red"})
			};
			$(this).css({background:"#B5C7DD"})

		   
	 	 	
		})
		$(".chexiao").click(function(){
				if(palt.status.length>1){
						palt.status.pop();
					palt.o.putImageData(palt.status[palt.status.length-1],0,0,0,0,palt.width,palt.height)
				}else if(palt.status.length==1){
					palt.status.pop();
					palt.o.clearRect(0,0,palt.width,palt.height);
				}else{
					alert("不能再撤销了")
				}
			})
	  $(".delelte").click(function(){
	  	var a=canvas[0].toDataURL();
	  	location.href=a.replace('image/jpg' ,'image/octet-stream')
	  
	  	// $("<img>").attr("src",a).appendTo("body");
	  })
		
	}
})