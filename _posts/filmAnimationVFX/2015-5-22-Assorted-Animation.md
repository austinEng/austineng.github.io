---
layout: project
title: Assorted Animation
full_title: Assorted Animations with Blender
tile_size: item1
column_size: col-lg-4 col-sm-4 col-xs-12
categories: ['film-and-animation']
classes: film-and-animation
bg_image: film-and-animation/shatter.jpg
bg_blur_image: film-and-animation/shatter_blur.jpg
summary: Various animations and simulations made while learning and using Blender.
---

<p>I first started using <a href="//www.blender.org/">Blender</a> because I was interested in 3D modeling and animation but didn't want to spend money buying expensive software. Maya had free student copies, but the interface had way too many buttons for me at the time and Blender was just more visually appearling. I'm also a big fan of open source technology so that was a plus. Over the years, Blender has really grown into an extremely powerful tool that I have become very comfortable with. Even after having learned to use Maya and other tools, I still always find myself coming back to Blender because I find the workflow to be significantly more efficient (although it is pretty annoying to get the Shift, Ctrl, and Alt keys correct when switching programs).


<h3>Shattering Glass</h3>
<p>When Blender's new rendering engine, Cycles, was released, I wanted to give it a try. I used Cycles' standard glass shader and used Blender's cell fracture plugin to generate fracture the wine glass. I keyframed some initial positions and rotations to give the glass some starting motion and then let Blender's physics simulation take over. At the moment the wine glass touched the surface of the floor, I replaced it with the fractured version, gave each fragment the velocity of the unfractured glass, and let the physics simluation take over again.</p>
<p>The floor is a simple flat plane with displacement and bump maps applied. For the specular map, I just adjusted some levels on my image texture to get darker regions for the grout, but honestly the result probably would have been better if I took 5 minutes to manually create a specular map. In the animation, the grout still has some noticeable shine.</p>
<p>The scene was lit with an array of planes given emission shaders and rendered with a camera aperature of 1.4. I'm pretty satisfied with the realism I was able to achieve with the Cycles engine, especially with the depth of field and glass properties.</p>
<div class="row">
  <div class="col-sm-8 col-sm-offset-2 col-xs-12">
    <div class="video-wrapper">
      <img class="invisible" src="http://upload.wikimedia.org/wikipedia/commons/7/72/16x9_by_Pengo.svg" />
      <iframe class="video" data-src="//www.youtube.com/embed/TTHIgaAs6j4?rel=0" frameborder="0" allowfullscreen="" src="//www.youtube.com/embed/TTHIgaAs6j4?rel=0"></iframe>
    </div>
  </div>
</div>

<h3>Ball Collisions</h3>
<p>Satisfied with my tests with Cycles' glass shader, I wanted to give some other materials a try. In this scene, I built the wood texture myself, generating normal, displacement, specular, occlusion, and diffuse maps with an extremely useful tool called <a href="http://www.crazybump.com/">CrazyBump</a>. The other material node networks I obtained from the <a href="https://bwide.wordpress.com/node-groups/bwide-nodepack-for-blender/">b°wide Node Pack</a>. The balls were given the Plastic III, Glass Unified, and Chrome shaders. The bowl has an Exterior Ceramic shader from the Node Pack. Despite the increased shader complexity and undoubtedly numerous light bounces between all the balls, Cycles still rendered this scene very quickly: each frame in less than 30 seconds on my GPU.</p>

<div class="row">
  <div class="col-sm-8 col-sm-offset-2 col-xs-12">
    <div class="video-wrapper">
      <img class="invisible" src="http://upload.wikimedia.org/wikipedia/commons/7/72/16x9_by_Pengo.svg" />
      <iframe class="video" data-src="//www.youtube.com/embed/bN7f2PzRlzA?rel=0" frameborder="0" allowfullscreen="" src="//www.youtube.com/embed/bN7f2PzRlzA?rel=0"></iframe>
    </div>
  </div>
</div>

<h3>Fluid Simulation</h3>
<p>One of the biggest reasons why I really like Blender is that it supports fluid simulations. It is significantly easier and faster to produce fluid effects in Blender than it is in Maya. Obviously tools like RealFlow and Houdini would probably be better, but I don't have the money for that. Below are some simulations I made after watching this great <a href="https://www.youtube.com/watch?v=YgwKPP2ZEjI">tutorial</a> by Andrew Price.</p>

<div class="row">
  <div class="col-sm-6 col-xs-12">
    <div class="video-wrapper">
      <img class="invisible" src="http://upload.wikimedia.org/wikipedia/commons/7/72/16x9_by_Pengo.svg" />
      <iframe class="video" data-src="//www.youtube.com/embed/NJ-dqUoVzbY?rel=0" frameborder="0" allowfullscreen="" src="//www.youtube.com/embed/NJ-dqUoVzbY?rel=0"></iframe>
    </div>
  </div>
  <div class="col-sm-6 col-xs-12">
    <div class="video-wrapper">
      <img class="invisible" src="http://upload.wikimedia.org/wikipedia/commons/7/72/16x9_by_Pengo.svg" />
      <iframe class="video" data-src="//www.youtube.com/embed/k58WHMtyOHY?rel=0" frameborder="0" allowfullscreen="" src="//www.youtube.com/embed/k58WHMtyOHY?rel=0"></iframe>
    </div>
  </div>
</div>