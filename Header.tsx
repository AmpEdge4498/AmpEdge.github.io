import { useState } from 'react';
import { Menu, X, User, LogOut, Home, Wrench, Info, Store as StoreIcon, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <img src="/AMPEDGE1.png" alt="AMPEdge" className="h-16 md:h-20" />
            </div>

            <nav className="hidden lg:flex space-x-8 items-center">
              <button
                onClick={() => onNavigate('store')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'store' ? 'text-[#0066FF]' : 'text-gray-700 hover:text-[#0066FF]'
                }`}
              >
                Store
              </button>
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (profile?.role === 'admin') onNavigate('admin-dashboard');
                      else if (profile?.role === 'electrician') onNavigate('electrician-dashboard');
                      else onNavigate('customer-dashboard');
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-[#0066FF] hover:bg-blue-50 rounded-lg transition"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{profile?.full_name}</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-600 hover:text-red-600 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 text-[#0066FF] font-semibold hover:text-[#0052CC] transition"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => onNavigate('book-appointment')}
                className="px-6 py-2 bg-[#FFC107] text-gray-900 rounded-lg font-semibold hover:bg-[#FFB300] transition transform hover:scale-105"
              >
                Book Now
              </button>
            </div>

            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Home className="w-5 h-5 mr-3 text-[#0066FF]" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('residential');
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Wrench className="w-5 h-5 mr-3 text-[#0066FF]" />
                <span>Services</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Info className="w-5 h-5 mr-3 text-[#0066FF]" />
                <span>About</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('store');
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                <StoreIcon className="w-5 h-5 mr-3 text-[#0066FF]" />
                <span>Store</span>
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => {
                      if (profile?.role === 'admin') onNavigate('admin-dashboard');
                      else if (profile?.role === 'electrician') onNavigate('electrician-dashboard');
                      else onNavigate('customer-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center text-left px-4 py-3 text-[#0066FF] rounded-lg hover:bg-blue-50 font-medium"
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>My Dashboard</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center text-left px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 font-medium"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center text-left px-4 py-3 text-[#0066FF] rounded-lg hover:bg-blue-50 font-medium"
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  <span>Login</span>
                </button>
              )}

              <button
                onClick={() => {
                  onNavigate('book-appointment');
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-[#FFC107] text-gray-900 rounded-lg font-bold mt-2"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </header>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onNavigate('signin-customer');
                    setShowAuthModal(false);
                  }}
                  className="w-full px-6 py-3 bg-[#0066FF] text-white rounded-lg font-semibold hover:bg-[#0052CC] transition"
                >
                  Sign In as Customer
                </button>
                <button
                  onClick={() => {
                    onNavigate('signin-electrician');
                    setShowAuthModal(false);
                  }}
                  className="w-full px-6 py-3 bg-[#FFC107] text-gray-900 rounded-lg font-semibold hover:bg-[#FFB300] transition"
                >
                  Sign In as Electrician
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
