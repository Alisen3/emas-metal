import React from 'react';
import { Link } from 'react-router-dom';
import { Cog, Target, Zap, Wrench, Microscope, Package, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Cog,
    title: 'CNC Milling',
    description: 'High-precision 3, 4, and 5-axis milling for complex geometries and tight tolerances. Our advanced milling centers handle everything from simple prismatic parts to complex aerospace components.',
    capabilities: [
      '5-axis simultaneous machining',
      'Tolerances to ±0.005mm',
      'Work envelope up to 1500x800x700mm',
      'High-speed machining up to 24,000 RPM',
    ],
    materials: ['Aluminum', 'Steel', 'Titanium', 'Inconel', 'Plastics'],
  },
  {
    icon: Target,
    title: 'CNC Turning',
    description: 'Multi-axis turning centers with live tooling for complete rotational parts in a single setup. Ideal for shafts, bushings, and complex turned components.',
    capabilities: [
      'Live tooling capability',
      'Bar feeding up to Ø65mm',
      'Swiss-type turning for small parts',
      'Y-axis milling operations',
    ],
    materials: ['Stainless Steel', 'Brass', 'Copper', 'Tool Steel', 'Aluminum'],
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    description: 'Fast turnaround prototypes to validate designs before full production. Get functional metal prototypes in as little as 3-5 business days.',
    capabilities: [
      '48-hour quote turnaround',
      'DFM feedback included',
      'Material selection support',
      'Finish options available',
    ],
    materials: ['All machinable metals', 'Engineering plastics'],
  },
  {
    icon: Wrench,
    title: 'Assembly Services',
    description: 'Complete sub-assembly and final assembly services to reduce your supply chain complexity. We can handle mechanical assembly, press-fitting, and functional testing.',
    capabilities: [
      'Mechanical assembly',
      'Press-fit operations',
      'Thread inserts installation',
      'Functional testing',
    ],
    materials: ['Customer-supplied components', 'Purchased parts'],
  },
  {
    icon: Microscope,
    title: 'Quality Inspection',
    description: 'Comprehensive quality inspection using CMM and optical measurement systems. Full documentation including FAI reports, material certs, and dimensional reports.',
    capabilities: [
      'CMM inspection to 0.001mm',
      'First Article Inspection (FAI)',
      'Material certifications',
      'Surface roughness testing',
    ],
    materials: ['All materials'],
  },
  {
    icon: Package,
    title: 'Surface Finishing',
    description: 'Complete surface treatment options to meet your functional and aesthetic requirements. From anodizing to powder coating, we handle it all.',
    capabilities: [
      'Anodizing (Type II & III)',
      'Powder coating',
      'Passivation',
      'Bead blasting',
    ],
    materials: ['Aluminum', 'Steel', 'Stainless Steel'],
  },
];

export const ServicesPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emas-light-bg to-white">
        <div className="absolute inset-0 bg-industrial-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-emas-deep-blue mb-6">
              Precision Manufacturing Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              From prototypes to production, we deliver precision-machined components 
              that meet the most demanding specifications across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.title}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="w-14 h-14 bg-emas-light-bg rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-emas-soft-blue" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-emas-deep-blue mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-emas-deep-blue mb-3">Capabilities:</h4>
                      <ul className="space-y-2">
                        {service.capabilities.map((cap) => (
                          <li key={cap} className="flex items-center gap-3 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-emas-soft-blue flex-shrink-0" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-emas-deep-blue mb-3">Materials:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.materials.map((mat) => (
                          <span key={mat} className="px-3 py-1 bg-emas-light-bg text-emas-deep-blue text-sm rounded-full">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-emas-light-bg to-emas-soft-blue/10 rounded-2xl flex items-center justify-center">
                      <Icon className="w-24 h-24 text-emas-soft-blue/30" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emas-deep-blue to-emas-soft-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Send us your drawings for a detailed quote within 48 hours.
          </p>
          <Link to="/contact">
            <button className="px-8 py-4 bg-white text-emas-deep-blue font-medium rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
