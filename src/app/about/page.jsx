"use client";
import React from 'react';
import Image from 'next/image';
import { Target, Lightbulb, Users, Code, Github, Linkedin, ExternalLink, Rocket, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const solutions = [
    {
      icon: Rocket,
      title: "Effortless Portfolio Creation",
      description: "Transform the tedious process of building a portfolio from weeks to minutes. Our intuitive platform eliminates the technical barriers that prevent talented professionals from showcasing their work effectively."
    },
    {
      icon: Shield,
      title: "Professional Asset Management",
      description: "Centralize all your career documents in one secure location. Never lose track of resumes, certificates, or cover letters again with our organized storage system."
    },
    {
      icon: Zap,
      title: "Instant Deployment & Hosting",
      description: "Skip the complexity of web hosting and deployment. Get your portfolio live immediately with automatic GitHub integration and professional hosting included."
    },
    {
      icon: Globe,
      title: "Industry-Focused Templates",
      description: "Choose from templates specifically designed for developers and IT professionals. Each design is crafted to highlight technical skills and project showcases effectively."
    }
  ];

  const stats = [
    { number: "350+", label: "Portfolios Created" },
    { number: "5+", label: "Professional Templates" },
    // { number: "24hrs", label: "Average Response Time" },
    { number: "99%", label: "Uptime Guarantee" }
  ];

  return (
    <div className="bg-s h-screen w-screen text-black flex flex-col justify-center items-center">

      <div className='w-full md:w-[98%] h-screen rounded-3xl bg-light  text-black  flex flex-col items-center overflow-y-scroll gap-10'>

        {/* Hero Section */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-[60%] flex flex-col justify-start items-start gap-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-textp leading-tight">
                  About
                  <span className="text-textPurple"> OpusForge</span>
                </h1>
                <p className="text-lg lg:text-xl text-texts leading-relaxed">
                  Empowering developers and IT professionals to showcase their expertise through stunning, professional portfolios that make lasting impressions.
                </p>
                <div className="flex md:flex-wrap gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-textPurple">{stat.number}</div>
                      <div className="text-sm text-texts">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[40%] h-[300px] lg:h-[400px] border rounded-3xl relative bg-inputbg">
                <div className="absolute inset-0 flex items-center justify-center text-texts">
                  <Image
                    src="https://res.cloudinary.com/dpazarvil/image/upload/v1753598543/assets/cb4hxcefxroewkd2uciy.png"
                    alt="OpusForge Logo"
                    className="rounded-3xl object-cover w-full h-full"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Aim Section */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="bg-purple p-3 rounded-xl">
                  <Target className="md:w-8 md:h-8 text-textPurple" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-textp">Our Mission</h2>
              </div>

              <div className="space-y-8">
                <p className="md:text-xl text-justify text-texts leading-relaxed">
                  At OpusForge, we believe that every developer and IT professional deserves a portfolio that truly represents their skills and achievements. Our mission is to democratize professional portfolio creation by eliminating technical barriers and providing world-class tools that anyone can use.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  <div className="bg-cardbg rounded-2xl p-5 md:p-8   shadow-soft border border-border-light">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Lightbulb className="md:w-8 md:h-8 text-textPurple" />
                      <h3 className="text-center text-lg md:text-2xl font-semibold text-textp">Our Vision</h3>
                    </div>
                    <p className="text-texts text-justify leading-relaxed">
                      To become the go-to platform for technical professionals worldwide, enabling them to create portfolios that not only showcase their work but also tell their unique professional story in the most compelling way possible.
                    </p>
                  </div>

                  <div className="bg-cardbg rounded-2xl p-5 md:p-8  shadow-soft border border-border-light">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Users className="md:w-8 md:h-8 text-textPurple" />
                      <h3 className="text-lg md:text-2xl font-semibold text-textp">Our Values</h3>
                    </div>
                    <p className="text-texts text-justify leading-relaxed">
                      Simplicity without compromise, quality over quantity, and genuine support for our community. We're committed to building tools that respect your time and amplify your professional potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">The Solutions We Provide</h2>
              <p className="md:text-lg text-justify text-texts max-w-3xl mx-auto">
                OpusForge addresses the real challenges faced by developers and IT professionals when creating and maintaining their professional online presence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <div key={index} className="bg-cardbg rounded-2xl p-5 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border-light">
                    <div className="flex items-start gap-6">
                      <div className="bg-purple p-2 md:p-4 rounded-xl flex-shrink-0">
                        <IconComponent className="md:w-8 md:h-8 text-textPurple" />
                      </div>
                      <div>
                        <h3 className="md:text-xl font-semibold text-textp mb-3">{solution.title}</h3>
                        <p className="text-texts hidden md:flex leading-relaxed">{solution.description}</p>
                      </div>
                    </div>
                    <p className="text-texts text-justify md:hidden leading-relaxed">{solution.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-5 md:p-8 bg-purple rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-textp mb-4">The Problem We Solve</h3>
              <p className="text-texts max-w-3xl mx-auto leading-relaxed">
                Traditional portfolio creation is time-consuming, technically challenging, and often results in generic websites that fail to capture a professional's unique value. OpusForge transforms this experience into something enjoyable, efficient, and genuinely effective.
              </p>
            </div>
          </div>
        </div>

        {/* About Creator Section */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-[40%] h-[300px] lg:h-[400px] border rounded-3xl relative bg-inputbg">
                <div className="absolute inset-0 flex items-center justify-center text-texts">
                  <Image
                    src="https://res.cloudinary.com/dpazarvil/image/upload/v1757685978/assets/qhabvaqsvn7745eusdyc.jpg"
                    alt="Subham Kumar"
                    className="rounded-3xl object-cover w-full h-full"
                    width={600}
                    height={600}
                  />
                </div>
              </div>
              <div className="w-full lg:w-[60%] flex flex-col justify-start items-start gap-6">
                <div>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-textp mb-2">Meet the person behind OpusForge</h2>
                  <h3 className="text-lg md:text-xl text-textPurple font-semibold md:mb-4">KBV Kishore</h3>
                </div>

                <div className="space-y-4 text-texts leading-relaxed text-sm md:text-base">
                  <p>
                    Hi, I'm Kishore,  creator of OpusForge. As a passionate developer myself, I understand the challenges of building a professional portfolio that truly represents your skills and achievements.
                  </p>
                  <p>
                    After seeing countless talented developers struggle with portfolio creation or settle for generic solutions, I decided to build something different. OpusForge represents my commitment to empowering the developer community with tools that are both powerful and accessible.
                  </p>
                  <p>Create professional portfolios in minutes, not hours or days</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <a
                    href="https://www.linkedin.com/in/kbv-kishore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center gap-3 justify-center"
                  >
                    <Linkedin className="w-5 h-5" />
                    Connect on LinkedIn
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/KBV-Kishore2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center gap-3 justify-center"
                  >
                    <Github className="w-5 h-5" />
                    View GitHub Profile
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-5 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">Why Choose OpusForge?</h2>
                <p className="md:text-lg text-texts">
                  We're not just another portfolio builder. We're your partner in professional success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-purple p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Code className="w-8 h-8 text-textPurple" />
                  </div>
                  <h3 className="text-xl font-semibold text-textp mb-2">Built from a problem</h3>
                  <p className="text-texts text-sm">
                    Created by someone who understands the unique needs of technical professionals
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-purple p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-textPurple" />
                  </div>
                  <h3 className="text-xl font-semibold text-textp mb-2">Lightning Fast</h3>
                  <p className="text-texts text-sm">
                    Go from zero to deployed portfolio in minutes, not weeks
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-purple p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-textPurple" />
                  </div>
                  <h3 className="text-xl font-semibold text-textp mb-2">Community Focused</h3>
                  <p className="text-texts text-sm">
                    Genuine support and continuous improvement based on user feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full p-4 md:p-6 mb-32 md:mb-24">
          <div className="w-full rounded-3xl bg-textPurple p-5 md:p-8 lg:p-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-light mb-6">
              Ready to Build Your Success Story?
            </h2>
            <p className="md:text-lg text-purple mb-8 max-w-2xl mx-auto">
              Join the community of professionals who've transformed their careers with OpusForge. Your perfect portfolio is just minutes away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signin" className="bg-light hover:bg-s text-textPurple px-8 py-3 rounded-xl font-medium transition-colors duration-200">
                Start Building Now
              </Link>
              <Link href="/demo" className="border border-purple hover:border-light text-light hover:bg-hoverbg px-8 py-3 rounded-xl font-medium transition-colors duration-200">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}