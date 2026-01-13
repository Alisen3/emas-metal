import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { PrimaryButton } from '../ui';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'References', path: '/references' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-emas-soft-blue to-emas-deep-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-emas-deep-blue tracking-tight">
                EMAS Metal
              </span>
              <span className="text-[10px] text-emas-gray uppercase tracking-widest">
                Precision CNC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-2 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'text-emas-soft-blue bg-emas-light-bg'
                    : 'text-gray-600 hover:text-emas-deep-blue hover:bg-gray-50'
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <PrimaryButton size="sm">
                Get Quote
              </PrimaryButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            lg:hidden
            overflow-hidden
            transition-all duration-300 ease-out
            ${isOpen ? 'max-h-[400px] pb-4' : 'max-h-0'}
          `}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-3 text-base font-medium rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'text-emas-soft-blue bg-emas-light-bg'
                    : 'text-gray-600 hover:text-emas-deep-blue hover:bg-gray-50'
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="px-4 pt-3 mt-2 border-t border-gray-100">
              <Link to="/contact" className="block">
                <PrimaryButton className="w-full">
                  Get Quote
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
