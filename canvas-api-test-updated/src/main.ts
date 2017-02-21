interface Drawable {

    drawIt(context: CanvasRenderingContext2D): void;

}


class DisplayObjectContainer implements Drawable {
    public x;
    public y;
    public rotation = 0;
    public scaleX = 1;
    public scaleY = 1;
    public globalAlpha = 1;
    public alpha = 1;
    public globalMatrix;
    private displayArray: DisplayObject[] = [];

    constructor() {
        this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
    }

    public get localMatrix() {                                                                 //得到localMatri
        var tempMatrix = new math.Matrix();
        tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        return tempMatrix;
    }

    public addChild(displayObject: DisplayObject) {
        displayObject.globalAlpha = this.globalAlpha * this.alpha;
        displayObject.globalMatrix = math.matrixAppendMatrix(this.globalMatrix, this.localMatrix);
        this.displayArray.push(displayObject);
    }

    public drawIt(context: CanvasRenderingContext2D) {
        for (var a of this.displayArray) {
            a.globalAlpha = this.globalAlpha * this.alpha;
            a.globalMatrix = math.matrixAppendMatrix(this.globalMatrix, this.localMatrix);
            a.drawIt(context);
        }
    }
}

class DisplayObject implements Drawable {
    public x;
    public y;
    public rotation = 0;
    public scaleX = 1;
    public scaleY = 1;
    public globalAlpha = 1;
    public alpha = 1;
    public globalMatrix;
    //public localMatrix;

    public drawIt(context: CanvasRenderingContext2D) { };

    public get localMatrix() {                                                                 //控制平移旋转
        var tempMatrix = new math.Matrix();
        tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        return tempMatrix;
    }

    public getTransform() {
        //this.localMatrix = new math.Matrix(1, 0, 0, 1, x, y);
        var tempMatrix = math.matrixAppendMatrix(this.globalMatrix, this.localMatrix);
        return tempMatrix;
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
        this.img = new Image();
        //this.localMatrix = new math.Matrix(1, 0, 0, 1, x, y);
    }

    public drawIt(context: CanvasRenderingContext2D) {
        var tempMatrix = this.getTransform();
        if (this.isLoaded == true) {
            context.globalAlpha = this.globalAlpha * this.alpha;
            context.setTransform(tempMatrix.a, tempMatrix.b, tempMatrix.c, tempMatrix.d, tempMatrix.tx, tempMatrix.ty);
            context.drawImage(this.img, 0, 0);
        } else {
            this.img.src = 'Bitmap.png'
            this.img.onload = () => {
                context.globalAlpha = this.globalAlpha * this.alpha;
                context.setTransform(tempMatrix.a, tempMatrix.b, tempMatrix.c, tempMatrix.d, tempMatrix.tx, tempMatrix.ty);
                context.drawImage(this.img, 0, 0);
                this.isLoaded = true;
            }
        }
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
        context.globalAlpha = this.globalAlpha * this.alpha;
        var tempMatrix = this.getTransform();
        context.setTransform(tempMatrix.a, tempMatrix.b, tempMatrix.c, tempMatrix.d, tempMatrix.tx, tempMatrix.ty);
        context.fillText(this.content, 0, 0);
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

    setInterval(() => {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        container.x++;
        bitmap.rotation++;
        container.drawIt(context);
        console.log(context.transform);
    }, 50)


};