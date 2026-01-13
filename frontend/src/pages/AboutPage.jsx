import { Link } from 'react-router-dom';
import { Target, Heart, Users, TrendingUp, Award } from 'lucide-react';
import { SectionHeader, PrimaryButton } from '../components/ui';

const values = [
  { icon: Target, title: 'Precision', description: 'Every micron matters. We pursue perfection in every component.' },
  { icon: Heart, title: 'Integrity', description: 'Honest communication, transparent pricing, reliable delivery.' },
  { icon: Users, title: 'Partnership', description: 'We view every client relationship as a long-term partnership.' },
  { icon: TrendingUp, title: 'Innovation', description: 'Continuously investing in technology to stay ahead.' },
];

const certifications = [
  'ISO 9001:2015 Quality Management',
  'ISO 14001:2015 Environmental Management',
  'AS9100D Aerospace Quality',
];

export const AboutPage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emas-light-bg to-white">
        <div className="absolute inset-0 bg-industrial-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-emas-deep-blue mb-6">
              Engineering Excellence Since 2009
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              From a small workshop to a leading precision machining facility, our journey
              has been defined by commitment to quality and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-emas-deep-blue mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  EMAS Metal was founded in 2009 by mechanical engineers with a passion for
                  precision manufacturing. What began as a modest workshop has grown into a
                  state-of-the-art facility serving clients across Europe.
                </p>
                <p>
                  Today, we operate from a modern 2,500m&sup2; facility equipped with the latest
                  CNC technology. Our team of 50+ skilled professionals is dedicated to
                  exceeding customer expectations.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-emas-soft-blue to-emas-deep-blue rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-heading font-bold mb-2">15+</div>
                  <div className="text-lg opacity-90">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-emas-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Core Values" subtitle="The principles that guide everything we do." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center p-6 bg-white rounded-xl">
                  <div className="w-16 h-16 mx-auto bg-emas-light-bg rounded-2xl flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-emas-soft-blue" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-emas-deep-blue mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Certifications & Quality" subtitle="Committed to the highest industry standards." />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-4 p-6 bg-emas-light-bg rounded-xl">
                <Award className="w-8 h-8 text-emas-soft-blue flex-shrink-0" />
                <span className="font-medium text-emas-deep-blue">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emas-deep-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Partner With Us</h2>
          <p className="text-white/80 mb-8">
            Experience the EMAS Metal difference. Let's discuss your next project.
          </p>
          <Link to="/contact">
            <PrimaryButton className="bg-white text-emas-deep-blue hover:bg-gray-100">
              Get in Touch
            </PrimaryButton>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
