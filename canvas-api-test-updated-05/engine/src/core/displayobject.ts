// TypeScript file

abstract class DisplayObject implements Drawable {
    public x = 0;
    public y = 0;
    public rotation = 0;
    public scaleX = 1;
    public scaleY = 1;
    public globalAlpha = 1;
    public alpha = 1;
    public globalMatrix: math.Matrix;
    public localMatrix: math.Matrix;
    public parent: DisplayObject;
    public childrenList: DisplayObject[] = [];
    public localEventList: TouchingEvent[] = [];
    public touchEnable: boolean = false;
    public type: string;

    // public abstract drawIt(context: CanvasRenderingContext2D);

    constructor(){
        this.globalMatrix = new math.Matrix();
        this.localMatrix = new math.Matrix();
        console.log("已创建显示对象");
    };

    public abstract hitTest(x: number, y: number): DisplayObject;

    // public getGlobalMatrix() {
    //     return this.globalMatrix
    // }

    // public get localMatrix() {                                                                 //控制平移旋转
    //     var tempMatrix = new math.Matrix();
    //     tempMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
    //     return tempMatrix;
    // }

    update() {
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            //console.log('not a root!')
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        } else {
            //console.log('a root');
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, new math.Matrix(1, 0, 0, 1, 0, 0));
        }

        if (this.parent) {
            this.globalAlpha = this.alpha * this.parent.globalAlpha;
        } else {
            this.globalAlpha = this.alpha;
        }
    }

    public addEventListener(touchingEventType: engine.TouchingEventType, react: (e?: MouseEvent) => void, useCapture?: boolean) {
        var listener: TouchingEvent;
        if (useCapture) {
            listener = new TouchingEvent(touchingEventType, react, useCapture);
        } else {
            listener = new TouchingEvent(touchingEventType, react);
        }
        this.localEventList.push(listener);
    }

    public removeEventListener() {

    }

    public dispatchEvent(touchingEventType: engine.TouchingEventType) {
        for (var i = 0; i < this.localEventList.length; i++) {
            if (touchingEventType == this.localEventList[i].touchingEventType) {
                if (this.localEventList[i].useCapture) {
                    EventController.getInstance().toDoEventList.unshift(this.localEventList[i]);
                } else {
                    EventController.getInstance().toDoEventList.push(this.localEventList[i]);
                }
            }
        }
    }

}
