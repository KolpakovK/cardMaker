var canvas = new fabric.Canvas('c',{
    backgroundColor: 'rgb(255,255,255)',
    preserveObjectStacking: true
});

canvas.setZoom(0.5)

let ShapeColor = "#000000";
let rectForName = new fabric.Rect({
    left: 40,
    top: 40,
    fill: "#ffffff",
    width: 900,
    height: 100,
    rx: 32,
    ry: 32,
    stroke : 'black',
    strokeWidth : 4
});
canvas.add(rectForName);
rectForName.selectable = false;



let rectForDescription = new fabric.Rect({
    left: 40,
    top: 996,
    fill: "#ffffff",
    width: 900,
    height: 500,
    rx: 32,
    ry: 32,
    stroke : 'black',
    strokeWidth : 4
});
canvas.add(rectForDescription);
rectForDescription.selectable = false;

let rectForPower = new fabric.Rect({
    left: canvas.width*2-250,
    top: canvas.height*2-115,
    fill: "#ffffff",
    width: 200,
    height: 90,
    rx: 32,
    ry: 32,
    stroke : 'black',
    strokeWidth : 4
});
canvas.add(rectForPower);
rectForPower.selectable = false;



let cardNameCanvas = new fabric.IText('Название карты',
{ 
    left: 70, top: 64,fontFamily: 'Jost',fontSize:48,fontWeight: 'bold',fill: "#111111"
});
canvas.add(cardNameCanvas);
cardNameCanvas.selectable = false;


let cardCostCanvas = new fabric.IText('1',
{ 
    left: canvas.width*2-96, top: 64,fontFamily: 'Jost',fontSize:48,fontWeight: 'bold',fill: "#111111"
});
canvas.add(cardCostCanvas);
cardCostCanvas.selectable = false;


let cardPowerCanvas = new fabric.IText('1/2',
{ 
    left: canvas.width*2-150,
    top: canvas.height*2-100,
    textAlign: 'center',
    originX: 'center',
    fontFamily: 'Jost',
    fontSize:54,
    fontWeight: 'normal',
    fill: "#111111"
});
canvas.add(cardPowerCanvas);
cardPowerCanvas.selectable = false;



let cardDescriptionCanvas = new fabric.Textbox('Описание карты',
{ 
    left: 70,
    top: 1020,
    fontFamily: 'Jost',
    fontSize:40,
    fill: "#111111",
    width:840
});
canvas.add(cardDescriptionCanvas);
cardDescriptionCanvas.selectable = false;



let cardImageSRC;
let cardBorderImageSRC;



function loadCardImage(e){
    if (cardImageSRC){
        canvas.remove(cardImageSRC);
    }
    var reader = new FileReader();
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            cardImageSRC = new fabric.Image(imgObj);
            cardImageSRC.set({
                angle: 0,
                top: 174,
                left: 40,
            });
            cardImageSRC.scaleToWidth(900);
            canvas.add(cardImageSRC);
            cardImageSRC.selectable = false;
            canvas.renderAll();
        }
    }
    reader.readAsDataURL(cardImage.files[0]);
}



function loadCardBorder(e){
    if (cardBorderImageSRC){
        canvas.remove(cardBorderImageSRC);
    }
    var reader = new FileReader();
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            cardBorderImageSRC = new fabric.Image(imgObj);
            cardBorderImageSRC.set({
                angle: 0,
                top: 0,
                left: 0,
            });
            cardBorderImageSRC.scaleToHeight(1540);
            cardBorderImageSRC.scaleToWidth(980);
            canvas.add(cardBorderImageSRC);
            canvas.sendToBack(cardBorderImageSRC)
            cardBorderImageSRC.selectable = false;
            canvas.renderAll();
        }
    }
    reader.readAsDataURL(cardBorderImage.files[0]);
}

function removeSelected(){
    canvas.remove(canvas.getActiveObject());
}

function addRect(){
    var rect = new fabric.Rect({
        left: 200,
        top: 200,
        fill: ShapeColor,
        width: 200,
        height: 200,
    });
    canvas.add(rect);
}

function changeColor(){
    ShapeColor = shapeColorInput.value;
    console.log(ShapeColor);
    if (canvas.getActiveObject()){
        canvas.getActiveObject().set('fill',ShapeColor);
        canvas.renderAll();
    }
}

function addCircle(){
    var rect = new fabric.Circle({
        left: 200,
        top: 200,
        fill: ShapeColor,
        radius: 200
    });
    canvas.add(rect);
}

function addText(){
    var text = new fabric.IText("Текст",{
        left: 200,
        top: 200,
        fill: ShapeColor,
        fontFamily: 'Jost',
        fontSize: 40
    });
    canvas.add(text);
}

function nameChange(){
    cardNameCanvas.set({text:cardName.value});
    canvas.renderAll();
}

function costChange(){
    cardCostCanvas.set({text:cardCost.value});
    canvas.renderAll();
}

function powerChange(){
    cardPowerCanvas.set({text:cardPower.value});
    canvas.renderAll();
}

function desckriptionChange(){
    cardDescriptionCanvas.set({text:cardDescription.value});
    canvas.renderAll();
}


function downloadCanvas(){
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('c').toDataURL()
    link.click();
}

function loadImage(){
    let imageNew;
    var reader = new FileReader();
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            imageNew = new fabric.Image(imgObj);
            imageNew.set({
                angle: 0,
                top: 0,
                left: 0,
            });
            imageNew.scaleToWidth(780);
            canvas.add(imageNew);
            canvas.renderAll();
        }
    }
    reader.readAsDataURL(customImage.files[0]);
}

function sendFront(){
    console.log("GoForward");
    canvas.bringForward(canvas.getActiveObject());
    canvas.renderAll();
}

function sendBack(){
    console.log("GoBackward");
    canvas.sendBackwards(canvas.getActiveObject());
    canvas.renderAll();
}