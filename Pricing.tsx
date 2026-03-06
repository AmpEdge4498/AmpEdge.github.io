import { CheckCircle } from 'lucide-react';

interface PricingProps {
  onNavigate: (page: string) => void;
}

export function Pricing({ onNavigate }: PricingProps) {
  const services = [
    { name: 'House Wiring (per sq ft)', price: '₹45-65' },
    { name: 'Switchboard Installation', price: '₹2,500-5,000' },
    { name: 'Fan Installation', price: '₹300-500' },
    { name: 'Light Fixture Installation', price: '₹200-800' },
    { name: 'Inverter Installation', price: '₹1,500-3,000' },
    { name: 'CCTV Installation (per camera)', price: '₹2,500-4,000' },
    { name: 'Panel Repair', price: '₹1,000-3,000' },
    { name: 'Emergency Service (call-out)', price: '₹1,500' },
  ];

  const amcPlans = [
    {
      name: 'Basic',
      price: '₹3,999',
      period: 'per year',
      features: [
        '2 Free Service Visits',
        'Basic Electrical Inspection',
        'Priority Booking',
        '10% Discount on Parts',
      ],
    },
    {
      name: 'Premium',
      price: '₹7,999',
      period: 'per year',
      popular: true,
      features: [
        '4 Free Service Visits',
        'Comprehensive Electrical Inspection',
        'Priority Emergency Response',
        '15% Discount on Parts',
        'Free Minor Repairs',
        '24/7 Phone Support',
      ],
    },
    {
      name: 'Enterprise',
      price: '₹15,999',
      period: 'per year',
      features: [
        'Unlimited Service Visits',
        'Complete Electrical Audit',
        'Dedicated Electrician',
        '20% Discount on Parts',
        'All Repairs Included',
        '24/7 Priority Support',
        'Annual Equipment Upgrade',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transparent Pricing</h1>
          <p className="text-xl text-blue-100">Clear, upfront pricing with no hidden charges</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Service Pricing</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              <strong>Inspection Fee:</strong> ₹500 (Waived if service is booked)
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Emergency Fee:</strong> Additional ₹1,000 for after-hours service (8 PM - 8 AM)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <span className="text-[#0066FF] font-bold text-lg">{service.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('book-appointment')}
              className="px-8 py-4 bg-[#FFC107] text-gray-900 rounded-lg font-bold text-lg hover:bg-[#FFB300] transition"
            >
              Book Service Now
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">AMC Plans</h2>
          <p className="text-center text-gray-600 mb-12">Annual Maintenance Contract for worry-free electrical service</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {amcPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 relative ${
                  plan.popular ? 'ring-4 ring-[#0066FF] transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#FFC107] text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-lg font-bold text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#0066FF]">{plan.price}</span>
                  <span className="text-gray-600"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate('book-appointment')}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.popular
                      ? 'bg-[#0066FF] text-white hover:bg-[#0052CC]'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
