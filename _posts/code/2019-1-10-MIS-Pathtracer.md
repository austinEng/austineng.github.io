---
layout: project
title: MIS Pathtracer
full_title: MIS Pathtracer
tile_size: item2
column_size: col-lg-8 col-sm-8 col-xs-12
categories: ['code']
classes: code
bg_image: code/pathtracer/pathtracer.bmp
bg_blur_image: code/pathtracer/pathtracer_blur.bmp
summary: Massively concurrent C++ Pathtracer with multiple importance sampling and quasi-random sampling, and BVH acceleration
---

<h3>Relevant Blog Posts</h3>
<ul>
	<li><a href="/blog/2015/10/13/Starting-CIS-560/">Starting CIS 560</a></li>
	<li><a href="/blog/2015/11/1/Direct-Lighting-Estimation-CIS-560/">Direct Lighting Estimation</a></li>
	<li><a href="/blog/2015/12/9/Final-Project-and-Major-Refactoring-CIS-560/">Final Project Refactoring</a></li>
	<li><a href="/blog/2015/12/15/BVH-Benchmarking/">BVH Benchmarking</a></li>
</ul>


<h2>Multiple Importance Sampling</h2>
<p>Multiple importance sampling is a very important part of rendering. When calculating direct energy, we typically cast rays from our point of intersection to a random point on the surface of a light source. However, if our light source is large but the surface is extremely specular, most of those rays are not going to bounce in the direction of our camera. It will take very many samples to even get a reasonably accurate image. We're wasting a lot of computation! On the other hand, if we only use the surface's reflectance model, if the light is small, a rough surface will generate rays that actually hit that light source a very small percentage of the time. We get the sample problem! The solution is to use Multiple Importance Sampling: use both methods and combine them with a heuristic to calculate the direct energy reflected. Here's a recreation of the Veach scene and comparisons showing only BRDF or only Light sampling:</p>

<div class="row">
  <div class="col-sm-4 col-xs-12">
    <img src="/img/560/renders/brdf_only.bmp"/>
    <div class="caption">BRDF Sampling</div>
  </div>
  <div class="col-sm-4 col-xs-12">
    <img src="/img/560/renders/veach_64spp_5min.bmp"/>
    <div class="caption">Multiple Importance Sampling</div>
  </div>
  <div class="col-sm-4 col-xs-12">
    <img src="/img/560/renders/light_only.bmp"/>
    <div class="caption">Light Sampling</div>
  </div>
</div>


<h2>Concurrency and Multithreading</h2>
<p>My pathtracer is also extremely concurrent. I made heavy use of <code>tbb::flow::graph</code>, <code>tbb::task_group</code>, and <code>tbb::task_arena</code> as well as TBB's <code>parallel_for</code> and <code>parallel_join</code> template functions to significantly improve the performance of my pathtracer. I created separate jobs for different parts of the render: creating ray jobs, tracing those rays through the scene, writing to the render film, updating the live GL preview window, etc... At first, I just created several <code>tbb::task_group</code>s for each of these, but this very quickly became confusing and difficult to manage. Creating temporary <code>tbb::concurrent_queue</code>s to transfer data between them, ensuring that none of the tasks prematurely finish or get deleted, properly instantiating them when necessary, and safely cleaning up and freeing memory became extremely difficult to handle. I'm still learning a lot about C++, and the problems exponentially increase when you have multiple threads running. Using <code>tbb::flow::graph</code> made everything significantly easier. I could very easily set up my tasks and define the data flow and TBB automagically handled communication and data transfer between all of the tasks. When I first started using this, I tried to be smart about my task allocation and tried to specify the maximum number of tasks TBB should allocate to each node in the graph. I soon learned, that it's very difficult to know exactly how much to allocate to each node. Depending on where they're going in a scene, some rays may trace quickly and some may trace slowly. Allowing TBB to handle task creation with <code>tbb::flow::unlimited</code> led to consistently superior performance.</p>

<p>I also employed TBB to accelerate my spatial acceleration tree traversal. I'm currently using a BVH and because nodes can very frequently overlap (so a piece of geometry could very easily be in multiple bounding boxes at once), I thought it would be a good idea to simultaneously explore the left and right subtrees. Intersected nodes were pushed onto a queue and then multiple threads pulled from that queue and checked intersections. I found that my assumption was indeed correct. On a simple scene (I have yet to do benchmarking on something more complex) one thread gave me intersections times of about 0.015ms on average. Two threads were nearly twice as fast at an everage of 0.064ms. Interestingly, using three threads was slightly slower than using two, but four threads was again faster. The reason for this is probably that because the tree is binary, a thread count which is a power of 2 is more unlikely to leave empty threads waiting around which may cause unnecessary overhead.</p>

<h2>Progressive Rendering and Sobol Quasi-Random Sampling</h2>
<p>For my project, I also implemented progressive rendering and quasi-random sampling. This allowed me to see the entire picture as it was being rendered (and not just the top rows), making it much easier to quickly identify problems in the scene. To accompish this, I had a separate task creating the samples from a Sobol sequence and another separate task writing to the GL preview.</p>

<h2>BVH Acceleration</h2>
<p>The project also uses a BVH tree built with <a href="http://www.cs.cmu.edu/~ygu1/paper/HPG13/HPG13.pdf">Approximate Agglomerative Clustering</a> to speed up scene traversal. My tests showed that this method of construction resulted in comparable acceleration times but significantly faster construction when compared with other acceleration methods.</p>

<div class="row">
	<div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
		<a href="/img/renderer/bvh_benchmarking/dragon_c100000_b4513.11_t0.000128856.png"><img src="/img/renderer/bvh_benchmarking/dragon_c100000_b4513.11_t0.000128856.jpg" /></a>
		<div class="caption">
			<div>Cluster Size: 100000</div>
			<div>Build Time: 4513110 ms</div>
			<div>Average Raytrace: 0.128856 ms</div>
		</div>
	</div>
</div>