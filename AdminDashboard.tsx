import { useState, useEffect } from 'react';
import { Users, Briefcase, DollarSign, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { user, profile } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [electricians, setElectricians] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && profile?.role === 'admin') {
      loadData();
    }
  }, [user, profile]);

  async function loadData() {
    setLoading(true);

    const [bookingsRes, electriciansRes] = await Promise.all([
      supabase
        .from('bookings')
        .select('*, services(name), profiles!customer_id(full_name, email), electrician:profiles!electrician_id(full_name)')
        .order('created_at', { ascending: false }),
      supabase
        .from('profiles')
        .select('*')
        .eq('role', 'electrician')
        .order('created_at', { ascending: false }),
    ]);

    if (bookingsRes.data) {
      setBookings(bookingsRes.data);
      setStats({
        total: bookingsRes.data.length,
        pending: bookingsRes.data.filter(b => b.status === 'pending').length,
        completed: bookingsRes.data.filter(b => b.status === 'completed').length,
        revenue: bookingsRes.data.reduce((sum, b) => sum + (b.total_amount || 0), 0),
      });
    }

    if (electriciansRes.data) setElectricians(electriciansRes.data);

    setLoading(false);
  }

  const assignElectrician = async (bookingId: string, electricianId: string) => {
    try {
      await supabase
        .from('bookings')
        .update({ electrician_id: electricianId, status: 'assigned' })
        .eq('id', bookingId);

      alert('Electrician assigned successfully!');
      loadData();
    } catch (error: any) {
      alert('Error assigning electrician: ' + error.message);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const updates: any = { status };
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }

      await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId);

      alert('Booking status updated!');
      loadData();
    } catch (error: any) {
      alert('Error updating status: ' + error.message);
    }
  };

  if (!user || !profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Access Denied</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage bookings, electricians, and services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#0066FF] mb-2">{stats.total}</div>
                <div className="text-gray-600">Total Bookings</div>
              </div>
              <Briefcase className="w-10 h-10 text-[#0066FF]" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pending}</div>
                <div className="text-gray-600">Pending</div>
              </div>
              <Users className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.completed}</div>
                <div className="text-gray-600">Completed</div>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">₹{stats.revenue}</div>
                <div className="text-gray-600">Revenue</div>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066FF] mx-auto"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Service</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Electrician</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{booking.profiles?.full_name}</div>
                          <div className="text-sm text-gray-500">{booking.profiles?.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{booking.services?.name}</td>
                      <td className="py-3 px-4">
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {booking.electrician_id ? (
                          <span>{booking.electrician?.full_name}</span>
                        ) : (
                          <select
                            onChange={(e) => assignElectrician(booking.id, e.target.value)}
                            className="px-2 py-1 border rounded text-sm"
                          >
                            <option value="">Assign...</option>
                            {electricians.map((elec) => (
                              <option key={elec.id} value={elec.id}>
                                {elec.full_name}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="py-3 px-4 font-semibold">₹{booking.total_amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          value={booking.status}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="assigned">Assigned</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Electricians</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {electricians.map((elec) => (
              <div key={elec.id} className="border rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">{elec.full_name}</h3>
                <p className="text-sm text-gray-600 mb-1">{elec.email}</p>
                <p className="text-sm text-gray-600 mb-1">{elec.phone}</p>
                <p className="text-sm mb-2">
                  <strong>Experience:</strong> {elec.experience_years} years
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  elec.is_verified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {elec.is_verified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
