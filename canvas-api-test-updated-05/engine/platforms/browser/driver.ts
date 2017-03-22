// TypeScript file
namespace engine {
    export var run = (canvas: HTMLCanvasElement) => {

        var stage = new DisplayObjectContainer();
        var context2D = canvas.getContext("2d");
        var renderer = new CanvasRenderer(stage,context2D);
        var lastNow = Date.now();
        var frameHandler = () => {
            var now = Date.now();
            var deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, 400, 400);
            //context2D.save();
            //stage.drawIt(context2D);
            stage.update();
            renderer.render();
            //context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        }

        window.requestAnimationFrame(frameHandler);

        window.onmousedown = () => {
            // stage.hitTest(100, 100);
        }

        return stage;

    }

    class CanvasRenderer {

        constructor(private stage: DisplayObjectContainer, private context2D: CanvasRenderingContext2D) {

        }

        render() {
            var stage = this.stage;
            var context2D = this.context2D;
            this.renderContainer(stage);
        }

        renderContainer(stage: DisplayObjectContainer) {
            for (var child of stage.childrenList) {

                this.context2D.globalAlpha = child.globalAlpha;
                var m = child.globalMatrix;
                this.context2D.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

                if (child.type == "DisplayObjectContainer") {
                    this.renderContainer(child as DisplayObjectContainer);
                } else if (child.type == "Bitmap") {
                    this.renderBitmap(child as Bitmap);
                } else if (child.type == "TextField") {
                    this.renderTextField(child as TextField);
                }
            }
        }

        renderBitmap(bitmap: Bitmap) {
            if (bitmap.isLoaded == true) {
                console.log("已加载")
                this.context2D.drawImage(bitmap.img, 0, 0);
            } else {
                bitmap.img.src = 'Bitmap.jpg'///////////////////////
                bitmap.img.onload = () => {
                    console.log("加载中")
                    this.context2D.drawImage(bitmap.img, 0, 0);
                    bitmap.isLoaded = true;
                }
            }
        }

        renderTextField(textField: TextField) {
            this.context2D.fillText(textField.content, 0, 0);
        }

    }


}