var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        //private myConvas:HTMLCanvasElement;
        this.displayArray = [];
    }
    // constructor(myConvas){
    //     this.myConvas = myConvas;
    // }
    DisplayObjectContainer.prototype.drawIt = function (contextId) {
        for (var _i = 0, _a = this.displayArray; _i < _a.length; _i++) {
            var a = _a[_i];
            a.drawIt(contextId);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (disaplayContainer) {
        this.displayArray.push(disaplayContainer);
    };
    return DisplayObjectContainer;
}());
var BitmapDraw = (function (_super) {
    __extends(BitmapDraw, _super);
    function BitmapDraw(x, y) {
        var _this = _super.call(this) || this;
        _this.x = x;
        _this.y = y;
        _this.img = new Image();
        return _this;
    }
    BitmapDraw.prototype.drawIt = function (contextId) {
        var _this = this;
        this.img.src = 'Bitmap.png';
        this.img.onload = function () {
            contextId.drawImage(_this.img, _this.x, _this.y);
        };
    };
    return BitmapDraw;
}(DisplayObjectContainer));
var TextDraw = (function (_super) {
    __extends(TextDraw, _super);
    function TextDraw(content, x, y) {
        var _this = _super.call(this) || this;
        _this.content = content;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    TextDraw.prototype.drawIt = function (contextId) {
        contextId.fillText(this.content, this.x, this.y);
    };
    return TextDraw;
}(DisplayObjectContainer));
window.onload = function () {
    var myCanvas = document.getElementById('Canvas');
    var context = myCanvas.getContext('2d');
    context.fillStyle = '#FF0000';
    context.font = '10px Arial';
    var container = new DisplayObjectContainer();
    var bitmap = new BitmapDraw(100, 100);
    var text = new TextDraw("Hahahahahaha!!!", 300, 300);
    container.addChild(bitmap);
    container.addChild(text);
    container.drawIt(context);
};
//# sourceMappingURL=main.js.map