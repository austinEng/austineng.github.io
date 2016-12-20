import React from 'react'

require('../style/resume.less')

const Dot = function(props) {
  return <span className='dot'>&#183;</span>
}

class Experience extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='item experience-item'>
        <h2>{this.props.location}<Dot /><span className='date'>{this.props.time}</span></h2>
        <h3>{this.props.role}{this.props.skills ? <Dot /> : null}<span className='skills'>{this.props.skills}</span></h3>
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
          <link rel='stylesheet' type='text/css' href='/styles.css' />
          <link rel='icon' href='/logo.png' />
        </head>
        <body id='resume'>
          <header id='head'>
            <img src='/logo.svg' />
            <h1>Austin Eng</h1>
            <h2>Software & Graphics Engineer</h2>
            <h3>
              <a href='//austin-eng.co'>austin-eng.co</a>
              <Dot />
              <a href='//github.com/austineng'>github.com/austineng</a>
              <Dot />
              <a href='mailto:austineng.inr@gmail.com'>austineng.inr@gmail.com</a>
              <Dot />
              732.737.7839
            </h3>
          </header>
          <Section name="Education">
            <Experience
              location="University of Pennsylvania"
              time="August 2014 - May 2018"
              role="B.S.E Computer Science · M.S.E. Computer Graphics and Game Technology">
            </Experience>
          </Section>
          <Section name="Experience">
            <Experience
              location="University of Pennsylvania"
              time="August 2015 - Now"
              role="Computer Graphics TA"
              skills="C++ · OpenGL · GLSL">
            </Experience>
            <Experience
              location="Dreamworks Animation"
              time="June - August 2016"
              role="Department Technical Director"
              skills="Python">
              <ul>
                <li>Developed <strong>tools and plugins to improve workflow</strong> for the lighting department with PyQt.</li>
                <li><strong>Optimized execution</strong> of render submissions and <strong>improved error reporting and logging</strong> of jobs.</li>
                <li>Designed and built more <strong>flexible and powerful tools for comparing arbitrary projects</strong>.</li>
              </ul>
            </Experience>
            <Experience
              location="Walt Disney Animation Studios"
              time="June - August 2015"
              role="Art and Production Intern"
              skills={"Python · Houdini · Maya"}>
              <ul>
                <li>Learned the entire animation pipeline through the <strong>production of a short film</strong>.</li>
                <li>Specialized in procedural modeling, effects, and technical animation in Houdini.</li>
                <li>Assisted in writing <strong>scripts to solve pipeline problems</strong> with animation and rig transfer.</li>
              </ul>
            </Experience>
            <Experience
              location="Artsicle"
              time="January 2014 - May 2014"
              role="Full Stack Web Developer"
              skills={"Ruby · JavaScript · CSS · HTML"}>
              <ul>
                <li>Developed <strong>MVC architecture</strong> for new features to assist artists in promoting their work</li>
                <li><strong>Improved caching efficiency</strong> with modifications to the Cashier gem</li>
                <li>Rewrote portions of the test suite to <strong>minimize external API calls for speed improvements</strong> and protection of credentials</li>
              </ul>
            </Experience>
          </Section>
          <Section name="Projects">
            <Experience
              location="Boids"
              time="September 2016"
              role="GPU Flocking Simulation"
              skills={"CUDA · C++"}>
              <ul>
                <li><strong>Crowd simulation algorithm</strong> which executes almost <strong>entirely in CUDA kernels</strong> and easily handles <strong>half a million agents</strong> at over <strong>60fps</strong></li>
              </ul>
            </Experience>
            <Experience
              location="FLIP/PIC Fluid Solver"
              time="April 2016"
              role="Physically-based Fluid Solver"
              skills={"C++ · OpenGL"}>
              <ul>
                <li>Highly <strong>concurrent and scalable fluid solver</strong> built for class implementing the FLIP/PIC fluid simulation method</li>
                <li>Capable of simulating <strong>over one million fluid particles</strong></li>
              </ul>
            </Experience>
            <Experience
              location="BioCrowds"
              time="March 2016"
              role="Crowd Simulation Engine"
              skills={"Javascript · WebGL"}>
              <ul>
                <li><strong>Realtime, 60fps, crowd simulation engine</strong> which computes <strong>on-the-fly, collision-free trajectories</strong> for hundreds of agents in a web browser</li>
                <li>Optimized by formulating computations as <strong>constant-time shaders</strong> executing over a uniform grid</li>
              </ul>
            </Experience>
            <Experience
              location="Monte Carlo Pathtracer"
              time="December 2015"
              role="Physically-based Renderer"
              skills={"C++ · OpenGL"}>
              <ul>
                <li>Highly <strong>concurrent Monte Carlo pathtracer</strong> built for class from scratch.</li>
                <li>Supports BVH spatial acceleration, multiple importance sampling, progressive rendering, sobol sampling</li>
              </ul>
            </Experience>
            <Experience
              location="Mini-Maya"
              time="April 2015"
              role="3D Modeling Program"
              skills={"C++ · OpenGL"}>
              <ul>
                <li>3D Modeling program built for class as an introduction to fundamental computer graphics principles</li>
                <li>Supports mesh data structures, subdivision, dual quaternion skinning, spatial acceleration, GPU-accelerated selection</li>
              </ul>
            </Experience>
          </Section>
          <Section name="Skills">
            <div className='item'>
              <h2>C++<Dot/>Python<Dot/>JavaScript<Dot/>OpenGL<Dot/>WebGL<Dot/>Unix<Dot/>Houdini</h2>
            </div>
          </Section>
        </body>
      </html>
    )
  }
}
