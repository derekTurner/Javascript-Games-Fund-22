## A-Frame

[A frame](https://aframe.io/) is a framework which allows 3D and VR content to be created in a browser using HTML.  It is interesting to see what can be achieved in this way.

The first example from the getting started section is reproduced here.

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

This produces a 3D scene.  CTRL + ALT + i will open an editor which allows you to alter the scene.  The changes you make when you select an entity will cause highlighting on the right hand side of the editor view.  You can then cut and paste from this view back into your code to make the edits permenant. 

<iframe 
    height="600" 
    width="80%" 
    scrolling="no" 
    title="aframe.html" 
    src="Block_1/section_5/public_aframe/index.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>


## 360 views

As a demonstration of what can be done relatively simply, I have included here a 360 tour of a boat.

