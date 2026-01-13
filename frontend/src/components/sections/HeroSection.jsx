import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../ui';

const stats = [
  { icon: Shield, value: '15+', label: 'Years Experience' },
  { icon: Award, value: 'ISO 9001', label: 'Certified' },
  { icon: Clock, value: '48h', label: 'Quick Quotes' },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-emas-light-bg to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-industrial-pattern opacity-50" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-emas-soft-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emas-deep-blue/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emas-light-bg rounded-full mb-6">
              <span className="w-2 h-2 bg-emas-soft-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emas-deep-blue">
                Precision Engineering Since 2009
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-emas-deep-blue leading-tight mb-6">
              Precision CNC{' '}
              <span className="text-gradient">Machining</span>{' '}
              Excellence
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              From complex aerospace components to high-volume industrial parts,
              we deliver precision-machined solutions that meet the most demanding
              specifications. Your vision, engineered to perfection.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/contact">
                <PrimaryButton size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Request a Quote
                </PrimaryButton>
              </Link>
              <Link to="/capabilities">
                <SecondaryButton size="lg">
                  Our Capabilities
                </SecondaryButton>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emas-light-bg rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-emas-soft-blue" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-2xl text-emas-deep-blue">
                      {value}
                    </div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-fade-in animation-delay-200 hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-emas-soft-blue to-emas-deep-blue rounded-full opacity-10" />

              {/* Rotating Ring */}
              <div className="absolute inset-4 border-2 border-dashed border-emas-soft-blue/30 rounded-full animate-spin" style={{ animationDuration: '30s' }} />

              {/* Inner Circle with Icon */}
              <div className="absolute inset-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emas-soft-blue to-emas-deep-blue rounded-2xl flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2L12 6M12 18L12 22M2 12H6M18 12H22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <p className="font-heading font-semibold text-emas-deep-blue">
                    5-Axis CNC
                  </p>
                  <p className="text-sm text-gray-500">
                    Precision Machining
                  </p>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-8 -right-4 bg-white rounded-xl p-4 shadow-lg animate-slide-up animation-delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Quality Assured</p>
                    <p className="text-xs text-gray-500">ISO 9001:2015</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 -left-8 bg-white rounded-xl p-4 shadow-lg animate-slide-up animation-delay-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Fast Turnaround</p>
                    <p className="text-xs text-gray-500">From 48 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
