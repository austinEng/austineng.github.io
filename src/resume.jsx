import React from 'react'
import styles from './style/resume.less'

const Dot = function(props) {
  return <span className={styles.dot}>&#183;</span>
}

class Experience extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={`${styles.item} experience-item`}>
        {this.props.location ? <h2>
          {this.props.location}
          {this.props.time ? <Dot /> : null}
          <span className={styles.date}>{this.props.time}</span>
        </h2> : null}
        {this.props.children}
      </div>
    )
  }
}

class Role extends React.Component {
  render() {
    return (
      <div className={styles.role}>
        <h3>
          {this.props.role}
          {this.props.skills ? <Dot /> : null}
          <span className={styles.skills}>{this.props.skills}</span>
        </h3>
        {this.props.children}
      </div>
    )
  }
}

class Section extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <h1>{this.props.name}</h1>
        {this.props.children}
      </section>
    )
  }
}

export default class Resume extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <html>
        <head>
          <title>Austin Eng - Resume</title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:100,200,300,400,500,600|Raleway:100,300,400,500,600" rel="stylesheet" />
          <link rel='stylesheet' type='text/css' href='/main.css' />
          <link rel='stylesheet' type='text/css' href='/resume.css' />
          <link rel='icon' href='/logo.png' />
          <meta charSet="utf-8" />
        </head>
        <body id={styles.resume}>
          <header id={styles.head}>
            {/* <img src='/logo.svg' /> */}
            <h1>Austin Eng</h1>
            <h2>Software & Graphics Engineer</h2>
            <h3>
              <a href='//austin-eng.com'>austin-eng.com</a>
              <Dot />
              <a href='//github.com/austineng'>github.com/austineng</a>
              <Dot />
              <a href='mailto:austineng.inr@gmail.com'>austineng.inr@gmail.com</a>
              <Dot />
              732.737.7839
            </h3>
          </header>
          <Section name="Experience">
            <Experience
              location="Google"
              time="May - August 2017 · September 2018 - Present">
              <Role
                role="Chrome GPU Software Engineer"
                // skills="C++ · Vulkan · D3D12 · Metal · OpenGL"
              >
                <ul>
                  <li><strong>Technical lead</strong> for <a href="https://dawn.googlesource.com/dawn">Dawn</a>: Google's implementation of the <a href="https://gpuweb.github.io/gpuweb/">WebGPU API</a>. Dawn is a portable C++ library which maps efficiently onto native APIs D3D12, Metal, Vulkan, OpenGL, OpenGLES, and D3D11.</li><li><strong>Developed</strong> significant portions of the implementation, and <strong>guide contributions</strong> from <strong>15+ contributors</strong> across multiple partner companies to ensure high code quality. Mentor multiple individuals on the project.</li>
                  <li><strong>Architected and implemented</strong> efficient integration into Chromium's multiprocess architecture to ensure low-overhead data transfer with cross-process GPU memory mapping.</li>
                  <li><strong>Advocated</strong> for and <strong>partnered</strong> with infrastructure teams to build more reliable, automated test infrastructure to improve developer productivity.</li>
                  <li>Prototyped, designed, and launched <strong>novel V8 to C++ bindings</strong>, making JavaScript API calls for WebGL, WebGPU, and other Web APIs up to <strong>300% faster</strong>. Improvements yielded <strong>12% CPU time reductions</strong> in WebGL applications.</li>
                  <li>Designed and implemented <a href="https://www.khronos.org/registry/webgl/extensions/WEBGL_multi_draw/">MultiDraw extensions</a> in both Chrome and ANGLE to enable applications to more efficiently submit draw calls, <strong>reducing CPU usage by 6x</strong>.</li>
                </ul>
              </Role>
            </Experience>
            <Experience
              location="Analytical Graphics"
              time="January - May 2017">
              <Role
                role="Cesium 3D Software Development Intern"
                // skills="WebGL · Javascript"
              >
                <ul>
                  <li>Contributed various features and optimizations to Cesium's rendering engine and 3D Tiles.</li>
                  <li>Optimized <a href="https://cesium.com/blog/2017/05/05/skipping-levels-of-detail/"><strong>loading of heirarchical level of detail meshes</strong></a> to <strong>reduce data usage by 30-50%</strong>.</li>
                  <li>Developed and <a href="https://patents.google.com/patent/US9865085B1/en">patented methods</a> for <strong>accurate and simulatenous rendering of heterogenous and multi-resolution meshes</strong> without visual artifacts through the application of a <strong>Bivariate Visibility Test</strong>.</li>
                  <li>Investigated tile <strong>request scheduling with HTTP/2</strong> to <strong>reduce load times by 25%</strong>.</li>
                </ul>
              </Role>
            </Experience>
            <Experience
              location="Dreamworks Animation"
              time="June - August 2016">
              <Role
                role="Department Technical Director Intern"
                // skills="Python"
              >
                <ul>
                  <li>Developed <strong>tools and plugins to improve workflow</strong> for the lighting department with PyQt.</li>
                  <li><strong>Optimized execution</strong> of render submissions and <strong>improved error reporting and logging</strong> of jobs.</li>
                  <li>Designed and built flexible tools for <strong>comparing arbitrary project files with complex dependencies</strong>.</li>
                </ul>
              </Role>
            </Experience>
            <Experience
              location="Walt Disney Animation Studios"
              time="June - August 2015">
              <Role
                role="Art and Production Intern"
                // skills={"Python · Houdini · Maya"}
              >
                <ul>
                  <li>Learned the entire animation pipeline through the <strong>production of a short film</strong>.</li>
                  <li>Specialized in procedural modeling, effects, and technical animation in Houdini.</li>
                  <li>Assisted in writing <strong>scripts to solve pipeline problems</strong> with animation and rig transfer.</li>
              </ul>
              </Role>
            </Experience>
            <Experience
              location="Artsicle"
              time="January - May 2014"
            >
              <Role
                role="Full Stack Web Developer"
                // skills={"Ruby · JavaScript · CSS · HTML"}
              >
                <ul>
                  <li>Developed <strong>MVC architecture</strong> for new features to assist artists in promoting their work.</li>
                  <li><strong>Improved caching efficiency</strong> with modifications to the Cashier gem.</li>
                  <li>Rewrote portions of the test suite to <strong>minimize external API calls for speed improvements</strong> and protection of credentials.</li>
                </ul>
              </Role>
            </Experience>
          </Section>
          <Section name="Achievements">
            <Experience
              location="Patent"
              time="May 2017">
              <Role
                role="Systems and Methods for 3D Modeling Using Skipping Heuristics and Fusing">
                <ul>
                  <li><a href="https://patents.google.com/patent/US9865085B1/en">Patent US9865085B1</a></li>
                  <li><strong>Data­-efficient loading and traveral of hierarchical level­-of-­detail trees</strong> utilizing screen space error, to <strong>skip levels-of-detail without incurring visual artifacts</strong>.</li>
                  <li><strong>Accurate rendering of overlapping heterogenous surfaces</strong> through the application of a <strong>Bivariate Visibility Test</strong>.</li>
                </ul>
              </Role>
            </Experience>
          </Section>
          <Section name="Education">
            <Experience
              location="University of Pennsylvania"
              time="August 2014 - May 2018">
              <Role role="Bachelor of Science and Engineering" skills="Computer & Information Science">
                <ul>
                  <li>GPA: 3.94</li>
                </ul>
              </Role>
              {/* <Role role="Mastor of Science and Engineering" skills="Computer & Information Science" /> */}
              {/* <Role role="Computer Graphics TA" skills="C++ · OpenGL · GLSL" /> */}
            </Experience>
          </Section>
          {/* <Section name="Projects">
            <Experience location="Simulation">
              <Role
                role="GPU Flocking Simulation"
                // skills={"Vulkan · CUDA · C++"}
              >
                <ul>
                  <li>Implemented a <strong>crowd simulation algorithm</strong> in both <strong>CUDA kernels and Vulkan compute shaders</strong>. Both easily handle <strong>half a million agents</strong> at over <strong>60fps</strong>.</li>
                </ul>
              </Role>

              <Role
                role="WebGL Crowd Simulation Engine"
                // skills={"Javascript · WebGL"}
              >
                <ul>
                  <li><strong>Realtime, 60fps, GPGPU crowd simulation engine</strong> which computes <strong>on-the-fly, collision-free trajectories</strong> for hundreds of agents in a web browser.</li>
                  <li>Optimized by formulating computations as <strong>constant-time shaders</strong> executing over a uniform grid.</li>
                </ul>
              </Role>

              <Role
                role="Physically-based FLIP/PIC Fluid Solver"
                // skills={"C++ · OpenGL · WebGL · GLSL"}
              >
                <ul>
                  <li>Highly <strong>concurrent C++ fluid solver</strong> built from scratch implementing the FLIP/PIC fluid simulation method.</li>
                  <li>Implemented a separate <strong>WebGL FLIP/PIC solver</strong> capable of running at <strong>interactive rates in a web browser</strong>.</li>
                </ul>
              </Role>
            </Experience>

            <Experience location="Rendering">
              <Role
                role="Physically-based Monte Carlo Pathtracer"
                // skills={"C++ · OpenGL"}
              >
                <ul>
                  <li>Highly <strong>concurrent C++ Monte Carlo pathtracer</strong> built from scratch.</li>
                  <li>Supports BVH spatial acceleration, multiple importance sampling, progressive rendering, sobol sampling.</li>
                </ul>
              </Role>

              <Role
                role="WebGL Deferred Shading"
                // skills={"Javascript · WebGL · GLSL"}
              >
                <ul>
                  <li>Implemented a WebGL rendering engine with deferred shading.</li>
                </ul>
              </Role>
            </Experience>
          </Section> */}
          <Section name="Skills">
            <div className={styles.item}>
              <h2>C++<Dot />D3D12/Vulkan/Metal<Dot />WebGPU<Dot />OpenGL/WebGL<Dot />JavaScript<Dot />HTML/CSS</h2>
              <h3>GLSL/HLSL<Dot />CUDA<Dot />Java<Dot />Python<Dot />Houdini<Dot />Maya<Dot />Ruby</h3>
            </div>
          </Section>
        </body>
      </html>
    )
  }
}
