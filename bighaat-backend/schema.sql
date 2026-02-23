-- BigHaat PostgreSQL Schema

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'farmer',
    state VARCHAR(100),
    district VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50),
    brand VARCHAR(100),
    price NUMERIC(10,2) NOT NULL,
    discount_price NUMERIC(10,2),
    stock INTEGER DEFAULT 0,
    description TEXT,
    dosage_guide TEXT,
    image_url TEXT,
    size VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_crops (
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, crop_id)
);

CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES cart(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount NUMERIC(10,2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    order_status VARCHAR(50) DEFAULT 'processing',
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS advisory (
    id SERIAL PRIMARY KEY,
    crop_id INTEGER REFERENCES crops(id),
    growth_stage VARCHAR(100),
    pest_alert TEXT,
    fertilizer_recommendation TEXT,
    spray_schedule TEXT,
    weather_advice TEXT,
    tips TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed crops
INSERT INTO crops (name) VALUES
('Rice'), ('Tomato'), ('Cotton'), ('Wheat'), ('Onion'), ('Maize'), ('Chilli'), ('Pulses')
ON CONFLICT DO NOTHING;

-- Seed products
INSERT INTO products (name, category, brand, price, discount_price, stock, description, dosage_guide, image_url, size) VALUES
('TAPAS VitaInject Plant Growth Regulator', 'growth-promoters', 'Tapas', 700, 449, 150, 'Plant growth regulator for all crops', '2ml per litre of water', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop', '10 ml'),
('Biovita Liquid BioFertilizer', 'nutrients', 'PI Industries', 390, 250, 200, 'Feed your soil today with organic bio fertilizer', '5ml per litre of water', 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=300&h=300&fit=crop', '250 ml'),
('Saaf Fungicide', 'fungicides', 'UPL', 111, 89, 300, 'Stop fungal diseases before they spread', '2g per litre of water', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', '100 gms'),
('Janatha Amino Pro', 'nutrients', 'JANATHA AGRO', 950, 770, 80, 'Marine-based amino acid growth promoter', '3ml per litre of water', 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&h=300&fit=crop', '1 ltr'),
('Coragen Insecticide', 'insecticides', 'FMC', 220, 129, 400, 'Chlorantraniliprole 18.5% SC insecticide', '0.5ml per litre of water', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop', '10 ml'),
('Nativo 75 WG Fungicide', 'fungicides', 'Bayer', 180, 129, 250, 'Tebuconazole 50% + Trifloxystrobin 25% WG', '0.4g per litre of water', 'https://images.unsplash.com/photo-1583912372583-b5fc11cd3c11?w=300&h=300&fit=crop', '10 gms'),
('Exponus Insecticide', 'insecticides', 'BASF', 731, 529, 120, 'Broflanilide 300 G/L SC', '1ml per litre of water', 'https://images.unsplash.com/photo-1615671524827-bb5ab70f5e2e?w=300&h=300&fit=crop', '8.5 ml'),
('Katyayani Humic Acid 98%', 'nutrients', 'Katyayani Organics', 1880, 760, 90, 'Activated humic acid and fulvic acid', '5g per litre of water', 'https://images.unsplash.com/photo-1602513445165-d7c56e67dae0?w=300&h=300&fit=crop', '1600 gms'),
('Acrobat Fungicide', 'fungicides', 'BASF', 849, 599, 100, 'Stop late blight and downy mildew', '2g per litre of water', 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=300&h=300&fit=crop', '100 gms'),
('Krish F1 Hybrid Cucumber Seeds', 'seeds', 'VNR', 480, 359, 500, 'High yield hybrid cucumber seeds', 'Sow at 60x45cm spacing', 'https://images.unsplash.com/photo-1508467543463-4c6b4e93a09a?w=300&h=300&fit=crop', '10 gms')
ON CONFLICT DO NOTHING;

-- Seed advisory
INSERT INTO advisory (crop_id, growth_stage, pest_alert, fertilizer_recommendation, spray_schedule, weather_advice, tips) VALUES
(1, 'germination', 'Rice Stem Borer, Leaf Folder', 'DAP 50kg/acre, Urea 25kg/acre', 'Week 1: Chlorpyrifos spray; Week 2: Carbendazim', 'Maintain 2-3 inches water level', 'Use certified seeds; Treat seeds with Trichoderma'),
(1, 'flowering', 'Gall Midge, Brown Plant Hopper', 'Potassium Sulphate 25kg/acre', 'Propiconazole spray at boot leaf stage', 'Avoid excess nitrogen application', 'Monitor water levels; Keep field clean of weeds'),
(2, 'germination', 'Whitefly, Thrips', '19-19-19 NPK 5kg/acre', 'Imidacloprid spray week 1; Mancozeb week 2', 'Use shade net for nursery', 'Drip irrigation preferred; Transplant at 25-30 days'),
(2, 'flowering', 'Fruit Borer, Leaf Curl Virus', 'Biovita BioFertilizer, Boron 500g/acre', 'Coragen at fruit initiation; Saaf for blight', 'Stake plants for support', 'Remove infected leaves; Spray neem oil weekly'),
(3, 'germination', 'Aphids, Jassids', 'DAP 25kg/acre, SSP 50kg/acre', 'Imidacloprid seed treatment; Mancozeb week 3', 'Deep ploughing before sowing', 'Sow at 45x60cm spacing; Treat seeds before sowing')
ON CONFLICT DO NOTHING;
