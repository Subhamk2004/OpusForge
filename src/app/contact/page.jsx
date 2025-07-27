"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, MessageSquare, Bug, Briefcase, Palette, HelpCircle, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactReasons = [
    {
      icon: Bug,
      title: "Bug Reports & Issues",
      description: "Found a bug or experiencing technical difficulties? Let us know so we can fix it quickly.",
      color: "text-red-600",
      bgColor: "bg-errorbg/40",
      category: "bug"
    },
    {
      icon: HelpCircle,
      title: "General Queries & Support",
      description: "Have questions about features, pricing, or need help using OpusForge? We're here to help.",
      color: "text-blue-600",
      bgColor: "bg-hoverbg/30",
      category: "support"
    },
    {
      icon: Briefcase,
      title: "Business Discussions",
      description: "Interested in partnerships, enterprise solutions, or business collaborations? Let's talk.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      category: "business"
    },
    {
      icon: Palette,
      title: "Custom Template Requests",
      description: "Need a unique template designed specifically for your industry or personal brand? We can help.",
      color: "text-textPurple",
      bgColor: "bg-purple-50",
      category: "custom"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', category: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectCategory = (category, title) => {
    setFormData(prev => ({
      ...prev,
      category: category,
      subject: title
    }));
  };

  return (
    <div className="bg-s h-screen w-screen text-black flex flex-col justify-center items-center">

      <div className='w-[98%] h-screen rounded-3xl bg-light  text-black  flex flex-col items-center overflow-y-scroll gap-10'>

        {/* Hero Section */}
        <div className="w-full p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-[60%] flex flex-col justify-start items-start gap-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-textp leading-tight">
                  Get in
                  <span className="text-textPurple"> Touch</span>
                </h1>
                <p className="text-lg lg:text-xl text-texts leading-relaxed">
                  We're here to help you succeed. Whether you have questions, need support, or want to discuss business opportunities, we'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:opusforge1978@gmail.com"
                    className="bg-textPurple hover:bg-hoverbg text-light px-8 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Send Email Directly
                  </a>
                  <button
                    onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                    className="border border-border-light hover:border-textPurple text-textp px-8 py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    Use Contact Form
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-[40%] h-[300px] lg:h-[400px] border rounded-3xl relative bg-inputbg">
                <div className="absolute inset-0 flex items-center justify-center text-texts">
                  <Image
                    src="https://res.cloudinary.com/dpazarvil/image/upload/v1753592944/assets/cse6gfejkkjzahzq3159.jpg"
                    alt="Contact Us"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Reasons */}
        <div className="w-full p-6">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">What Can We Help With?</h2>
              <p className="text-lg text-texts max-w-2xl mx-auto">
                Choose the category that best describes your inquiry for faster assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactReasons.map((reason, index) => {
                const IconComponent = reason.icon;
                const isSelected = formData.category === reason.category;

                return (
                  <div
                    key={index}
                    onClick={() => selectCategory(reason.category, reason.title)}
                    className={`${reason.bgColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-textPurple shadow-medium' : 'border-transparent hover:shadow-soft'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-white ${isSelected ? 'shadow-medium' : 'shadow-soft'}`}>
                        <IconComponent className={`w-6 h-6 ${reason.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-textp mb-2">{reason.title}</h3>
                        <p className="text-texts text-sm leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full p-6" id="contact-form">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">Send Us a Message</h2>
                <p className="text-lg text-texts">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-textp mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-textPurple focus:border-transparent transition-all duration-200 bg-inputbg hover:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-textp mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-textPurple focus:border-transparent transition-all duration-200 bg-inputbg hover:bg-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-textp mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-textPurple focus:border-transparent transition-all duration-200 bg-inputbg hover:bg-white"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-textp mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-textPurple focus:border-transparent resize-vertical transition-all duration-200 bg-inputbg hover:bg-white"
                    placeholder="Please provide as much detail as possible..."
                    required
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-errorbg border border-error text-error rounded-xl">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Please fill in all required fields or try again later.
                    </div>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Thank you for your message! We'll get back to you within 24 hours.
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-textPurple hover:bg-hoverbg disabled:bg-texts text-light px-8 py-3 rounded-xl transition-all duration-200 font-medium hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                  <div className="flex items-center gap-2 text-texts text-sm">
                    <Clock className="w-4 h-4" />
                    <span>We typically respond within 24 hours</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="w-full p-6 mb-20">
          <div className="w-full rounded-3xl bg-light p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-textp mb-4">Other Ways to Reach Us</h2>
                <p className="text-lg text-texts">
                  Prefer direct communication? Here are additional ways to get in touch.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-cardbg rounded-2xl p-8 shadow-soft border border-border-light">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-textPurple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-textp">Email Us Directly</h3>
                      <p className="text-texts text-sm">For detailed inquiries</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a
                      href="mailto:opusforge1978@gmail.com"
                      className="text-textPurple hover:underline font-medium"
                    >
                      opusforge1978@gmail.com
                    </a>
                    <p className="text-texts text-sm">
                      Best for: Bug reports, feature requests, business inquiries, custom template discussions
                    </p>
                  </div>
                </div>

                <div className="bg-cardbg rounded-2xl p-8 shadow-soft border border-border-light">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-purple p-3 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-textPurple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-textp">Visit Our Website</h3>
                      <p className="text-texts text-sm">For more information</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a
                      href="https://opus-forge.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textPurple hover:underline font-medium"
                    >
                      opus-forge.vercel.app
                    </a>
                    <p className="text-texts text-sm">
                      Explore features, templates, and get started with your portfolio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}