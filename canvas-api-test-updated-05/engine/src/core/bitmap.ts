// TypeScript file

namespace engine {

    export type MovieClipData = {

        name: string,
        frames: MovieClipFrameData[]
    }

    export type MovieClipFrameData = {
        "image": string
    }

    export class Bitmap extends DisplayObject {
        public img: HTMLImageElement;
        public isLoaded = false;
        public scaleX = 1;
        public scaleY = 1;

        constructor(x, y) {
            super();
            this.type = "Bitmap"
            this.x = x;
            this.y = y;
            this.img = document.createElement('img');
        }

        // public drawIt(context: CanvasRenderingContext2D) {
        //     this.globalAlpha = this.parent.globalAlpha * this.alpha;
        //     this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.getGlobalMatrix());
        //     if (this.isLoaded == true) {
        //         console.log("已加载")
        //         context.globalAlpha = this.globalAlpha * this.alpha;
        //         context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        //         context.drawImage(this.img, 0, 0);
        //     } else {
        //         this.img.src = 'Bitmap.jpg'///////////////////////
        //         this.img.onload = () => {
        //             console.log("加载中")
        //             context.globalAlpha = this.globalAlpha * this.alpha;
        //             context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        //             context.drawImage(this.img, 0, 0);
        //             this.isLoaded = true;
        //         }
        //     }
        // }

        public hitTest(x, y) {
            var rect = new math.Rectangle(0, 0, 332, 208)                    //以矩形为坐标系进行判断，原点应为0，0
            var point = new math.Point(x, y);
            var invertMatrix = math.invertMatrix(this.localMatrix);
            var pointBaseOnThis = math.pointAppendMatrix(point, invertMatrix);
            var resultPoint = rect.isPointInRectangle(pointBaseOnThis);
            if (resultPoint) {
                return this;
            } else {
                return null;
            }
        }
    }

    export class MovieClip extends Bitmap {

        private advancedTime: number = 0;

        private static FRAME_TIME = 20;

        private static TOTAL_FRAME = 10;

        private currentFrameIndex: number;

        private data: MovieClipData;

        constructor(data: MovieClipData) {
            super(0,0);
            this.setMovieClipData(data);
            this.play();
        }

        ticker = (deltaTime) => {
            // this.removeChild();
            this.advancedTime += deltaTime;
            if (this.advancedTime >= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME) {
                this.advancedTime -= MovieClip.FRAME_TIME * MovieClip.TOTAL_FRAME;
            }
            this.currentFrameIndex = Math.floor(this.advancedTime / MovieClip.FRAME_TIME);

            let data = this.data;

            let frameData = data.frames[this.currentFrameIndex];
            let url = frameData.image;
        }

        play() {
            Ticker.getInstance().register(this.ticker);
        }

        stop() {
            Ticker.getInstance().unregister(this.ticker)
        }

        setMovieClipData(data: MovieClipData) {
            this.data = data;
            this.currentFrameIndex = 0;
            // 创建 / 更新 

        }
    }
}