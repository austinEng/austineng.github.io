---
layout: reel
title: Reel
permalink: /freshman-reel/
custom_css: project-page
keywords: [demo reel demoreel austin eng work]
iframe: <iframe class="video" data-src="//www.youtube.com/embed/X69oR0DvXQM?rel=0" frameborder="0" allowfullscreen="" src="//www.youtube.com/embed/X69oR0DvXQM?rel=0"></iframe>
---

<h1 class="page-title">Breakdown</h1>
<h2>Mini Maya Project</h2>
<h3>Overview</h3>
<p>Mini Maya is a cumulative project which I worked on in my freshman year of college for CIS 277 (Introduction to Computer Graphics). The main languages used for developement were C++, OpenGL, and GLSL. Throughout the course of the semester, we developed features which utilized fundamental concepts in computer graphics. I went on to augment my project, implementing many other concepts and ideas which I found interesting or useful. To maintain the integrity of the course, I will document the various aspects of the project here, but refrain from disclosing code or specfic implementation details.</p>

<p>While working on this project, I found that the hardest part was not building any particular feature, but rather keeping my code flexible and efficient enough to accomodate all the different components. Tools are built to be modular. The main event loop listens for keyboard shortcuts or mouse interaction. These trigger the application to switch contexts, piping any new inputs to the new tool. This concept is nested so that subtools can exist within tools, allowing each tool to easily manage its own keyboard shortcuts.</p>

<h3 id="transformation-controls">Transformation Controls</h3>
<p>Mini Maya supports the standard transformation controls: translate, rotate, and scale. Keyboard shortcuts make it easy to toggle between these modes as well as lock onto the global X/Y/Z and local X/Y/Z axes. Control of the transformation is done using the mouse (implemented with much inspiration from Ken Shoemake's <a href="https://www.talisman.org/~erlkonig/misc/shoemake92-arcball.pdf">arcball paper</a>). In a similar fashion, the camera can be easily moved and rotated. All rotations are stored as quaternions to prevent problems with gimbal lock.</p>
<p>The transformation tool avoids accumlating rounding errors and allows for cancellation by storing both the old and new transformation in each object node. New transformations are always used for drawing, but the old transformation is kept to allow the user to undo or reset transformations.</p>
<p>Individual translate, rotate, and scale x/y/z components were stored for each object. I originally thought about storing rotations as quaternions, but decided it resulted in a confusing user interface. Rotations are stored on the euler axes but then converted and manipulated with quaternions.</p>

<h3 id="scene-graph">Scene Graph / Inheritance</h3>
<p>Objects are stored in a tree, making easy transformation inheritance. To reduce computation, the full global transformation matrix is stored for every object. When the draw call is made, this matrix is used to compute the vertex positions of the raycastmesh. When objects are transformed, only its full transformation and those of its children are updated. I found this to be significantly faster than simply storing local transformations and recomputing global transformations at every draw call. Storing global transformations also optimizes future computations such as those used when <a href="/code/Mini-Maya/#raycast-selection">raycasting</a> or <a href="#ray-tracer">ray tracing</a>.</p>

<h3 id="mesh-editing-tools">Mesh Editing Tools</h3>
<p>Various mesh editing tools were implemented for Mini Maya. Mesh components (faces, edges, and vertices) can be transformed using the same methods described for <a href="#transformation-controls">transforming objects</a>. Other features include:</p>
<ul>
  <li>Face Extrusion</li>
  <li>Triangulation</li>
  <li>Edge Split</li>
  <li>Catmull-Clark Subdivision</li>
  <li>Face/Edge/Vertex Deletion</li>
</ul>
<p>Mouse selection of mesh components was accomplished by either <a href="/code/Mini-Maya/#raycast-selection">raycasting</a> or <a href="/code/Mini-Maya/#gpu-accelerated-selection">reading from a buffer created on the GPU</a>.</p>

<h3 id="spacial-acceleration-structures">Spacial Acceleration Structures</h3>
<p>For this project, I first implemented an octree, then a k-D tree, and then finally a BVH tree. Although the k-D tree often resulted in faster tree traversal, I found the BVH tree to be significantly more effective because it was a lot easier to dynamically update the tree when meshes moved or were edited. Building the k-D tree took much longer, especially when there were many meshes close together. When <a href="#ray-tracer">rendering</a>, I've gotten mixed results using BVH and k-D trees. I find that sparser scenes tend to perform much better with a BVH tree than with a k-D tree.</p>

<h3 id="mesh-creation">Mesh Creation / Import</h3>
<p>Various meshes can be automatically created within Mini Maya. Simple meshes are generated by simply creating vertices and creating faces and edges between them. More complex built-in meshes just use Mini Maya's OBJ importer to import and create a mesh.</p>
<p>Meshes in Mini Maya are represented with a half-edge data structure. OpenGL vertex and index buffers are generated whenever mesh geometry changes for drawing.</p>


<h3 id="material-editor">Material Editor</h3>
<p>Materials are assigned to objects on a per-face basis. After assigning materials, they can easily be changed and the viewport will update in realtime. To accomplish this, a map of materials to objects is maintained so that when materials are updated, the proper vertex color buffers can be updated. Materials can have diffuse, transparent, reflective, and refractive components.</p>


<h3 id="ray-tracer">Ray Tracer</h3>
<p>Mini Maya renders images with a simple raytracer. Rays are cast from the camera and bounce off surfaces a maximum of 10 times. These bounces are used to calculate the pixel color. The renderer also supports antialiasing (supersampling) and successfully renders shadows, reflections, refraction, and glossy surfaces.</p>

<hr />
<h2>Futuristic Aircraft</h2>
<h3>Modeled in Maya and rendered with Mental Ray</h3>
<p>This is a project made for my 3D modeling class. I focused a lot on trying to get the tiled look of the aircraft's surface as well as doing my best to make it mechanically feasible. At first I tried texturing the tiles with normal/color/bump/displacement maps, but none of these worked very well. Displacement was close, but it required so many subdivisions that the rendering cost was not worth it. I ended up just manually modeling the geometry. A lot of work was also spent in texturing the model, doing my best to get a dirty, matte look for the white metal.</p>

<hr />
<h2>Prebirth: The Eternal War</h2>
<h3>First Assistant Cinematographer</h3>
<p>This is a film for which I served as 1st Assistant Cinematographer. It ended up making it into the Garden State Film Festival. For this project, I worked with the director, setting up and planning camerawork and shots. I also handled equipment setup and placement as well as lighting setup for a few shots. The crew was very small so I helped out wherever I could. You can view the full film <a href="//prebirthmovie.com/">here</a>.</p>

<hr />
<h2>3D Tracking and Compositing</h2>
<h3>Blender and Adobe After Effects</h3>
<h4>1. Mirror Shot</h4>
<p>For this shot I 3D tracked the scene and then placed footage from a separate shot inside the mirror. As this obscured some of the items on the table, I also needed to clone those and mask them out in the mirror. A faint reflection was painted onto footage to make it seem that the scene was inside a real mirror. Lastly, some slight camera shake was added to increase the believability of the effect.</p>

<h4>2. Safe Shot</h4>
<p>For this shot, I modeled a safe in Blender and then 3D tracked it onto the wall using pre-placed tracking points. I set up the lighting to match as well as possible and then rendered out the safe and it's shadow separately. These were composited together in After Effects, adding grain and blur to help sell the effect.</p>