---
layout: project
title: Artsicle
full_title: Software Development Internship at Artsicle
tile_size: item2
column_size: col-lg-8 col-sm-8 col-xs-12
categories: ['professional', 'code']
classes: professional code
bg_image: professional/artsicle.jpg
bg_blur_image: professional/artsicle_blur.jpg
summary: Worked as a full-stack Ruby on Rails software engineering intern at <a href="//artsicle.com">Artsicle</a>.
---

<p>During my senior year of high school I worked as a full-stack Ruby on Rails developer for Artsicle. There, I took on a variety of tasks for Artsicle including creating a new help center feature for users who want to sell their art to customers, modifying admin panel user interfaces, improving caching with the Cashier gem, rewriting parts of the test suite to be independent of external API calls for speed improvements, and fixing bugs related to the back end logic. Below are some of the larger projects I worked on:</p>

<h3>Artist Resource Center</h3>
<p>The <a href="//www.artsicle.com/artist/resource-center">Artist Resource Center</a> was one of the main projects I worked on. The data for these help pages was structured as a nested set using the <a href="//github.com/collectiveidea/awesome_nested_set">awesome_nested_set</a> gem. This allowed the pages to easily and efficiently support categories, subcategories, subsubcategories, etc.</p>
<p>I designed and built the models, controllers, and backend logic with a test-driven development approach to handle the creation, modification, deletion, and display of these pages.</p>
<p>Below is a screenshot of the client interface for the help pages:</p>
<div class="row">
  <div class="col-sm-8 col-sm-offset-2 col-xs-12">
    <a href="/img/artsicle/artist-resource-center.png"><img src="/img/artsicle/artist-resource-center.png"/></a>
    <div class="caption">Client Interface</div>
  </div>
</div>

<h3>Cashier Caching Improvements</h3>
<p>The <a href="//github.com/ahawkins/cashier">cashier</a> gem allows for easily manipulation and access to cache using tags instead of keys. Caches can easily be tagged, grouped, and expired. With Artsicle, tags were being stored with inconsisent letter case, making cache operations more inefficient.</p>

<p>I worked on implenting a <a href="//github.com/austinEng/cashier/commit/cbb23a8e5795eba8464d5820532c7711f6252fed">modification</a> to the gem which would downcase all incoming tags. As caches were expired and recreated, the cache would gradually reach a point where all tags were lowercase, increasing cache efficiency. This was preferred over creating a task to downcase the entire cache at once as such an approach would invalidate all existing caches.</p>

<h3>Redesigned Test Suite</h3>
<p>Artsicle's test suite was full of external API calls which were both slow and insecure. All the API keys and credentials needed to be sent to an external testing service to properly test everything. I worked on rewriting the entire test suite to exclude and mock external API calls. Through this I gained a much greater understanding of the test-driven development process.</p>