-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pros ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Cities and services are public read
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read cities" ON cities FOR SELECT USING (is_active = true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read city prices" ON city_prices FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admins can do everything on users" ON users 
    USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can do everything on pros" ON pros 
    USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- Users policies
CREATE POLICY "Users can read their own data" ON users 
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own data" ON users 
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Anyone can insert user on signup" ON users 
    FOR INSERT WITH CHECK (id = auth.uid());

-- Pros policies
CREATE POLICY "Anyone can read approved pros" ON pros 
    FOR SELECT USING (kyc_status = 'approved');

CREATE POLICY "Pros can update their own profile" ON pros 
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can become pros" ON pros 
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Jobs policies
CREATE POLICY "Users can create their own jobs" ON jobs 
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read their own jobs" ON jobs 
    FOR SELECT USING (
        user_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM pros WHERE pros.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own jobs" ON jobs 
    FOR UPDATE USING (user_id = auth.uid() AND status IN ('draft', 'pending_quotes'));

-- Quotes policies
CREATE POLICY "Pros can create quotes for jobs" ON quotes 
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM pros 
            WHERE pros.user_id = auth.uid() 
            AND pros.kyc_status = 'approved'
        )
    );

CREATE POLICY "Users can read quotes for their jobs" ON quotes 
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM jobs WHERE jobs.id = job_id AND jobs.user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM pros WHERE pros.id = pro_id AND pros.user_id = auth.uid())
    );

CREATE POLICY "Pros can update their own quotes" ON quotes 
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM pros WHERE pros.id = pro_id AND pros.user_id = auth.uid())
    );

-- Bookings policies
CREATE POLICY "Users can create bookings for their accepted quotes" ON bookings 
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM quotes q
            JOIN jobs j ON j.id = q.job_id
            WHERE q.id = quote_id 
            AND j.user_id = auth.uid()
            AND q.accepted_at IS NOT NULL
        )
    );

CREATE POLICY "Users and pros can read their bookings" ON bookings 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM quotes q
            JOIN jobs j ON j.id = q.job_id
            WHERE q.id = quote_id 
            AND (j.user_id = auth.uid() OR EXISTS (
                SELECT 1 FROM pros WHERE pros.id = q.pro_id AND pros.user_id = auth.uid()
            ))
        )
    );

CREATE POLICY "Pros can update their bookings" ON bookings 
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM quotes q
            JOIN pros p ON p.id = q.pro_id
            WHERE q.id = quote_id AND p.user_id = auth.uid()
        )
    );

-- Reviews policies
CREATE POLICY "Users can create reviews for their completed bookings" ON reviews 
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM bookings b
            JOIN quotes q ON q.id = b.quote_id
            JOIN jobs j ON j.id = q.job_id
            WHERE b.id = booking_id 
            AND j.user_id = auth.uid()
            AND b.completed_at IS NOT NULL
        )
    );

CREATE POLICY "Anyone can read reviews" ON reviews 
    FOR SELECT USING (true);

CREATE POLICY "Pros can respond to their reviews" ON reviews 
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM bookings b
            JOIN quotes q ON q.id = b.quote_id
            JOIN pros p ON p.id = q.pro_id
            WHERE b.id = booking_id AND p.user_id = auth.uid()
        )
    );

-- Notifications policies
CREATE POLICY "Users can read their notifications" ON notifications 
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON notifications 
    FOR UPDATE USING (user_id = auth.uid());

-- Audit logs (read-only for admins)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read audit logs" ON audit_logs 
    FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

