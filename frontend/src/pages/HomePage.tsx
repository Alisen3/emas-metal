import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Cog, 
  Target, 
  Zap, 
  Users,
  CheckCircle,
  Gauge
} from 'lucide-react';
import { HeroSection } from '../components/sections';
import { SectionHeader, ServiceCard, PrimaryButton, SecondaryButton } from '../components/ui';

const services = [
  {
    icon: Cog,
    title: 'CNC Milling',
    description: 'High-precision 3, 4, and 5-axis milling for complex geometries and tight tolerances.',
    features: ['5-axis simultaneous', 'Up to ±0.005mm tolerance', 'Large format capability'],
  },
  {
    icon: Target,
    title: 'CNC Turning',
    description: 'Multi-axis turning centers for rotational parts with live tooling capabilities.',
    features: ['Live tooling', 'Bar feeding', 'Swiss-type turning'],
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    description: 'Fast turnaround prototypes to validate designs before full production.',
    features: ['48-hour quotes', 'DFM feedback', 'Material selection support'],
  },
  {
    icon: Gauge,
    title: 'Quality Inspection',
    description: 'CMM inspection and comprehensive quality documentation for all parts.',
    features: ['Full CMM inspection', 'First article reports', 'Material certifications'],
  },
];

const industries = [
  'Aerospace & Defense',
  'Automotive',
  'Medical Devices',
  'Energy & Power',
  'Industrial Machinery',
  'Electronics',
];

const whyChooseUs = [
  {
    title: 'Precision Engineering',
    description: 'Tolerances down to ±0.005mm with advanced metrology verification.',
  },
  {
    title: 'Fast Turnaround',
    description: 'From quote to delivery in as little as 5 business days.',
  },
  {
    title: 'Material Expertise',
    description: 'Aluminum, steel, titanium, Inconel, plastics, and more.',
  },
  {
    title: 'Quality Certified',
    description: 'ISO 9001:2015 certified with full traceability.',
  },
];

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Precision Manufacturing Services"
            subtitle="From prototypes to production runs, we deliver quality machined components with consistency and precision."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                {...service}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <PrimaryButton rightIcon={<ArrowRight className="w-5 h-5" />}>
                View All Services
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-emas-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title="Why Choose EMAS Metal?"
                subtitle="We combine decades of machining expertise with modern technology to deliver exceptional results."
                align="left"
              />
              
              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                {whyChooseUs.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-emas-soft-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-heading font-semibold text-emas-deep-blue mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link to="/about">
                  <SecondaryButton rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Learn More About Us
                  </SecondaryButton>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-emas-soft-blue to-emas-deep-blue rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-industrial-pattern opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl font-heading font-bold mb-2">15+</div>
                    <div className="text-lg opacity-90">Years of Excellence</div>
                  </div>
                </div>
              </div>
              {/* Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emas-light-bg rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-emas-soft-blue" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-emas-deep-blue">200+</div>
                    <div className="text-sm text-gray-500">Satisfied Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Industries We Serve"
            subtitle="Trusted by leading companies across diverse sectors for mission-critical components."
          />
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {industries.map((industry) => (
              <div
                key={industry}
                className="px-6 py-3 bg-emas-light-bg rounded-full text-emas-deep-blue font-medium hover:bg-emas-soft-blue hover:text-white transition-colors cursor-default"
              >
                {industry}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/references">
              <SecondaryButton rightIcon={<ArrowRight className="w-5 h-5" />}>
                View Our References
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emas-deep-blue to-emas-soft-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Send us your drawings and specifications. Our engineering team will 
            provide a detailed quote within 48 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-emas-deep-blue font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Request a Quote
              </button>
            </Link>
            <Link to="/capabilities">
              <button className="px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white/50 hover:bg-white/10 transition-colors">
                View Capabilities
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
