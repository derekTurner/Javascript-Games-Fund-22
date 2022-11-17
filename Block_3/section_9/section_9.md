# Moving a mesh by keyboard action

A mesh can be added to a scene using the BABYLON.SceneLoader.ImportMesh(meshNames, rootUrl, sceneFilename, scene, onSuccess, onProgress, onError, message: , pluginExtension)) The parameters are optional so in this example only the first 5 are used.

This example prepares a scene with a single mesh which can be manipulated by the wasd keys of the arrow keys.

The item in **createScene1.js** is a variable declared as an empty array.  This will be global within the module described in this file, but the values will not be available within other modules.  So similarly named variables in multiple createSceneN.js modules would not be in conflict.

```javascript
var keyDownMap =[];
```
The keyDownMap array will store the state of keyboard presses which are monitored by a scene action manager.

Only one scene action manager is needed.

```javascript
function actionManager(scene){
    scene.actionManager = new BABYLON.ActionManager(scene);
```

An action can then be registered with the with this action manager. This will be an execute code action stating what condition will trigger the execution of the code.  The trigger condition can be filtered by parameters.  The code to be executed is then stated as a function.

The first execute code action to be registered is triggered by an `onKeyDownTrigger` which genereates an event when a key is pressed.  If you wanted to limit the triggering to a single key, this could be added as a parameter.  This is illustrated for the 'w' key, but that is commented out so that all keys trigger an event `evt`.

The function makes an entry in the keyDownMaw indexed by the key pressed and sets this to true.  So for example keyDownMap["w"] = true when the "w" key is pressed.  

If two keys are pressed there will be two entries in the array so possibly  keyDownMap["w"] = true and also keyDownMap["a"] = true.

```javascript
      new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyDownTrigger,
            //parameters: 'w'      
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = true; }
        )
    );
```

An execute code action which is triggered when a key is released is then also registered with the actionManager.

This will set the array entry for that key to false.  So, on raising the "w" key keyDownMap["w"] = false.

The scene action manager is returned at the end of the actionManager function.

```javascript
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyUpTrigger
            
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = false; }
        )
    );
    return scene.actionManager;
```

The function importMesh() ises a BABYLON.SceneLoader.ImportMesh() function to load a mesh which is in this case in the .babylon format.  The last argument in the function is a function which will be run on the successful loading of the `newMeshes`. This function has another optional parameter of `skeletons`, but this is not required here.

The function then reads the first array member newMesh[0] into a convenient local variable.

This then adds an anonymous function to the list of functions which the scene will render before each frame.

Note that the although the function refers to the mesh positions and rotations it is not a property or method of the imported mesh but is a feature of the scene.

```javascript
function importMesh(scene, x, y) {
    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes) {
        let mesh = newMeshes[0];
        scene.onBeforeRenderObservable.add(()=> {
```
The details of the function inspect the state of the keyDownMap and increment the position and set the degree of rotation to move the mesh.  Note that the keyDownMap is only read not written, so as long as a listed key is pressed the position will be incremented once per frame.

To make a "one shot" version, the keyDownMap could be cleared at the end of the function.

Finaly the mesh plugin is returned  at the close of the importMesh() function.

```javascript
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                mesh.position.z += 0.1;
                mesh.rotation.y = 0;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                mesh.position.x -= 0.1;
                mesh.rotation.y = 3 * Math.PI / 2;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                mesh.position.z -= 0.1;
                mesh.rotation.y = 2 * Math.PI / 2;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                mesh.position.x += 0.1;
                mesh.rotation.y = Math.PI / 2;
            }
        });
    });
    return item
}    
```

As an addition to the scene audio is added from an mp3 file which will start automatically and loop continuously.

It is a policy of browsers not to allow audio to autoplay, so some browsers will force you to click an icon to allow the audio to play.

```javascript
function backgroundMusic(scene){
    let music = new BABYLON.Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    return music;
}
```
Mote that the camera is usually controlled by the arrow keys, so to prevent this the camera controls are not attached.

```javascript
    //camera.attachControl(true);
```

The result is that the character can be moved by the usual keys.  Try pressing "w" and "a" for diagonal motion.

<iframe 
    height="460" 
    width="100%" 
    scrolling="no" 
    title="Mesh wasd" 
    src="Block_3/section_9/ex_01_player_motion/showScene1.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>

