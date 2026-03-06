import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ElectricianDashboardProps {
  onNavigate: (page: string) => void;
}

export function ElectricianDashboard({ onNavigate }: ElectricianDashboardProps) {
  const { user, profile } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && profile?.role === 'electrician') {
      loadBookings();
    }
  }, [user, profile]);

  async function loadBookings() {
    setLoading(true);
    const { data } = await supabase
      .from('bookings')
      .select('*, services(name), profiles!customer_id(full_name, phone, email)')
      .eq('electrician_id', user?.id)
      .order('booking_date', { ascending: true });

    if (data) setBookings(data);
    setLoading(false);
  }

  const updateStatus = async (bookingId: string, status: string) => {
    try {
      const updates: any = { status };
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }

      await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId);

      alert('Status updated successfully!');
      loadBookings();
    } catch (error: any) {
      alert('Error updating status: ' + error.message);
    }
  };

  if (!user || !profile || profile.role !== 'electrician') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please sign in as an electrician</p>
          <button
            onClick={() => onNavigate('signin-electrician')}
            className="px-6 py-3 bg-[#0066FF] text-white rounded-lg font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Electrician Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile.full_name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-[#0066FF] mb-2">
              {bookings.length}
            </div>
            <div className="text-gray-600">Total Jobs</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {bookings.filter(b => b.status === 'assigned' || b.status === 'in_progress').length}
            </div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {bookings.filter(b => b.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Jobs</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066FF] mx-auto"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No jobs assigned yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {booking.services?.name}
                      </h3>
                      <div className="space-y-2 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{booking.booking_time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{booking.address}, {booking.city}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Customer Details</h4>
                        <p className="text-gray-700"><strong>Name:</strong> {booking.profiles?.full_name}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {booking.profiles?.phone || 'Not provided'}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {booking.profiles?.email}</p>
                        {booking.problem_description && (
                          <p className="text-gray-700 mt-2"><strong>Issue:</strong> {booking.problem_description}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end space-y-3">
                      <div className="text-2xl font-bold text-[#0066FF]">
                        ₹{booking.total_amount}
                      </div>
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('_', ' ')}
                      </span>
                      {booking.status !== 'completed' && (
                        <div className="flex flex-col space-y-2">
                          {booking.status === 'assigned' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'in_progress')}
                              className="px-4 py-2 bg-[#0066FF] text-white rounded-lg font-semibold hover:bg-[#0052CC] transition"
                            >
                              Start Job
                            </button>
                          )}
                          {booking.status === 'in_progress' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'completed')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
