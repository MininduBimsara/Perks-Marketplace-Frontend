"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Users, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { siteSettings } from "@/services/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await siteSettings.submitContactForm(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "Get in touch anytime",
      value: "hello@perkmarket.com",
      action: "mailto:hello@perkmarket.com",
      color: "bg-yellow-400"
    },
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Mon-Fri 9AM-6PM",
      value: "+60 3-2345 6789",
      action: "tel:+60323456789",
      color: "bg-[#1a3d35]"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      subtitle: "Come say hello",
      value: "Kuala Lumpur, Malaysia",
      action: "#",
      color: "bg-[#6b8d7f]"
    }
  ];

  const reasons = [
    {
      icon: Users,
      title: "Partnership Opportunities",
      description: "Join our marketplace and offer exclusive perks to our community"
    },
    {
      icon: MessageSquare,
      title: "General Support",
      description: "Questions about perks, accounts, or how our platform works"
    },
    {
      icon: Clock,
      title: "Business Inquiries",
      description: "Custom solutions and enterprise partnerships"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#f5f1e3] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Hero Content */}
            <div className="space-y-8 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-[#1a3d35] leading-tight">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Have questions about perks? Want to partner with us? We'd love to hear from you and help supercharge your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact-form"
                  className="bg-yellow-400 text-[#1a3d35] px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-lg text-center"
                >
                  Send Message
                </a>
                <a 
                  href="mailto:hello@perkmarket.com"
                  className="bg-[#1a3d35] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2a4d45] transition text-lg text-center"
                >
                  Email Direct
                </a>
              </div>
            </div>

            {/* Contact Visual */}
            
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3d35] mb-4">
              How to Reach Us
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, idx) => (
              <a 
                key={idx} 
                href={method.action}
                className="group bg-white rounded-2xl border border-gray-100 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-20 h-20 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition`}>
                  <method.icon className="text-white" size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#1a3d35] mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {method.subtitle}
                </p>
                <p className="text-[#1a3d35] font-semibold">
                  {method.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-20 bg-[#f5f1e3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a3d35] mb-4">
              Why Get in Touch?
            </h2>
            <p className="text-gray-600 text-lg">
              We're here to help with all your perk-related needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <reason.icon className="text-[#1a3d35]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1a3d35] mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a3d35] mb-4">
              Send us a Message
            </h2>
            <p className="text-gray-600 text-lg">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {isSubmitted ? (
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a3d35] mb-4">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600 mb-8">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-yellow-400 text-[#1a3d35] px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="bg-[#f5f1e3] rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#1a3d35] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#1a3d35] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-[#1a3d35] mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1a3d35] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellow-400 text-[#1a3d35] px-12 py-4 rounded-lg font-bold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1a3d35]"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#f5f1e3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a3d35] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How do I redeem a perk?",
                answer: "Simply click on the perk you're interested in and follow the redemption instructions provided. Each perk has specific steps outlined on its detail page."
              },
              {
                question: "Are the perks really free?",
                answer: "Most perks offer significant discounts, free trials, or exclusive access. Some may require you to meet certain criteria like being a startup or having a specific business size."
              },
              {
                question: "Can I submit my company's perk?",
                answer: "Absolutely! We'd love to feature your perk. Use the contact form above or email us directly to start the partnership process."
              },
              {
                question: "How quickly do you respond to inquiries?",
                answer: "We aim to respond to all inquiries within 24 hours during business days. Partnership inquiries may take 2-3 business days for a detailed response."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-[#1a3d35] mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}