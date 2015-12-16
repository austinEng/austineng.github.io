---
layout: blog
categories: blog 2015 12 15
excerpt: Benchmarking Approximate Agglomerative Clustering BVH
title: BVH Benchmarking
img: /img/renderer/bvh_benchmarking/dragon_c100000_b4513.11_t0.000128856.jpg
---

<p>While working on my CIS 560 final project, I realized that for some reason, intersection tests on the Stanford dragon were remarkably slow (100 ms or more) for some regions of the dragon. I decided to do some benchmarking on my BVH tree built with <a href="http://www.cs.cmu.edu/~ygu1/paper/HPG13/HPG13.pdf">Approximate Agglomerative Clustering</a> to try to find the cause of the issue. I discovered that there were many more problems with my implementation. First of all, I had an error in my BVH construction which was leading to extremely poor construction in some regions. Secondly, I naively picked a cluster size for the construction based on whatever looked good, but I was also improperly constructing VBOs for my BVH trees which made things look better than they actually were.</p>

<p>I've reworked my tree construction, making it more parameterizable and better templated so that it will hopefully be for flexible for future use. I ran tests on the Utah teapot (~1000 triangles), Stanford bunny (~5000 triangles), and Stanford dragon (~100000 triangles), logging the amount of time it took to build the tree and the average time for ray traversal.</p>

<div class="row">
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/teapot_c10_b0.042409_t0.000211633.png"><img src="/img/renderer/bvh_benchmarking/teapot_c10_b0.042409_t0.000211633.jpg" /></a>
		<div class="caption">
			Cluster Size: 10<br />
			Build Time: 42.409 ms<br />
			Average Raytrace: 0.211633 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/teapot_c100_b0.089652_t0.000107177.png"><img src="/img/renderer/bvh_benchmarking/teapot_c100_b0.089652_t0.000107177.jpg" /></a>
		<div class="caption">
			Cluster Size: 100<br />
			Build Time: 89.652 ms<br />
			Average Raytrace: 0.107177 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/teapot_c1000_b0.417885_t8.54407e-05.png"><img src="/img/renderer/bvh_benchmarking/teapot_c1000_b0.417885_t8.54407e-05.jpg" /></a>
		<div class="caption">
			Cluster Size: 1000<br />
			Build Time: 417.885 ms<br />
			Average Raytrace: 0.0854407 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/teapot_c10000_b0.573137_t9.54002e-05.png"><img src="/img/renderer/bvh_benchmarking/teapot_c10000_b0.573137_t9.54002e-05.jpg" /></a>
		<div class="caption">
			Cluster Size: 10000<br />
			Build Time: 573.135 ms<br />
			Average Raytrace: 0.0954002 ms
		</div>
	</div>
</div>

<div class="row">
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/bunny_low_c10_b0.137205_t0.00106669.png"><img src="/img/renderer/bvh_benchmarking/bunny_low_c10_b0.137205_t0.00106669.jpg" /></a>
		<div class="caption">
			Cluster Size: 10<br />
			Build Time: 137.205 ms<br />
			Average Raytrace: 1.06669 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/bunny_low_c100_b0.451929_t0.000328793.jpg"><img src="/img/renderer/bvh_benchmarking/bunny_low_c100_b0.451929_t0.000328793.jpg" /></a>
		<div class="caption">
			Cluster Size: 100<br />
			Build Time: 451.929 ms<br />
			Average Raytrace: 0.328793 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/bunny_low_c1000_b1.96188_t0.000149602.png"><img src="/img/renderer/bvh_benchmarking/bunny_low_c1000_b1.96188_t0.000149602.jpg" /></a>
		<div class="caption">
			Cluster Size: 1000<br />
			Build Time: 1961.88 ms<br />
			Average Raytrace: 0.149602 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/bunny_low_c10000_b9.2727_t0.000120217.png"><img src="/img/renderer/bvh_benchmarking/bunny_low_c10000_b9.2727_t0.000120217.jpg" /></a>
		<div class="caption">
			Cluster Size: 10000<br />
			Build Time: 9272.7 ms<br />
			Average Raytrace: 0.120217 ms
		</div>
	</div>
</div>

<div class="row">
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/dragon_c10_b2.24062_t0.0196656.png"><img src="/img/renderer/bvh_benchmarking/dragon_c10_b2.24062_t0.0196656.jpg" /></a>
		<div class="caption">
			Cluster Size: 10<br />
			Build Time: 2240.62 ms<br />
			Average Raytrace: 19.6656 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/dragon_c100_b9.64125_t0.00198559.png"><img src="/img/renderer/bvh_benchmarking/dragon_c100_b9.64125_t0.00198559.jpg" /></a>
		<div class="caption">
			Cluster Size: 100<br />
			Build Time: 964.125 ms<br />
			Average Raytrace: 1.98559 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/dragon_c1000_b46.9278_t0.000392493.png"><img src="/img/renderer/bvh_benchmarking/dragon_c1000_b46.9278_t0.000392493.jpg" /></a>
		<div class="caption">
			Cluster Size: 1000<br />
			Build Time: 46927.8 ms<br />
			Average Raytrace: 0.392493 ms
		</div>
	</div>
	<div class="col-lg-3 col-sm-3 col-xs-6">
		<a href="/img/renderer/bvh_benchmarking/dragon_c10000_b385.871_t0.000161021.png"><img src="/img/renderer/bvh_benchmarking/dragon_c10000_b385.871_t0.000161021.jpg" /></a>
		<div class="caption">
			Cluster Size: 10000<br />
			Build Time: 385871 ms<br />
			Average Raytrace: 0.161021 ms
		</div>
	</div>
</div>

<div class="row">
	<div class="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
		<a href="/img/renderer/bvh_benchmarking/dragon_c100000_b4513.11_t0.000128856.png"><img src="/img/renderer/bvh_benchmarking/dragon_c100000_b4513.11_t0.000128856.jpg" /></a>
		<div class="caption">
			Cluster Size: 100000<br />
			Build Time: 4513110 ms<br />
			Average Raytrace: 0.128856 ms
		</div>
	</div>
</div>

<p>Clearly, small cluster sizes produce extremely poor results. The whiter the boxes, the closer they are to the size of the full bounding box. Increasing the cluster size by a factor of 10 greatly improves the tree traversal time, often cutting the average raytrace by a factor of 2 and sometimes even 10. The results of larger clustering seem to diminish once the cluster size becomes within ten percent of the mesh's triangle count, so this would probably be a reasonable limit to use for tree construction. Although these larger clusters take significantly longer to build, it's probably worth it given the millions of rays that are usually cast into a scene.</p>

<p>This is probably not the best metric of tree quality, and in the future I plan to make some images to depict how many intersection calculations need to be performed to find the intersection of a given ray. I also hope to implement other spatial tree structures and compare my results with those.</p>