import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Input, Textarea, FileUpload, PrimaryButton, Alert } from '../components/ui';
import { contactApi } from '../api';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Industrial Zone A, Block 7\n34956 Istanbul, Turkey' },
  { icon: Phone, label: 'Phone', value: '+90 216 555 1234', href: 'tel:+902165551234' },
  { icon: Mail, label: 'Email', value: 'info@emasmetal.com', href: 'mailto:info@emasmetal.com' },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri: 08:00-18:00\nSat: 08:00-13:00' },
];

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitStatus('loading');

    try {
      const request = {
        name: formData.name.trim(),
        company: formData.company.trim() || undefined,
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
      };

      const response = await contactApi.submit(request, attachment || undefined);

      setSubmitStatus('success');
      setSubmitMessage(response.message || 'Thank you for your message. We will get back to you within 24 hours.');

      // Reset form
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setAttachment(null);
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emas-light-bg to-white">
        <div className="absolute inset-0 bg-industrial-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-emas-deep-blue mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to start your project? Have questions about our capabilities?
              We're here to help. Send us your drawings for a detailed quote.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-heading font-bold text-emas-deep-blue mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-12 h-12 bg-emas-light-bg rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-emas-soft-blue" />
                      </div>
                      <div>
                        <div className="font-medium text-emas-deep-blue mb-1">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-600 hover:text-emas-soft-blue transition-colors whitespace-pre-line"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-gray-600 whitespace-pre-line">{item.value}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-[4/3] bg-emas-light-bg rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Interactive map</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-emas-light-bg rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-bold text-emas-deep-blue mb-2">
                  Request a Quote
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and attach your technical drawings.
                  We'll respond within 48 hours.
                </p>

                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-emas-deep-blue mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-6">{submitMessage}</p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="text-emas-soft-blue hover:text-emas-deep-blue font-medium"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitStatus === 'error' && (
                      <Alert
                        type="error"
                        message={submitMessage}
                        onClose={() => setSubmitStatus('idle')}
                      />
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        placeholder="John Smith"
                      />
                      <Input
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corporation"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        placeholder="john@company.com"
                      />
                      <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <Textarea
                      label="Project Details"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      required
                      placeholder="Describe your project, quantities, materials, tolerances, and timeline requirements..."
                      rows={5}
                    />

                    <FileUpload
                      label="Attach Technical Drawings"
                      onFileSelect={setAttachment}
                      helperText="Upload PDF, DWG, DXF, STEP, or image files (max 20MB)"
                    />

                    <PrimaryButton
                      type="submit"
                      loading={submitStatus === 'loading'}
                      leftIcon={<Send className="w-5 h-5" />}
                      className="w-full md:w-auto"
                    >
                      {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                    </PrimaryButton>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response Promise */}
      <section className="py-16 bg-emas-deep-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Our Response Guarantee
          </h2>
          <p className="text-white/80">
            We understand that time is critical. That's why we commit to responding
            to all quote requests within 48 business hours, with detailed pricing
            and lead time information.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
