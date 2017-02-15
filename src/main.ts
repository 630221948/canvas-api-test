class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

interface Drawable {

    drawIt(contextId): void;


}



class DisplayObjectContainer implements Drawable {
    //private myConvas:HTMLCanvasElement;
    private displayArray: Drawable[] = [];

    // constructor(myConvas){
    //     this.myConvas = myConvas;
    // }
    public drawIt(contextId) {
        for (var a of this.displayArray) {
            a.drawIt(contextId);
        }
    }

    public addChild(disaplayContainer) {
        this.displayArray.push(disaplayContainer);
    }

}

class BitmapDraw extends DisplayObjectContainer {
    private x: number;
    private y: number;
    private img;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.img = new Image();
    }

    public drawIt(contextId) {
        this.img.src = 'Bitmap.png'
        this.img.onload = () => {
            contextId.drawImage(this.img, this.x, this.y);
        }
    }
}

class TextDraw extends DisplayObjectContainer {
    public content;
    public x: number;
    public y: number;

    constructor(content, x: number, y: number) {
        super();
        this.content = content;
        this.x = x;
        this.y = y;
    }

    public drawIt(contextId) {
        contextId.fillText(this.content,this.x,this.y);
    }
}

window.onload = () => {
    var myCanvas = document.getElementById('Canvas') as HTMLCanvasElement;
    var context = myCanvas.getContext('2d');
    context.fillStyle = '#FF0000';
    context.font = '10px Arial'

    var container = new DisplayObjectContainer();
    var bitmap = new BitmapDraw(100, 100);
    var text = new TextDraw("Hahahahahaha!!!", 300, 300);

    container.addChild(bitmap);
    container.addChild(text);
    container.drawIt(context);

};