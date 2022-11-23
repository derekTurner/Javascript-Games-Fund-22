import {setSceneIndex}        from "./createScenes.js";

export default function guiScene(engine) {
    var guiScene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), guiScene);
   

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI",true);


    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "1");
        button1.left = "-100px";
        button1.top  =  "100px";
        button1.width = "100px"
        button1.height = "40px";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "green";
        button1.onPointerUpObservable.add(function() {
            setSceneIndex(0);
        });
        advancedTexture.addControl(button1);    

    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "2");
        button2.left = "000px";
        button2.top  =  "100px";
        button2.width = "100px"
        button2.height = "40px";
        button2.color = "white";
        button2.cornerRadius = 20;
        button2.background = "green";
        button2.onPointerUpObservable.add(function() {
            setSceneIndex(1);
        });
        advancedTexture.addControl(button2);  

    var button3 = BABYLON.GUI.Button.CreateSimpleButton("but3", "3");
        button3.left = "100px";
        button3.top  =  "100px";
        button3.width = "100px"
        button3.height = "40px";
        button3.color = "white";
        button3.cornerRadius = 20;
        button3.background = "green";
        button3.onPointerUpObservable.add(function() {
            setSceneIndex(2);
        });
        advancedTexture.addControl(button3);  
        //guiScene.debugLayer.show();
    return guiScene;
}    