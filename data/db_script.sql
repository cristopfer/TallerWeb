--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2024-11-29 19:16:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 238 (class 1255 OID 16621)
-- Name: actualizar_curso_profesor(integer, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.actualizar_curso_profesor(idpro integer, cur character varying, descrip character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE profesor SET area = cur, descripcion = descrip WHERE idprofesor = idpro;
RETURN 1;
END;
$$;


ALTER FUNCTION public.actualizar_curso_profesor(idpro integer, cur character varying, descrip character varying) OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 16624)
-- Name: actualizar_datos_profesor(integer, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.actualizar_datos_profesor(idusu integer, nom character varying, ape character varying, cor character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE usuario SET nombre = nom, apellido = ape, correo = cor WHERE idusuario = idusu;
RETURN 1;
END;
$$;


ALTER FUNCTION public.actualizar_datos_profesor(idusu integer, nom character varying, ape character varying, cor character varying) OWNER TO postgres;

--
-- TOC entry 235 (class 1255 OID 16618)
-- Name: calificar_profesor(integer, numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calificar_profesor(idpro integer, valor numeric) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
	num NUMERIC:=0;
	total NUMERIC:=0;
BEGIN
	SELECT puntuacion FROM profesor WHERE idprofesor = idpro INTO num;
	SELECT ROUND((num + valor) / 2, 2) INTO total;
	UPDATE profesor SET puntuacion = total, vistas = vistas+1 WHERE idprofesor = idpro;
RETURN 1;
END;
$$;


ALTER FUNCTION public.calificar_profesor(idpro integer, valor numeric) OWNER TO postgres;

--
-- TOC entry 219 (class 1255 OID 24738)
-- Name: comprar_curso(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.comprar_curso(idusu integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE usuario SET monedero = 50 WHERE idusuario = idusu;
RETURN 1;
END;
$$;


ALTER FUNCTION public.comprar_curso(idusu integer) OWNER TO postgres;

--
-- TOC entry 237 (class 1255 OID 16620)
-- Name: consultar_comentarios_profesor(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consultar_comentarios_profesor(idpro integer) RETURNS TABLE(descrip character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY SELECT descripcion FROM comentario WHERE idprofesor = idpro;
END;
$$;


ALTER FUNCTION public.consultar_comentarios_profesor(idpro integer) OWNER TO postgres;

--
-- TOC entry 243 (class 1255 OID 24737)
-- Name: consultar_cursos(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consultar_cursos() RETURNS TABLE(cantidad integer, nom character varying, ape character varying, curs character varying, descrip character varying, cali numeric, prec numeric, idpro integer, vistas integer)
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.consultar_cursos() OWNER TO postgres;

--
-- TOC entry 234 (class 1255 OID 16617)
-- Name: consultar_datos_usuario(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consultar_datos_usuario(nomu character varying) RETURNS TABLE(idusu integer, nom character varying, ape character varying, idpro integer)
    LANGUAGE plpgsql
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


ALTER FUNCTION public.consultar_datos_usuario(nomu character varying) OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 16625)
-- Name: consultar_mensaje_privado_profesor(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consultar_mensaje_privado_profesor(idpro integer) RETURNS TABLE(idusu integer, nomusu character varying, descrip character varying, fec timestamp without time zone)
    LANGUAGE plpgsql
    AS $$
DECLARE
	valor VARCHAR:= '';
	valorUsu INTEGER:=0;
BEGIN
	SELECT idalumno INTO valorUsu FROM mensaje WHERE idprofesor = idpro;
	SELECT nombre INTO valor FROM usuario WHERE idusuario = valorUsu;
	RETURN QUERY 
	SELECT idalumno,valor,descripcion,fecha FROM mensaje WHERE idprofesor = idpro;
END;
$$;


ALTER FUNCTION public.consultar_mensaje_privado_profesor(idpro integer) OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 16623)
-- Name: consultar_mensaje_profesor(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consultar_mensaje_profesor(idpro integer, idusu integer) RETURNS TABLE(descrip character varying, tip integer)
    LANGUAGE plpgsql
    AS $$
DECLARE
	num INTEGER:=0;
BEGIN
	SELECT idalumno FROM alumno WHERE idusuario = idusu INTO num;
	RETURN QUERY SELECT descripcion,envio FROM mensaje WHERE idprofesor = idpro AND idalumno = num ORDER BY idmensaje ASC;
END;
$$;


ALTER FUNCTION public.consultar_mensaje_profesor(idpro integer, idusu integer) OWNER TO postgres;

--
-- TOC entry 225 (class 1255 OID 16616)
-- Name: consultar_profesor(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.consultar_profesor(idpro integer) RETURNS TABLE(nom character varying, ape character varying, cor character varying, curs character varying, descrip character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY 
	SELECT (SELECT nombre FROM usuario WHERE idusuario=pro.idusuario),(SELECT apellido FROM usuario WHERE idusuario=pro.idusuario),(SELECT correo FROM usuario WHERE idusuario=pro.idusuario),pro.area,pro.descripcion FROM profesor pro WHERE idprofesor = idpro;
END;
$$;


ALTER FUNCTION public.consultar_profesor(idpro integer) OWNER TO postgres;

--
-- TOC entry 236 (class 1255 OID 16619)
-- Name: ingresar_comentario(integer, integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ingresar_comentario(idusu integer, idpro integer, comentario character varying) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
	num INTEGER:=0;
BEGIN
	SELECT idalumno FROM alumno WHERE idusuario = idusu INTO num;
	INSERT INTO comentario(descripcion,fecha,idalumno,idprofesor) VALUES(comentario,CURRENT_DATE,num,idpro);
RETURN 1;
END;
$$;


ALTER FUNCTION public.ingresar_comentario(idusu integer, idpro integer, comentario character varying) OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 16622)
-- Name: ingresar_mensaje(integer, integer, character varying, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ingresar_mensaje(idusu integer, idpro integer, mensaj character varying, tipo integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
	num INTEGER:=0;
BEGIN
	SELECT idalumno FROM alumno WHERE idusuario = idusu INTO num;
	INSERT INTO mensaje(descripcion,envio,fecha,idalumno,idprofesor) VALUES(mensaj,tipo,CURRENT_DATE,num,idpro);
RETURN 1;
END;
$$;


ALTER FUNCTION public.ingresar_mensaje(idusu integer, idpro integer, mensaj character varying, tipo integer) OWNER TO postgres;

--
-- TOC entry 220 (class 1255 OID 16613)
-- Name: ingresar_sistema(character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ingresar_sistema(nomusu character varying, cla character varying) RETURNS integer
    LANGUAGE plpgsql
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


ALTER FUNCTION public.ingresar_sistema(nomusu character varying, cla character varying) OWNER TO postgres;

--
-- TOC entry 221 (class 1255 OID 16614)
-- Name: registrar_usuario(character varying, character varying, character varying, character varying, character varying, integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.registrar_usuario(nom character varying, ape character varying, nomu character varying, cor character varying, cla character varying, tip integer, cod character varying) RETURNS integer
    LANGUAGE plpgsql
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


ALTER FUNCTION public.registrar_usuario(nom character varying, ape character varying, nomu character varying, cor character varying, cla character varying, tip integer, cod character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16567)
-- Name: alumno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alumno (
    idalumno integer NOT NULL,
    codigo character varying(10),
    idusuario integer
);


ALTER TABLE public.alumno OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16566)
-- Name: alumno_idalumno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alumno_idalumno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alumno_idalumno_seq OWNER TO postgres;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 213
-- Name: alumno_idalumno_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alumno_idalumno_seq OWNED BY public.alumno.idalumno;


--
-- TOC entry 216 (class 1259 OID 16579)
-- Name: comentario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentario (
    idcomentario integer NOT NULL,
    descripcion character varying(200),
    fecha timestamp without time zone,
    idalumno integer,
    idprofesor integer
);


ALTER TABLE public.comentario OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16578)
-- Name: comentario_idcomentario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentario_idcomentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comentario_idcomentario_seq OWNER TO postgres;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 215
-- Name: comentario_idcomentario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentario_idcomentario_seq OWNED BY public.comentario.idcomentario;


--
-- TOC entry 218 (class 1259 OID 16596)
-- Name: mensaje; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensaje (
    idmensaje integer NOT NULL,
    descripcion character varying(200),
    envio integer,
    fecha timestamp without time zone,
    idalumno integer,
    idprofesor integer
);


ALTER TABLE public.mensaje OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16595)
-- Name: mensaje_idmensaje_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensaje_idmensaje_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mensaje_idmensaje_seq OWNER TO postgres;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 217
-- Name: mensaje_idmensaje_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensaje_idmensaje_seq OWNED BY public.mensaje.idmensaje;


--
-- TOC entry 212 (class 1259 OID 16555)
-- Name: profesor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profesor (
    idprofesor integer NOT NULL,
    area character varying(50),
    descripcion character varying(400),
    puntuacion numeric(5,2),
    idusuario integer,
    vistas integer DEFAULT 0
);


ALTER TABLE public.profesor OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16554)
-- Name: profesor_idprofesor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profesor_idprofesor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profesor_idprofesor_seq OWNER TO postgres;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 211
-- Name: profesor_idprofesor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profesor_idprofesor_seq OWNED BY public.profesor.idprofesor;


--
-- TOC entry 210 (class 1259 OID 16546)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    idusuario integer NOT NULL,
    nombre character varying(50),
    apellido character varying(50),
    nombreusu character varying(100),
    correo character varying(100),
    clave character varying(100),
    tipo integer,
    monedero numeric
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16545)
-- Name: usuario_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_idusuario_seq OWNER TO postgres;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 209
-- Name: usuario_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_idusuario_seq OWNED BY public.usuario.idusuario;


--
-- TOC entry 3201 (class 2604 OID 16570)
-- Name: alumno idalumno; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumno ALTER COLUMN idalumno SET DEFAULT nextval('public.alumno_idalumno_seq'::regclass);


--
-- TOC entry 3202 (class 2604 OID 16582)
-- Name: comentario idcomentario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario ALTER COLUMN idcomentario SET DEFAULT nextval('public.comentario_idcomentario_seq'::regclass);


--
-- TOC entry 3203 (class 2604 OID 16599)
-- Name: mensaje idmensaje; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje ALTER COLUMN idmensaje SET DEFAULT nextval('public.mensaje_idmensaje_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 16558)
-- Name: profesor idprofesor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesor ALTER COLUMN idprofesor SET DEFAULT nextval('public.profesor_idprofesor_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 16549)
-- Name: usuario idusuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN idusuario SET DEFAULT nextval('public.usuario_idusuario_seq'::regclass);


--
-- TOC entry 3364 (class 0 OID 16567)
-- Dependencies: 214
-- Data for Name: alumno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alumno (idalumno, codigo, idusuario) FROM stdin;
1	20200123	6
\.


--
-- TOC entry 3366 (class 0 OID 16579)
-- Dependencies: 216
-- Data for Name: comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentario (idcomentario, descripcion, fecha, idalumno, idprofesor) FROM stdin;
\.


--
-- TOC entry 3368 (class 0 OID 16596)
-- Dependencies: 218
-- Data for Name: mensaje; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensaje (idmensaje, descripcion, envio, fecha, idalumno, idprofesor) FROM stdin;
\.


--
-- TOC entry 3362 (class 0 OID 16555)
-- Dependencies: 212
-- Data for Name: profesor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profesor (idprofesor, area, descripcion, puntuacion, idusuario, vistas) FROM stdin;
6	Atomos-Quimica	Configuracion electronica y principio de pauli-Intermedio-1 hora	88.75	8	6
5	Integral indefinida-Calculo II	Areas y limites de integracion-Basico-2 horas	91.96	7	8
\.


--
-- TOC entry 3360 (class 0 OID 16546)
-- Dependencies: 210
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (idusuario, nombre, apellido, nombreusu, correo, clave, tipo, monedero) FROM stdin;
1	adm	adm	admin	adm@gmail.com	123	1	\N
7	---	perez	eysen	eysen@gmail.com	123	2	\N
8	---	matinez	ana	ana@gmail.com	123	2	\N
6	---	guzman	carlos	carlos@gmail.com	123	1	50
\.


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 213
-- Name: alumno_idalumno_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alumno_idalumno_seq', 1, true);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 215
-- Name: comentario_idcomentario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentario_idcomentario_seq', 1, false);


--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 217
-- Name: mensaje_idmensaje_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensaje_idmensaje_seq', 1, false);


--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 211
-- Name: profesor_idprofesor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesor_idprofesor_seq', 6, true);


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 209
-- Name: usuario_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_idusuario_seq', 8, true);


--
-- TOC entry 3209 (class 2606 OID 16572)
-- Name: alumno alumno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumno
    ADD CONSTRAINT alumno_pkey PRIMARY KEY (idalumno);


--
-- TOC entry 3211 (class 2606 OID 16584)
-- Name: comentario comentario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (idcomentario);


--
-- TOC entry 3213 (class 2606 OID 16601)
-- Name: mensaje mensaje_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje
    ADD CONSTRAINT mensaje_pkey PRIMARY KEY (idmensaje);


--
-- TOC entry 3207 (class 2606 OID 16560)
-- Name: profesor profesor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesor
    ADD CONSTRAINT profesor_pkey PRIMARY KEY (idprofesor);


--
-- TOC entry 3205 (class 2606 OID 16553)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);


--
-- TOC entry 3215 (class 2606 OID 16573)
-- Name: alumno alumno_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumno
    ADD CONSTRAINT alumno_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario);


--
-- TOC entry 3216 (class 2606 OID 16585)
-- Name: comentario comentario_idalumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_idalumno_fkey FOREIGN KEY (idalumno) REFERENCES public.alumno(idalumno);


--
-- TOC entry 3217 (class 2606 OID 16590)
-- Name: comentario comentario_idprofesor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_idprofesor_fkey FOREIGN KEY (idprofesor) REFERENCES public.profesor(idprofesor);


--
-- TOC entry 3218 (class 2606 OID 16602)
-- Name: mensaje mensaje_idalumno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje
    ADD CONSTRAINT mensaje_idalumno_fkey FOREIGN KEY (idalumno) REFERENCES public.alumno(idalumno);


--
-- TOC entry 3219 (class 2606 OID 16607)
-- Name: mensaje mensaje_idprofesor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensaje
    ADD CONSTRAINT mensaje_idprofesor_fkey FOREIGN KEY (idprofesor) REFERENCES public.profesor(idprofesor);


--
-- TOC entry 3214 (class 2606 OID 16561)
-- Name: profesor profesor_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesor
    ADD CONSTRAINT profesor_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario);


-- Completed on 2024-11-29 19:16:04

--
-- PostgreSQL database dump complete
--
