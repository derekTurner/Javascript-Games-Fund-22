import createScene1 from "./createScene1.js";
import createScene2 from "./createScene2.js";

const CanvasName = "index-canvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;

canvas.classList.add("renderCanvas");
document.body.appendChild(canvas);

var sceneIndex = 0;
var scenes_arr = [];

console.log("ex_01");


// Simple HTML gui

function showScene(index){
  scene = scenes_arr[index].scene;
}

function show(){

  }
  
  document.getElementById("s1").addEventListener('click', showScene(0) ,{passive: true});
  document.getElementById("s2").addEventListener('click', showScene(1), {passive: true});
  document.getElementById("s3").addEventListener('click', showScene(0) ,{passive: true});
  document.getElementById("s4").addEventListener('click', showScene(1), {passive: true});

// Start engine and render
let eng = new BABYLON.Engine(canvas, true, null, true);
scenes_arr.push(createScene1(eng));

scenes_arr.push(createScene2(eng));
let scene = scenes_arr[0].scene;
eng.runRenderLoop(() => {
    scene.render();
});

