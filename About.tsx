import { Shield, Award, Users, Target } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About AMPEdge</h1>
          <p className="text-xl text-blue-100">Your Trusted Electrical Service Partner</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Founded in 2015, AMPEdge has been serving residential, commercial, and industrial clients with top-notch electrical services. Our journey began with a simple mission: to provide safe, reliable, and professional electrical solutions to our community.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Over the years, we've grown from a small team of certified electricians to a comprehensive electrical service marketplace, connecting skilled professionals with customers who need quality electrical work. We've completed over 10,000 successful projects and continue to maintain our commitment to excellence.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, AMPEdge stands as a leader in the electrical services industry, known for our certified technicians, transparent pricing, and unwavering commitment to safety and customer satisfaction.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0066FF] rounded-full mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0066FF] rounded-full mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Certified Technicians</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0066FF] rounded-full mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">9</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0066FF] rounded-full mb-4">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To deliver exceptional electrical services that prioritize safety, quality, and customer satisfaction. We strive to be the most trusted name in electrical solutions by maintaining the highest standards of professionalism and technical expertise.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To revolutionize the electrical services industry by creating a seamless marketplace that connects skilled electricians with customers, making quality electrical work accessible, transparent, and reliable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Award className="w-12 h-12 text-[#0066FF] mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">ISO 9001:2015</h3>
              <p className="text-gray-600">Quality Management</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Shield className="w-12 h-12 text-[#0066FF] mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Safety Certified</h3>
              <p className="text-gray-600">OSHA Compliant</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Award className="w-12 h-12 text-[#0066FF] mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Licensed</h3>
              <p className="text-gray-600">State Approved</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
