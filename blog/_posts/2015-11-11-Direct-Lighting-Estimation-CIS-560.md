---
layout: blog
categories: blog 2015 11 11
excerpt: Estimating Direct Lighting in a Pathtracer
title: Direct Lighting Estimation - CIS 560
---

<p>We've gotten to some new material in CIS 560, namely direct lighting estimation. This is the first step toward making a Monte Carlo pathtracer! It turns out that my initial idea of how lighting was calculated was incorrect. (Not necessarily incorrect, but more inefficient. More on this in the next post). I thought that after casting a ray into a scene and you hit an object, you randomly bounce in some direction and recursively calculate the lighting. The problem with this is that sometimes we'll find the lights and sometimes we won't. More often than not, we're not going to successfully find a light source, resulting in images with very, very high variance and noise. Instead, at every iteration of our lighting calculation, we also check if we are directly illuminated by a light, essentially ensuring that if our point of intersectioni can be seen by a light, we take its contribution into account (This can also have negative consequences, more on this next time).</p>

<div class="row">
  <div class="col-sm-4 col-sm-offset-2 col-xs-12">
    <a href="/img/560/direct_lighting/test.bmp"><img src="/img/560/direct_lighting/test.bmp"/></a>
    <div class="caption">First test render of direct lighting estimation with diffuse materials.</div>
  </div>
  <div class="col-sm-4 col-xs-12">
    <a href="/img/560/direct_lighting/diffuse_spheres.bmp"><img src="/img/560/direct_lighting/diffuse_spheres.bmp"/></a>
    <div class="caption">Test render with many blown out regions. Turns out in many places in my calculation I was forgetting to normalize my vectors, resulting in large scaling factors thrown in all over the place. This is a very common problem that I saw many others face.</div>
  </div>
</div>

<h2>Light Sampling</h2>
<p>The most notable difference between this render and previous renders from my pathtracer (which was more of a simple raytracer), are the soft shadows. This is accomplished by randomly sampling points on the light's surface and then averaging the results. In our case, because we have yet to implement other sampling methods or recursively calculate indirect lighting, it doesn't matter whether we sample the light randomly multiple times or if we sample the pixel multiple times and pick a new random location on the light for each sample.</p>

<p>This results in soft shadows because regions that are only partially occluded by an obstacle will pick a sample on the light that is visible with some probability <i>p</i>. If we do this many times and take multiple samples, on average, the calculated lighting from that light source will be <i>p</i> times the unobstructed energy from that light.</p>

<h2>Non-Planar Light Sources</h2>

<p>For my project I also did some extra work to make implementations of cube and spherical light sources instead of just planar sources. Sampling these sources is relatively straight forward (just some extra trigonometry for spheres to uniformly sample a point, although the naive method will not be uniform if the geometry is scaled nonuniformly). The one trick is to ensure that the dot product of the light's normal and the ray from the light to the object is positive (that the emitted light has some non-negative contribution). Because of the convex and symmetric nature of spheres, achieving this is relatively straightforward. If the sampled point is not facing the desired geometry, we simply pick the point directly opposite. For cubes this is a little bit more tricky, but one method is to first find the faces that face our object, and then randomly sample on those.</p>

<div class="row">
  <div class="col-sm-4 col-sm-offset-2 col-xs-12">
    <a href="/img/560/direct_lighting/cube_light.bmp"><img src="/img/560/direct_lighting/cube_light.bmp"/></a>
    <div class="caption">Illumination from an orange cube light</div>
  </div>
  <div class="col-sm-4 col-xs-12">
    <a href="/img/560/direct_lighting/green_sphere_light.bmp"><img src="/img/560/direct_lighting/green_sphere_light.bmp"/></a>
    <div class="caption">Illumination from a green sphere light</div>
  </div>
</div>

<p>I also implmented meshes as light sources, but this is currently horribly inefficient. Because meshes can be concave, you have no easy way of intelligently picking a point that can see the geometry. I currently do rejection sampling and just randomly sample again if the point is not visible. Thinking about this problem again, perhaps it is viable to just ignore the ray's intersections with geometry from the light from which it came. A ray of light coming from a surface point <i>p</i> that intersects with another point <i>q</i> could be treated as if it came from <i>q</i>.</p>

<h2>Sampling Smarter</h2>
<p>Also important in light sampling is more intelligently picking points that will have a meaningful contribution to our lighting calculation. That is, for a sphere, there isn't much point in choosing points that result in emitted rays that are nearly perpendicular to our incident ray. Thus, for spheres, we can use a cosine distribution, to non-uniformly pick rays that have a greater probability of being meaningful. For cubes, one could take a dot product with each face, and then pick a face to randomly sample based on the overall contribution of each face.</p>