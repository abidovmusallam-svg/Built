-- =========================================================================
-- QURILISHBOZOR MARKETPLACE - PRODUCTION RELATIONAL DATABASE SCHEMA (POSTGRESQL)
-- Architecture: Multi-Vendor Construction Marketplace with Central Admin &
-- Restricted Invitation-Only Seller Access (Strict Role-Based Access Control)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('customer', 'seller', 'admin');
CREATE TYPE seller_account_status AS ENUM ('invited', 'active', 'inactive', 'suspended');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled');
CREATE TYPE delivery_vehicle_type AS ENUM ('labo', 'gazel', 'isuzu', 'fura');
CREATE TYPE payment_method_type AS ENUM ('cash', 'click', 'payme', 'uzumbank', 'b2b_contract');
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'paid', 'failed');
CREATE TYPE audit_severity AS ENUM ('info', 'warning', 'critical');

-- 2. USERS TABLE
-- Handles centralized authentication for customers, authorized sellers, and admins
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE,
    username VARCHAR(60) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- bcrypt/argon2 hashed
    role user_role NOT NULL DEFAULT 'customer',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- 3. SELLER PROFILES TABLE
-- Dedicated entity representing authorized seller stores. Created ONLY by Admin invitation!
CREATE TABLE seller_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE RESTRICT,
    store_name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    inn VARCHAR(20) NOT NULL, -- Legal tax identifier (STIR/INN)
    legal_name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(120),
    region VARCHAR(60) NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    status seller_account_status NOT NULL DEFAULT 'invited',
    verified BOOLEAN NOT NULL DEFAULT false,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    total_sales_count INT DEFAULT 0,
    total_revenue_uzs NUMERIC(15, 2) DEFAULT 0.00,
    response_time_minutes INT DEFAULT 15,
    commission_rate_override NUMERIC(5, 2) DEFAULT NULL, -- Admin can set custom commission %
    bank_account_mfo VARCHAR(20),
    bank_account_number VARCHAR(30),
    invited_by_admin_id UUID REFERENCES users(id),
    invited_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activated_at TIMESTAMPTZ,
    suspended_at TIMESTAMPTZ,
    suspension_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sellers_status ON seller_profiles(status);
CREATE INDEX idx_sellers_user_id ON seller_profiles(user_id);

-- 4. SELLER INVITATIONS TABLE
-- Strict invitation-only tracking token table
CREATE TABLE seller_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    full_name VARCHAR(120) NOT NULL,
    store_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(120),
    username VARCHAR(60) UNIQUE NOT NULL,
    invite_token_hash VARCHAR(255) NOT NULL UNIQUE,
    temporary_passcode VARCHAR(30), -- development preview only
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, accepted, expired, revoked
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invites_token ON seller_invitations(invite_token_hash);

-- 5. CATEGORIES TABLE
CREATE TABLE categories (
    id VARCHAR(60) PRIMARY KEY,
    name_uz VARCHAR(100) NOT NULL,
    name_ru VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    icon_name VARCHAR(50),
    image_url TEXT NOT NULL,
    description_uz TEXT,
    description_ru TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. PRODUCTS TABLE
-- Explicitly owned by a single seller!
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE RESTRICT,
    category_id VARCHAR(60) NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    title_uz VARCHAR(200) NOT NULL,
    title_ru VARCHAR(200) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    old_price NUMERIC(12, 2) CHECK (old_price >= price),
    unit VARCHAR(20) NOT NULL, -- qop, dona, kg, metr, m2, m3, tonna
    min_order INT NOT NULL DEFAULT 1 CHECK (min_order >= 1),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    weight_kg NUMERIC(8, 2) DEFAULT 1.00,
    description_uz TEXT,
    description_ru TEXT,
    image_url TEXT NOT NULL,
    is_wholesale BOOLEAN NOT NULL DEFAULT false,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(20) NOT NULL DEFAULT 'approved', -- approved, pending_approval, rejected, hidden
    rating NUMERIC(3, 2) DEFAULT 5.00,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);

-- 7. PRODUCT IMAGES
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 8. PRODUCT WHOLESALE TIERS
CREATE TABLE product_wholesale_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    min_quantity INT NOT NULL CHECK (min_quantity > 1),
    discount_price NUMERIC(12, 2) NOT NULL CHECK (discount_price > 0),
    UNIQUE (product_id, min_quantity)
);

-- 9. ORDERS TABLE
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_code VARCHAR(30) UNIQUE NOT NULL,
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_note TEXT,
    delivery_type VARCHAR(20) NOT NULL, -- delivery, pickup
    delivery_vehicle delivery_vehicle_type,
    delivery_region VARCHAR(60) NOT NULL,
    delivery_district VARCHAR(60) NOT NULL,
    delivery_street TEXT NOT NULL,
    delivery_landmark TEXT,
    subtotal_uzs NUMERIC(15, 2) NOT NULL,
    delivery_fee_uzs NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount_uzs NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_uzs NUMERIC(15, 2) NOT NULL,
    payment_method payment_method_type NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_tracking ON orders(tracking_code);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);

-- 10. ORDER ITEMS TABLE
-- Stores explicit seller relationship and historical price per item!
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE RESTRICT,
    title_snapshot VARCHAR(200) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    price_at_purchase NUMERIC(12, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 1),
    line_total_uzs NUMERIC(15, 2) NOT NULL,
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 3.50,
    commission_amount_uzs NUMERIC(12, 2) NOT NULL,
    seller_net_amount_uzs NUMERIC(15, 2) NOT NULL,
    item_status VARCHAR(20) NOT NULL DEFAULT 'pending'
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_seller_id ON order_items(seller_id);

-- 11. COMMISSION & PAYOUT RECORDS TABLE
CREATE TABLE seller_payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE RESTRICT,
    period_label VARCHAR(30) NOT NULL, -- e.g. "2026-10"
    total_sales_uzs NUMERIC(15, 2) NOT NULL,
    commission_deducted_uzs NUMERIC(15, 2) NOT NULL,
    net_payout_uzs NUMERIC(15, 2) NOT NULL,
    status payout_status NOT NULL DEFAULT 'pending',
    bank_account_mfo VARCHAR(20),
    bank_account_number VARCHAR(30),
    processed_by_admin_id UUID REFERENCES users(id),
    processed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 12. AUDIT LOGS TABLE
-- Mandatory requirement: Record all administrative and security actions!
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(80) NOT NULL,
    performed_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    performed_by_name VARCHAR(120) NOT NULL,
    performer_role VARCHAR(20) NOT NULL,
    target_type VARCHAR(40) NOT NULL,
    target_id VARCHAR(80) NOT NULL,
    details TEXT NOT NULL,
    severity audit_severity NOT NULL DEFAULT 'info',
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_action ON audit_logs(action);
