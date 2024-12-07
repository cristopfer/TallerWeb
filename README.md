<!-- <p align="center">
  <img
    src="https://asset.cloudinary.com/dkhvd9k6s/ead9ee2d34482074a86412d6ae2b4a64"
    align="center"
    width="100"
    alt="EduConnect"
    title="EduConnect"
  />
  <h1 align="center">✏️ EduConnect ✏️</h1>
</p> -->
<h1 align="center">✏️ EduConnect ✏️</h1>

<p align="center">📚 Plataforma web que conecta estudiantes y profesores 👨‍🏫</p>

<!-- Shields -->
<p align="center">
  <!-- Node v18-->
  <img src="https://img.shields.io/static/v1?label=NodeJS&message=v11.14.0&color=339933&logo=node.js" />
  <!-- React -->
  <img src="https://img.shields.io/static/v1?label=React&message=v16.13&color=61DAFB&logo=react" />
</p>

<!--<img
  src="./.github/screenshot.png"
  title="Screenshot of Saturn"
  alt="Screenshot of Saturn"
  align="center"
/> -->


## 🚀 Implementación
💻 Una vez que hayas clonado o descargado directamente este repositorio: abre dos terminales, una terminal para la carpeta de **client** y otra para **api**:

📦 Install the dependencies **node_modules**

```bash
npm install
```
🚀 En cada terminar aplicas: Levanta 2 localhost para el cliente y el api
```bash
npm start
```
--- ya corre 


### 🔥 Instalar BaseDatos: PostgreSQL
Descargar la v14 del PostgreSQL e instalar
levantar el pgadmin4
crearmos una BD con el siguiente comado:
```bash
CREATE TABLE usuario
(
    idusuario serial primary key,
	nombre character varying(50),
	apellido character varying(50),
	nombreusu character varying(100),
    correo character varying(100),
    clave character varying(100),
	tipo integer,
	monedero decimal
);

CREATE TABLE profesor
(
	idprofesor serial primary key,
	area character varying(50),
	descripcion character varying(400),
	puntuacion decimal(5,2),
	idusuario int,
	foreign key(idusuario) references usuario(idusuario)
);	

CREATE TABLE alumno(
	idalumno serial primary key,
	codigo character varying(10),
	idusuario int,
	foreign key(idusuario) references usuario(idusuario)
);

CREATE TABLE comentario(
	idcomentario serial primary key,
	descripcion character varying(200),
	fecha timestamp,
	idalumno int,
	idprofesor int,
	foreign key(idalumno) references alumno(idalumno),
	foreign key(idprofesor) references profesor(idprofesor)
);

CREATE TABLE mensaje(
	idmensaje serial primary key,
	descripcion character varying(200),
	envio integer,
	fecha timestamp,
	idalumno int,
	idprofesor int,
	foreign key(idalumno) references alumno(idalumno),
	foreign key(idprofesor) references profesor(idprofesor)
);
ALTER TABLE profesor
ADD COLUMN vistas INTEGER DEFAULT 0;
insert into usuario(nombre,apellido,nombreusu,correo,clave,tipo) values('adm','adm','admin','adm@gmail.com','123',1);

CREATE OR REPLACE FUNCTION ingresar_sistema(nomusu character varying,cla character varying)
    RETURNS integer   
	language plpgsql
AS $$
DECLARE
	tip INTEGER:= 0;
	valor INTEGER:= 0;
	valor1 VARCHAR(100);
BEGIN	
	SELECT nombreusu FROM usuario WHERE nombreusu=nomusu AND clave=cla INTO valor1;
	SELECT TIPO FROM usuario WHERE nombreusu=nomusu AND clave=cla INTO tip;
	IF valor1 = nomusu AND tip = 1 THEN
		SELECT 1 INTO valor;
	ELSE
		IF valor1 = nomusu AND tip = 2 THEN
			SELECT 2 INTO valor;
		END IF;
	END IF;
RETURN valor;
END;
$$;

CREATE OR REPLACE FUNCTION registrar_usuario(nom character varying,ape character varying,nomu character varying,cor character varying,cla character varying,tip integer,cod character varying)
    RETURNS integer
    LANGUAGE 'plpgsql'
AS $$
DECLARE
	valor INTEGER:=0;
	idusu INTEGER;
	valor1 VARCHAR(100);
BEGIN
	SELECT nombreusu FROM usuario WHERE nombreusu=nomu INTO valor1;
	IF valor1 = nomu THEN
		SELECT 1 INTO valor;
	ELSE
		INSERT INTO usuario(nombre,apellido,nombreusu,correo,clave,tipo) VALUES(nom,ape,nomu,cor,cla,tip);
		SELECT idusuario FROM usuario WHERE nombreusu= nomu INTO idusu;
		IF tip = 1 THEN			
			INSERT INTO alumno(codigo,idusuario) VALUES(cod,idusu);
		ELSE
			INSERT INTO profesor(area,descripcion,puntuacion,idusuario) VALUES('--','--',0,idusu);
		END IF;
	END IF;
RETURN valor;
END;
$$;


CREATE OR REPLACE FUNCTION consultar_datos_usuario(nomu character varying)
    RETURNS TABLE(idusu integer,nom character varying, ape character varying, idpro integer) 
    LANGUAGE 'plpgsql'
AS $$
DECLARE
	valor INTEGER:= 0;
	valorUsu INTEGER:=0;
BEGIN
	SELECT idusuario INTO valorUsu FROM usuario WHERE nombreusu = nomu;
	SELECT idprofesor INTO valor FROM profesor WHERE idusuario = valorUsu;
	RETURN QUERY 
	SELECT idusuario,nombre,apellido,valor FROM usuario WHERE nombreusu = nomu;
END;
$$;

CREATE OR REPLACE FUNCTION actualizar_curso_profesor(idpro integer,cur character varying,descrip character varying)
    RETURNS integer
    LANGUAGE 'plpgsql'
AS $$
BEGIN
	UPDATE profesor SET area = cur, descripcion = descrip WHERE idprofesor = idpro;
RETURN 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.consultar_cursos(
	)
    RETURNS TABLE(cantidad integer, nom character varying, ape character varying, curs character varying, descrip character varying, cali numeric, prec numeric, idpro integer, vistas integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY 
	SELECT 
    	CAST(COUNT(*) OVER() AS integer) AS total,
    	u.nombreusu,
    	u.apellido,
    	pro.area,
    	pro.descripcion,
    	pro.puntuacion,
    	u.monedero,
    	pro.idprofesor,
    	pro.vistas
	FROM profesor pro
	JOIN usuario u ON u.idusuario = pro.idusuario;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.comprar_curso(
	idusu integer)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
BEGIN
	UPDATE usuario SET monedero = 50 WHERE idusuario = idusu;
RETURN 1;
END;
$BODY$;


-- verificar el usuario admin





```bash
npm run build
```
Then deploy it with:
```bash
firebase deploy
```


🎉 **¡Genial! Comience a usar EduConnect.**


## ✍ Developers
Personas que contribuyeron al desarrollo del proyecto.
- Ccanto Flores, Rosmeri Gloria
- Dinca Alexandru, Andrei
- Espinola Ravello, Annie Katerine
- Hernandez Bianchi Stefano Alessandro
- Modesto Calixto, Keler
- Pérez Bazán, Eysen Christopher
- Santa Cruz Pachas, Edward Grover


