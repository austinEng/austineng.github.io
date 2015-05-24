---
layout: project
title: Counter Hack
full_title: Technical Internship at Counter Hack
tile_size: item2
column_size: col-lg-8 col-sm-8 col-xs-12
categories: ['professional', 'code']
classes: professional code
bg_image: professional/counterhack.jpg
bg_blur_image: professional/counterhack_blur.jpg
summary: Worked as a technical intern at <a href="https://www.counterhackchallenges.com/">CounterHack</a>, a cybersecurity organization.
---

<p>Counter Hack is involved in many aspects of cybersecurity. They teach some training courses for <a href="https://www.sans.org/">SANS Institute</a>, they frequently hold hacking challenges, they conduct penetration testing for numerous groups and organizations, and they run a challenge called <a href="https://www.sans.org/netwars/cybercity">Netwars CyberCity</a> which the US military uses to train their cyber security skills.</p>
<blockquote>
CyberCity is a 1:87 scale miniaturized physical city that features SCADA-controlled electrical power distribution, as well as water, transit, hospital, bank, retail, and residential infrastructures. CyberCity engages participants to defend the city's components from terrorist cyber attacks, as well as to utilize offensive tactics to retake or maintain control of critical assets.
</blockquote>

<p>At Counter Hack, one of my main tasks was laptop upgrades. Though a tedious process, through it I learned a lot about cyber security. After upgrading the operating systems on the laptops, I would need to set up the virtual machines used for the hacking challenges, and test all the exploits to make sure that everything was running properly. The laptops are running virtual machines so that at the end of a challenge, they can be quickly reverted to their starting state.</p>

<h3>Intelligent Revert</h3>
<p>The target machines for hacking challenges typically are in sets of four. Numerous teams work, trying to hack into these machines in <a href="http://en.wikipedia.org/wiki/Capture_the_flag#Computer_security">Capture the Flag</a> challenges. The problem with hacking is that exploits are probabalistic, not deterministic. Sometimes they will succeed; sometimes they will fail. Sometimes they may even crash or corrupt the target. In competitions, this is a problem. We want challenges to be winnable, and if an exploit accidentally causes a challenge to break, then no one is going to be able to win. To combat this, the virtual machines on the target computers revert at the top of every hour. This ensures that the machines are always restored to a beatable state should something go wrong.</p>
<p>However, reverting machines introduces many annoyances. For any players who were relying on some internal state of the machine, that information would be lost every hour. Progress would also halt every hour for a few minutes while the machines restore themselves. In even larger challenges where there are maybe hundreds of target machines, reverting these every hour causes further complications. With so many machines trying to reconnect to the network, there is a signficantly amount of network traffic happening all at once, slowing everything down.</p>
<p>At Counter Hack, I worked on a proof-of-concept script which would automatically attempt to complete the challenges every hour. I wrote these mainly using Bash, Python, and Metasploit RC. It would complete the challenge in a minute or two or fail to do so. If it determined that the challenge was unwinnable, only then would the virtual machine revert. This greatly resolves many problems encountered when holding Capture the Flag competitions.</p>