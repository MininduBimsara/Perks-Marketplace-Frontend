// src/app/(public)/contact/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { siteSettings } from "@/services/api";

// Contact page data structure
interface ContactPageData {
  hero: {
    title: string;
    subtitle: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  form: {
    title: string;
    subtitle: string;
    successMessage: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ContactPage() {
  const { theme, themeName } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch page content from CMS
  const [pageData, setPageData] = useState<ContactPageData>({
    hero: {
      title: "Get in Touch",
      subtitle:
        "Have questions about perks? Want to partner with us? We'd love to hear from you.",
    },
    contactInfo: {
      email: "hello@perkpal.com",
      phone: "+60 12-345 6789",
      address: "Kuala Lumpur, Malaysia",
    },
    form: {
      title: "Send us a Message",
      subtitle: "Fill out the form below and we'll get back to you shortly.",
      successMessage:
        "Thank you for reaching out! We'll get back to you within 24 hours.",
    },
    faqs: [
      {
        question: "How do I redeem a perk?",
        answer:
          "Simply click on the perk you're interested in and follow the redemption instructions provided.",
      },
      {
        question: "Are the perks really free?",
        answer:
          "Most perks offer significant discounts or free trials. Some may require you to meet certain criteria.",
      },
      {
        question: "Can I submit my company's perk?",
        answer:
          "Yes! Use our Partner With Us form to submit your perk offer for review.",
      },
    ],
  });

  useEffect(() => {
    // Fetch contact page data from CMS
    const fetchPageData = async () => {
      try {
        const response = await siteSettings.getStaticPage("contact");
        if (response.data) {
          setPageData(response.data);
        }
      } catch (error) {
        console.error("Failed to load contact page data:", error);
      }
    };
    fetchPageData();
  }, []);

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
      // Submit contact form via API
      await fetch("/api/v1/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-card {
          background-color: ${theme.colors.card};
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px ${
            themeName === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
          };
        }

        .input-field {
          background-color: ${theme.colors.background};
          color: ${theme.colors.foreground};
          border: 2px solid ${
            themeName === "dark" ? "rgba(255, 255, 255, 0.1)" : "#e5e7eb"
          };
        }

        .input-field:focus {
          outline: none;
          border-color: ${theme.colors.primary};
        }

        .gradient-text {
          background: linear-gradient(135deg, ${theme.colors.primary}, ${
        theme.colors.secondary
      });
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .faq-item {
          border-bottom: 1px solid ${
            themeName === "dark" ? "rgba(255, 255, 255, 0.1)" : "#e5e7eb"
          };
        }
      `}</style>

      <div
        style={{
          backgroundColor: theme.colors.background,
          minHeight: "100vh",
        }}
      >
        {/* Hero Section */}
        <section className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{ color: theme.colors.foreground }}
              >
                {pageData.hero.title}
              </h1>
              <p
                className="text-xl"
                style={{ color: theme.colors.foreground, opacity: 0.7 }}
              >
                {pageData.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Email Card */}
              <div className="contact-card rounded-2xl p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${theme.colors.primary}1A` }}
                >
                  <Mail
                    className="h-8 w-8"
                    style={{ color: theme.colors.primary }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.colors.foreground }}
                >
                  Email Us
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: theme.colors.foreground, opacity: 0.7 }}
                >
                  We&apos;ll respond within 24 hours
                </p>
                <a
                  href={`mailto:${pageData.contactInfo.email}`}
                  className="font-medium"
                  style={{ color: theme.colors.primary }}
                >
                  {pageData.contactInfo.email}
                </a>
              </div>

              {/* Phone Card */}
              <div className="contact-card rounded-2xl p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${theme.colors.secondary}1A` }}
                >
                  <Phone
                    className="h-8 w-8"
                    style={{ color: theme.colors.secondary }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.colors.foreground }}
                >
                  Call Us
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: theme.colors.foreground, opacity: 0.7 }}
                >
                  Mon-Fri, 9am-6pm MYT
                </p>
                <a
                  href={`tel:${pageData.contactInfo.phone.replace(/\s/g, "")}`}
                  className="font-medium"
                  style={{ color: theme.colors.secondary }}
                >
                  {pageData.contactInfo.phone}
                </a>
              </div>

              {/* Location Card */}
              <div className="contact-card rounded-2xl p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${theme.colors.accent}1A` }}
                >
                  <MapPin
                    className="h-8 w-8"
                    style={{ color: theme.colors.accent }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.colors.foreground }}
                >
                  Visit Us
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: theme.colors.foreground, opacity: 0.7 }}
                >
                  Our headquarters
                </p>
                <p
                  className="font-medium"
                  style={{ color: theme.colors.accent }}
                >
                  {pageData.contactInfo.address}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="contact-card rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: theme.colors.foreground }}
                >
                  {pageData.form.title}
                </h2>
                <p style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                  {pageData.form.subtitle}
                </p>
              </div>

              {isSubmitted ? (
                // Success Message
                <div
                  className="text-center py-12"
                  style={{ color: theme.colors.foreground }}
                >
                  <CheckCircle
                    className="h-16 w-16 mx-auto mb-4"
                    style={{ color: "#22c55e" }}
                  />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p style={{ opacity: 0.7 }}>{pageData.form.successMessage}</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-3 rounded-lg font-medium text-white"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                // Contact Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.colors.foreground }}
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field w-full px-4 py-3 rounded-lg"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: theme.colors.foreground }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field w-full px-4 py-3 rounded-lg"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.colors.foreground }}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field w-full px-4 py-3 rounded-lg"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: theme.colors.foreground }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-field w-full px-4 py-3 rounded-lg resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg font-semibold text-white text-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: theme.colors.foreground }}
              >
                Frequently Asked{" "}
                <span className="gradient-text">Questions</span>
              </h2>
              <p style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {pageData.faqs.map((faq, index) => (
                <div key={index} className="faq-item pb-6">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: theme.colors.foreground }}
                  >
                    {faq.question}
                  </h3>
                  <p style={{ color: theme.colors.foreground, opacity: 0.7 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
