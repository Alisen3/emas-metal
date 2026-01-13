import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, ZoomIn } from 'lucide-react';
import { LoadingSpinner, Alert } from '../components/ui';
import { galleryApi, getImageUrl } from '../api';

const categories = ['All', 'Milling', 'Turning', 'Parts', 'Factory'];

// Fallback data
const fallbackGallery = [
  { id: '1', title: '5-Axis CNC Milling Center', category: 'Milling', imageUrl: '', description: 'DMG MORI DMU 80 eVo', createdAt: '' },
  { id: '2', title: 'Precision Turning Operation', category: 'Turning', imageUrl: '', description: 'High-precision turning', createdAt: '' },
  { id: '3', title: 'Aerospace Component', category: 'Parts', imageUrl: '', description: 'Titanium aerospace part', createdAt: '' },
  { id: '4', title: 'Production Floor', category: 'Factory', imageUrl: '', description: 'Modern 2,500m² facility', createdAt: '' },
  { id: '5', title: 'Multi-Axis Machining', category: 'Milling', imageUrl: '', description: 'Complex geometry machining', createdAt: '' },
  { id: '6', title: 'Swiss-Type Turning', category: 'Turning', imageUrl: '', description: 'Small precision parts', createdAt: '' },
  { id: '7', title: 'Aluminum Housing', category: 'Parts', imageUrl: '', description: 'Anodized enclosure', createdAt: '' },
  { id: '8', title: 'Quality Lab', category: 'Factory', imageUrl: '', description: 'CMM inspection room', createdAt: '' },
];

export const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await galleryApi.getAll();
        setItems(data.length > 0 ? data : fallbackGallery);
        setError(null);
      } catch (err) {
        console.warn('Using fallback gallery:', err);
        setItems(fallbackGallery);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const openLightbox = (item) => {
    setLightboxItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-emas-light-bg to-white">
        <div className="absolute inset-0 bg-industrial-pattern opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-emas-deep-blue mb-6">
              Our Work Gallery
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our precision-machined components, state-of-the-art equipment,
              and modern manufacturing facility.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-emas-soft-blue text-white'
                    : 'bg-emas-light-bg text-gray-600 hover:bg-emas-soft-blue/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" text="Loading gallery..." />
            </div>
          ) : error ? (
            <Alert type="error" message={error} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[4/3] bg-emas-light-bg rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  {item.imageUrl ? (
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emas-soft-blue/20 to-emas-deep-blue/20">
                      <span className="text-4xl font-heading font-bold text-emas-soft-blue/40">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-heading font-semibold mb-1">{item.title}</h3>
                      {item.category && (
                        <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs text-white">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxItem.imageUrl ? (
              <img
                src={getImageUrl(lightboxItem.imageUrl)}
                alt={lightboxItem.title}
                className="w-full rounded-lg"
              />
            ) : (
              <div className="aspect-video bg-emas-deep-blue/50 rounded-lg flex items-center justify-center">
                <span className="text-6xl font-heading font-bold text-white/30">
                  {lightboxItem.title.charAt(0)}
                </span>
              </div>
            )}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                {lightboxItem.title}
              </h3>
              {lightboxItem.description && (
                <p className="text-white/70">{lightboxItem.description}</p>
              )}
              {lightboxItem.category && (
                <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                  {lightboxItem.category}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-emas-light-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-emas-deep-blue mb-6">
            Ready to See Your Parts Made Here?
          </h2>
          <p className="text-gray-600 mb-8">
            Send us your drawings and we'll provide a detailed quote within 48 hours.
          </p>
          <Link to="/contact">
            <button className="px-8 py-4 bg-emas-cta-blue text-white font-medium rounded-lg hover:bg-emas-deep-blue transition-colors inline-flex items-center gap-2">
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
