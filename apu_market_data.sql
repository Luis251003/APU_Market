-- TABLA ROL: INSERTANDO DATOS
INSERT INTO public.tb_rol(
	rol_id, descripcion, nombre)
	VALUES (1,'Tiene acceso total al sistema y gestiona todos los modulos de la aplicación', 'ROLE_ADMIN');
	
INSERT INTO public.tb_rol(
	rol_id, descripcion, nombre)
	VALUES (2,'Puede acceder a sus propios datos y funcionalidades limitadas según su perfil', 'ROLE_USER');
	
INSERT INTO public.tb_rol(
	rol_id, descripcion, nombre)
	VALUES (3,'Tiene permisos para supervisar contenido, usuarios o procesos, sin ser administrador total.','ROLE_MODERATOR')

-- TABLA PERMISO: INSERTANDO DATOS
INSERT INTO public.tb_permiso(permiso_id, ruta, descripcion) VALUES (1,'/','Inicio');
INSERT INTO public.tb_permiso(permiso_id, ruta, descripcion) VALUES (2,'/recovery','Recuperar Password');

-- TABLA ROL_PERMISO: INSERTANDO DATOS
INSERT INTO public.tb_rol_permiso(rol_id, permiso_id) VALUES (1,1);
INSERT INTO public.tb_rol_permiso(rol_id, permiso_id) VALUES (1,2);

INSERT INTO public.tb_rol_permiso(rol_id, permiso_id) VALUES (2,1);
INSERT INTO public.tb_rol_permiso(rol_id, permiso_id) VALUES (2,2)