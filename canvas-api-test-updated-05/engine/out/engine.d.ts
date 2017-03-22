interface Drawable {
    update(): any;
}
declare abstract class DisplayObject implements Drawable {
    x: number;
    y: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    globalAlpha: number;
    alpha: number;
    globalMatrix: math.Matrix;
    localMatrix: math.Matrix;
    parent: DisplayObject;
    childrenList: DisplayObject[];
    localEventList: TouchingEvent[];
    touchEnable: boolean;
    type: string;
    constructor();
    abstract hitTest(x: number, y: number): DisplayObject;
    update(): void;
    addEventListener(touchingEventType: engine.TouchingEventType, react: (e?: MouseEvent) => void, useCapture?: boolean): void;
    removeEventListener(): void;
    dispatchEvent(touchingEventType: engine.TouchingEventType): void;
}
declare namespace engine {
    type MovieClipData = {
        name: string;
        frames: MovieClipFrameData[];
    };
    type MovieClipFrameData = {
        "image": string;
    };
    class Bitmap extends DisplayObject {
        img: HTMLImageElement;
        isLoaded: boolean;
        scaleX: number;
        scaleY: number;
        constructor(x: any, y: any);
        hitTest(x: any, y: any): this;
    }
    class MovieClip extends Bitmap {
        private advancedTime;
        private static FRAME_TIME;
        private static TOTAL_FRAME;
        private currentFrameIndex;
        private data;
        constructor(data: MovieClipData);
        ticker: (deltaTime: any) => void;
        play(): void;
        stop(): void;
        setMovieClipData(data: MovieClipData): void;
    }
}
declare namespace engine {
    class TextField extends DisplayObject {
        content: any;
        color: any;
        font: any;
        size: any;
        constructor(content: any, x: number, y: number);
        hitTest(x: number, y: number): this;
    }
}
declare namespace engine {
    class DisplayObjectContainer extends DisplayObject {
        constructor();
        addChild(displayObject: DisplayObject): void;
        update(): void;
        hitTest(x: number, y: number): DisplayObject;
    }
}
declare class EventController {
    private static instance;
    eventDispacherList: DisplayObject[];
    toDoEventList: TouchingEvent[];
    static getInstance(): EventController;
    executeEvent(e: MouseEvent): void;
}
declare class TouchingEvent {
    touchingEventType: engine.TouchingEventType;
    react: (e?: MouseEvent) => void;
    useCapture: boolean;
    constructor(touchingEvent: engine.TouchingEventType, react: (e?: MouseEvent) => void, useCapture?: boolean);
}
declare namespace engine {
    enum TouchingEventType {
        MOUSE_DOWN = 0,
        MOUSE_UP = 1,
        MOUSE_CLICK = 3,
        MOUSE_MOVE = 2,
    }
}
declare namespace math {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    class Rectangle {
        x: any;
        y: any;
        width: any;
        height: any;
        constructor(x: any, y: any, width: any, height: any);
        isPointInRectangle(point: Point): Point;
    }
    function isPointInRectangle(point: Point, rectangle: Rectangle): void;
    function pointAppendMatrix(point: Point, m: Matrix): Point;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m: Matrix): Matrix;
    function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix;
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        toString(): string;
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
    }
}
declare namespace engine {
    type Ticker_Listener_Type = (deltaTime: number) => void;
    class Ticker {
        private static instance;
        static getInstance(): Ticker;
        listeners: Ticker_Listener_Type[];
        register(listener: Ticker_Listener_Type): void;
        unregister(listener: Ticker_Listener_Type): void;
        notify(deltaTime: number): void;
    }
}
declare namespace engine {
    var run: (canvas: HTMLCanvasElement) => DisplayObjectContainer;
}
