var canvas = new fabric.Canvas('c',{
    backgroundColor: 'rgb(255,255,255)',
    preserveObjectStacking: true
});

let ShapeColor = "#000000";
let rectForName = new fabric.Rect({
    left: 20,
    top: 20,
    fill: "#ffffff",
    width: 450,
    height: 50,
    rx: 16,
    ry: 16,
    stroke : 'black',
    strokeWidth : 2
});
canvas.add(rectForName);
rectForName.selectable = false;



let rectForDescription = new fabric.Rect({
    left: 20,
    top: 498,
    fill: "#ffffff",
    width: 450,
    height: 250,
    rx: 16,
    ry: 16,
    stroke : 'black',
    strokeWidth : 2
});
canvas.add(rectForDescription);
rectForDescription.selectable = false;



let cardNameCanvas = new fabric.Text('Название карты',
{ 
    left: 35, top: 32,fontFamily: 'Jost',fontSize:24,fontWeight: 'bold',fill: "#111111"
});
canvas.add(cardNameCanvas);
cardNameCanvas.selectable = false;



let cardDescriptionCanvas = new fabric.Textbox('Описание карты',
{ 
    left: 35,
    top: 510,
    fontFamily: 'Jost',
    fontSize:20,
    fill: "#111111",
    width:420
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
                height:380,
                width:450,
                top: 87,
                left: 20,
            });
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
            cardBorderImageSRC.scaleToHeight(770);
            cardBorderImageSRC.scaleToWidth(490);
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
        left: 100,
        top: 100,
        fill: ShapeColor,
        width: 20,
        height: 20,
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
        left: 100,
        top: 100,
        fill: ShapeColor,
        radius: 20
    });
    canvas.add(rect);
}

function addText(){
    var text = new fabric.IText("Текст",{
        left: 100,
        top: 100,
        fill: ShapeColor,
        fontFamily: 'Jost',
        fontSize: 20
    });
    canvas.add(text);
}

function nameChange(){
    cardNameCanvas.set({text:cardName.value});
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
            imageNew.scaleToWidth(390);
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