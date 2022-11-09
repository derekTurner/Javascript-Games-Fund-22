const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    //Add a camera
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
   // const player = BABYLON.SceneLoader.Append("./assets/models/", "low_poly_humanoid_robot.glb", scene, function (meshes) {
   //     scene.createDefaultCameraOrLight(true, true, true);
   // });


const box = BABYLON.MeshBuilder.CreateBox("box",{});
box.position.x = 2
const frameRate = 10;
const xSlide    = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
const ySlide    = new BABYLON.Animation("ySlide", "position.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
const xRotation = new BABYLON.Animation("xRotation", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
const yRotation = new BABYLON.Animation("yRotation", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
const v3scaling = new BABYLON.Animation("v3Scaling", "scaling", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

const keyFrames = [];
keyFrames.push({

    frame: 0,
    value: 2
});
keyFrames.push({

    frame: frameRate,
    value: -2
});
keyFrames.push({

    frame: 2 * frameRate,
    value: 2
});


const keyFrames2 = [];
keyFrames2.push({

    frame: 0,
    value: 2
});
keyFrames2.push({

    frame: frameRate,
    value: -2
});
keyFrames2.push({

    frame: 2 * frameRate,
    value: 2
});


const keyFramesRX = [];
keyFramesRX.push({

    frame: 0,
    value: 0
});
keyFramesRX.push({

    frame: frameRate,
    value: Math.PI
});
keyFramesRX.push({

    frame: 2 * frameRate,
    value: Math.PI * 2
});

const keyFramesRY = [];
keyFramesRY.push({

    frame: 0,
    value: 0
});
keyFramesRY.push({

    frame: 2 * frameRate,
    value: Math.PI
});
keyFramesRY.push({

    frame: 4 * frameRate,
    value: Math.PI * 2
});

const keyFramesv3s = [];
keyFramesv3s.push({

    frame: 0,
    value: new BABYLON.Vector3(1,2,3)
}),
keyFramesv3s.push({

    frame: 0.66 * frameRate,
    value: new BABYLON.Vector3(2,3,1)
});
keyFramesv3s.push({

    frame: 1.32 * frameRate,
    value: new BABYLON.Vector3(3,1,2)
});
keyFramesv3s.push({

    frame: 2 * frameRate,
    value: new BABYLON.Vector3(1,2,3)
});

xSlide.setKeys(keyFrames);
ySlide.setKeys(keyFrames2);
xRotation.setKeys(keyFramesRX);
yRotation.setKeys(keyFramesRY);
v3scaling.setKeys(keyFramesv3s)

box.animations.push (xSlide);
box.animations.push (ySlide);
box.animations.push (xRotation);
box.animations.push (yRotation);
box.animations.push (v3scaling);


scene.beginAnimation(box, 0, 2 * frameRate, true);

    return scene;
}




