

function importMesh(scene, x, y) {
    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes, skeletons) {
        scene.onBeforeRenderObservable.add(()=> {
            let keydown = false;
            //console.log('oh');
            let inputMap = {};
            if (inputMap["w"] || inputMap["ArrowUp"]) {
                newMeshes[0].position.z += 0.1;
                newMeshes[0].rotation.y = 0;
                keydown = true;
            }
            if (inputMap["a"] || inputMap["ArrowLeft"]) {
                newMeshes[0].position.x -= 0.1;
                newMeshes[0].rotation.y = 3 * Math.PI / 2;
                keydown = true;
            }
            if (inputMap["s"] || inputMap["ArrowDown"]) {
                newMeshes[0].position.z -= 0.1;
                newMeshes[0].rotation.y = 2 * Math.PI / 2;
                keydown = true;
            }
            if (inputMap["d"] || inputMap["ArrowRight"]) {
                newMeshes[0].position.x += 0.1;
                newMeshes[0].rotation.y = Math.PI / 2;
                keydown = true;
            }
        });
    });

    return item
}    
    
function actionManager(scene){
    scene.actionManager = new BABYLON.ActionManager(scene);
    let inputMap = {};
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {//trigger options
            trigger: BABYLON.ActionManager.OnKeyDownTrigger, 
            parameter: 'w'
            },
            function(evt) {inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";}
        )
    );
   // console.log(scene.actionManager);
    return scene.actionManager;
}

function backgroundMusic(scene){
    let music = new BABYLON.Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    return music;
}

function createGround(scene){
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 10, width: 10, subdivisions: 4});
    return ground;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 15;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    //camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));
    let ground = (that.ground = createGround(scene));
    
    let manager = (that.actionManager = actionManager(scene));
    //console.log(manager);
    let mesh1 = (that.mesh1 = importMesh(scene, 0, 0));

    let bgMusic = (that.bgMusic = backgroundMusic(scene));
    
    
    return that;
}
