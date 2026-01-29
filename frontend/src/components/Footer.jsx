import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Mail, FileText, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="text-red-600" size={28} />
              <h3 className="text-xl font-bold text-white">CineBook</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Your gateway to the magic of movies. Book tickets seamlessly and enjoy the best cinema experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about-us" 
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center gap-2"
                >
                  <Shield size={16} />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact-us" 
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={16} />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-and-services" 
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center gap-2"
                >
                  <FileText size={16} />
                  Terms & Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@cinebook.com</li>
              <li>Phone: +91 9921573539</li>
              <li>Location: Sunbeam, Pune</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms-and-services" 
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-and-services" 
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CineBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
