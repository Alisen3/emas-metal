import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'References', path: '/references' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  'CNC Milling',
  'CNC Turning',
  'Multi-Axis Machining',
  'Precision Grinding',
  'Quality Inspection',
  'Assembly Services',
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emas-deep-blue text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-tight">
                  EMAS Metal
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Precision CNC
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Delivering precision CNC machining solutions for industries worldwide.
              ISO 9001:2015 certified with over 15 years of manufacturing excellence.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emas-soft-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-emas-soft-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Industrial Zone A, Block 7<br />
                  34956 Istanbul, Turkey
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-emas-soft-blue flex-shrink-0" />
                <a href="tel:+902165551234" className="text-gray-300 text-sm hover:text-white transition-colors">
                  +90 216 555 1234
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-emas-soft-blue flex-shrink-0" />
                <a href="mailto:info@emasmetal.com" className="text-gray-300 text-sm hover:text-white transition-colors">
                  info@emasmetal.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-emas-soft-blue flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Mon - Fri: 08:00 - 18:00<br />
                  Sat: 08:00 - 13:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} EMAS Metal. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
