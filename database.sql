--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-1.pgdg22.10+1)
-- Dumped by pg_dump version 15.1

-- Started on 2023-06-26 14:28:03

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

DROP DATABASE "bd-obligatorio";
--
-- TOC entry 3422 (class 1262 OID 16389)
-- Name: bd-obligatorio; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "bd-obligatorio" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';


\connect -reuse-previous=on "dbname='bd-obligatorio'"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16404)
-- Name: Admin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    email text NOT NULL,
    "contraseña" text NOT NULL,
    nick text,
    nombres text,
    apellidos text,
    fecha_registro date,
    eliminado boolean
);


--
-- TOC entry 224 (class 1259 OID 16717)
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Admin" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Admin_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16414)
-- Name: Categoria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Categoria" (
    codigo integer NOT NULL,
    nombre text NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 16718)
-- Name: Categoria_codigo_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Categoria" ALTER COLUMN codigo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Categoria_codigo_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16409)
-- Name: Habilidad; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Habilidad" (
    codigo integer NOT NULL,
    habilidad text,
    descripcion text,
    codigo_categoria integer NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 16719)
-- Name: Habilidad_codigo_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Habilidad" ALTER COLUMN codigo ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Habilidad_codigo_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16419)
-- Name: Mensaje; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Mensaje" (
    id integer NOT NULL,
    marca text,
    contenido text,
    eliminado boolean,
    solicitud_id integer,
    id_emisor integer NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 16720)
-- Name: Mensaje_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Mensaje" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Mensaje_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16424)
-- Name: Solicitud; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Solicitud" (
    id integer NOT NULL,
    localizacion text,
    fecha_creacion date,
    id_creador integer,
    id_acepta integer,
    titulo text,
    descripcion text,
    opinion_creador text,
    opinion_acepta text,
    estado text,
    cerrado_creador boolean DEFAULT false,
    cerrado_acepta boolean DEFAULT false
);


--
-- TOC entry 220 (class 1259 OID 16427)
-- Name: SolicitudHabilidad; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SolicitudHabilidad" (
    id_solicitud integer NOT NULL,
    codigo_habilidad integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 16721)
-- Name: Solicitud_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Solicitud" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Solicitud_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: Usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    email text NOT NULL,
    "contraseña" text NOT NULL,
    nick text,
    nombres text,
    apellidos text,
    fecha_registro date,
    eliminado boolean
);


--
-- TOC entry 221 (class 1259 OID 16533)
-- Name: UsuarioConectadoUsuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsuarioConectadoUsuario" (
    id_usuario1 integer NOT NULL,
    id_usuario2 integer NOT NULL,
    aceptada boolean DEFAULT false NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 16548)
-- Name: UsuarioHabilidades; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsuarioHabilidades" (
    id_usuario integer NOT NULL,
    id_habilidad integer NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 16715)
-- Name: Usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."Usuario" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Usuario_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3403 (class 0 OID 16404)
-- Dependencies: 215
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Admin" (id, email, "contraseña", nick, nombres, apellidos, fecha_registro, eliminado) FROM stdin;
1	admin@email.com	admin	admin	Usuario	Administrador	2023-06-26	f
\.


--
-- TOC entry 3405 (class 0 OID 16414)
-- Dependencies: 217
-- Data for Name: Categoria; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Categoria" (codigo, nombre) FROM stdin;
1	Hogar
2	Familia
3	Transporte
4	Estudio
\.


--
-- TOC entry 3404 (class 0 OID 16409)
-- Dependencies: 216
-- Data for Name: Habilidad; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Habilidad" (codigo, habilidad, descripcion, codigo_categoria) FROM stdin;
1	Limpieza	Limpieza de hogares	1
2	Electricista	Reparacion de cableado electrico	1
3	Plomeria	Reparacion de caños	1
4	Transporte Individual	Transporte de una persona	3
5	Mudanzas	Transporte de muebles	3
6	Niñera/o\n	Cuidado de niños	2
7	Soporte PC	Reparacion de PCs	1
8	Matemáticas	Tutoria en Matemáticas	4
9	Física	Tutoria en Física	4
10	Programación	Tutoria en Programación	4
11	Lenguaje Inglés	Tutoria en Inglés	4
12	Lenguaje Frances	Tutoria en Frances	4
\.


--
-- TOC entry 3406 (class 0 OID 16419)
-- Dependencies: 218
-- Data for Name: Mensaje; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Mensaje" (id, marca, contenido, eliminado, solicitud_id, id_emisor) FROM stdin;
3	2023-06-26 01:37:30+00	Disculpa la demora. Estaba ocupado. Podes venir en 2 horas?	f	1	1
1	2023-06-26 00:12:59+00	Hola, como andas? Todo bien?	f	1	19
2	2023-06-26 01:22:05+00	Seguis por ahi? Holaaaa?	t	1	19
\.


--
-- TOC entry 3407 (class 0 OID 16424)
-- Dependencies: 219
-- Data for Name: Solicitud; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Solicitud" (id, localizacion, fecha_creacion, id_creador, id_acepta, titulo, descripcion, opinion_creador, opinion_acepta, estado, cerrado_creador, cerrado_acepta) FROM stdin;
1	Calle 123	2023-06-26	1	19	Cuidado de niño de 6a	Preciso alguien que pueda cuidar a mi sobrino de 6 años por 5 horas	No ayudo en nada.	Le solucione la vida.	disputado	t	t
2	Calle 123	2023-06-26	1	\N	No me anda la PC	Mi pc no prende la pantalla.	\N	\N	abierta	f	f
4	Caras 987	2023-06-25	18	\N	Mudada de escritorio	Preciso mover un escritorio a la casa de mi madre	\N	\N	abierta	f	f
5	Menguas 321	2023-06-26	21	\N	Cambio de fusil	Se me exploto el fusil de la cocina	\N	\N	abierta	f	f
6	Juantas 348	2023-06-24	14	\N	Limpieza de cocina	Alguien que me ayude a limpiar la cocina	\N	\N	abierta	f	f
7	Caras 987	2023-04-01	18	\N	Instalar Office	Quien me ayuda a instalar office en mi pc?	\N	\N	abierta	f	f
8	Juantas 348	2023-06-25	14	21	Limpieza de garage	Ayuda, el polvo me acosa	\N	\N	activa	f	f
3	Menguas 321	2023-06-25	21	1	Caño roto	Se rompio el caño al calefon	Solucionado	\N	solucionado	t	f
\.


--
-- TOC entry 3408 (class 0 OID 16427)
-- Dependencies: 220
-- Data for Name: SolicitudHabilidad; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SolicitudHabilidad" (id_solicitud, codigo_habilidad) FROM stdin;
1	6
2	7
3	3
4	5
5	2
6	1
7	7
8	1
\.


--
-- TOC entry 3402 (class 0 OID 16399)
-- Dependencies: 214
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Usuario" (id, email, "contraseña", nick, nombres, apellidos, fecha_registro, eliminado) FROM stdin;
12	papa@papa.papa	58cc6181518fbfb49da9c50db08ce31aa92feebaecc6c46a3a8084e87b50f037	papa	Father	Dad	2023-06-25	f
13	papa1@papa.papa	6c7ebb4513ad9dc793f2be431f7302d3df964a1e4c60ddcf77c748147a97a4c7	papa1	Father	Dad	2023-06-25	f
14	papa2@papa.papa	8c1c0460ea327c27fa9ec943ec0c0cd084880d3b2064af521ea1ac5f192595dd	papa2	Father	Dad	2023-06-25	f
15	papa3@papa.papa	a37de2baeb4528a0a415cb7cf2402b1a0300ebbdb9614e4f976441964c4229d9	papa3	Father	Dad	2023-06-25	f
16	papa4@papa.papa	c28a988edb83297ef1552c1197a6f483e3a193ff2aca404229acdaaacf13efbf	papa4	Father	Dad	2023-06-25	f
17	papa5@papa.papa	0082c2f5d89fa5c3a1e68cae000c455c64a5e3893017450b355374ba88f43710	papa5	Father	Dad	2023-06-25	f
18	papa6@papa.papa	7024e1d1f37384e2aff9ba52bed91519194b4cbf881f4e9aedbba35d40385733	papa6	Father	Dad	2023-06-25	f
19	papa7@papa.papa	7d06f91477a6f16efbdef76319a040f39f66bfa352e176ab6c959588b00e9493	papa7	Father	Dad	2023-06-25	f
20	papa8@papa.papa	f58ea98801653877bba06a6c853233481e3da520b832ab2d4e46de45f04d2f39	papa8	Father	Dad	2023-06-25	f
21	papa9@papa.papa	a60bf7b29cacd6cdee38a151c310f90d5d8df406e259552ef4ace9aed47dfefb	papa9	Father	Dad	2023-06-25	f
22	papa10@papa.papa	740db824102006e4ef3eef0be5cb0c47fa7f22d030ad971d30be7e9ac0b9c951	papa10	Father	Dad	2023-06-25	f
23	papa11@papa.papa	2b74db2b39e9c48e5f9735a2216d9e8ccac18d8527b30e340aa4ebfb7aa0ee6b	papa11	Father	Dad	2023-06-25	f
1	asd@asd.asd	089542505d659cecbb988bb5ccff5bccf85be2dfa8c221359079aee2531298bb	asd	Carlos	Monzon	2023-02-15	f
\.


--
-- TOC entry 3409 (class 0 OID 16533)
-- Dependencies: 221
-- Data for Name: UsuarioConectadoUsuario; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UsuarioConectadoUsuario" (id_usuario1, id_usuario2, aceptada) FROM stdin;
1	14	t
1	15	t
1	16	t
16	18	t
15	21	t
16	21	t
\.


--
-- TOC entry 3410 (class 0 OID 16548)
-- Dependencies: 222
-- Data for Name: UsuarioHabilidades; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UsuarioHabilidades" (id_usuario, id_habilidad) FROM stdin;
12	2
12	1
13	2
13	1
14	2
14	1
15	2
15	1
16	2
16	1
17	2
17	1
18	2
18	1
19	2
19	1
20	2
20	1
21	2
21	1
22	2
22	1
23	2
23	1
1	1
1	2
1	3
1	4
1	5
1	6
1	7
\.


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 224
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 1, true);


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 225
-- Name: Categoria_codigo_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Categoria_codigo_seq"', 4, true);


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 226
-- Name: Habilidad_codigo_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Habilidad_codigo_seq"', 12, true);


--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 227
-- Name: Mensaje_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Mensaje_id_seq"', 3, true);


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 228
-- Name: Solicitud_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Solicitud_id_seq"', 8, true);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 223
-- Name: Usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Usuario_id_seq"', 23, true);


--
-- TOC entry 3234 (class 2606 OID 16408)
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- TOC entry 3238 (class 2606 OID 16418)
-- Name: Categoria Categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Categoria"
    ADD CONSTRAINT "Categoria_pkey" PRIMARY KEY (codigo);


--
-- TOC entry 3240 (class 2606 OID 16520)
-- Name: Mensaje Mensaje_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Mensaje"
    ADD CONSTRAINT "Mensaje_pkey" PRIMARY KEY (id) INCLUDE (id);


--
-- TOC entry 3244 (class 2606 OID 16522)
-- Name: SolicitudHabilidad SolicitudHabilidad_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolicitudHabilidad"
    ADD CONSTRAINT "SolicitudHabilidad_pkey" PRIMARY KEY (id_solicitud, codigo_habilidad);


--
-- TOC entry 3242 (class 2606 OID 16488)
-- Name: Solicitud Solicitud_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Solicitud"
    ADD CONSTRAINT "Solicitud_pkey" PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 16537)
-- Name: UsuarioConectadoUsuario UsuarioConectadoUsuario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioConectadoUsuario"
    ADD CONSTRAINT "UsuarioConectadoUsuario_pkey" PRIMARY KEY (id_usuario1, id_usuario2);


--
-- TOC entry 3248 (class 2606 OID 16552)
-- Name: UsuarioHabilidades UsuarioHabilidades_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioHabilidades"
    ADD CONSTRAINT "UsuarioHabilidades_pkey" PRIMARY KEY (id_habilidad, id_usuario);


--
-- TOC entry 3232 (class 2606 OID 16403)
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 16446)
-- Name: Habilidad habilidad_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Habilidad"
    ADD CONSTRAINT habilidad_pkey PRIMARY KEY (codigo);


--
-- TOC entry 3252 (class 2606 OID 16499)
-- Name: Solicitud Acepta_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Solicitud"
    ADD CONSTRAINT "Acepta_FK" FOREIGN KEY (id_acepta) REFERENCES public."Usuario"(id) NOT VALID;


--
-- TOC entry 3249 (class 2606 OID 16462)
-- Name: Habilidad Categoria; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Habilidad"
    ADD CONSTRAINT "Categoria" FOREIGN KEY (codigo_categoria) REFERENCES public."Categoria"(codigo) NOT VALID;


--
-- TOC entry 3253 (class 2606 OID 16494)
-- Name: Solicitud Creador_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Solicitud"
    ADD CONSTRAINT "Creador_FK" FOREIGN KEY (id_creador) REFERENCES public."Usuario"(id) NOT VALID;


--
-- TOC entry 3250 (class 2606 OID 16477)
-- Name: Mensaje Emisor_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Mensaje"
    ADD CONSTRAINT "Emisor_FK" FOREIGN KEY (id_emisor) REFERENCES public."Usuario"(id) NOT VALID;


--
-- TOC entry 3254 (class 2606 OID 16509)
-- Name: SolicitudHabilidad Habilidad; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolicitudHabilidad"
    ADD CONSTRAINT "Habilidad" FOREIGN KEY (codigo_habilidad) REFERENCES public."Habilidad"(codigo) NOT VALID;


--
-- TOC entry 3255 (class 2606 OID 16504)
-- Name: SolicitudHabilidad Solicitud; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SolicitudHabilidad"
    ADD CONSTRAINT "Solicitud" FOREIGN KEY (id_solicitud) REFERENCES public."Solicitud"(id) NOT VALID;


--
-- TOC entry 3251 (class 2606 OID 16489)
-- Name: Mensaje Solicitud_FK; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Mensaje"
    ADD CONSTRAINT "Solicitud_FK" FOREIGN KEY (solicitud_id) REFERENCES public."Solicitud"(id) NOT VALID;


--
-- TOC entry 3256 (class 2606 OID 16538)
-- Name: UsuarioConectadoUsuario UsuarioConectadoUsuario_id_usuario1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioConectadoUsuario"
    ADD CONSTRAINT "UsuarioConectadoUsuario_id_usuario1_fkey" FOREIGN KEY (id_usuario1) REFERENCES public."Usuario"(id);


--
-- TOC entry 3257 (class 2606 OID 16543)
-- Name: UsuarioConectadoUsuario UsuarioConectadoUsuario_id_usuario2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioConectadoUsuario"
    ADD CONSTRAINT "UsuarioConectadoUsuario_id_usuario2_fkey" FOREIGN KEY (id_usuario2) REFERENCES public."Usuario"(id);


--
-- TOC entry 3258 (class 2606 OID 16558)
-- Name: UsuarioHabilidades UsuarioHabilidades_id_habilidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioHabilidades"
    ADD CONSTRAINT "UsuarioHabilidades_id_habilidad_fkey" FOREIGN KEY (id_habilidad) REFERENCES public."Habilidad"(codigo);


--
-- TOC entry 3259 (class 2606 OID 16553)
-- Name: UsuarioHabilidades UsuarioHabilidades_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsuarioHabilidades"
    ADD CONSTRAINT "UsuarioHabilidades_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id);


-- Completed on 2023-06-26 14:28:19

--
-- PostgreSQL database dump complete
--

