import React, { useState, useEffect } from 'react';
import { addWaitlistSubmission } from './firebase';

function App() {
  const [formData, setFormData] = useState({
    email: '',
    saasDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = saved || (prefersDark ? 'dark' : 'light');
    setTheme(next);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await addWaitlistSubmission(formData.email, formData.saasDescription);
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ email: '', saasDescription: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-inter">
      {/* Top bar with theme toggle */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
        <button onClick={toggleTheme} className="rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8 animate-fade-in motion-reduce:animate-none">
              <div className="rocket-container w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-blue-400 flex items-center justify-center shadow-lg animate-float motion-reduce:animate-none">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-white rocket-svg">
                  {/* Rocket body */}
                  <path d="M20 6L24 14H26L22 18L24 26L20 22L16 26L18 18L14 14H16L20 6Z" fill="currentColor"/>
                  {/* Rocket fins */}
                  <path d="M18 18L16 22L20 20L24 22L22 18" fill="currentColor" opacity="0.8"/>
                  {/* Exhaust flames */}
                  <path d="M18 26L16 30L20 28L24 30L22 26" fill="currentColor" opacity="0.6"/>
                  <path d="M19 26L17 29L20 27L23 29L21 26" fill="currentColor" opacity="0.4"/>
                </svg>
                {/* Trail effect */}
                <div className="rocket-trail"></div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-hero font-bold text-gray-900 leading-tight animate-fade-in-up motion-reduce:animate-none dark:text-white">
              <span className="text-gradient">InexiFlow</span> - Launch Your SaaS Without Losing Customers to Bugs -{' '}
              <span className="text-gradient">No Coding Required!</span>
            </h1>
            <p className="text-xl sm:text-subhero text-gray-600 leading-relaxed animate-fade-in-up-100 motion-reduce:animate-none dark:text-gray-300">
              Stop Bleeding Users to Broken Signups, Logins, and Payments. Get Crystal-Clear Pass/Fail Test Reports in Minutes with InexiFlow – Built for Non-Technical Founders.
            </p>
            <button 
              onClick={() => document.getElementById('waitlist-form').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4 animate-fade-in-up-200 motion-reduce:animate-none"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed animate-fade-in-up motion-reduce:animate-none dark:text-gray-300">
            Tired of buggy launches costing you users? Manual QA is slow, expensive, and error-prone. Hiring devs or using complex tools eats your budget. SaaS Tester automates end-to-end testing for signups, logins, payments, and more – no coding skills needed.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 transform transition-transform duration-300 will-change-transform hover:-translate-y-1 animate-fade-in-up motion-reduce:animate-none">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No-Code Interface</h3>
              <p className="text-gray-600 dark:text-gray-300">Drag-and-drop tests for UI, APIs, and integrations (e.g., Stripe, HubSpot).</p>
            </div>
            
            <div className="text-center space-y-4 transform transition-transform duration-300 will-change-transform hover:-translate-y-1 animate-fade-in-up-100 motion-reduce:animate-none">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI-Powered Automation</h3>
              <p className="text-gray-600 dark:text-gray-300">Catches bugs and edge cases, reducing QA time by 80%.</p>
            </div>
            
            <div className="text-center space-y-4 transform transition-transform duration-300 will-change-transform hover:-translate-y-1 animate-fade-in-up-200 motion-reduce:animate-none">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Affordable</h3>
              <p className="text-gray-600 dark:text-gray-300">Starts at $19/month – cheaper than one lost customer.</p>
            </div>
            
            <div className="text-center space-y-4 transform transition-transform duration-300 will-change-transform hover:-translate-y-1 animate-fade-in-up-300 motion-reduce:animate-none">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Built for No-Code Founders</h3>
              <p className="text-gray-600 dark:text-gray-300">Works with Bubble, Webflow, Adalo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="section-padding bg-accent-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in-up motion-reduce:animate-none">
            Join the Waitlist Now for:
          </h2>
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-2 animate-fade-in-up motion-reduce:animate-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg">Priority Beta Access (Q4 2025)</span>
            </div>
            <div className="flex items-center justify-center space-x-2 animate-fade-in-up-100 motion-reduce:animate-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg">50% Off Your First Year</span>
            </div>
            <div className="flex items-center justify-center space-x-2 animate-fade-in-up-300 motion-reduce:animate-none">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg">Zero-Risk Guarantee (full refund if we don't catch critical bugs)</span>
            </div>
          </div>
          <p className="text-xl font-semibold mb-6 animate-fade-in-up-300 motion-reduce:animate-none">
            Limited spots – don't miss out!
          </p>
          <button 
            onClick={() => document.getElementById('waitlist-form').scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-lg px-8 py-4 animate-fade-in-up-400 motion-reduce:animate-none"
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* Sign-Up Form Section */}
      <section id="waitlist-form" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8 animate-fade-in-up motion-reduce:animate-none">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 dark:text-white">
              Get Early Access
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in motion-reduce:animate-none dark:bg-green-900/30 dark:border-green-700 dark:text-green-300">
                🎉 Thanks for joining! We'll be in touch soon with your early access details.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in motion-reduce:animate-none dark:bg-red-900/30 dark:border-red-700 dark:text-red-300">
                ❌ Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="saasDescription" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                  What SaaS are you building? *
                </label>
                <textarea
                  id="saasDescription"
                  name="saasDescription"
                  required
                  value={formData.saasDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us about your SaaS idea or existing product..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get Early Access'}
              </button>
            </form>
            
            <p className="text-sm text-gray-500 text-center mt-6 dark:text-gray-400">
              By joining the waitlist, you'll be the first to know when we launch and get exclusive early access benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center animate-fade-in motion-reduce:animate-none">
          <p className="text-lg mb-4">
            InexiFlow – Empowering Non-Technical Founders to Launch Bug-Free.
          </p>
          <p className="text-base text-gray-400">
            Contact us on X <a href="https://x.com/VladDementev06" className="text-brand-400 hover:text-brand-300 transition-colors">@VladDementev06</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
