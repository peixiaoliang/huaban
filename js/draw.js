//第一个参数是绘制对象  第二个是获取画布
function palette(canvasObj,canvas){
   this.canvasObj=canvasObj;
   this.canvas=canvas;
   this.width=canvas.width;
   this.height=canvas.height;
   this.style="stroke"; 
   this.type="circle";
   this.canvasObj.fillStyle="#000000";
   this.canvasObj.strokeStyle="#000000";
   //保存每次截图的状态，也就是上一次绘制的图形   
   this.statusArr=[];   
}
palette.prototype.draw=function(){
      var that=this;
    this.canvas.onmousedown=function(e){
      var startX=e.offsetX;
      var startY=e.offsetY;
      document.onmousemove=function(e){
      	var endX=e.offsetX;
      	var endY=e.offsetY;
        that.canvasObj.clearRect(0,0,that.width,that.height);
        if(that.statusArr.length>0){
        that.canvasObj.putImageData(that.statusArr[that.statusArr.length-1],0,0,0,0,that.width,that.height);
        }
        that[that.type](startX,startY,endX,endY);
      }
      document.onmouseup=function(){
      	that.onmousedown=null;
      	document.onmousemove=null;
      	that.statusArr.push(that.canvasObj.getImageData(0,0,that.width,that.height));
      }
    }
}
// 画线条
palette.prototype.line=function(x1,y1,x2,y2){
  this.canvasObj.beginPath();
  this.canvasObj.moveTo(x1,y1);
  this.canvasObj.lineTo(x2,y2);
  this.canvasObj.closePath();
  this.canvasObj.stroke();
}
// 画矩形
palette.prototype.rect=function(x1,y1,x2,y2){
  var w=x2-x1;
  var h=y2-y1;
  this.canvasObj.beginPath();
  this.canvasObj.rect(x1,y1,w,h);
  this.canvasObj.closePath();
  this.canvasObj[this.style]();
}
// 画圆形
palette.prototype.circle=function(x1,y1,x2,y2){
  var r=x2-x1;
  this.canvasObj.beginPath();
  // this.canvasObj.moveTo(x1,y1);
  this.canvasObj.arc(x1,y1,r,0,Math.PI*2,false);
  this.canvasObj.closePath();
  this.canvasObj[this.style]();
}