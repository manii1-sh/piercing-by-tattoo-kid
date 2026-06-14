
CREATE TABLE public.bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  booking_date DATE NOT NULL,
  slot TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 200,
  status TEXT NOT NULL DEFAULT 'paid_demo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT bookings_unique_slot UNIQUE (booking_date, slot)
);

GRANT SELECT, INSERT ON public.bookings TO anon, authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can read only the date+slot (to render booked grid). We expose this via a server fn that selects only those columns, but RLS still applies.
CREATE POLICY "Anyone can view booked slots" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can create a booking" ON public.bookings FOR INSERT WITH CHECK (true);

CREATE TABLE public.blocked_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_date DATE NOT NULL,
  slot TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blocked_slots TO anon, authenticated;
GRANT ALL ON public.blocked_slots TO service_role;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view blocked slots" ON public.blocked_slots FOR SELECT USING (true);

-- Sequence for friendly booking IDs (BK-001)
CREATE SEQUENCE IF NOT EXISTS public.booking_seq START 1;
GRANT USAGE ON SEQUENCE public.booking_seq TO anon, authenticated, service_role;
