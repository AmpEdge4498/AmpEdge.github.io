export function Gallery() {
  const projects = [
    {
      title: 'Residential House Wiring',
      category: 'Residential',
      description: 'Complete electrical wiring for a 3BHK apartment',
      before: 'https://images.pexels.com/photos/5691608/pexels-photo-5691608.jpeg?auto=compress&cs=tinysrgb&w=600',
      after: 'https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Commercial Office Setup',
      category: 'Commercial',
      description: 'Full electrical setup for 5000 sq ft office space',
      before: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=600',
      after: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Industrial Panel Installation',
      category: 'Industrial',
      description: 'High-voltage panel setup for manufacturing unit',
      before: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
      after: 'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Smart Home Lighting',
      category: 'Residential',
      description: 'Modern LED lighting and automation setup',
      before: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
      after: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Restaurant Electrical Work',
      category: 'Commercial',
      description: 'Kitchen and dining area electrical installation',
      before: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
      after: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Emergency Repair',
      category: 'Emergency',
      description: 'Quick circuit repair after power surge',
      before: 'https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg?auto=compress&cs=tinysrgb&w=600',
      after: 'https://images.pexels.com/photos/162622/antique-open-range-old-electric-162622.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0066FF] to-[#0052CC] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-blue-100">See the quality of our work</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="relative">
                    <img
                      src={project.before}
                      alt="Before"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      Before
                    </span>
                  </div>
                  <div className="relative">
                    <img
                      src={project.after}
                      alt="After"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      After
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-[#0066FF] rounded-full text-xs font-semibold mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
