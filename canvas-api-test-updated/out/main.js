var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.globalAlpha = 1;
        this.alpha = 1;
        this.displayArray = [];
        this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
    }
    Object.defineProperty(DisplayObjectContainer.prototype, "localMatrix", {
        get: function () {
            var tempMatrix = new math.Matrix();
            tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            return tempMatrix;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObjectContainer.prototype.addChild = function (displayObject) {
        displayObject.globalAlpha = this.globalAlpha * this.alpha;
        displayObject.globalMatrix = math.matrixAppendMatrix(this.globalMatrix, this.localMatrix);
        this.displayArray.push(displayObject);
    };
    DisplayObjectContainer.prototype.drawIt = function (context) {
        for (var _i = 0, _a = this.displayArray; _i < _a.length; _i++) {
            var a = _a[_i];
            a.globalAlpha = this.globalAlpha * this.alpha;
            a.globalMatrix = math.matrixAppendMatrix(this.globalMatrix, this.localMatrix);
            a.drawIt(context);
        }
    };
    return DisplayObjectContainer;
}());
var DisplayObject = (function () {
    function DisplayObject() {
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.globalAlpha = 1;
        this.alpha = 1;
    }
    //public localMatrix;
    DisplayObject.prototype.drawIt = function (context) { };
    ;
    Object.defineProperty(DisplayObject.prototype, "localMatrix", {
        get: function () {
            var tempMatrix = new math.Matrix();
            tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            return tempMatrix;
        },
        enumerable: true,
        configurable: true
    });
    DisplayObject.prototype.getTransform = function () {
        //this.localMatrix = new math.Matrix(1, 0, 0, 1, x, y);
        var tempMatrix = math.matrixAppendMatrix(this.globalMatrix, this.localMatrix);
        return tempMatrix;
    };
    return DisplayObject;
}());
var BitmapDraw = (function (_super) {
    __extends(BitmapDraw, _super);
    function BitmapDraw(x, y) {
        var _this = _super.call(this) || this;
        _this.isLoaded = false;
        _this.scaleX = 1;
        _this.scaleY = 1;
        _this.x = x;
        _this.y = y;
        _this.img = new Image();
        return _this;
        //this.localMatrix = new math.Matrix(1, 0, 0, 1, x, y);
    }
    BitmapDraw.prototype.drawIt = function (context) {
        var _this = this;
        var tempMatrix = this.getTransform();
        if (this.isLoaded == true) {
            context.globalAlpha = this.globalAlpha * this.alpha;
            context.setTransform(tempMatrix.a, tempMatrix.b, tempMatrix.c, tempMatrix.d, tempMatrix.tx, tempMatrix.ty);
            context.drawImage(this.img, 0, 0);
        }
        else {
            this.img.src = 'Bitmap.png';
            this.img.onload = function () {
                context.globalAlpha = _this.globalAlpha * _this.alpha;
                context.setTransform(tempMatrix.a, tempMatrix.b, tempMatrix.c, tempMatrix.d, tempMatrix.tx, tempMatrix.ty);
                context.drawImage(_this.img, 0, 0);
                _this.isLoaded = true;
            };
        }
    };
    return BitmapDraw;
}(DisplayObject));
var TextDraw = (function (_super) {
    __extends(TextDraw, _super);
    function TextDraw(content, x, y) {
        var _this = _super.call(this) || this;
        _this.content = content;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    TextDraw.prototype.drawIt = function (context) {
        context.globalAlpha = this.globalAlpha * this.alpha;
        var tempMatrix = this.getTransform();
        context.setTransform(tempMatrix.a, tempMatrix.b, tempMatrix.c, tempMatrix.d, tempMatrix.tx, tempMatrix.ty);
        context.fillText(this.content, 0, 0);
    };
    return TextDraw;
}(DisplayObject));
window.onload = function () {
    var myCanvas = document.getElementById('Canvas');
    var context = myCanvas.getContext('2d');
    context.fillStyle = '#FF0000';
    context.font = '10px Arial';
    var container = new DisplayObjectContainer();
    var canvasAlpha = context.globalAlpha; //context.globalAlpha会变化，用canvasAlpha代替
    container.globalAlpha = canvasAlpha;
    var bitmap = new BitmapDraw(100, 100);
    //bitmap.scaleX = 0.3;
    //bitmap.scaleY = 0.3;
    bitmap.alpha = 0.5;
    var text = new TextDraw("Hahahahahaha!!!", 300, 300);
    container.x = 0;
    container.y = 0;
    //container.alpha = 0.5;
    container.scaleX = 0.3;
    container.scaleY = 0.3;
    container.addChild(bitmap);
    container.addChild(text);
    container.drawIt(context);
    setInterval(function () {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        container.x++;
        bitmap.rotation++;
        container.drawIt(context);
        console.log(context.transform);
    }, 50);
};
//# sourceMappingURL=main.js.map