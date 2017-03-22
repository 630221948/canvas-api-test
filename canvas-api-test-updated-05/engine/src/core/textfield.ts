// TypeScript file
namespace engine {

    export class TextField extends DisplayObject {
        public content;
        public color;
        public font;
        public size;

        constructor(content, x: number, y: number) {
            super();
            this.type = "TextField"
            this.content = content;
            this.x = x;
            this.y = y;
        }

        // public drawIt(context: CanvasRenderingContext2D) {
        //     this.globalAlpha = this.parent.globalAlpha * this.alpha;
        //     this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        //     context.globalAlpha = this.globalAlpha * this.alpha;
        //     context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        //     context.fillText(this.content, 0, 0);
        // }

        public hitTest(x: number, y: number) {
            return this;
        }
    }

}