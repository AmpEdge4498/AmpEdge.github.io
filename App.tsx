import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ServicePage } from './pages/ServicePage';
import { BookAppointment } from './pages/BookAppointment';
import { Auth } from './pages/Auth';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ElectricianDashboard } from './pages/ElectricianDashboard';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Career } from './pages/Career';
import { AlertCircle } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;

      case 'residential':
        return (
          <ServicePage
            title="Residential Services"
            description="Professional electrical solutions for your home"
            services={[
              {
                name: 'Complete House Wiring',
                description: 'Full electrical wiring installation for new homes and renovations',
                price: 'From ₹45/sq ft',
              },
              {
                name: 'Switchboard Installation',
                description: 'Modern switchboard installation and upgrade',
                price: 'From ₹2,500',
              },
              {
                name: 'Fan Installation',
                description: 'Ceiling and wall fan installation and repair',
                price: 'From ₹300',
              },
              {
                name: 'Light Fixture Installation',
                description: 'LED lights, chandeliers, and decorative lighting',
                price: 'From ₹200',
              },
              {
                name: 'Inverter Setup',
                description: 'Inverter and UPS installation for backup power',
                price: 'From ₹1,500',
              },
              {
                name: 'Kitchen Appliance Wiring',
                description: 'Specialized wiring for kitchen appliances',
                price: 'From ₹800',
              },
            ]}
            onNavigate={setCurrentPage}
          />
        );

      case 'commercial':
        return (
          <ServicePage
            title="Commercial Services"
            description="Reliable electrical solutions for businesses"
            services={[
              {
                name: 'Office Wiring',
                description: 'Complete electrical setup for office spaces',
                price: 'From ₹50/sq ft',
              },
              {
                name: 'Electrical Panel Setup',
                description: 'Commercial-grade panel installation and maintenance',
                price: 'From ₹10,000',
              },
              {
                name: 'CCTV Installation',
                description: 'Complete security camera system installation',
                price: 'From ₹2,500/camera',
              },
              {
                name: 'Generator Installation',
                description: 'Backup generator setup and wiring',
                price: 'From ₹15,000',
              },
              {
                name: 'Data Center Wiring',
                description: 'Specialized wiring for IT infrastructure',
                price: 'Custom Quote',
              },
              {
                name: 'AMC Contracts',
                description: 'Annual maintenance contracts for businesses',
                price: 'From ₹15,999/year',
              },
            ]}
            onNavigate={setCurrentPage}
          />
        );

      case 'industrial':
        return (
          <ServicePage
            title="Industrial Services"
            description="Heavy-duty electrical solutions for industries"
            services={[
              {
                name: 'High Voltage Wiring',
                description: 'Industrial-grade high voltage electrical installation',
                price: 'Custom Quote',
              },
              {
                name: 'Transformer Maintenance',
                description: 'Regular maintenance and repair of transformers',
                price: 'From ₹25,000',
              },
              {
                name: 'Machine Panel Setup',
                description: 'Control panel installation for machinery',
                price: 'From ₹20,000',
              },
              {
                name: 'Three-Phase Wiring',
                description: 'Industrial three-phase power distribution',
                price: 'Custom Quote',
              },
              {
                name: 'Motor Installation',
                description: 'Industrial motor wiring and installation',
                price: 'From ₹15,000',
              },
              {
                name: 'Safety Compliance',
                description: 'Electrical safety audits and compliance certification',
                price: 'From ₹10,000',
              },
            ]}
            onNavigate={setCurrentPage}
          />
        );

      case 'emergency':
        return (
          <div className="min-h-screen bg-gray-50">
            <section className="bg-red-600 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4">24/7 Emergency Services</h1>
                <p className="text-xl mb-8">Fast response for urgent electrical issues</p>
                <a
                  href="tel:+919123667258"
                  className="inline-block px-8 py-4 bg-[#FFC107] text-gray-900 rounded-lg font-bold text-lg hover:bg-[#FFB300] transition"
                >
                  Call Emergency Hotline
                </a>
              </div>
            </section>

            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                  Emergency Services We Provide
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Short Circuit Repair</h3>
                    <p className="text-gray-700">Immediate response to dangerous short circuits</p>
                  </div>
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Power Outage Fix</h3>
                    <p className="text-gray-700">Quick diagnosis and restoration of power</p>
                  </div>
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Electrical Fire Prevention</h3>
                    <p className="text-gray-700">Emergency inspection and safety measures</p>
                  </div>
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Panel Breakdown</h3>
                    <p className="text-gray-700">Urgent switchboard and panel repairs</p>
                  </div>
                </div>

                <div className="mt-12 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Service Details</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Response Time: Within 60 minutes</li>
                    <li>Available: 24/7, 365 days</li>
                    <li>Emergency Fee: ₹1,500 call-out charge</li>
                    <li>After-hours surcharge: Additional ₹1,000 (8 PM - 8 AM)</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        );

      case 'services':
        return <Home onNavigate={setCurrentPage} />;

      case 'about':
        return <About />;

      case 'pricing':
        return <Pricing onNavigate={setCurrentPage} />;

      case 'gallery':
        return <Gallery />;

      case 'contact':
        return <Contact />;

      case 'career':
        return <Career />;

      case 'book-appointment':
        return <BookAppointment onNavigate={setCurrentPage} />;

      case 'signin-customer':
        return <Auth onNavigate={setCurrentPage} role="customer" />;

      case 'signin-electrician':
        return <Auth onNavigate={setCurrentPage} role="electrician" />;

      case 'customer-dashboard':
        return <CustomerDashboard onNavigate={setCurrentPage} />;

      case 'electrician-dashboard':
        return <ElectricianDashboard onNavigate={setCurrentPage} />;

      case 'admin-dashboard':
        return <AdminDashboard onNavigate={setCurrentPage} />;

      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  const showHeaderFooter = !currentPage.includes('signin') && !currentPage.includes('signup');

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {showHeaderFooter && <Header onNavigate={setCurrentPage} currentPage={currentPage} />}
        <main className="flex-1">{renderPage()}</main>
        {showHeaderFooter && <Footer onNavigate={setCurrentPage} />}

        <a
          href="tel:+919123667258"
          className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-50"
          title="Emergency Call"
        >
          <AlertCircle className="w-8 h-8" />
        </a>
      </div>
    </AuthProvider>
  );
}

export default App;
