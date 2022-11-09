# Frame based animations

The properties of meshes such as boxes and spheres can be modified on a frame by frame basis to produce an animation effect.

The general process to create an amimation is:

1. Determine a frame rate in frames per second at which the animation should run.  In many instances this will be global so that all animations on a page are running at the same rate.  However, this is not a requirement.

2. Create an named animation object w.hich applies to a particular property, setting the type and mode of the animation.

3. Create an array of keyframes and apply these to the animation object.

4. Push the animation object to the animations collection of mesh or object which responds to the animated property

## set up 

My scene is created in a separate javascript module file, creScene1.js.

In this example a box will be animated with a framerate of 30 frames per second.

## Mesh 

## Animation

## Gui