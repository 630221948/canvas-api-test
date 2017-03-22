// TypeScript file

namespace engine {
    
    export class DisplayObjectContainer extends DisplayObject {

        constructor() {
            super();
            this.type = "DisplayObjectContainer";
            //this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
        }

        // public getGlobalMatrix() {                                    ///////////////////////////////////
        //     if (this.parent) {
        //         //console.log('not a root!')
        //         return math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        //     } else {
        //         //console.log('a root');
        //         return math.matrixAppendMatrix(this.localMatrix, new math.Matrix(1, 0, 0, 1, 0, 0));
        //     }
        // }

        public addChild(displayObject: DisplayObject) {
            displayObject.parent = this;
            this.childrenList.push(displayObject);
        }

        // public drawIt(context: CanvasRenderingContext2D) {
        //     for (var a of this.childrenList) {
        //         a.drawIt(context);
        //     }
        // }

        public update(){
            super.update();
            for(var child of this.childrenList){
                child.update();
            }
        }

        public hitTest(x: number, y: number) {
            for (var i = this.childrenList.length - 1; i >= 0; i--) {
                var child = this.childrenList[i];
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
}