import React from 'react';
import { FiTarget, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';

const About = () => {
  const values = [
    {
      icon: FiTarget,
      title: 'Our Mission',
      description: 'To provide customers with quality products at competitive prices while delivering exceptional shopping experiences.',
    },
    {
      icon: FiUsers,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else, ensuring every interaction is positive and helpful.',
    },
    {
      icon: FiAward,
      title: 'Quality Assurance',
      description: 'Every product in our store is carefully selected and quality-checked to meet the highest standards.',
    },
    {
      icon: FiGlobe,
      title: 'Global Reach',
      description: 'We serve customers worldwide with fast shipping and excellent customer support across all time zones.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Customer Support' },
  ];

  return (
    <div className="container-custom py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About ShopHub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted online shopping destination since 2020. We're passionate about bringing you the best products with exceptional service.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              ShopHub began as a small startup with a big vision: to create an online shopping experience that puts customers first. What started in a garage has now grown into a thriving e-commerce platform serving thousands of customers worldwide.
            </p>
            <p>
              Our journey has been driven by a simple belief: shopping should be easy, enjoyable, and accessible to everyone. We've worked tirelessly to curate a collection of high-quality products across various categories, from electronics to home goods.
            </p>
            <p>
              Today, we're proud to be more than just an online store. We're a community of shoppers who value quality, convenience, and exceptional service. Every day, we wake up excited to help you discover products that make your life better.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/600x400/3b82f6/ffffff?text=Our+Team"
            alt="Our Team"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-600 text-white rounded-2xl p-8 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-primary-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'John Smith', role: 'CEO & Founder', image: 'https://via.placeholder.com/300x300/3b82f6/ffffff?text=John' },
            { name: 'Sarah Johnson', role: 'Head of Operations', image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Sarah' },
            { name: 'Mike Chen', role: 'Lead Developer', image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Mike' },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of satisfied customers who trust ShopHub for their shopping needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/products"
            className="btn btn-primary px-8 py-3 text-lg font-semibold"
          >
            Browse Products
          </a>
          <a
            href="/contact"
            className="btn btn-outline px-8 py-3 text-lg font-semibold"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
