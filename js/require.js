 define([], function() {
    var getId = function(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    };

    function getPosition(o) {
        if (!(o && o.nodeName)) {
            return {
                left: 0,
                top: 0
            };
        }
        var t = parseInt(o.offsetTop, 10),
            l = parseInt(o.offsetLeft, 10);
        while (o.offsetParent) {
            o = o.offsetParent;
            t += o.offsetTop;
            l += o.offsetLeft;
        }
        return {
            left: l,
            top: t
        };
    }
    var canvas = getId('canvas'),
        ct = canvas.getContext('2d'),
        w = canvas.width = 600,
        h = canvas.height = 400;
    var bgl = ct.createRadialGradient(400, 0, 0, 400, 0, 400);
    bgl.addColorStop(0, 'red');
    bgl.addColorStop(1, 'green');
    ct.beginPath();

    function draw(ev) {
        console.log(getPosition(canvas));
        var x = ev.clientX - getPosition(canvas).left;
        var y = ev.clientY - getPosition(canvas).top;
        ct.lineTo(x, y);
        ct.stroke();
        console.log(x + '--' + y);
    }
    canvas.onmousedown = function(ev) {
        var x = ev.clientX - getPosition(canvas).left;
        var y = ev.clientY - getPosition(canvas).top;
        var size = getId('num').value;
        var color = getId('color').value;
        ct.save();
        ct.strokeStyle = color;
        ct.lineWidth = size;
        ct.beginPath();
        canvas.onmousemove = draw;
    };
    document.onmouseup = function(ev) {
        canvas.onmousemove = null;
        ct.closePath();
        //ct.fill();
        ct.restore();
    };
});
