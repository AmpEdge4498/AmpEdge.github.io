/*
  # AMPEdge Electrical Service Marketplace Database Schema

  ## Overview
  This migration creates the complete database schema for AMPEdge, a premium electrical service marketplace platform.

  ## New Tables

  ### 1. profiles
  - `id` (uuid, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `phone` (text)
  - `role` (text: 'customer', 'electrician', 'admin')
  - `address` (text)
  - `city` (text)
  - `pincode` (text)
  - `profile_image` (text)
  - `experience_years` (integer, for electricians)
  - `certifications` (text, for electricians)
  - `is_verified` (boolean)
  - `created_at` (timestamptz)

  ### 2. services
  - `id` (uuid)
  - `name` (text)
  - `category` (text: 'residential', 'commercial', 'industrial', 'emergency')
  - `description` (text)
  - `base_price` (numeric)
  - `image_url` (text)
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 3. bookings
  - `id` (uuid)
  - `customer_id` (uuid, references profiles)
  - `service_id` (uuid, references services)
  - `electrician_id` (uuid, references profiles, nullable)
  - `booking_date` (date)
  - `booking_time` (time)
  - `address` (text)
  - `city` (text)
  - `pincode` (text)
  - `problem_description` (text)
  - `problem_image_url` (text)
  - `status` (text: 'pending', 'assigned', 'in_progress', 'completed', 'cancelled')
  - `total_amount` (numeric)
  - `advance_paid` (numeric)
  - `created_at` (timestamptz)
  - `completed_at` (timestamptz)

  ### 4. payments
  - `id` (uuid)
  - `booking_id` (uuid, references bookings)
  - `amount` (numeric)
  - `payment_method` (text)
  - `payment_status` (text: 'pending', 'completed', 'failed', 'refunded')
  - `transaction_id` (text)
  - `created_at` (timestamptz)

  ### 5. invoices
  - `id` (uuid)
  - `booking_id` (uuid, references bookings)
  - `invoice_number` (text, unique)
  - `total_amount` (numeric)
  - `pdf_url` (text)
  - `created_at` (timestamptz)

  ### 6. products
  - `id` (uuid)
  - `name` (text)
  - `category` (text)
  - `description` (text)
  - `price` (numeric)
  - `stock_quantity` (integer)
  - `image_url` (text)
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 7. product_orders
  - `id` (uuid)
  - `electrician_id` (uuid, references profiles)
  - `total_amount` (numeric)
  - `status` (text: 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled')
  - `delivery_address` (text)
  - `created_at` (timestamptz)

  ### 8. order_items
  - `id` (uuid)
  - `order_id` (uuid, references product_orders)
  - `product_id` (uuid, references products)
  - `quantity` (integer)
  - `unit_price` (numeric)
  - `subtotal` (numeric)

  ### 9. testimonials
  - `id` (uuid)
  - `customer_id` (uuid, references profiles)
  - `booking_id` (uuid, references bookings)
  - `rating` (integer)
  - `review` (text)
  - `is_approved` (boolean)
  - `created_at` (timestamptz)

  ### 10. service_areas
  - `id` (uuid)
  - `city` (text)
  - `pincode` (text)
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 11. blog_posts
  - `id` (uuid)
  - `title` (text)
  - `slug` (text, unique)
  - `content` (text)
  - `image_url` (text)
  - `author_id` (uuid, references profiles)
  - `is_published` (boolean)
  - `created_at` (timestamptz)

  ### 12. career_applications
  - `id` (uuid)
  - `full_name` (text)
  - `email` (text)
  - `phone` (text)
  - `experience_years` (integer)
  - `resume_url` (text)
  - `cover_letter` (text)
  - `status` (text: 'pending', 'reviewed', 'accepted', 'rejected')
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Policies implemented for role-based access control
  - Customers can view/update their own data
  - Electricians can view assigned jobs and manage orders
  - Admins have full access to manage all data
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'electrician', 'admin')),
  address text,
  city text,
  pincode text,
  profile_image text,
  experience_years integer DEFAULT 0,
  certifications text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('residential', 'commercial', 'industrial', 'emergency')),
  description text,
  base_price numeric NOT NULL DEFAULT 0,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES profiles(id),
  service_id uuid NOT NULL REFERENCES services(id),
  electrician_id uuid REFERENCES profiles(id),
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  pincode text NOT NULL,
  problem_description text,
  problem_image_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
  total_amount numeric DEFAULT 0,
  advance_paid numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id),
  amount numeric NOT NULL,
  payment_method text NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id text,
  created_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id),
  invoice_number text UNIQUE NOT NULL,
  total_amount numeric NOT NULL,
  pdf_url text,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price numeric NOT NULL,
  stock_quantity integer DEFAULT 0,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create product_orders table
CREATE TABLE IF NOT EXISTS product_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  electrician_id uuid NOT NULL REFERENCES profiles(id),
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  delivery_address text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES product_orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price numeric NOT NULL,
  subtotal numeric NOT NULL
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES profiles(id),
  booking_id uuid REFERENCES bookings(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create service_areas table
CREATE TABLE IF NOT EXISTS service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  pincode text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  image_url text,
  author_id uuid REFERENCES profiles(id),
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create career_applications table
CREATE TABLE IF NOT EXISTS career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  experience_years integer DEFAULT 0,
  resume_url text,
  cover_letter text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Public can view verified electricians"
  ON profiles FOR SELECT
  TO public
  USING (role = 'electrician' AND is_verified = true);

-- RLS Policies for services
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Customers can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Electricians can view assigned bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (electrician_id = auth.uid());

CREATE POLICY "Electricians can update assigned bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (electrician_id = auth.uid())
  WITH CHECK (electrician_id = auth.uid());

CREATE POLICY "Admins can manage all bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = payments.booking_id
      AND (bookings.customer_id = auth.uid() OR bookings.electrician_id = auth.uid())
    )
  );

CREATE POLICY "Customers can create payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = payments.booking_id
      AND bookings.customer_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payments"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for invoices
CREATE POLICY "Users can view own invoices"
  ON invoices FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = invoices.booking_id
      AND (bookings.customer_id = auth.uid() OR bookings.electrician_id = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all invoices"
  ON invoices FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for products
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for product_orders
CREATE POLICY "Electricians can view own orders"
  ON product_orders FOR SELECT
  TO authenticated
  USING (electrician_id = auth.uid());

CREATE POLICY "Electricians can create orders"
  ON product_orders FOR INSERT
  TO authenticated
  WITH CHECK (electrician_id = auth.uid());

CREATE POLICY "Admins can manage all orders"
  ON product_orders FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for order_items
CREATE POLICY "Electricians can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM product_orders
      WHERE product_orders.id = order_items.order_id
      AND product_orders.electrician_id = auth.uid()
    )
  );

CREATE POLICY "Electricians can create order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM product_orders
      WHERE product_orders.id = order_items.order_id
      AND product_orders.electrician_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all order items"
  ON order_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for testimonials
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Customers can create testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Customers can view own testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Admins can manage all testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for service_areas
CREATE POLICY "Anyone can view active service areas"
  ON service_areas FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage service areas"
  ON service_areas FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage all blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for career_applications
CREATE POLICY "Anyone can create career applications"
  ON career_applications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view all career applications"
  ON career_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update career applications"
  ON career_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_electrician ON bookings(electrician_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
