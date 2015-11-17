---
layout: project
title: Mini Maya
full_title: Mini Maya
tile_size: item2
column_size: col-lg-8 col-sm-8 col-xs-12
categories: ['code']
classes: code
bg_image: code/minimaya/minimaya.jpg
bg_blur_image: code/minimaya/minimaya_blur.jpg
summary: A 3D modeling program developed with C++, OpenGL, and GLSL
---

<h2>Project Overview</h2>
<div class="row alternating-row">
	<div class="col-lg-12">
		<p>Mini Maya is a cumulative project which I worked on in my freshman year of college for CIS 277 (Introduction to Computer Graphics). The main languages used for developement were C++, OpenGL, and GLSL. Throughout the course of the semester, we developed features which utilized fundamental concepts in computer graphics. I went on to augment my project, implementing many other concepts and ideas which I found interesting or useful. To maintain the integrity of the course, I will document the various aspects of the project here, but refrain from disclosing code or specfic implementation details.</p>
		<p>While working on this project, I found that the hardest part was not building any particular feature, but rather keeping my code flexible and efficient enough to accomodate all the different components.</p>
	</div>
</div>

<h3 id="basic-structure">Basic Structure</h3>
<p>MiniMaya employs OpenGL to draw images to the screen. All meshes, vertices, halfedges, faces, and light locators extend <code>ShaderProgram::Drawable</code> and contain their own functions for creating, updating, and destroying vertex and index buffers.</p>
<p>I designed Mini Maya to be as modular as possible so that it would be easier to implement and add new features. This resulted in lots of templating and inheritance. Pretty much everything in the viewport is a <code>scene_node</code> which inherits from <code>transformable</code>. My class structure looked something like this:</p>
<pre><code>transformable
	- scene_node
		- joint_node
		- light_node
		- mesh_node
		- skeleton_node
		- bvh_node
	- camera
</code></pre>
<p>This kind of structure made it very easy for me to extend my <a href="#transformation-controls">transformation tools</a> to all types of objects in the scene. It also allowed for simple parent-child relationships between many objects of different types.</p>
<p>Mini Maya's tool system is another example of its modular design. Anything that manipulates an object in the 3D viewport is regarded as a tool. This includes anything from OBJ import to subdivision; from moving objects and vertices to rendering. Tools are enabled with keyboard shortcuts or by selecting them in the menu. Once a tool is active, the main application loop feeds all user input into the tool. Each tool has access to the current application context so that it can appropriately update the 3D objects. Each can define its own <code>create</code>, <code>keyboardInput</code>, <code>mouseInput</code>, <code>confirm</code>, <code>cancel</code>, and <code>finish</code> functions.</p>

<h3 id="mesh-creation">Mesh Creation / Import</h3>
<div class="row alternating-row">
	<div class="col-lg-8 col-md-6">
		<p>Various meshes can be automatically created within Mini Maya. Simple meshes are generated by simply creating vertices and creating faces and edges between them. More complex built-in meshes just use Mini Maya's OBJ importer to import and create a mesh.</p>
		<p>Meshes in Mini Maya are represented with a half-edge data structure. OpenGL vertex and index buffers are generated whenever mesh geometry changes for drawing.</p>
	</div>
	<div class="col-lg-4 col-md-6">
		<video controls preload="none" poster="/vid/minimaya/mesh-creation.gif">
		  <source src="/vid/minimaya/mesh-creation.mp4" type="video/mp4">
		</video>
		<div class="caption">Creation of various meshes</div>
	</div>
</div>

<h3 id="transformation-controls">Transformation Controls</h3>
<div class="row alternating-row">
	<div class="col-lg-8 col-md-6">
		<p>Mini Maya supports the standard transformation controls: translate, rotate, and scale. Keyboard shortcuts make it easy to toggle between these modes as well as lock onto the global X/Y/Z and local X/Y/Z axes. Control of the transformation is done using the mouse (implemented with much inspiration from Ken Shoemake's <a href="https://www.talisman.org/~erlkonig/misc/shoemake92-arcball.pdf">arcball paper</a>). In a similar fashion, the camera can be easily moved and rotated. All rotations are stored as quaternions to prevent problems with gimbal lock.</p>
		<p>The transformation tool avoids accumlating rounding errors and allows for cancellation by storing both the old and new transformation in each object node. New transformations are always used for drawing, but the old transformation is kept to allow the user to undo or reset transformations.</p>
	</div>
	<div class="col-lg-4 col-md-6">
		<video controls preload="none" poster="/vid/minimaya/transformation-controls.gif">
		  <source src="/vid/minimaya/transformation-controls.mp4" type="video/mp4">
		</video>
		<div class="caption">Simple transformation with local/global axis locking</div>
	</div>
</div>

<h3 id="mesh-editing-tools">Mesh Editing Tools</h3>
<div class="row alternating-row">
	<div class="col-lg-8 col-md-6">
		<p>Various mesh editing tools were implemented for Mini Maya. Mesh components (faces, edges, and vertices) can be transformed using the same methods described for <a href="#transformation-controls">transforming objects</a>. Other features include:</p>
		<ul>
			<li>Face Extrusion</li>
			<li>Triangulation</li>
			<li>Edge Split</li>
			<li>Catmull-Clark Subdivision</li>
			<li>Face/Edge/Vertex Deletion</li>
		</ul>
		<p>Mouse selection of mesh components was accomplished by either <a href="#raycast-selection">raycasting</a> or <a href="#gpu-accelerated-selection">reading from a buffer created on the GPU</a>.</p>
	</div>
	<div class="col-lg-4 col-md-6">
		<video controls preload="none" poster="/vid/minimaya/mesh-editing.gif">
		  <source src="/vid/minimaya/mesh-editing.mp4" type="video/mp4">
		</video>
		<div class="caption">Various mesh editing tools</div>
	</div>
</div>

<h3 id="scene-graph">Scene Graph / Inheritance</h3>
<div class="row alternating-row">
	<div class="col-lg-8 col-md-6">
		<p>Objects are stored in a tree, making easy transformation inheritance. To reduce computation, the full global transformation matrix is stored for every object. When the draw call is made, this matrix is used to compute the vertex positions of the mesh. When objects are transformed, only its full transformation and those of its children are updated. I found this to be significantly faster than simply storing local transformations and recomputing global transformations at every draw call. Storing global transformations also optimizes future computations such as those used when <a href="#raycast-selection">raycasting</a> or <a href="#ray-tracer">ray tracing</a>.</p>
	</div>
	<div class="col-lg-4 col-md-6">
		<video controls preload="none" poster="/vid/minimaya/scene-graph.gif">
		  <source src="/vid/minimaya/scene-graph.mp4" type="video/mp4">
		</video>
		<div class="caption">Scene graph</div>
	</div>
</div>

<h3 id="material-editor">Material Editor</h3>
<div class="row alternating-row">
	<div class="col-lg-8 col-md-6">
		<p>Materials are assigned to objects on a per-face basis. After assigning materials, they can easily be changed and the viewport will update in realtime. To accomplish this, a map of materials to objects is maintained so that when materials are updated, the proper vertex color buffers can be updated. Materials can have diffuse, transparent, reflective, and refractive components.</p>
	</div>
	<div class="col-lg-4 col-md-6">
		<video controls preload="none" poster="/vid/minimaya/material-editing.gif">
		  <source src="/vid/minimaya/material-editing.mp4" type="video/mp4">
		</video>
		<div class="caption">Multiple editable materials</div>
	</div>
</div>

<h3 id="spacial-acceleration-structures">Spacial Acceleration Structures</h3>
<div class="row alternating-row">
	<div class="col-lg-8 col-md-6">
		<p>For this project, I first implemented an octree, then a k-D tree, and then finally a BVH tree. Although the k-D tree often resulted in faster tree traversal, I found the BVH tree to be significantly more effective because it was a lot easier to dynamically update the tree when meshes moved or were edited. Building the k-D tree took much longer, especially when there were many meshes close together. When <a href="#ray-tracer">rendering</a>, I've gotten mixed results using BVH and k-D trees. I find that sparser scenes tend to perform much better with a BVH tree than with a k-D tree.</p>
	</div>
	<div class="col-lg-4 col-md-6">
		<video controls preload="none" poster="/vid/minimaya/bvh.gif">
		  <source src="/vid/minimaya/bvh.mp4" type="video/mp4">
		</video>
		<div class="caption">BVH tree acceleration</div>
	</div>
</div>


<h3 id="raycast-selection">Raycast Selection</h3>
<div class="row alternating-row">
	<div class="col-lg-12">
		<p>Selection was initially accomplished by raycasting. Rays where cast from the camera into the scene and the first object encountered was then selected. Mini Maya maintains a selection list so that multiple objects can be selected at once. Operations, such as parenting, can then be applied to that list of objects.</p>
		<p>To show that objects were selected, booleans were sent to the GLSL shader to denote whether or not objects or mesh components were selected. They would then be drawn in an orange color to indicate this. I found this much better than changing the vertex colors in my buffers because I knew that I would need to change them back once I deselected the object. I felt that this frequent switch was unecessary. A simple color override in the shader was a lot easier.</p>
	</div>
</div>


<h3 id="gpu-accelerated-selection">GPU Accelerated Selection</h3>
<div class="row alternating-row">
	<div class="col-lg-12">
		<p>As meshes became more complex (and before I had a good spatial acceleration structure), I began to realize that raycasting could become very, very slow. I solved this problem by giving every object, component, or anything that is drawn a unique object ID. This ID was hashed as a color and drawn to an offscreen buffer. Now when the user clicks, the program simply gets the coordinates of the click, gets the color of the pixel, and looks up the respective object in a table. This greatly sped up selection times, especially with more complex meshes.</p>
	</div>
</div>

<h3 id="ray-tracer">Ray Tracer</h3>
<div class="row alternating-row">
	<div class="col-lg-8 col-md-6">
		<p>Mini Maya renders images with a simple raytracer. Rays are cast from the camera and bounce off surfaces a maximum of 10 times. These bounces are used to calculate the pixel color. The renderer also supports antialiasing (supersampling) and successfully renders shadows, reflections, refraction, and glossy surfaces.</p>
		<p></p>
	</div>
	<div class="col-lg-4 col-md-6">
		<img src="/img/minimaya/test-render.bmp" />
		<div class="caption">Test render with Diffuse, Reflective, and Refractive surfaces</div>
	</div>
</div>