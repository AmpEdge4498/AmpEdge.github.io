import { Zap, Shield, Clock, CheckCircle, Home as HomeIcon, Building2, Factory, AlertCircle, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    const { data } = await supabase
      .from('testimonials')
      .select('*, profiles!customer_id(full_name)')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (data) setTestimonials(data);
  }

  const services = [
    {
      icon: HomeIcon,
      title: 'House Wiring',
      description: 'Complete electrical wiring solutions for your home',
      path: 'residential',
    },
    {
      icon: Shield,
      title: 'Panel Repair',
      description: 'Professional switchboard and panel repairs',
      path: 'residential',
    },
    {
      icon: AlertCircle,
      title: 'Emergency Fix',
      description: '24/7 emergency electrical services',
      path: 'emergency',
    },
    {
      icon: Zap,
      title: 'Installation',
      description: 'Expert installation of all electrical fixtures',
      path: 'services',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Certified Technicians',
      description: 'All our electricians are certified and background-verified professionals',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and emergency services',
    },
    {
      icon: CheckCircle,
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden charges',
    },
    {
      icon: Zap,
      title: 'Safety Guaranteed',
      description: 'We follow strict safety standards and provide warranty on all work',
    },
  ];

  const serviceCategories = [
    {
      icon: HomeIcon,
      title: 'Residential',
      description: 'Home wiring, lighting, fans & more',
      path: 'residential',
      color: 'bg-blue-50 text-[#0066FF]',
    },
    {
      icon: Building2,
      title: 'Commercial',
      description: 'Office wiring, panels & CCTV',
      path: 'commercial',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Factory,
      title: 'Industrial',
      description: 'High voltage & transformer work',
      path: 'industrial',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: AlertCircle,
      title: 'Emergency',
      description: '24/7 urgent repairs',
      path: 'emergency',
      color: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block bg-[#4169E1] text-white px-6 py-2 rounded-full font-bold mb-6 text-sm md:text-base flex items-center gap-2">
              <Star className="w-5 h-5 fill-current" /> TOP RATED SERVICE
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Reliable Electrical Solutions<br />at Your <span className="text-[#FFC107]">Doorstep</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Certified electricians for safe, fast, and affordable home solutions. We ensure your home is powered safely and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button
                onClick={() => onNavigate('book-appointment')}
                className="px-8 py-4 bg-[#FFC107] text-gray-900 rounded-lg font-bold text-lg hover:bg-[#FFB300] transition transform hover:scale-105"
              >
                Book Electrician
              </button>
              <button
                onClick={() => onNavigate('career')}
                className="px-8 py-4 bg-white text-[#0066FF] rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105"
              >
                Join as Professional
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How AMPEdge Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">1</div>
                  <p className="text-lg">Book Through App</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">Book your electrician through our mobile application or website with ease</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">2</div>
                  <p className="text-lg">Electrician Arrives</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">Our certified electrician in branded t-shirt arrives at your location</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">3</div>
                  <p className="text-lg">Service & Smile</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">Expert service completed with professionalism and your satisfaction</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">4</div>
                  <p className="text-lg">Expert Work</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">Professional electrician uses modern tools and techniques for quality work</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">5</div>
                  <p className="text-lg">Easy Payment</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">Secure payment through multiple methods after work completion</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">6</div>
                  <p className="text-lg">Safe Home</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">Enjoy a safe home with professional electrical work and warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Quick Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => onNavigate(service.path)}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#0066FF] hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <service.icon className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose AMPEdge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0066FF] rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => onNavigate(category.path)}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${category.color} rounded-full mb-4`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl p-6 shadow-md"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#FFC107] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.review}</p>
                  <p className="font-semibold text-gray-900">
                    {testimonial.profiles?.full_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-[#0066FF] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Emergency Electrical Service?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            We're available 24/7 for urgent electrical repairs and support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919123667258"
              className="px-8 py-4 bg-[#FFC107] text-gray-900 rounded-lg font-bold text-lg hover:bg-[#FFB300] transition transform hover:scale-105"
            >
              Call Emergency Hotline
            </a>
            <button
              onClick={() => onNavigate('emergency')}
              className="px-8 py-4 bg-white text-[#0066FF] rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
