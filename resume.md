---
layout: resume
title: Resume
permalink: /resume/
work:
  -
    title: Counter Hack
    date: July 2014 - December 2014
    excerpt: Technical Intern at Counter Hack
    content:  <ul class="list">
                <li>Developed scripts in Python, Batch, and Metasploit to automate completion of Capture-The-Flag (CTF) challenges to determine if targets had become corrupted. This development reverts only corrupted targets, decreasing the probability of a revert storm.</li>
                <li>Set up and tested systems for CTF challenges</li>
                <li>Tested functionality of Metasploit exploits</li>
              </ul>
  -
    title: Artsicle
    date: February 2014 - June 2014
    excerpt: Full Stack Software Development Intern at Artsicle
    content:  <ul class="list">
                <li>Full stack Ruby on Rails web development</li>
                <li>Developed MVC logic for new features to assist artists in promoting and selling their work</li>
                <li>Improved and added functionality of admin panel interfaces</li>
                <li>Improved caching efficiency with modifications to the Cashier gem</li>
                <li>Rewrote portions of the test suite to minimize external API calls for speed improvements and to avoid sending API credentials to Travis CI</li>
              </ul>

education:
  -
    title: University of Pennsylvania<br/>B.S.E. Digital Media Design
    excerpt: 'Current GPA: 3.91, Expected Graduation: May 2018'
    content:
      <p>Relevant Coursework:</p>
      <ul class="list">
        <li>Mathematical Foundations of Computer Science</li>
        <li>Programming Languages and Techniques I & II</li>
        <li>Introduction to Computer Graphics</li>
        <li>3D Computer Modeling</li>
      </ul>

projects:
  -
    title: Mini-Maya
    date: January 2015 - April 2015
    excerpt: A 3D Modeling Program developed with C++, OpenGL, and GLSL
    content:
      <p>Features:</p>
      <ul class="list print-collapse">
        <li>Quaternion Camera Rotation</li>
        <li>Scene Graph Inheritance</li>
        <li>Raytrace Rendering</li>
        <li>Octree/k-D tree/BVH tree acceleration</li>
        <li>Half-Edge Mesh Data Structure</li>
        <li>Catmull-Clark Subdivision</li>
        <li>Skeletons and Skinning</li>
        <li>Animation/Keyframing</li>
        <li>Object/Edit/Pose Mode</li>
      </ul>
  -
    title: Personal Python Render Farm
    date: April 2015
    excerpt: Developed a render farm for my personal 3D animation projects in Python
    content:
      <ul class="list">
        <li>Render jobs distributed from a master machine, automatically selecting optimal render settings for each slave</li>
        <li>Doesn't rely on a central server but operates on any network with shared folders (e.g. a local network, Dropbox, etc.)</li>
        <li>Control of render jobs via a command line interface</li>
      </ul>

---