-- Create the settings table
CREATE TABLE IF NOT EXISTS settings (
    id bigint PRIMARY KEY DEFAULT 1,
    hero_image text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure only one row can exist
CREATE UNIQUE INDEX IF NOT EXISTS settings_singleton_idx ON settings ((1=1));

-- Add RLS policies
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public read access to settings" ON settings
    FOR SELECT USING (true);

-- Allow authenticated users to update settings
CREATE POLICY "Allow authenticated users to update settings" ON settings
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert settings if none exist
CREATE POLICY "Allow authenticated users to insert settings" ON settings
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' 
        AND NOT EXISTS (SELECT 1 FROM settings)
    );

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 