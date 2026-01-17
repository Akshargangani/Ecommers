import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      content: 'support@shophub.com',
      description: 'Send us an email anytime',
    },
    {
      icon: FiPhone,
      title: 'Phone',
      content: '1-800-SHOP-HUB',
      description: 'Mon-Fri 9AM-6PM EST',
    },
    {
      icon: FiMapPin,
      title: 'Address',
      content: '123 Commerce St, Shop City, SC 12345',
      description: 'Visit our headquarters',
    },
  ];

  return (
    <div className="container-custom py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question or feedback? We'd love to hear from you. 
          Our team is always here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
          
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{info.title}</h3>
                  <p className="text-gray-900">{info.content}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Business Hours */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="input"
                  placeholder="Tell us more about your question or feedback..."
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-3 text-base font-semibold inline-flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="spinner w-5 h-5 mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  question: 'How long does shipping take?',
                  answer: 'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days.'
                },
                {
                  question: 'What is your return policy?',
                  answer: 'We offer a 30-day return policy for unused items in original packaging. Please see our Returns page for details.'
                },
                {
                  question: 'Do you ship internationally?',
                  answer: 'Yes, we ship to most countries worldwide. International shipping times and rates vary by location.'
                },
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
