CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL UNIQUE,
    budget NUMERIC(15, 2) NOT NULL CHECK (budget >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. ROLES TABLE
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. EMPLOYEES TABLE
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_code VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    designation VARCHAR(100) NOT NULL,
    employment_status VARCHAR(30) NOT NULL
        CHECK (employment_status IN (
            'FULL_TIME',
            'PART_TIME',
            'CONTRACT',
            'INTERN',
            'TERMINATED'
        )),
    gender VARCHAR(20) NOT NULL
        CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
    date_of_birth DATE NOT NULL,
    date_of_joining DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT check_minimum_age
        CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years')
);

-- 4. SALARIES TABLE
CREATE TABLE IF NOT EXISTS salaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    base_salary NUMERIC(12, 2) NOT NULL CHECK (base_salary >= 0),
    allowances NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (allowances >= 0),
    deductions NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (deductions >= 0),
    effective_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    check_in_time TIMESTAMPTZ,
    check_out_time TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL
        CHECK (status IN ('PRESENT', 'ABSENT', 'HALF_DAY', 'ON_LEAVE')),

    CONSTRAINT unique_employee_daily_attendance
        UNIQUE (employee_id, date)
);

-- 6. LEAVES TABLE
CREATE TABLE IF NOT EXISTS leaves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leave_type VARCHAR(20) NOT NULL
        CHECK (leave_type IN (
            'SICK',
            'CASUAL',
            'MATERNITY',
            'PATERNITY',
            'UNPAID'
        )),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    approved_by UUID REFERENCES employees(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT check_valid_leave_dates
        CHECK (start_date <= end_date)
);

-- 7. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_code VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    budget NUMERIC(15, 2) NOT NULL CHECK (budget >= 0),
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PERFORMANCE INDEXES

-- Fast lookups for employees by email and employee code
CREATE INDEX IF NOT EXISTS idx_employees_email
    ON employees(email);

CREATE INDEX IF NOT EXISTS idx_employees_code
    ON employees(employee_code);

-- Foreign key indexes
CREATE INDEX IF NOT EXISTS idx_employees_department_id
    ON employees(department_id);

CREATE INDEX IF NOT EXISTS idx_employees_role_id
    ON employees(role_id);

-- Attendance and leave reporting indexes
CREATE INDEX IF NOT EXISTS idx_attendances_employee_id_date
    ON attendances(employee_id, date);

CREATE INDEX IF NOT EXISTS idx_leaves_employee_id_start_date
    ON leaves(employee_id, start_date);

CREATE INDEX IF NOT EXISTS idx_salaries_employee_id
    ON salaries(employee_id);