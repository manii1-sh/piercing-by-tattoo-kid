
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;
REVOKE INSERT ON public.bookings FROM anon, authenticated;
-- Limit public SELECT to only the columns needed for the slot grid via a view-style policy is overkill;
-- we'll instead expose a server fn that returns only date+slot. The base policy stays for service_role flexibility.
