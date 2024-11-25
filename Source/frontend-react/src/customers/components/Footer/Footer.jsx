import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#e91e63] text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="text-2xl font-semibold">FoodieApp</h3>
            <p className="text-sm mt-2">Discover great food near you</p>
            <div className="social-links flex space-x-3 mt-4">
              <a href="https://facebook.com/foodieapp" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com/foodieapp" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com/foodieapp" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://linkedin.com/company/foodieapp" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
            <div className="app-downloads mt-4">
              <a href="#" className="inline-block bg-black text-white px-3 py-1 rounded-full mr-3 hover:bg-gray-800 text-xs">
                <i className="fab fa-apple mr-2"></i> App Store
              </a>
              <a href="#" className="inline-block bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 text-xs">
                <i className="fab fa-google-play mr-2"></i> Play Store
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul>
              <li><Link to="/about" className="text-sm hover:text-gray-300">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-gray-300">Contact</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-gray-300">Careers</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-gray-300">Blog</Link></li>
              <li><Link to="/press" className="text-sm hover:text-gray-300">Press</Link></li>
            </ul>
          </div>

          {/* For Restaurants Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-3">For Restaurants</h4>
            <ul>
              <li><Link to="/partner" className="text-sm hover:text-gray-300">Partner with us</Link></li>
              <li><Link to="/restaurant/app" className="text-sm hover:text-gray-300">Restaurant App</Link></li>
              <li><Link to="/restaurant/dashboard" className="text-sm hover:text-gray-300">Restaurant Dashboard</Link></li>
              <li><Link to="/restaurant/marketing" className="text-sm hover:text-gray-300">Marketing Tools</Link></li>
              <li><Link to="/restaurant/support" className="text-sm hover:text-gray-300">Restaurant Support</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-3">Legal</h4>
            <ul>
              <li><Link to="/terms" className="text-sm hover:text-gray-300">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-gray-300">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-sm hover:text-gray-300">Refund Policy</Link></li>
              <li><Link to="/cookies" className="text-sm hover:text-gray-300">Cookie Policy</Link></li>
              <li><Link to="/security" className="text-sm hover:text-gray-300">Security</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-3">Support</h4>
            <ul>
              <li><Link to="/help" className="text-sm hover:text-gray-300">Help Center</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-gray-300">FAQ</Link></li>
              <li><a href="mailto:support@foodieapp.com" className="text-sm hover:text-gray-300">Email Support</a></li>
              <li><a href="tel:+1234567890" className="text-sm hover:text-gray-300">Call Support</a></li>
              <li><Link to="/feedback" className="text-sm hover:text-gray-300">Send Feedback</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom mt-6 border-t pt-4">
          <p className="text-center text-xs">&copy; {currentYear} FoodieApp. All rights reserved.</p>
          <div className="footer-bottom-links text-center mt-3 space-x-3">
            <Link to="/sitemap" className="text-sm hover:text-gray-300">Sitemap</Link>
            <Link to="/accessibility" className="text-sm hover:text-gray-300">Accessibility</Link>
            <Link to="/responsible-disclosure" className="text-sm hover:text-gray-300">Responsible Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;