// components/Footer.tsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand / About */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">ResumeBuilder</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create beautiful, professional resumes in minutes. 
              Built with love for developers and professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resume Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-xl">in</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="text-xl">𝕘</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">
            © {currentYear} ResumeBuilder. All rights reserved.
          </p>
          
          <p className="text-gray-500 mt-4 md:mt-0">
            Made with ❤️ for developers in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;