
import React from 'react'
import {connect} from 'react-redux'
import {openProject, closeProject} from './actions'
import classnames from 'classnames'
require('./style/project.less')

class _Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thumbnail: '',
      backgroundPos: '0px',
      hover: false,
      hasLoaded: false,
    }
  }

  componentDidMount() {
    if (this.props['thumbnail-hq']) {
      let img = new Image()
      img.onload = () => {
        this.setState({
          thumbnail: this.props['thumbnail-hq']
        })
      }
      img.src = this.props['thumbnail-hq']
    }
    this.setBackgroundPos()
    window.addEventListener('resize', this.setBackgroundPos.bind(this))
  }

  setBackgroundPos() {
    this.setState({
      backgroundPos: `${-this.refs.summary.clientHeight}px`
    })
  }

  render() {
    var popover
    if (this.props.open) {
      popover =
      <div className={classnames({'project-popover': true, 'in': this.props.open})}>
        <div className='scrollable'>
          <br />
          <div className='container'>
            <h2 className='additional-links'>
              {this.props.repo ? <a className='repo' href={this.props.repo}></a> : null}
            </h2>
            <h1>{this.props.title}</h1>
            <hr />
            {this.props.children}
          </div>
        </div>
        <a className='close-btn' href='#' onClick={() => {
          process.nextTick(() => {
            document.body.scrollTop = this.scroll
          })
          this.props.setClosed()
        }}>&#10006;</a>
      </div>
    } else {
      popover =
      <div className={classnames({'project-popover': true, 'in': this.props.open})}>
      </div>
    }

    return (
      <div className='project-wrapper'>
        <div className='project'
          onClick={() => {
            this.scroll = document.body.scrollTop
            this.setState({
              hasLoaded: true
            })
            location.hash = this.props.title
            this.props.setOpen()
          }}
          onMouseOver={(e) => {
            this.setState({
              hover: true
            })
          }}
          onMouseOut={(e) => {
            this.setState({
              hover: false
            })
          }}
          style={{
            'backgroundImage': `url(${this.state.hover ? this.state.thumbnail || this.props.thumbnail : this.props.thumbnail})`,
            'backgroundPositionY': this.state.backgroundPos
          }}>
          <div ref='summary' className='summary'>
            {this.props.repo ? <a className='repo' href={this.props.repo}></a> : null}
            <h3>{this.props.title}</h3>
            <p>{this.props.summary}</p>
          </div>
        </div>
        {popover}
      </div>
    )
  }
}

_Project.defaultProps = {
  thumbnail: ''
}

export const Project = connect(
  function(state, ownProps) {
    return {
      open: state.open == ownProps.title
    }
  },
  function(dispatch, ownProps) {
    return {
      setOpen: () => {
        dispatch(openProject(ownProps.title))
      },
      setClosed: () => {
        dispatch(closeProject(ownProps.title))
      }
    }
  })(_Project)


export default class Projects extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <h1 className='title'>Projects</h1>
        <hr />
        <div className='projects-wrapper clearfix'>
          <Project title="Boids" summary="GPU Flocking simulation written in CUDA which easily handles half a million agents at 60fps+" thumbnail='img/boids.png' thumbnail-hq='img/boids.gif' repo='//github.com/austinEng/Project1-CUDA-Flocking'>
            <h2>Introduction</h2>
            <p>Boids is a crowd simulation algorithm developed by Craig Reynolds in 1986 which is modeled after the flocking behaviors exibited by birds and fish. It most simply operates on three rules:</p>
            <ol>
              <li>Cohesion: Boids will try to move towards the perceived center of mass of other boids around them.</li>
              <li>Alignment: Boids will tend to steer in the direction of the perceived average movement of other boids around them.</li>
              <li>Separation: Boids will try to keep some amount of distance between them and other boids.</li>
            </ol>

            <div className='media'>
              <img src='img/boids.gif' />
            </div>

            <h2>Overview</h2>
            <p>The goal of this project was to get an introduction to CUDA programming and to analyze the performance of different methods of implementing the algorithm.</p>
            <h4>Naive</h4>
            <p>The naive approach for computing the new velocities for the agents is to check each boid against every other boid and apply the three rules described earlier. For obvious reasons, this is extremely slow. Regardless, a simple solution to implement this in CUDA is to have one thread for each boid. Each thread would loop over the entire position and velocity buffers (skipping itself) and compute a new velocity for that boid. Then, another CUDA kernel would apply the position update using the new velocity data.</p>

            <h4>Uniform Scattered Grid</h4>
            <p>We can immediately see that the use of a spatial data structure can greately improve performance. If we reduce the number of boids each thread needs to check against, we can decrease the amount of work each thread needs to do. Because the three rules only apply within a certain radius, organizing the boids on a uniformly spaced grid allows us to do an efficient neighbor search and only check boids that could possibly have incluence. We choose our uniform grid cell width to be twice the maximum search radius. This makes it so that at most, a boid may be influenced by other boids in the 8 cells directly around it.</p>

            <p>To create our "grid" we create an additional CUDA kernel which fills a buffer with respective grid cell indices. thrust::sort_by_key is then used to sort particle indices by their corresponding grid cell indices. Furthermore, we store the "start" and "end" indicies for each grid cell in two new buffers by checking for transitions in the sorted grid cell buffer.</p>

            <p>Now, instead of checking against all other boids, each thread in our velocity update can compute its grid index, compute its 8 neighbor grid cell indices, and only apply rules for those boids that have an index between "start" and "end" of a neighboring cell.</p>

            <h4>Uniform Coherent Grid</h4>
            <p>The solution can be further improved by making memory accesses more coherent. The uniform scattered grid implementation does unecessary hopping and "pointer"-chasing. Instead of using an additional sorted buffer to find the index into our particle data, we can shuffle the particle data so that it is also sorted by grid cell index. This small change ends up making signficant performance improvements.</p>

            <h2>Performance Analysis</h2>
            <h4>Varying Boid Count</h4>
            <p>Tests were done using a block size of 128. cudaTimer was used to measure the number of elapsed milliseconds to compute each frame. The average time for 1000 frames was recorded.</p>
            <div className='media'>
              <img src='img/particleCount_vs_msframe.png' />
            </div>
            <p>We can see that using uniform grids greatly improves performance and that adding coherence is even more performant. This makes sense because the uniform grid significantly reduces the number of boids that need to be checked against, and adding coherence makes memory access much faster. It&#39;s interesting to note, however, that the graphs of all three methods appear to be piecewise functions. They will increase exponentially at one rate (note the log scale) and then suddenly jump and increase at a different rate. Below is a graph with fine resolution exploring this phenomenon more deeply.</p>
            <div className='media'>
              <img src='img/particleCount_vs_msframe_fine.png' />
            </div>
            <p>Note the large jumps at about (5300, 5500), (16400, 16500), (31200, 31300), and (43600, 43700). I think that this may be happening because in some situations, the number of boids does not map well to the underlying architecture and memory access becomes less efficient.</p>

            <h4>Varying Block Size</h4>
            <p>Tests were done using 5000 boids. cudaTimer was used to measure the number of elapsed milliseconds to compute each frame. The average time for 1000 frames was recorded.</p>
            <div className='media'>
              <img src='img/blockSize_vs_relative_msframe.png' />
            </div>
            <p>Note that the above graph shows the <strong>relative</strong> number of milliseconds per frame, that is, the ratio of elapsed time to the lowest elapsed time for that method. This is done in an effort the normalize the results to better compare how each method is affected by block size. They all show significant slowdowns beginning at a block size of 32 or less. This may be happening because at 32 or fewer threads per block, there is only one warp (group of 32 threads) in a block. These smaller blocks mean that we need a larger number of blocks. With every warp in its own block, we lose the performance benefits of shared memory within a block and instead need to allocate memory for each of our very many blocks.</p>

            <p>Its worth noting that the coherent uniform grid saw these performance hits at a block size of 32 while the other methods were only impacted at 16. This may be because the coherent grid benefits more from shared memory access.</p>

            <p>All methods also show slightly decreased performance as we increase the block size from 128 towards 1024 (max). Because the GPU I tested can have a maximum of 2048 active threads, this means that as we increase the block size, the number of blocks we can have decreases. At a size of 1024, there can only be two blocks. Threads in a block are organized in warps (groups of 32 threads) and only one warp can execute at a time. Therefore it seems that in an attempt to allow more threads to share the same memory by increasing block size, we've made the execution of the threads slightly more synchronous.</p>
          </Project>
          <Project title="BioCrowds" summary="Realtime, 60fps+, WebGL crowd navigation inspired by spatial colonization algorithms and implemented with shaders" thumbnail='img/biocrowds.png' thumbnail-hq='img/biocrowds.gif' repo='//github.com/austinEng/CrowdsJS'>
            <h1 style={{'fontSize':'30px'}}><a href='//austin-eng.co/CrowdsJS/' style={{'textDecoration':'none'}}>Demo!</a></h1>
            <h2>Introduction</h2>
            <a href='http://www.sciencedirect.com/science/article/pii/S0097849311001713'>BioCrowds</a> is a crowd simulation algorithm developed by Alessandro de Lima Bicho, Rafael Araújo Rodrigues, Soraia Raupp Musse, Cláudio Rosito Jung, Marcelo Paravisi, and Léo Pini Magalhães. I had the pleasure of being able to personally work with Soraia and Cláudio in my crowd simulation class.
            <blockquote>
              "This algorithm was originally introduced to model leaf venation patterns and the branching architecture of trees. It operates by simulating the competition for space between growing veins or branches. Adapted to crowd modeling, the space colonization algorithm focuses on the competition for space among moving agents. Several behaviors observed in real crowds, including collision avoidance, relationship of crowd density and speed of agents, and the formation of lanes in which people follow each other, are emergent properties of the algorithm. The proposed crowd modeling method is free-of-collision, simple to implement, robust, computationally efficient, and suited to the interactive control of simulated crowds."
            </blockquote>
            <p>The algorithm works by scattering point-sized markers over the area which the agents may occupy. At every timestep, markers will be assigned to the nearest agent within a specified radius. Then a weighting function is used to integrate the marker contributions in order to compute an agent&#39;s new velocity. This function is designed to be 1 when the marker is in the same direction as the agent&#39;s goal and 0 when the marker is in the opposite direction.</p>
            <p>The goal of my project was to design and create a shader-based implementation of the algorithm which would be fast enough to run in a browser.</p>

            <div className='media'>
              <video src='img/biocrowds.webm' controls autoPlay loop></video>
            </div>

            <h2>Overview</h2>
            <h4>Nearest Neighbor Search</h4>
            <p>One of the largest bottlenecks in the original algorithm is gathering the nearest markers. Even with spatial acceleration structures this can be tricky. Because the agents are constantly moving every frame, we would need to perform many frequent dynamic tree updates. Furthermore, the markers are usually fairly dense so it can take a lot of time to determine the nearest agent for every one.</p>
            <p>An approximate solution is computed in a shader by drawing a voronoi diagram. Note that this does not actually do any agent-marker assignments but rather splits up the area into regions colored with the ID of the nearest agent. A great post about how this works can be found <a href="http://blog.alexbeutel.com/332/interactive-voronoi-diagrams-with-webgl/">here</a>. As we will see later, an approximate solution for the problem is found without the need to explicitly generate markers.</p>

            <h4>Marker-less Grid</h4>
            <p>Instead of explicitly placing markers, we instead treat each pixel as a marker. Not only does this implicitly handle marker "generation" for us, but it significantly simplifies computations. Instead of integrating contributions of nearby markers, we need only sum contributions from all pixels within a specified radius.</p>
            <p>Unfortunately, without randomly placed markers we lose some of the emergent behaviors of the original algorithm. Most notably, random placement works well to resolve collisions where an agent might prefer moving to one side over the other because of the distribution of markers. It also implicitly creates paths which have a higher weight so lane-forming occurs.</p>
            <p>We solve this by introducing a real-world-inspired bias into the system. In the construction of the voronoi diagram, we instead use skewed cylinders to project onto the 2D plane. They're skewed so that the right half is vertically higher than the left half. In practice, this means that should two cylinders overlap in the voronoi projection, the area which they take up after z-fighting will be biased to the right side. Two colliding agents will then prefer to pass each other by turning to the right. As well as gracefully resolving collisions, this bias introduces a preference which causes lanes to form automatically.</p>

            <h4>Computing Velocities</h4>
            Then, within each voronoi cell of an agent, a shader computes the weighting function for each pixel and writes that to a pixel buffer. Finally, a shader runs which accumulates the pixel contributions for each agent and stores the resulting velocity in a pixel buffer as a color. Since the positions of the agents are known, this new velocity can be looked up on the grid and their positions can be updated appropriately.
            <p></p>

            <h4>Collision Avoidance: Clamping Influences</h4>
            <p>The previous computations assumed that all agents were points. Because the agents in this simulation have some radius, we run a postpass on the voronoi diagram which shrinks each cell by the appropriate amount. This prevents the later computed pixel contributions from causing the agents to intersect trajectories.</p>
            <p></p>
          </Project>
          <Project title="FLIP/PIC Fluid Solver" summary="Highly concurrent C++ fluid solver capable of simulating over one million particles" thumbnail='img/flip.png' thumbnail-hq='img/flip.gif' repo='//github.com/austinEng/FLIP-PIC-Fluid-Solver'>
            <h2>Introduction</h2>
            <p>FLIP/PIC is a hybrid fluid simulation method proposed by Yongning Zhu and Robert Bridson in <a href="https://www.cs.ubc.ca/~rbridson/docs/zhu-siggraph05-sandfluid.pdf">Animating Sand as a Fluid</a>. It is a combination of FLIP (fluid-implicit-particle) and PIC (particle-in-cell) techniques. One of the core ideas is that some computations are simpler from a Langrangian point of view (per particle), and some computations are simplier from an Eulerian point of view (per position in space). For fluids, keeping track of positions and velocities is much more straight forward with the former method, allowing us to easily keep track of particle positions and update them based on their velocities. However, computing pressure forces is simplified on a fixed uniform grid because it is much easier to compute divergences at fixed intervals in space.</p>
            <p>The FLIP/PIC method solves the problem by projecting fluid attributes onto a fixed grid, performing grid-level pressure and force computations, and then mapping velocities back to the original particles. The FLIP part of the name involves adding the CHANGE in grid cell velocity to the original particle while PIC simply sets the new particle velocity to that of the grid. The former results in more chaotic motion because original particle velocities are preserved while the latter results in a smoothing of the simulation. The solver which I chose to implement is 95% FLIP and 5% PIC.</p>
            <div className='media aspect16x9'>
              <iframe className='content' src="https://player.vimeo.com/video/176328477?autoplay=1&loop=1" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
            </div>

            <h2>Overview</h2>
            <p>In implementing this project, I made heavy use of Intel's <a href="https://www.threadingbuildingblocks.org/">TBB</a> library for multithreading. The linear algebra library <a href="http://eigen.tuxfamily.org/index.php?title=Main_Page">Eigen</a> was also used heavily for solving pressure equations using the conjugate gradient method. Aside from understanding the complex math involved in fluid simulation, the algorithm is not too complex. It mostly involves solving physics for millions of particles over and over again. I spent a large portion of my time designing a good Grid interface which would allow me, without indexing errors, to easily iterate over neighboring grid cells and check and set various properties on the grid consistently. This was extremely helping in ensuring that my computations were operating on the correct data.</p>
          </Project>
          <Project title="Monte Carlo Pathtracer" summary="C++ Monte Carlo pathtracer build from scratch. Supports multiple importance sampling, progressive rendering, sobol quasi-random sampling, and BVH acceleration" thumbnail="/img/renders/dragon_blinn_64spp_12min_BVHbuild_23sec.bmp">
            <h2>Introduction</h2>
              <p>Monte Carlo path tracing is a rendering technique which aims to represent global illumination as accurately as possible. It does this by approximating the integral of all the light arriving at a certain point by casting millions of rays (based on physical reflectance models) and combining their weighted contributions. Rays of light are reflected and transmitted as they do in real life, resulting in very physically plausible images.</p>
              <div className='image-row clearfix'>
                <div className='captioned-image'>
                  <img src="/img/renders/dragon_mirror_64spp_15min_BVHbuild_17sec.bmp" />
                  <div className="caption">
                    Cornell box with Stanford dragon and Stanford bunny featuring mirror materials
                  </div>
                </div>
                <div className='captioned-image'>
                  <img src="/img/renders/refractive_spheres_64spp_3min.bmp" />
                  <div className="caption">
                    Cornell box featuring refractive spheres and caustic effects
                  </div>
                </div>
                <div className='captioned-image'>
                  <img src="/img/renders/various_materials_64spp_3min.bmp" />
                    <div className="caption">
                      Cornell box with objects of various materials
                    </div>
                </div>
                <div className='captioned-image'>
                  <img src="/img/renders/bunny.bmp" />
                    <div className="caption">
                      Stanford bunny with glossy floor
                    </div>
                </div>
              </div>

            <h2>Massively Concurrent</h2>
            <p>I made heavy use of tbb::flow::graph, tbb::task_group, and tbb::task_arena as well as TBB's parallel_for and parallel_join template functions to significantly improve the performance of my pathtracer. I created separate jobs for different parts of the render: creating ray jobs, tracing those rays through the scene, writing to the render film, updating the live GL preview window, etc... At first, I just created several tbb::task_groups for each of these, but this very quickly became confusing and difficult to manage. Creating temporary tbb::concurrent_queues to transfer data between them, ensuring that none of the tasks prematurely finish or get deleted, properly instantiating them when necessary, and safely cleaning up and freeing memory became extremely difficult to handle. I'm still learning a lot about C++, and the problems exponentially increase when you have multiple threads running. Using tbb::flow::graph made everything significantly easier. I could very easily set up my tasks and define the data flow and TBB automagically handled communication and data transfer between all of the tasks. When I first started using this, I tried to be smart about my task allocation and tried to specify the maximum number of tasks TBB should allocate to each node in the graph. I soon learned, that it's very difficult to know exactly how much to allocate to each node. Depending on where they're going in a scene, some rays may trace quickly and some may trace slowly. Allowing TBB to handle task creation with tbb::flow::unlimited led to consistently superior performance.</p>

            <p>I also employed TBB to accelerate my spatial acceleration tree traversal. I'm currently using a BVH and because nodes can very frequently overlap (so a piece of geometry could very easily be in multiple bounding boxes at once), I thought it would be a good idea to simultaneously explore the left and right subtrees. Intersected nodes were pushed onto a queue and then multiple threads pulled from that queue and checked intersections. I found that my assumption was indeed correct. On a simple scene (I have yet to do benchmarking on something more complex) one thread gave me intersections times of about 0.015ms on average. Two threads were nearly twice as fast at an everage of 0.064ms. Interestingly, using three threads was slightly slower than using two, but four threads was again faster. The reason for this is probably that because the tree is binary, a thread count which is a power of 2 is more unlikely to leave empty threads waiting around which may cause unnecessary overhead.</p>

            <h2>Multiple Importance Sampling</h2>
            <p>Multiple importance sampling is a very important part of rendering. When calculating direct energy, we typically cast rays from our point of intersection to a random point on the surface of a light source. However, if our light source is large but the surface is extremely specular, most of those rays are not going to bounce in the direction of our camera. It will take very many samples to even get a reasonably accurate image. We're wasting a lot of computation! On the other hand, if we only use the surface's reflectance model, if the light is small, a rough surface will generate rays that actually hit that light source a very small percentage of the time. We get the sample problem! The solution is to use Multiple Importance Sampling: use both methods and combine them with a heuristic to calculate the direct energy reflected. Here's a recreation of the Veach scene and comparisons showing only BRDF or only Light sampling:</p>
            <div className='image-row clearfix'>
              <div className='captioned-image' style={{'width': '33%'}}>
                <img src="/img/renders/light_only.bmp" />
                <div className="caption">
                  Light sampling only
                </div>
              </div>
              <div className='captioned-image' style={{'width': '33%'}}>
                <img src="/img/renders/veach_64spp_5min.bmp" />
                <div className="caption">
                  Multiple Importance Sampling
                </div>
              </div>
              <div className='captioned-image' style={{'width': '33%'}}>
                <img src="/img/renders/brdf_only.bmp" />
                  <div className="caption">
                    BRDF sampling only
                  </div>
              </div>
            </div>

            <h2>Approximate Agglomerative Clustering</h2>
            <p>Arguably one of the best ways to build a BVH is to use a bottom-up approach, merging the most optimal pair of nodes based on some heuristic function. The problem is, this is an extremely costly algorithm. If there are 100,000 nodes, it takes nCr(100,000, 2) evaluations of that heuristic function (once for every pair) to determine just one optimal pair. This is O(n3) to build the entire tree! <a href="http://www.cs.cmu.edu/~ygu1/paper/HPG13/HPG13.pdf">This paper</a> presents a novel idea, based on the idea that this operation is most expensive in the beginning of the construction when there are many, many nodes, and that many of those comparisons are very unnecessary. We know that the optimal pair of nodes will be physically close to each other, so there is little point in checking every single pair of nodes. Instead, we can first organize them in a lesser quality tree and use that as a bound to limit the number of comparisons we make at every iteration. The nodes are continually separated until we reach some maximum node size. Then, only those nodes in that cluster are compared pairwise and merged. The process is sped up by first sorting the nodes by their <a href="https://en.wikipedia.org/wiki/Z-order_curve">Morton code</a> which quickly and easily forms the data into an linear tree-like form.</p>
            <div className='image-row clearfix'>
              <div className='captioned-image' style={{'width': '50%'}}>
                <img src="/img/bvh/dragon.png" />
                <div className="caption">
                  Stanford Dragon
                </div>
              </div>
              <div className='captioned-image' style={{'width': '50%'}}>
                <img src="/img/bvh/bvh.png" />
                <div className="caption">
                  Computed AACBVH Tree
                </div>
              </div>
            </div>

            <h2>BVH Benchmarking</h2>
            <p>While working on my final project, I realized that for some reason, intersection tests on the Stanford dragon were remarkably slow (100 ms or more) for some regions of the dragon. I decided to do some benchmarking on my BVH tree built with <a href="http://www.cs.cmu.edu/~ygu1/paper/HPG13/HPG13.pdf">Approximate Agglomerative Clustering</a> to try to find the cause of the issue. I discovered that there were many more problems with my implementation. First of all, I had an error in my BVH construction which was leading to extremely poor construction in some regions. Secondly, I naively picked a cluster size for the construction based on whatever looked good, but I was also improperly constructing VBOs for my BVH trees which made things look better than they actually were.</p>

            <p>I've reworked my tree construction, making it more parameterizable and better templated so that it will hopefully be for flexible for future use. I ran tests on the Utah teapot (~1000 triangles), Stanford bunny (~5000 triangles), and Stanford dragon (~100000 triangles), logging the amount of time it took to build the tree and the average time for ray traversal.</p>

            <div className='image-row clearfix'>
              <div className='captioned-image'>
                <a href="/img/bvh/teapot_c10_b0.042409_t0.000211633.png"><img src="/img/bvh/teapot_c10_b0.042409_t0.000211633.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 10<br />
            			Build Time: 42.409 ms<br />
            			Average Raytrace: 0.211633 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/teapot_c100_b0.089652_t0.000107177.png"><img src="/img/bvh/teapot_c100_b0.089652_t0.000107177.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 100<br />
            			Build Time: 89.652 ms<br />
            			Average Raytrace: 0.107177 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/teapot_c1000_b0.417885_t8.54407e-05.png"><img src="/img/bvh/teapot_c1000_b0.417885_t8.54407e-05.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 1000<br />
            			Build Time: 417.885 ms<br />
            			Average Raytrace: 0.0854407 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/teapot_c10000_b0.573137_t9.54002e-05.png"><img src="/img/bvh/teapot_c10000_b0.573137_t9.54002e-05.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 10000<br />
            			Build Time: 573.135 ms<br />
            			Average Raytrace: 0.0954002 ms
            		</div>
              </div>
            </div>
            <div className='image-row clearfix'>
              <div className='captioned-image'>
                <a href="/img/bvh/bunny_low_c10_b0.137205_t0.00106669.png"><img src="/img/bvh/bunny_low_c10_b0.137205_t0.00106669.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 10<br />
            			Build Time: 137.205 ms<br />
            			Average Raytrace: 1.06669 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/bunny_low_c100_b0.451929_t0.000328793.jpg"><img src="/img/bvh/bunny_low_c100_b0.451929_t0.000328793.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 100<br />
            			Build Time: 451.929 ms<br />
            			Average Raytrace: 0.328793 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/bunny_low_c1000_b1.96188_t0.000149602.png"><img src="/img/bvh/bunny_low_c1000_b1.96188_t0.000149602.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 1000<br />
            			Build Time: 1961.88 ms<br />
            			Average Raytrace: 0.149602 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/bunny_low_c10000_b9.2727_t0.000120217.png"><img src="/img/bvh/bunny_low_c10000_b9.2727_t0.000120217.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 10000<br />
            			Build Time: 9272.7 ms<br />
            			Average Raytrace: 0.120217 ms
            		</div>
              </div>
            </div>
            <div className='image-row clearfix'>
              <div className='captioned-image'>
                <a href="/img/bvh/dragon_c10_b2.24062_t0.0196656.png"><img src="/img/bvh/dragon_c10_b2.24062_t0.0196656.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 10<br />
            			Build Time: 2240.62 ms<br />
            			Average Raytrace: 19.6656 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/dragon_c100_b9.64125_t0.00198559.png"><img src="/img/bvh/dragon_c100_b9.64125_t0.00198559.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 100<br />
            			Build Time: 964.125 ms<br />
            			Average Raytrace: 1.98559 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/dragon_c1000_b46.9278_t0.000392493.png"><img src="/img/bvh/dragon_c1000_b46.9278_t0.000392493.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 1000<br />
            			Build Time: 46927.8 ms<br />
            			Average Raytrace: 0.392493 ms
            		</div>
              </div>
              <div className='captioned-image'>
                <a href="/img/bvh/dragon_c10000_b385.871_t0.000161021.png"><img src="/img/bvh/dragon_c10000_b385.871_t0.000161021.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 10000<br />
            			Build Time: 385871 ms<br />
            			Average Raytrace: 0.161021 ms
            		</div>
              </div>
            </div>

            <div className='image-row clearfix'>
              <div className='captioned-image' style={{'margin': 'auto', 'width': '75%', 'float': 'none'}}>
                <a href="/img/bvh/dragon_c100000_b4513.11_t0.000128856.png"><img src="/img/bvh/dragon_c100000_b4513.11_t0.000128856.jpg" /></a>
            		<div className="caption">
            			Cluster Size: 100000<br />
            			Build Time: 4513110 ms<br />
            			Average Raytrace: 0.128856 ms
            		</div>
              </div>
            </div>

            <br />

            <p>Clearly, small cluster sizes produce extremely poor results. The whiter the boxes, the closer they are to the size of the full bounding box. Increasing the cluster size by a factor of 10 greatly improves the tree traversal time, often cutting the average raytrace by a factor of 2 and sometimes even 10. The results of larger clustering seem to diminish once the cluster size becomes within ten percent of the mesh's triangle count, so this would probably be a reasonable limit to use for tree construction. Although these larger clusters take significantly longer to build, it's probably worth it given the millions of rays that are usually cast into a scene.</p>

            <p>This is probably not the best metric of tree quality, and in the future I plan to make some images to depict how many intersection calculations need to be performed to find the intersection of a given ray. I also hope to implement other spatial tree structures and compare my results with those.</p>
          </Project>
          <Project title="Mini Maya" summary="A mini 3D modeling program built as an introduction to the fundamentals of computer graphics" thumbnail="/img/minimaya/test-render.bmp">
            <h2>Introduction</h2>
            <p>Mini Maya is a cumulative project which I worked on in my freshman year of college for CIS 460 (Introduction to Computer Graphics). The main languages used for developement were C++, OpenGL, and GLSL. Throughout the course of the semester, we developed features which utilized fundamental concepts in computer graphics. I went on to augment my project, implementing many other concepts and ideas which I found interesting or useful. To maintain the integrity of the course, I will document the various aspects of the project here, but refrain from disclosing code or specfic implementation details.</p>
        		<p>While working on this project, I found that the hardest part was not building any particular feature, but rather keeping my code flexible and efficient enough to accomodate all the different components.</p>

            <h2>Mesh Creation / Import</h2>
            <p>Various meshes can be automatically created within Mini Maya. Simple meshes are generated by simply creating vertices and creating faces and edges between them. More complex built-in meshes just use Mini Maya's OBJ importer to import and create a mesh.</p>
        		<p>Meshes in Mini Maya are represented with a half-edge data structure. OpenGL vertex and index buffers are generated whenever mesh geometry changes for drawing.</p>

            <h2>Transformation Controls</h2>
            <p>Mini Maya supports the standard transformation controls: translate, rotate, and scale. Keyboard shortcuts make it easy to toggle between these modes as well as lock onto the global X/Y/Z and local X/Y/Z axes. Control of the transformation is done using the mouse (implemented with much inspiration from Ken Shoemake's <a href="https://www.talisman.org/~erlkonig/misc/shoemake92-arcball.pdf">arcball paper</a>). In a similar fashion, the camera can be easily moved and rotated. All rotations are stored as quaternions to prevent problems with gimbal lock.</p>
        		<p>The transformation tool avoids accumlating rounding errors and allows for cancellation by storing both the old and new transformation in each object node. New transformations are always used for drawing, but the old transformation is kept to allow the user to undo or reset transformations.</p>

            <div className='media'>
              <img src='/img/minimaya/transformation-controls.gif' />
            </div>

            <h2>Mesh Editing Tools</h2>
            <p>Various mesh editing tools were implemented for Mini Maya. Mesh components (faces, edges, and vertices) can be transformed using the same methods described transforming objects. Other features include:</p>
        		<ul>
        			<li>Face Extrusion</li>
        			<li>Triangulation</li>
        			<li>Edge Split</li>
        			<li>Catmull-Clark Subdivision</li>
        			<li>Face/Edge/Vertex Deletion</li>
        		</ul>
        		<p>Mouse selection of mesh components was accomplished by either raycasting or reading from a selection ID buffer created in a shader.</p>

            <div className='media'>
              <img src='/img/minimaya/mesh-editing.gif' />
            </div>

            <h2>Scene Graph / Inheritance</h2>
            <p>Objects are stored in a tree, making easy transformation inheritance. To reduce computation, the full global transformation matrix is stored for every object. When the draw call is made, this matrix is used to compute the vertex positions of the mesh. When objects are transformed, only its full transformation and those of its children are updated. I found this to be significantly faster than simply storing local transformations and recomputing global transformations at every draw call. Storing global transformations also optimizes future computations such as those used when raycasting or ray tracing.</p>

            <div className='media'>
              <img src='/img/minimaya/scene-graph.gif' />
            </div>

            <h2>Material Editor</h2>
            <p>Materials are assigned to objects on a per-face basis. After assigning materials, they can easily be changed and the viewport will update in realtime. To accomplish this, a map of materials to objects is maintained so that when materials are updated, the proper vertex color buffers can be updated. Materials can have diffuse, transparent, reflective, and refractive components.</p>

            <div className='media'>
              <img src='/img/minimaya/material-editing.gif' />
            </div>

            <h2>Spatial Acceleration Structures</h2>
            <p>For this project, I first implemented an octree, then a k-D tree, and then finally a BVH tree. Although the k-D tree often resulted in faster tree traversal, I found the BVH tree to be significantly more effective because it was a lot easier to dynamically update the tree when meshes moved or were edited. Building the k-D tree took much longer, especially when there were many meshes close together. When rendering, I've gotten mixed results using BVH and k-D trees. I find that sparser scenes tend to perform much better with a BVH tree than with a k-D tree.</p>

            <div className='media'>
              <img src='/img/minimaya/bvh.gif' />
            </div>

            <h2>Selection</h2>
            <h4>Raycast Selection</h4>
            <p>Selection was initially accomplished by raycasting. Rays where cast from the camera into the scene and the first object encountered was then selected. Mini Maya maintains a selection list so that multiple objects can be selected at once. Operations, such as parenting, can then be applied to that list of objects.</p>
        		<p>To show that objects were selected, booleans were sent to the GLSL shader to denote whether or not objects or mesh components were selected. They would then be drawn in an orange color to indicate this. I found this much better than changing the vertex colors in my buffers because I knew that I would need to change them back once I deselected the object. I felt that this frequent switch was unecessary. A simple color override in the shader was a lot easier.</p>

            <h4>GPU Accelerated Selection</h4>
            <p>As meshes became more complex (and before I had a good spatial acceleration structure), I began to realize that raycasting could become very, very slow. I solved this problem by giving every object, component, or anything that is drawn a unique object ID. This ID was hashed as a color and drawn to an offscreen buffer. Now when the user clicks, the program simply gets the coordinates of the click, gets the color of the pixel, and looks up the respective object in a table. This greatly sped up selection times, especially with more complex meshes.</p>

            <h2>Ray Tracing</h2>
            <p>Mini Maya renders images with a simple raytracer. Rays are cast from the camera and bounce off surfaces a maximum of 10 times. These bounces are used to calculate the pixel color. The renderer also supports antialiasing (supersampling) and successfully renders shadows, reflections, refraction, and glossy surfaces.</p>

            <div className='media'>
              <img src="/img/minimaya/test-render.bmp" />
            </div>

          </Project>
        </div>
      </main>
    )
  }
}
