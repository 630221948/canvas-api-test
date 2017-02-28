interface Drawable {

    drawIt(context: CanvasRenderingContext2D): void;

}


abstract class DisplayObject implements Drawable {
    public x;
    public y;
    public rotation = 0;
    public scaleX = 1;
    public scaleY = 1;
    public globalAlpha = 1;
    public alpha = 1;
    public globalMatrix: math.Matrix;
    public parent: DisplayObjectContainer;

    public abstract drawIt(context: CanvasRenderingContext2D);

    public abstract hitTest(x: number, y: number);

    public getGlobalMatrix() {
        return this.globalMatrix
    }

    public get localMatrix() {                                                                 //控制平移旋转
        var tempMatrix = new math.Matrix();
        tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        return tempMatrix;
    }

}

class DisplayObjectContainer extends DisplayObject {
    private displayArray: DisplayObject[] = [];

    constructor() {
        super();
        //this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
    }

    public getGlobalMatrix() {                                    ///////////////////////////////////
        if (this.parent) {
            //console.log('not a root!')
            return math.matrixAppendMatrix(this.localMatrix, this.parent.getGlobalMatrix());
        } else {
            //console.log('a root');
            return math.matrixAppendMatrix(this.localMatrix, new math.Matrix(1, 0, 0, 1, 0, 0));
        }
    }

    public addChild(displayObject: DisplayObject) {
        displayObject.parent = this;
        this.displayArray.push(displayObject);
    }

    public drawIt(context: CanvasRenderingContext2D) {
        for (var a of this.displayArray) {
            a.drawIt(context);
        }
    }

    public hitTest(x: number, y: number) {
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
    }
}

class BitmapDraw extends DisplayObject {
    public img: HTMLImageElement;
    public isLoaded = false;
    public scaleX = 1;
    public scaleY = 1;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.img = document.createElement('img');
    }

    public drawIt(context: CanvasRenderingContext2D) {
        this.globalAlpha = this.parent.globalAlpha * this.alpha;
        this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.getGlobalMatrix());
        if (this.isLoaded == true) {
            context.globalAlpha = this.globalAlpha * this.alpha;
            context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
            context.drawImage(this.img, 0, 0);
        } else {
            this.img.src = 'Bitmap.jpg'///////////////////////
            this.img.onload = () => {
                context.globalAlpha = this.globalAlpha * this.alpha;
                context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
                context.drawImage(this.img, 0, 0);
                this.isLoaded = true;
            }
        }
    }

    public hitTest(x, y) {
        var rect = new math.Rectangle(0, 0, 332, 208)                    //以矩形为坐标系进行判断，原点应为0，0
        var point = new math.Point(x, y);
        var invertMatrix = math.invertMatrix(this.localMatrix);
        var pointBaseOnThis = math.pointAppendMatrix(point,invertMatrix);
        return rect.isPointInRectangle(pointBaseOnThis);
    }
}

class TextDraw extends DisplayObject {
    public content;
    public color;
    public font;
    public size;

    constructor(content, x: number, y: number) {
        super();
        this.content = content;
        this.x = x;
        this.y = y;
    }

    public drawIt(context: CanvasRenderingContext2D) {
        this.globalAlpha = this.parent.globalAlpha * this.alpha;
        this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.getGlobalMatrix());
        context.globalAlpha = this.globalAlpha * this.alpha;
        context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        context.fillText(this.content, 0, 0);
    }

    public hitTest() {

    }
}

window.onload = () => {
    var myCanvas = document.getElementById('Canvas') as HTMLCanvasElement;
    var context = myCanvas.getContext('2d');
    context.fillStyle = '#FF0000';
    context.font = '10px Arial'

    var container = new DisplayObjectContainer();
    var canvasAlpha = context.globalAlpha;                     //context.globalAlpha会变化，用canvasAlpha代替
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

    setInterval(() => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        container.x++;
        bitmap.rotation++;
        stage.drawIt(context);
        window.onmousedown = (e) => {
            console.log(stage.hitTest(e.offsetX, e.offsetY));
        }
    }, 50)



    //console.log(container.hitTest(110,0));

};