var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.globalAlpha = 1;
        this.alpha = 1;
    }
    DisplayObject.prototype.getGlobalMatrix = function () {
        return this.globalMatrix;
    };
    Object.defineProperty(DisplayObject.prototype, "localMatrix", {
        get: function () {
            var tempMatrix = new math.Matrix();
            tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            return tempMatrix;
        },
        enumerable: true,
        configurable: true
    });
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        var _this = _super.call(this) || this;
        _this.displayArray = [];
        return _this;
        //this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
    }
    DisplayObjectContainer.prototype.getGlobalMatrix = function () {
        if (this.parent) {
            //console.log('not a root!')
            return math.matrixAppendMatrix(this.localMatrix, this.parent.getGlobalMatrix());
        }
        else {
            //console.log('a root');
            return math.matrixAppendMatrix(this.localMatrix, new math.Matrix(1, 0, 0, 1, 0, 0));
        }
    };
    DisplayObjectContainer.prototype.addChild = function (displayObject) {
        displayObject.parent = this;
        this.displayArray.push(displayObject);
    };
    DisplayObjectContainer.prototype.drawIt = function (context) {
        for (var _i = 0, _a = this.displayArray; _i < _a.length; _i++) {
            var a = _a[_i];
            a.drawIt(context);
        }
    };
    DisplayObjectContainer.prototype.hitTest = function (x, y) {
        for (var i = this.displayArray.length - 1; i >= 0; i--) {
            var child = this.displayArray[i];
            var point = new math.Point(x, y);
            var invertMatrix = math.invertMatrix(this.localMatrix);
            var pointBaseOnThis = math.pointAppendMatrix(point, invertMatrix);
            var hitTestResult = child.hitTest(pointBaseOnThis.x, pointBaseOnThis.y);
            if (hitTestResult) {
                return hitTestResult;
            }
        }
        return null;
    };
    return DisplayObjectContainer;
}(DisplayObject));
var BitmapDraw = (function (_super) {
    __extends(BitmapDraw, _super);
    function BitmapDraw(x, y) {
        var _this = _super.call(this) || this;
        _this.isLoaded = false;
        _this.scaleX = 1;
        _this.scaleY = 1;
        _this.x = x;
        _this.y = y;
        _this.img = document.createElement('img');
        return _this;
    }
    BitmapDraw.prototype.drawIt = function (context) {
        var _this = this;
        this.globalAlpha = this.parent.globalAlpha * this.alpha;
        this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.getGlobalMatrix());
        if (this.isLoaded == true) {
            context.globalAlpha = this.globalAlpha * this.alpha;
            context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
            context.drawImage(this.img, 0, 0);
        }
        else {
            this.img.src = 'Bitmap.jpg'; ///////////////////////
            this.img.onload = function () {
                context.globalAlpha = _this.globalAlpha * _this.alpha;
                context.setTransform(_this.globalMatrix.a, _this.globalMatrix.b, _this.globalMatrix.c, _this.globalMatrix.d, _this.globalMatrix.tx, _this.globalMatrix.ty);
                context.drawImage(_this.img, 0, 0);
                _this.isLoaded = true;
            };
        }
    };
    BitmapDraw.prototype.hitTest = function (x, y) {
        var rect = new math.Rectangle(0, 0, 332, 208); //以矩形为坐标系进行判断，原点应为0，0
        var point = new math.Point(x, y);
        var invertMatrix = math.invertMatrix(this.localMatrix);
        var pointBaseOnThis = math.pointAppendMatrix(point, invertMatrix);
        return rect.isPointInRectangle(pointBaseOnThis);
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
        this.globalAlpha = this.parent.globalAlpha * this.alpha;
        this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.getGlobalMatrix());
        context.globalAlpha = this.globalAlpha * this.alpha;
        context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        context.fillText(this.content, 0, 0);
    };
    TextDraw.prototype.hitTest = function () {
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
    var stage = new DisplayObjectContainer();
    stage.x = 0;
    stage.y = 0;
    var bitmap = new BitmapDraw(50, 0);
    //bitmap.scaleX = 0.3;
    //bitmap.scaleY = 0.3;
    //bitmap.alpha = 0.5;
    var text = new TextDraw("Hahahahahaha!!!", 300, 300);
    container.x = 50;
    container.y = 0;
    //container.alpha = 0.5;
    //container.scaleX = 0.3;
    //container.scaleY = 0.3;
    container.addChild(bitmap);
    //container.addChild(text);
    container.drawIt(context);
    stage.addChild(container);
    stage.drawIt(context);
    // setInterval(() => {
    //     context.setTransform(1, 0, 0, 1, 0, 0);
    //     context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    //     //container.x++;
    //     //bitmap.rotation++;
    //     container.drawIt(context);
    //     window.onmousedown = (e) => {
    //         console.log(container.hitTest(e.offsetX, e.offsetY));
    //     }
    // }, 50)
    setInterval(function () {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        container.x++;
        bitmap.rotation++;
        stage.drawIt(context);
        window.onmousedown = function (e) {
            console.log(stage.hitTest(e.offsetX, e.offsetY));
        };
    }, 50);
    //console.log(container.hitTest(110,0));
};
//# sourceMappingURL=main.js.map