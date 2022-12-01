# Physics on meshes

Babylon has a collision system which can detect when objects collide and trigger programmed responses.  This involves attaching a collision frame to objects and it is the overlap of these frames rather than the objects themselves which triggers the response.

Babylon uses 3rd party physics engines to add physical interactions to objects.  This might include motion under gravity and the rebound of objects on collision.  Properties of friction and mass can be attributed to visual objects.  This involves attaching a frame referred to as a physics imposter to the object and it is the collision of these impostors which triggers an exchange of momentum in a realistic way.

The collision system and the physics system are completely separate, however in the case of a complex mesh it is efficient to add a collider and then associate the phyaics imposter with this.

Naturally it is important that the meshes, their colliders and impostors all are co-located and move together through scene interactions.

In this section physics will be applied to the ground, to a box and to a character mesh importec in babylon format.

As the code in the scene grows longer it is useful to structure the code into different module files.  All code required for movement in responce to keypresses will be refactored into a single utility module.

The code is linked as a module from **showScene1.html**, this links to a javascript file **getScene1.js** which adds the canvas to the HTML DOM and contains the render loop.  This file imports the **createScene.js** file which contains most of the code to create the scene.  Finally this file imports the functions it needs from the **utility.js** file.  The idea is to keep code which could be useful for other scenes in one or more shared utility files to cut down on duplication.

Another principle applied here is to try to reduce the ammount of calculation which is done inside the render loop so that the computer can keep up.

## physics links

This example uses canon.js as the physics engine and this is linked from **showscene1.html**

```html
        <script src="https://preview.babylonjs.com/ammo.js"></script>
        <script src="https://preview.babylonjs.com/cannon.js"></script>
        <script src="https://preview.babylonjs.com/Oimo.js"></script>
```

Oimo and ammo are other physics engines which might alternatively be used.

Within the **showScene1.js** file the physics engine must be enabled.  This can be done in the createStartScene() function which is used to assemble the scene elements. Gravity is set as a vector so that the acceleration 9.81 ms<sup>-2</sup> applies downward (-ve y direction).

```javascript
export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
    //scene.debugLayer.show();
```
To apply physics to the ground the CreateGround optional parameters define the size of the ground plane.

A physics imposter is attached as a property of ground.  There are a number of imposters available.  In this case the Box imposter is a perfect match to the box mesh.  However the box imposter can be used with other mesh shapes. The simpler the imposter shape, the less computational load it adds. The BoxImposter also has options mass, friction and restitution which control how other physics imposters will interact with the ground plane.  In particular, setting the mass to zero makes the imposter immovable.  (You can imagine this as infinite mass).

```javascript
function createGround(scene){
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 10, width: 10, subdivisions: 4});
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
    return ground;
}
```

Now physics is added to a box.  The initiall polition of the box slighly above the ground allows it to fall and bounce on the ground plane to show the interaction.  There is a random aspect to this, the box does not always bounce in the same way.

```javascript
function createBox(scene, x, y, z){
    let box = BABYLON.MeshBuilder.CreateBox("box", scene);
    box.position.x = x;
    box.position.y = y;
    box.position.z = z;
    new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0.9 }, scene);
    return box;
}
```
A mass of 10 makes the box movable.

Finally physics is added to the imported character mesh.

A meshCollider is added which is adjusted to be the approximate bounding shape of the character mesh.  The variable collidersVisible can be set true so that you can ajust the shape and size of the collider. It is essential that the y position of the collider rests on the ground.  If it is too high it will fall to the ground and bounce.  If it is below the ground plane it will be launched like a rocket.

```javascript
        // add colliders on the ground
         var collidersVisible = false;
         var meshCollider = BABYLON.Mesh.CreateCapsule("ribbon", {height:1, radius:0.6}, scene);
         var scale = new BAA BYLON.Vector3(1.5,2,1);
         meshCollider.scaling.x = scale.x;
         meshCollider.scaling.y = scale.y;
         meshCollider.scaling.z = scale.z;
         meshCollider.position.y = ( scale.y)/2;
         
         meshCollider.isVisible = collidersVisible;

```

A dummy mesh is added as the physics root.  By adding the visual mesh and the collider as children to this the components will all move together when the physics root moves.

```javascript
       // Create a physics root and add all children 
        let physicsRoot = new BABYLON.Mesh("", scene);
        physicsRoot.position.x = 0.0;     
        physicsRoot.position.y = 0.0;    
        physicsRoot.position.z = 0.0;         
        physicsRoot.addChild(mesh);  
        physicsRoot.addChild(meshCollider);
```

A physics imposter must be added to both the collision mesh and the physics root.

```javascript
       meshCollider.physicsImpostor = new BABYLON.PhysicsImpostor(meshCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.NoImpostor, { mass: 3 }, scene);
```

The mass on the physics root is 0, but the mass on the collider is ajustable.

That is all that is needed to add physics to the mesh.

In a previous example the mesh moved in response to the pressing of the "wasd" keys.  The mesh was rotated to face the direction of travel.

Now the mesh and collider must be moved together so it is the physicsRoot which must be moved rather than the mesh.

The physics root cannot by rotated by manipulating a rotation.y property.  Instead quaternions must me used.  The [properties of quaternions](https://www.3dgep.com/understanding-quaternions/) are well explained by Jeremiah in a 3D game programming article.

The code to control movement in response to key presses has been added to a utility file so the relevant functions must be imported into createScene1.js

```javascript
import { compassKey, compass } from "./utility.JS";
```


<iframe 
    height="460" 
    width="100%" 
    scrolling="no" 
    title="Mesh physics" 
    src="Block_3/section_11/ex_01_physics/showScene1.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>

The full listing of **createScene2.js** is then:

```javascript

```

