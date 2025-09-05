-- =========================================
-- PERMISOS
-- =========================================
INSERT INTO tb_permiso (codigo, descripcion,enabled)VALUES 
('VIEW_DASHBOARD', 'Puede ver el panel principal',true) , 
('MANAGE_USERS', 'Puede gestionar usuarios',true) ,
('MANAGE_EMPLOYEES', 'Puede gestionar empleados',true);

-- =========================================
-- ROLES
-- =========================================
INSERT INTO tb_rol (nombre, descripcion,enabled)VALUES 
('ROLE_ADMIN', 'Administrador con todos los permisos',true) , --ID: 1
('ROLE_USER', 'Usuario con permisos limitados',true);         --ID: 2

-- =========================================
-- ROLES → PERMISOS (ADMIN tiene todos)
-- =========================================
INSERT INTO tb_rol_permiso(rol_id,permiso_id)VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1);

-- =========================================
-- EMPLEADO por default
-- =========================================
INSERT INTO tb_empleado(created_at, enabled, apellido, dni, nombre, telefono) VALUES 
(NOW(), true, 'Cabrera Ortiz', '88888888', 'Luis Antonio', '999999999');

-- =========================================
-- USUARIOS (password ya encriptado con BCrypt)
-- =========================================
INSERT INTO tb_usuario(email, password, empleado_id, created_at, enabled) VALUES
('luisortiz251003@gmail.com', '$2a$10$HfSTLLcO9JY7Rk5Scyjd0On0ZDfQQQZ3AuiRhBtPHlxq/CyZIa3GG','1',NOW(),true);

-- =========================================
-- USUARIO solo puede ver dashboard
-- =========================================
INSERT INTO tb_usuario_rol(usuario_id,rol_id) VALUES
('1','1');
