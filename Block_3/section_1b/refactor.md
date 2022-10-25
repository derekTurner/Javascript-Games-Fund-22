## Refactor the basic example

The next step is to refactor the basic code into a Javascript modular code structure.  This will keep the scene code in a separate file and pave the way for multiple scene files.  A functional approach will be taken to the creation of scene elements.

### HTML file

The Babylon code will be presented on a web page named **index.html**

This starts by linking to the Babylon.js library elements which will be used.  This is more efficient than loading the entire Babylon.js library.

The script links are made to cdn.babylon.js rather than preview.babylon.js so that stable versions of the library are used. The preview libraries are most up to date, but may from time to time contain bugs.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

        <title>Babylon.js sample code</title>

        <!-- Babylon.js -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.2/dat.gui.min.js"></script>
        <script src="https://assets.babylonjs.com/generated/Assets.js"></script>
        <script src="https://cdn.babylonjs.com/ammo.js"></script>
        <script src="https://cdn.babylonjs.com/cannon.js"></script>
        <script src="https://cdn.babylonjs.com/Oimo.js"></script>
        <script src="https://cdn.babylonjs.com/earcut.min.js"></script>
        <script src="https://cdn.babylonjs.com/babylon.js"></script>
        <script src="https://cdn.babylonjs.com/materialsLibrary/babylonjs.materials.min.js"></script>
        <script src="https://cdn.babylonjs.com/proceduralTexturesLibrary/babylonjs.proceduralTextures.min.js"></script>
        <script src="https://cdn.babylonjs.com/postProcessesLibrary/babylonjs.postProcess.min.js"></script>
        <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.js"></script>
        <script src="https://cdn.babylonjs.com/serializers/babylonjs.serializers.min.js"></script>
        <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>
        <script src="https://cdn.babylonjs.com/inspector/babylon.inspector.bundle.js"></script>

```

Now overall style for the body and canvas are set.  In this refactored example the canvas will have a class name "index-canvas" and the style selector will use this rather than the unique reference ID used in the previous example.

```html
        <style>
            html,
            body {
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            #index-canvas {
                width: 100%;
                height: 100%;
                touch-action: none;
            }
        </style>
    </head>
    <body></body>
</html>
```
Finally the link to the index.js file is added after the end of the html content.  Placing the script link at this point ensures that the Document Object Model (DOM) exists before the scripts try to access it.

```html
<script src="js/index.js" type="module"></script>
```

### Javascript files

The two javascript files are placed in a folder named js.  The first, **index.js** will be the starting point for the code and within this code from the other module, **createStartScene.js** will be imported for use.

The html file only needs a single link to the index.js script.

**index.js**
```javascript
import createStartScene from "./createStartScene.js";
```
The Javascript modular structure gives complete separation of code into separate module files.  Any file which contains import of export statements is a module file.

The function createStartScene must be implemented in the file createStartScene.js and exported from there to be available to all other javascript modules.

The exported function name may match the file name, but this is not compulsory.

```javascript
const CanvasName = "index-canvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("background-canvas");
document.body.appendChild(canvas);
```
The canvas, in this case, is created dynamically within the document element named "canvas" so the html file did not need to have any canvas element explicitly defined.

The canvas is given a class name so that it can be referenced by the stylesheet.


```javascript
let eng = new BABYLON.Engine(canvas, true, null, true);
let startScene = createStartScene(eng);
eng.runRenderLoop(() => {
    startScene.scene.render();
});
```

Finally the minimum code required to create a Babylon engine and start a rendeloop based on the imported startScene is added to the the file.  

### The scene

Now within **createStartScene.js** the basic scene elements are all defined bu functions which will each return a single element: box, light, sphere. graound and camera.

The functions take an argument which passes in the scene to which the elements should be added.

In this case the properties of the elements such as box.position are all given hard coded values, but further values could be passed in through  additional arguments.


```javascript
function createBox(scene){
    let box = BABYLON.MeshBuilder.CreateBox("box", scene);
    box.position.y = 3;
    return box;
}
    
function createLight(scene){
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0),scene);
    light.intensity = 0.7;
    return light;
}
   
function createSphere(scene){
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;
    return sphere;
}
   
function createGround(scene){
    let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    return ground;
}

function createArcRotateCamera(scene){
    let camAlpha = -Math.PI / 2,
    camBeta  =  Math.PI / 2.5,
    camDist  =  10,
    camTarget = new BABYLON.Vector3(0, 0, 0); 
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}
```
Now a a createStartScene function is defined which when called will create an object which contains a scene and all its associated elements ready for rendering.

```javascript
export default function createStartScene(engine) {
    let that = {};
    let scene = that.scene = new BABYLON.Scene(engine);
    scene.debugLayer.show();

    let box = that.starbox = createBox(scene);
    let light = that.light = createLight(scene);
    let sphere = that.sphere = createSphere(scene);
    let ground = that.ground = createGround(scene);
    let camera = that.camera = createArcRotateCamera(scene);
    return that;
}
```

That provides a design pattern which can be carried through to other examples.

<iframe 
    height="600" 
    width="100%" 
    scrolling="no" 
    title="Refactored Basic Scene" 
    src="Block_3/section_1b/public/index.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>