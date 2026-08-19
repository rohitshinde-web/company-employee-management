CREATE OR REPLACE VIEW v_employee_details AS
SELECT 
e.id AS employee_id,
e.employee_code,
e.first_name || ' ' || e.last_name AS full_name,
e.email,
e.designation,
e.employment_status,
d.id AS department_id,
d.name AS department_name,
r.role_name,
COALESCE(s.base_salary, 0.00) AS current_base_salary,
e.is_active,
e.created_at,
FROM employees e
JOIN departments d ON e.department_id= d.id,
JOIN roles r ON e.role_id = r.id,
LEFT JOIN LATERAL (
    SELECT base_salary
    FROM salaries
    WHERE employee_id = e.id
    ORDER BY effective_date DESC
    LIMIT 1
) s ON TRUE;


-- 2. Automated audit trigger & sstored procedure

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_STAMP,
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;


    -- Attach trigger to core tables

    DROP TRIGGER IF EXISTS set_employees_updated_at ON employees;
    CREATE TRIGGER set_employees_updated_at
           BEFORE UPDATE ON employees
              FOR EACH ROW
              EXECUTE FUNCTION update_updated_at_column();