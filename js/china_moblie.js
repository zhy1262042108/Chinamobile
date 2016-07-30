$(function(){
	var content_2_2=$(".content_2_2");
	var nav=$(".nav",$(".content_2_2")[0]);
	var xxk=$(".xxk");
	var images=$("a",$(".bannerbox")[0]);
	var lis=$(".btns",$(".btnbox")[0]);
	var win=$(".content_center")[0];
	var left=$(".Left")[0];
    var right=$(".Right")[0];
    var pre=$(".pre")[0];
    var nex=$(".nex")[0];
    var p1=$(".p1",$(".content3_l_1")[0])[0];
    var place=$(".place",$(".content3_l_1")[0])[0];
    var Lmove=$(".Lmove",$(".content_5_b_r")[0]);
	var box=$("ul",$(".yhcon")[0])[0];
	var lis1=$("li",$(".ydcx")[0])[0];
	var zxzx=$(".zxzx",$(".content_10")[0])[0];
	var cjwt=$(".cjwt",$(".content_10")[0])[0];
	var tsjy=$(".tsjy",$(".content_10")[0])[0];
	var aw=parseInt(getStyle(lis1,"width"));
	var pass=true;
    /*获取图片宽度*/
    var widths=parseInt(getStyle(win,"width"));
    /*初始化状态*/
    lis[0].style.background="#e40077";
	for (var i = 0; i < images.length; i++) {
		if (i==0) {
			continue;
		}
		images[i].style.left=widths+"px";
	}
	var index=0;
	var next=0;
	var flag=true;
	var t=setInterval(moveR,3000);
	var t1=setInterval(moveR1,3000);
    function moveR1(){
		var out=firstChild(box);
         animate(box,{left:-aw},Tween.Quad.easeIn,function(){
         	box.style.left=0;
         	out1=out.cloneNode(true);
         	box.removeChild(out);
            box.appendChild(out1);
            flag=true;
         })    
	}
	function moveL1(){
		var out=lastChild(box);
        out1=out.cloneNode(true);
		box.removeChild(out);
        appendBefore(out1,box);
        box.style.left=-aw+"px";
		animate(box,{left:0},function(){
			flag=true;
		});        
	}
	box.onmouseover=function(){
		clearInterval(t1);
	}
	box.onmouseout=function(){
		t1=setInterval(moveR1,3000);
	}
	pre.onclick=function(){
		if (flag) {
			moveL1();
			flag=false;	
		};
	}
	nex.onclick=function(){
		if (flag) {
			flag=false;	
			moveR1();
		}
	}
	function moveL(){
		// 更新next
		next--;
		// 判断边界
		if (next<0) {
			next=images.length-1;
		};
		lis[index].style.background="#ccc";
		lis[next].style.background="#e40077";
		// 让下一张图片就位
		images[next].style.left=-widths+"px";
		// 做动画，让下一张图片left：-widths；当前图片的left：0
		animate(images[index],{left:widths},Tween.Quad.easeIn,function(){flag=true;});
		animate(images[next],{left:0},Tween.Quad.easeIn,function(){flag=true;});
		// 更新index
		index=next;
	}
	function moveR(){
		// 更新next
		next++;
		// 判断边界
		if (next==images.length) {
			next=0;
		};
		lis[index].style.background="#ccc";
		lis[next].style.background="#e40077";
		// 让下一张图片就位
		images[next].style.left=widths+"px";
		// 做动画，让下一张图片left：-widths；当前图片的left：0
		animate(images[index],{left:-widths},Tween.Quad.easeIn,function(){flag=true;});
		animate(images[next],{left:0},Tween.Quad.easeIn,function(){flag=true;});

		// 更新index
		index=next;
	}
	win.onmouseover=function(){
		clearInterval(t);
	}
	win.onmouseout=function(){ 
		t=setInterval(moveR,3000);
	}
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onclick=function(){
			if (index==this.index) {return};//当连续点击当前图片的时候跳出来不执行任何事件
			if (this.index>index) {
                images[this.index].style.left=widths+"px";
		        animate(images[index],{left:-widths},Tween.Quad.easeIn,function(){flag=true;});
		        animate(images[this.index],{left:0},Tween.Quad.easeIn,function(){flag=true;});
		        lis[index].style.background="#ccc";
		        lis[this.index].style.background="#e40077";
			}else if(this.index<index){
				images[this.index].style.left=-widths+"px";
		        animate(images[index],{left:widths},Tween.Quad.easeIn,function(){flag=true;});
		        animate(images[this.index],{left:0},Tween.Quad.easeIn,function(){flag=true;});
		        lis[index].style.background="#ccc";
		        lis[this.index].style.background="#e40077";
			}
		    next=this.index;
		    index=this.index;   
	    }
	}
	right.onclick=function(){
		if (flag) {
			flag=false;
			moveR();
		};
				
	}
	left.onclick=function(){
		if (flag) {
			flag=false;
			moveL();
		};
				
	}
	
	for (var i = 0; i < content_2_2.length; i++) {
		content_2_2[i].index=i;
		content_2_2[i].onmouseover=function(){
			content_2_2[this.index].style.background="#eee";
			nav[this.index].style.color="#0085d0";
			xxk[this.index].style.display="block";
		}
		
		content_2_2[i].onmouseout=function(){
			for (var j = 0; j < xxk.length; j++) {
				content_2_2[j].style.background="#e4e4e4";
				nav[j].style.color="#666";
				xxk[j].style.display="none";
		    }	
		}
	}
	
	for (var i = 0; i < Lmove.length; i++) {
		Lmove[i].index=i;
		Lmove[i].onmouseover=function(){
			animate(Lmove[this.index],{left:69},250,Tween.Linear);
		}
		Lmove[i].onmouseout=function(){
			animate(Lmove[this.index],{left:79},250,Tween.Back.easeIn);
		}
	}
	p1.onclick=function(){
		if (pass) {
			pass=false;
			place.style.display="block";
		}else{
			place.style.display="none";
			pass=true;
		}
		
	}
	zxzx.onmouseover=function(){
		animate(zxzx,{left:-84},500)
	}
	zxzx.onmouseout=function(){
		animate(zxzx,{left:-20},500);
	}
	cjwt.onmouseover=function(){
		animate(cjwt,{left:-84},500)
	}
	cjwt.onmouseout=function(){
		animate(cjwt,{left:-20},500);
	}
	tsjy.onmouseover=function(){
		animate(tsjy,{left:-84},500)
	}
	tsjy.onmouseout=function(){
		animate(tsjy,{left:-20},500);
	}
	
})