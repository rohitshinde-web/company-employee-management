-- Seed initial system roles
INSERT INTO roles (id, role_name, description) VALUES
('a0eebc99-9c8b-4ef8-bb6d-6bb9bd380a11', 'ADMIN', 'System Administrator with full permission'),
('a0eebc99-9c8b-4ef8-bb6d-6bb9bd380a22', 'HR', 'Human Resources Officer managing employee lifecycle'),
('b1eebc99-9c8b-4ef8-bb6d-6bb9bd380a33', 'MANAGER', 'Department Manager overseeing team performance'),
('c2eebc99-9c8b-4ef8-bb6d-6bb9bd380a44', 'EMPLOYEE', 'Standard corporate employee access')
ON CONFLICT (role_name) DO NOTHING;


-- Seed core departments
INSERT INTO departments (id, department_code, name, budget) VALUES
('b1eebc99-9c8b-4ef8-bb6d-6bb9bd380a11', 'DEPT-ENG', 'Engineering & Technology', 5000000.00),
('b1eebc99-9c8b-4ef8-bb6d-6bb9bd380a22', 'DEPT-HR', 'Human Resources', 120000.00)
ON CONFLICT (department_code) DO NOTHING;


-- Seed initial admin employee record
INSERT INTO employees (
    id,
    employee_code,
    first_name,
    last_name,
    email,
    password_hash,
    department_id,
    role_id,
    designation,
    employment_status,
    gender,
    date_of_birth,
    date_of_joining
) VALUES (
    'c2eebc99-9c8b-4ef8-bb6d-6bb9bd380a11',
    'EMP-1001',
    'Rohit',
    'Shinde',
    'admin@company.com',
    '$2b$10$YourHashedPasswordHere',
    'b1eebc99-9c8b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c8b-4ef8-bb6d-6bb9bd380a11',
    'Principal Architect',
    'FULL_TIME',
    'MALE',
    '1999-11-09',
    '2024-01-01'
)
ON CONFLICT (email) DO NOTHING;