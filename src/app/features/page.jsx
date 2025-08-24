"use client";
import React from 'react';
import Image from 'next/image';
import { Rocket, FolderOpen, Eye, Github, Zap, Edit3, ArrowRight, Check, Code, Globe, Lock, FileText, LucideFilePenLine } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Rocket,
      title: "One-Click Portfolio Creation",
      description: "Transform your professional story into a stunning portfolio in minutes. Choose from expertly crafted templates designed specifically for developers and IT professionals.",
      imagePlaceholder: "https://res.cloudinary.com/dpazarvil/image/upload/v1753590249/assets/asr5doc8onwcwzprdl9y.png", // Placeholder for screenshot of template selection
      highlights: ["Professional templates", "Intuitive interface", "Instant GitHub repo creation", "Immediate hosting"]
    },
    {
      icon: Eye,
      title: "Live Preview & Real-time Editing",
      description: "See your changes instantly as you build. Our live preview system lets you perfect your portfolio before publishing, ensuring everything looks exactly as intended.",
      imagePlaceholder: "https://res.cloudinary.com/dpazarvil/image/upload/v1753587160/assets/bw9sqxzibnu20ca9s7da.png", // Placeholder for live editor screenshot
      highlights: ["Real-time updates", "Interactive preview", "Mobile responsive preview", "Instant feedback"]
    },
    {
      icon: FolderOpen,
      title: "Centralized Asset Management",
      description: "Never lose track of your professional documents again. Store, organize, and access all your career materials from one secure, organized location.",
      imagePlaceholder: "https://res.cloudinary.com/dpazarvil/image/upload/v1753590523/assets/j26agx0dmnxd04babqaz.png", // Placeholder for assets dashboard
      highlights: ["Resume storage", "Certificate management", "Cover letter organization", "Quick document access"]
    }
  ];

  const supportingFeatures = [
    { icon: Github, title: "GitHub Integration", desc: "Seamless OAuth and auto repo creation" },
    { icon: Zap, title: "Instant Deployment", desc: "Zero-config hosting with shareable links" },
    { icon: Edit3, title: "Easy Updates", desc: "Simple editing interface for maintenance" },
    { icon: Globe, title: "Custom Templates", desc: "Your design our developement, truly yours" },
    { icon: LucideFilePenLine, title: "Auto-fill", desc: "Automatically fill details with resume" },
    { icon: Code, title: "Developer Focused", desc: "Built for technical professionals" }
  ];

  const workflowSteps = [
    { step: "01", title: "Authenticate", desc: "Secure GitHub OAuth login", icon: Lock },
    { step: "02", title: "Choose Template", desc: "Select from professional designs", icon: Code },
    { step: "03", title: "Add Content", desc: "Fill in your professional details", icon: Edit3 },
    { step: "04", title: "Upload Assets", desc: "Store your documents securely", icon: FileText },
    { step: "05", title: "Preview & Edit", desc: "See live changes as you build", icon: Eye },
    { step: "06", title: "Deploy", desc: "Get your shareable portfolio link", icon: Globe }
  ];

  return (
    <div className="bg-s h-screen w-screen text-black flex flex-col justify-center items-center">

      <div className='w-full md:w-[98%] h-screen rounded-3xl bg-light  text-black  flex flex-col items-center overflow-y-scroll gap-10'>
        {/* Hero Section */}
        <div className="w-full md:p-6 h-full">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-[60%] flex flex-col justify-start items-start gap-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-textp leading-tight">
                  Powerful Features for
                  <span className="text-textPurple"> Professional Portfolios</span>
                </h1>
                <p className="text-lg lg:text-xl text-texts leading-relaxed">
                  Everything you need to create, manage, and deploy stunning portfolios that showcase your expertise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signin" className="bg-black/80 hover:bg-black text-light px-8 py-3 rounded-xl font-medium transition-colors duration-200">
                    Get Started Free
                  </Link>
                  <Link href="/demo" className="border border-border-light hover:border-textPurple text-textp px-8 py-3 rounded-xl font-medium transition-colors duration-200">
                    View Live Demo
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-[50%] h-[300px] lg:h-[400px] border rounded-3xl relative bg-inputbg">
                {/* Placeholder for hero image - could be a portfolio showcase or app screenshot */}
                <div className="w-full h-full flex items-center justify-center text-texts">
                  <div className="text-center w-full h-full">
                    <Image
                      src="https://res.cloudinary.com/dpazarvil/image/upload/v1749356015/assets/mbtpwa3ifao5ujya5p7k.png"
                      alt="Hero Image Placeholder"
                      width={700}
                      height={500}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Section */}
        <div className="w-full md:p-6 mt-10 md:mt-0">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">Core Features</h2>
              <p className="md:text-lg text-texts max-w-2xl mx-auto">
                Built for developers and IT professionals who value efficiency, quality, and professional presentation.
              </p>
            </div>

            <div className="space-y-16">
              {mainFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const isReverse = index % 2 === 1;

                return (
                  <div key={index} className={`flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                    <div className="w-full lg:w-[50%] flex flex-col justify-start items-start gap-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple p-3 rounded-xl">
                          <IconComponent className="md:w-8 md:h-8 text-textPurple" />
                        </div>
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-textp">{feature.title}</h3>
                      </div>

                      <p className="md:text-lg text-texts leading-relaxed">{feature.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        {feature.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-textPurple flex-shrink-0" />
                            <span className="text-texts">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full lg:w-[50%] h-[200px] md:h-[300px] lg:h-[350px] border rounded-3xl relative bg-inputbg">
                      {/* Image placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center text-texts">
                        <Image
                          src={feature.imagePlaceholder}
                          alt={`${feature.title} Screenshot`}
                          width={1200}
                          height={1000}
                          className="w-full h-full object-cover rounded-3xl"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Supporting Features Grid */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">Additional Features</h2>
              <p className="md:text-lg text-texts">Everything else you need for a complete portfolio solution</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportingFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-cardbg rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border-light">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-purple p-3 rounded-xl">
                        <IconComponent className="w-6 h-6 text-textPurple" />
                      </div>
                      <h3 className="text-lg font-semibold text-textp">{feature.title}</h3>
                    </div>
                    <p className="text-texts">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">How It Works</h2>
              <p className="md:text-lg text-texts max-w-2xl mx-auto">
                From zero to deployed portfolio in minutes. Our streamlined process makes portfolio creation effortless.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workflowSteps.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="relative">
                    <div className="bg-cardbg rounded-2xl p-6 shadow-soft border border-border-light h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-textPurple text-light rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                        <IconComponent className="w-6 h-6 text-textPurple" />
                      </div>
                      <h3 className="text-xl font-semibold text-textp mb-2">{item.title}</h3>
                      <p className="text-texts">{item.desc}</p>
                    </div>

                    {index < workflowSteps.length - 1 && index % 3 !== 2 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <ArrowRight className=" -mr-3 w-6 h-6 text-textPurple" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="w-full md:p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-[40%] h-[250px] lg:h-[300px] border rounded-3xl relative bg-inputbg">
                {/* Placeholder for testimonials or stats visualization */}
                <div className="absolute inset-0 flex items-center justify-center text-texts">
                  <Image
                    src="https://res.cloudinary.com/dpazarvil/image/upload/v1753591713/assets/aorzstemlsb8a381xm0i.webp"
                    alt="Social Proof Placeholder"
                    width={1200}
                    height={1000}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              </div>
              <div className="w-full lg:w-[60%] flex flex-col justify-start items-start gap-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-textp">
                  Loved by Developers
                </h2>
                <p className="text-lg text-texts leading-relaxed">
                  Join thousands of developers and IT professionals who have transformed their careers with OpusForge. Create your professional portfolio today and start standing out in the competitive tech industry.
                </p>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-textPurple">350+</div>
                    <div className="text-sm text-texts">Portfolios Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-textPurple">5+</div>
                    <div className="text-sm text-texts">Templates Available</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-2xl font-bold text-textPurple justify-center">
                      {/* <GalleryHorizontal className="w-6 h-6 fill-current" /> */}
                      500+
                    </div>
                    <div className="text-sm text-texts">Assets stored</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="w-full p-6 mb-24">
          <div className="w-full rounded-3xl bg-textPurple p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-light mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-lg text-purple mb-8 max-w-2xl mx-auto">
              Transform your career today with a professional portfolio that showcases your skills and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signin" className="bg-light hover:bg-s text-black px-8 py-3 rounded-xl font-medium transition-colors duration-200">
                Get Started Free
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}