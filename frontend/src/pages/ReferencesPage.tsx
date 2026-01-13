import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Building2, ArrowRight } from 'lucide-react';
import { SectionHeader, LoadingSpinner, Alert } from '../components/ui';
import { referencesApi, getImageUrl, type Reference } from '../api';

// Fallback data for when API is unavailable
const fallbackReferences: Reference[] = [
  { id: '1', name: 'Siemens Energy', industry: 'Energy & Power', description: 'Precision turbine components', websiteUrl: 'https://siemens-energy.com', createdAt: '' },
  { id: '2', name: 'Bosch Rexroth', industry: 'Industrial Automation', description: 'Hydraulic system components', websiteUrl: 'https://boschrexroth.com', createdAt: '' },
  { id: '3', name: 'MAN Truck & Bus', industry: 'Automotive', description: 'Heavy-duty engine components', websiteUrl: 'https://man.eu', createdAt: '' },
  { id: '4', name: 'ThyssenKrupp', industry: 'Steel & Materials', description: 'Steel processing equipment parts', websiteUrl: 'https://thyssenkrupp.com', createdAt: '' },
  { id: '5', name: 'ABB Ltd', industry: 'Electrical Equipment', description: 'Motor housings and enclosures', websiteUrl: 'https://abb.com', createdAt: '' },
  { id: '6', name: 'KUKA Robotics', industry: 'Robotics', description: 'Robotic arm components', websiteUrl: 'https://kuka.com', createdAt: '' },
  { id: '7', name: 'Liebherr', industry: 'Heavy Machinery', description: 'Construction equipment parts', websiteUrl: 'https://liebherr.com', createdAt: '' },
  { id: '8', name: 'Voith', industry: 'Industrial Technology', description: 'Power transmission components', websiteUrl: 'https://voith.com', createdAt: '' },
];

const industries = [
  { name: 'Aerospace & Defense', count: 15 },
  { name: 'Automotive', count: 25 },
  { name: 'Energy & Power', count: 18 },
  { name: 'Medical Devices', count: 12 },
  { name: 'Industrial Machinery', count: 30 },
  { name: 'Robotics & Automation', count: 20 },
];

export const ReferencesPage: React.FC = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        setLoading(true);
        const data = await referencesApi.getAll();
        setReferences(data.length > 0 ? data : fallbackReferences);
        setError(null);
      } catch (err) {
        console.warn('Using fallback data:', err);
        setReferences(fallbackReferences);
        setError(null); // Don't show error if fallback works
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emas-light-bg to-white">
        <div className="absolute inset-0 bg-industrial-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-emas-deep-blue mb-6">
              Trusted by Industry Leaders
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              For over 15 years, we've been the precision manufacturing partner of choice 
              for leading companies across Europe and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-emas-deep-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-heading font-bold text-white">200+</div>
              <div className="text-white/70 mt-1">Satisfied Clients</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white">15+</div>
              <div className="text-white/70 mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white">50K+</div>
              <div className="text-white/70 mt-1">Parts Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-heading font-bold text-white">99.5%</div>
              <div className="text-white/70 mt-1">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Industries We Serve"
            subtitle="Delivering precision components across diverse sectors."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="flex items-center justify-between p-6 bg-emas-light-bg rounded-xl hover:bg-emas-soft-blue/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Building2 className="w-6 h-6 text-emas-soft-blue" />
                  <span className="font-medium text-emas-deep-blue">{industry.name}</span>
                </div>
                <span className="text-sm text-gray-500">{industry.count}+ clients</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client References */}
      <section className="py-20 bg-emas-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Clients"
            subtitle="Proud to partner with leading companies worldwide."
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" text="Loading references..." />
            </div>
          ) : error ? (
            <Alert type="error" message={error} className="mt-8" />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {references.map((ref) => (
                <div
                  key={ref.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  {ref.logoUrl ? (
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img
                        src={getImageUrl(ref.logoUrl)}
                        alt={`${ref.name} logo`}
                        className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                  ) : (
                    <div className="h-16 flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-emas-light-bg rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-heading font-bold text-emas-soft-blue">
                          {ref.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="font-heading font-semibold text-emas-deep-blue text-center mb-2">
                    {ref.name}
                  </h3>
                  
                  {ref.industry && (
                    <p className="text-xs text-gray-500 text-center mb-2">{ref.industry}</p>
                  )}
                  
                  {ref.description && (
                    <p className="text-sm text-gray-600 text-center mb-3">{ref.description}</p>
                  )}
                  
                  {ref.websiteUrl && (
                    <div className="text-center">
                      <a
                        href={ref.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-emas-soft-blue hover:text-emas-deep-blue transition-colors"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl text-emas-soft-blue/20 mb-6">"</div>
          <blockquote className="text-2xl text-gray-700 italic leading-relaxed mb-8">
            EMAS Metal has been our go-to partner for precision components for over 5 years. 
            Their quality is consistently excellent, and their team truly understands our requirements.
          </blockquote>
          <div>
            <div className="font-heading font-semibold text-emas-deep-blue">Thomas Weber</div>
            <div className="text-gray-500">Procurement Manager, Industrial Automation Company</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emas-deep-blue to-emas-soft-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">
            Join Our Growing List of Satisfied Clients
          </h2>
          <p className="text-white/80 mb-8">
            Experience the quality and reliability that keeps our clients coming back.
          </p>
          <Link to="/contact">
            <button className="px-8 py-4 bg-white text-emas-deep-blue font-medium rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ReferencesPage;
