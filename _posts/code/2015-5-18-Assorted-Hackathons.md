---
layout: project
title: Assorted Hackathons
full_title: Assorted Hackathon Projects
tile_size: item1
column_size: col-lg-4 col-sm-4 col-xs-12
categories: ['code']
classes: code
bg_image: code/dogecache/dogecache.jpg
bg_blur_image: code/dogecache/dogecache_blur.jpg
summary: Various hackathon projects over the years.
---

<h3>Dogecache</h3>
<p><a href="//www.dogecache.com/about">Dogecache</a> is an innovative app inspired by the principles of geocaching: an outdoor recreational activity where participants use GPS and other navigational techniques to find containers containing small prizes left by other adventurers. There is only one caveat: you must leave something in order to take something. Dogecache puts an exciting spin on this recreational activity by embracing dogecoin. Rather than hunt for physical caches, the user hunts for virtual dogecaches that other explorers have left behind. The app is entirely location dependent, as you find dogecoins near you by dropping some in your current location. That is, the more dogecoins you drop, the larger your search radius is and the more likely you are to find other deposits. The tradeoff lies in the fact that you can only pick up other users’ dogecoins, and dogecoins you drop can only be picked up by other people. This helps encourage people to share their wealth.</p>

<p>Dogecache was originally created during the 24-hour hackBCA hackathon event by three of my friends and I when we were in high school. The main purpose of the app was to create an experimental digital scavenger hunt based around the digital cryptocurrency Dogecoin. The resulting product was judged as the Most Polished app of the competition by a group of expert judges, including Reddit co-founder Alex Ohanian and Vine co-founder Colin Kroll. In addition, the app was awarded a special award by Intel Corporation for quality mobile design.</p>

<p>The app takes the user's current GPS location and displays it on a map. Searching works by dropping dogecoin at your current location that other shibes may pick up. The more doge you drop, the larger your search radius, and you pickup doge that other users have dropped. However, the catch is you can't pick up any doge that you've dropped yourself. By doing this, we are making sure the game remains fun for everyone.</p>

<p>Dogecache is an HTML 5 mobile-first web app. This means that it will work on any internet enabled device by visiting the app in your preferred browser. Since this is designed to be used on the go, we've optimized it for mobile browsers, though it scales elegantly on desktop devices.</p>

<p>For Dogecache, I worked primarily on front end design and scripting. The app used Node.js and MongoDB on the backend and standard HTML, CSS, and Javscript on the frontend.</p>

<h4>Screenshots:</h4>
<div class="row">
  <div class="col-lg-3 col-sm-3 col-xs-6">
    <a href="/img/dogecache/1.jpg"><img src="/img/dogecache/1.jpg"/></a>
    <div class="caption">Login Page</div>
  </div>
  <div class="col-lg-3 col-sm-3 col-xs-6">
    <a href="/img/dogecache/2.jpg"><img src="/img/dogecache/2.jpg"/></a>
    <div class="caption">Map</div>
  </div>
  <div class="col-lg-3 col-sm-3 col-xs-6">
    <a href="/img/dogecache/3.jpg"><img src="/img/dogecache/3.jpg"/></a>
    <div class="caption">QR Code Deposit and Withdrawal</div>
  </div>
  <div class="col-lg-3 col-sm-3 col-xs-6">
    <a href="/img/dogecache/5.jpg"><img src="/img/dogecache/5.jpg"/></a>
    <div class="caption">Account History and Statistics</div>
  </div>
</div>


<h3>QuickDraw</h3>
<p>QuickDraw is a web-based competitive drawing application in which users attempt to draw and replicate flashed images. Using Node.js and Socket.io, players in the same room could compete with each other in realtime. All players are flashed the same picture for a few seconds and then have about thirty seconds to replicate it to the best of their ability on an HTML canvas. We then alogithmically calculated the percentage difference with the actual image to score each player.</p>

<h3>CityScenes</h3>
<p><a href="http://cityscenes.tk/">CityScenes</a> is a website application designed for the Young Rewired State Hackathon in New York, winning Best in Show. CityScenes, helps users plan their scenic bike journey by automatically plotting biking directions through landmarks, such as movie scene locations and monuments, along a desired route. CityScenes also automatically provides directions to the nearest available CitiBike station using real-time availability data. The user can choose the number and kind of landmarks they wish to visit, but if the user is in a rush, scenic routes may be turned off altogether to simply route the user using available CitiBike locations. The clean and intuitive interface enables the user to quickly discover new routes and sights to see and new destinations to visit. The CityScenes app provides a unique biking experience throughout the city.</p>

<div class="row">
  <div class="col-sm-8 col-sm-offset-2 col-xs-12">
    <a href="/img/cityscenes/cityscenes.jpg"><img src="/img/cityscenes/cityscenes.jpg"/></a>
    <div class="caption">Web Interface</div>
  </div>
</div>