// window.onload = () => {
//     var myCanvas = document.getElementById('Canvas') as HTMLCanvasElement;
//     var context = myCanvas.getContext('2d');
//     context.fillStyle = '#FF0000';
//     context.font = '10px Arial'

//     var container = new DisplayObjectContainer();
//     var canvasAlpha = context.globalAlpha;                     //context.globalAlpha会变化，用canvasAlpha代替
//     container.globalAlpha = canvasAlpha;

//     var stage = new DisplayObjectContainer();
//     stage.x = 0;
//     stage.y = 0;

//     var bitmap = new Bitmap(50, 0);
//     //bitmap.scaleX = 0.3;
//     //bitmap.scaleY = 0.3;
//     //bitmap.alpha = 0.5;
//     var text = new TextField("Hahahahahaha!!!", 300, 300);

//     container.x = 50;
//     container.y = 0;
//     //container.alpha = 0.5;
//     //container.scaleX = 0.3;
//     //container.scaleY = 0.3;
//     container.addChild(bitmap);
//     //container.addChild(text);
//     container.drawIt(context);

//     stage.addChild(container);
//     stage.drawIt(context);

//     // setInterval(() => {
//     //     context.setTransform(1, 0, 0, 1, 0, 0);
//     //     context.clearRect(0, 0, myCanvas.width, myCanvas.height);
//     //     //container.x++;
//     //     //bitmap.rotation++;
//     //     container.drawIt(context);
//     //     window.onmousedown = (e) => {
//     //         console.log(container.hitTest(e.offsetX, e.offsetY));
//     //     }
//     // }, 50)

//     // setInterval(() => {
//     //     context.setTransform(1, 0, 0, 1, 0, 0);
//     //     context.clearRect(0, 0, myCanvas.width, myCanvas.height);
//     //     container.x++;
//     //     bitmap.rotation++;
//     //     stage.drawIt(context);
//     //     window.onmousedown = (e) => {
//     //         console.log(stage.hitTest(e.offsetX, e.offsetY));
//     //     }
//     // }, 50)


//     container.addEventListener(TouchingEventType.MOUSE_DOWN, (e) => {
//         var x = e.offsetX;
//         var y = e.offsetY;
//         // for(var i of container.childrenList){
//         //     i.touchEnable = true
//         // }
//         console.log("MouseDownPos:" + "(" + x + "," + y + ")");
//     })

//     container.addEventListener(TouchingEventType.MOUSE_MOVE, (e) => {
//         context.clearRect(0, 0, myCanvas.width, myCanvas.height);
//         container.x += e.movementX;
//         container.y += e.movementY;
//         stage.drawIt(context);
//     })

//     container.addEventListener(TouchingEventType.MOUSE_UP, (e) => {
//         var x = e.offsetX;
//         var y = e.offsetY;
//         // for(var i of container.childrenList){
//         //     i.touchEnable = true
//         // }
//         console.log("MouseUpPos:" + "(" + x + "," + y + ")");
//     })

//     var react = (e: MouseEvent, touchingEventType: TouchingEventType) => {
//         var x = e.offsetX;
//         var y = e.offsetY;
//         var target = stage.hitTest(x, y);
//         var currentTarget = target;
//         var testToDoEventList: TouchingEvent[] = [];

//         if (currentTarget) {
//             currentTarget.dispatchEvent(touchingEventType);
//             while (currentTarget.parent) {
//                 currentTarget = currentTarget.parent;
//                 currentTarget.dispatchEvent(touchingEventType);
//             }
//             EventController.getInstance().executeEvent(e);
//             testToDoEventList = EventController.getInstance().toDoEventList;
//         } else {
//             console.log("Nothings Touched!")
//         }
//     }

//     //console.log(container.hitTest(110,0));
//     window.onmousedown = (e) => {
//         react(e, TouchingEventType.MOUSE_DOWN)

//         window.onmousemove = (e) => {
//             react(e, TouchingEventType.MOUSE_MOVE);
//         }

//         window.onmouseup = (e) => {
//             react(e, TouchingEventType.MOUSE_UP);

//             window.onmousemove = () => {
//             }
//             window.onmouseup = () => {
//             }
//         }

//     }

// };