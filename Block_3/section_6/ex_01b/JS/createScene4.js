const frameRate = 30;

function createBox(scene) {
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 2;
    const xSlide = new BABYLON.Animation(
        "xSlide",
        "position.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const ySlide = new BABYLON.Animation(
        "ySlide",
        "position.y",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const xRotation = new BABYLON.Animation(
        "xRotation",
        "rotation.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const yRotation = new BABYLON.Animation(
        "yRotation",
        "rotation.y",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const v3scaling = new BABYLON.Animation(
        "v3Scaling",
        "scaling",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesX = [];
    keyFramesX.push({ frame: 0, value: 2 });
    keyFramesX.push({ frame: frameRate, value: -2 });
    keyFramesX.push({ frame: 2 * frameRate, value: 2 });

    const keyFramesY = [];
    keyFramesY.push({ frame: 0, value: 2 });
    keyFramesY.push({ frame: frameRate, value: -2 });
    keyFramesY.push({ frame: 2 * frameRate, value: 2 });

    const keyFramesRX = [];
    keyFramesRX.push({ frame: 0, value: 0 });
    keyFramesRX.push({ frame: frameRate, value: Math.PI });
    keyFramesRX.push({ frame: 2 * frameRate, value: Math.PI * 2 });

    const keyFramesRY = [];
    keyFramesRY.push({ frame: 0, value: 0 });
    keyFramesRY.push({ frame: 2 * frameRate, value: Math.PI });
    keyFramesRY.push({ frame: 4 * frameRate, value: Math.PI * 2 });

    const keyFramesv3s = [];
    keyFramesv3s.push({ frame: 0, value: new BABYLON.Vector3(1, 2, 3) }),
    keyFramesv3s.push({ frame: 0.66 * frameRate, value: new BABYLON.Vector3(2, 3, 1) });
    keyFramesv3s.push({ frame: 1.32 * frameRate, value: new BABYLON.Vector3(3, 1, 2) });
    keyFramesv3s.push({ frame: 2 * frameRate, value: new BABYLON.Vector3(1, 2, 3) });

    xSlide.setKeys(keyFramesX);
    ySlide.setKeys(keyFramesY);
    xRotation.setKeys(keyFramesRX);
    yRotation.setKeys(keyFramesRY);
    v3scaling.setKeys(keyFramesv3s);

    box.animations.push(xSlide);
    box.animations.push(ySlide);
    box.animations.push(xRotation);
    box.animations.push(yRotation);
    box.animations.push(v3scaling);

    return box;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 10;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let box = (that.box = createBox(scene));
    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));

    that.scene.beginAnimation(box, 0, 2 * frameRate, true);
    return that;
}
