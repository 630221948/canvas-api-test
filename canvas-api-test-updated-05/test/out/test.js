var canvas = document.getElementById("app");
var stage = engine.run(canvas);
var bitmap = new engine.Bitmap(10, 10);
var container = new engine.DisplayObjectContainer();
container.addChild(bitmap);
stage.addChild(container);
var speed = 10;
engine.Ticker.getInstance().register(function (deltaTime) {
    console.log("aaa");
    console.log(bitmap.x);
    container.x += 1;
    //bitmap.x +=1;
});
