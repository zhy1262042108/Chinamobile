function getClass(select,context){
	var context=context?context:document;
	    if (document.getElementsByClassName) {
            return context.getElementsByClassName(select);
	    }else{
            var obj=context.getElementsByTagName("*");
            var arr=[];
            for (var j = 0; j < obj.length; j++) {
                if (checkClass(obj[j].className,select)) {
                    arr.push(obj[j]);
                };
            };
                return arr;
	    }
	}
function checkClass(className,select){
	var arr=className.split(" ");
	for (var i = 0; i < arr.length; i++) {
	    if (arr[i]==select) {
	        return true;
	    }
	}return false;
}
// function $(selector){
// 	if (selector.charAt(0)==".") {
// 		return getclass(selector.slice(1));
// 	}else if (selector.charAt(0)=="#") {
// 		return document.getElementById(selector.slice(1));
// 	}else if (/^[a-z][a-z1-6]{0,8}$/.test(selector)) {
// 		return document.getElementsByTagName(selector);
// 	}
// }

function $(selector,context){
	if (typeof selector=="string") {
		var context=context||document;
		if (selector.charAt(0)==".") {
		    return getClass(selector.slice(1));
	    }else if (selector.charAt(0)=="#") {
		    return document.getElementById(selector.slice(1));
	    }else if (/^[a-z][a-z1-6]{0,8}$/.test(selector)) {
		    return context.getElementsByTagName(selector);
	    }else if (/^<[a-z][a-z1-6]{0,8}>$/.test(selector)) {
	    	return document.createElement("div");
	    };
	}else if (typeof selector=="function") {
		/*window.onload=function(){
			selector();
		}*/
        addEvent(window,"load",selector);
	};	
}
/*
  getChlid(obj,attr)
  获取指定对象的属性
  obj：对象
  attr：对象的属性
*/
function getStyle(obj,attr){
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
/*
  getChild(obj,type)
  获取指定元素的子节点
  obj：指定的对象
  type：获取子节点的类型
  思路：
  第一步：获取所有的子节点
  第二步：声明一个空数组
  第三步：遍历所有的子节点
  第四步：返回数组
*/
function getChild(obj,type){
    var child=obj.childNodes;
    var type=type==undefined?true:type;
    var arr=[];
    for (var i = 0; i < child.length; i++) {
    	if (type===true) {
    		if (child[i].nodeType==1) {
        	    arr.push(child[i]);
            }
    	}else{
            if (child[i].nodeType==1||(child[i].nodeType==3&&!(/^\s+$/.test(child[i].nodeValue)))) {
        	    arr.push(child[i]);
            }
    	}  
    }
    return arr;
}
/*
获取第一个孩子节点
*/
function firstChild(obj,type){
	return getChild(obj,type)[0];
}
function lastChild(obj,type){
	var length=getChild(obj,type).length;
	return getChild(obj,type)[length-1];
}
function randomChild(obj,type,num){
	return getChild(obj,type)[num];
}
function nextSibling(obj){
	var next=obj.nextSibling;
	if (next==null) {
    	return false;
    }
    while(next.nodeType==8||next.nodeType==3) {
    	next=next.nextSibling;
    	if (next==null) {
    	    return false;
        }
    }
    return next;  
}
function previousSibling(obj){
	var previous=obj.previousSibling;
	if (previous==null) {
    	return false;
    }
    while(previous.nodeType==8||previous.nodeType==3) {
    	previous=previous.previousSibling;
    	if (previous==null) {
    	    return false;
        }
    }
    return previous;  
}
function nextText(obj){
	var next=obj.nextSibling;
	if (next==null) {
    	return false;
    }while(next.nodeType==8||next.nodeType==1||next.nodeType==2||next.nodeType==9||(next.nodeType==3&&(/^\s+$/.test(next.nodeValue)))) {
    	next=next.nextSibling;
    	if (next==null) {
    	    return false;
        }
    }
    return next; 
}
function previousText(obj){
	var previous=obj.previousSibling;
	if (previous==null) {
    	return false;
    }
    while(previous.nodeType==8||(previous.nodeType==3(/^\s+$/.test(previous.nodeValue)))) {
    	previous=previous.previousSibling;
    	if (previous==null) {
    	    return false;
        }
    }
    return previous; 
} 
/*
将obj插入到obj1的后面
obj：要插入的对象
obj1：之前的对象（孩子节点）
*/
function insertAfter(obj,obj1){
    var parent=obj1.parentNode;
    var next=nextSibling(obj1);
    if (next) {
    	parent.insertBefore(obj,next);
    }else{
    	parent.appendChild(obj);
    }
}
/*
将obj插入到obj1的前面
obj:要插入的对象
obj1：之前的对象（孩子节点）
*/
function insertBefore(obj,obj1){
    var parent=obj1.parentNode;
    parent.insertBefore(obj,obj1);
}
/*
把obj插入到obj1第一个孩子节点的前面
obj：要插入的对象节点
obj1：参考的父亲节点
*/
function appendBefore(obj,obj1){
	var first=firstChild(obj1);
	if (first) {
		obj1.insertBefore(obj,first);
	}else{
		obj1.appendChild(obj);
	}
}
/*
把obj插入到插入到最后
obj：要插入的对象
obj1：某一个孩子
*/
function appendAfter(obj,obj1){
    var parent=obj1.parentNode;
    parent.appendChild(obj);
}
function addEvent(obj,type,fn){
    if (obj.attachEvent) {
        obj.attachEvent("on"+type,fn);
    }else{
        obj.addEventListener(type,fn,false);
    }
}
