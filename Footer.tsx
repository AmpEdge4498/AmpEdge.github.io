import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              AMP<span className="text-[#FFC107]">Edge</span>
            </div>
            <p className="text-gray-400 mb-4">
              Certified electrical services you can trust. Fast, safe, and reliable solutions for all your electrical needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0066FF] transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0066FF] transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0066FF] transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0066FF] transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-gray-400 hover:text-white transition">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="text-gray-400 hover:text-white transition">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="text-gray-400 hover:text-white transition">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career')} className="text-gray-400 hover:text-white transition">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('residential')} className="text-gray-400 hover:text-white transition">
                  Residential Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('commercial')} className="text-gray-400 hover:text-white transition">
                  Commercial Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industrial')} className="text-gray-400 hover:text-white transition">
                  Industrial Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('emergency')} className="text-gray-400 hover:text-white transition">
                  Emergency Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 text-[#FFC107]" />
                <div>
                  <a href="tel:+919123667258" className="text-gray-400 hover:text-[#FFC107] transition">+91 91236 67258</a>
                  <p className="text-gray-400 text-sm mt-1">
                    <a href="https://wa.me/919123667258" className="hover:text-[#FFC107] transition">WhatsApp: +91 91236 67258</a>
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1 text-[#FFC107]" />
                <a href="mailto:contact@ampedge.com" className="text-gray-400 hover:text-[#FFC107] transition">contact@ampedge.com</a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-[#FFC107]" />
                <p className="text-gray-400">
                  123 Electric Avenue<br />
                  Mumbai, Maharashtra 400001
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2026 AMPEdge. All rights reserved. |
            <button onClick={() => onNavigate('privacy')} className="hover:text-white ml-2">Privacy Policy</button> |
            <button onClick={() => onNavigate('terms')} className="hover:text-white ml-2">Terms & Conditions</button>
          </p>
        </div>
      </div>
    </footer>
  );
}
