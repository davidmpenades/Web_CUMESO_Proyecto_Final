-- Crear la base de datos
CREATE DATABASE cumeso;

-- Conectarse a la base de datos cumeso
\c cumeso;

-- Crear un usuario y asignarle privilegios
-- CREATE USER david WITH PASSWORD '1234';
ALTER ROLE david SET client_encoding TO 'utf8';
ALTER ROLE david SET default_transaction_isolation TO 'read committed';
ALTER ROLE david SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE cumeso TO david;--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-1.pgdg120+2)
-- Dumped by pg_dump version 15.6 (Debian 15.6-0+deb12u1)

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
-- Name: auth_group; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO david;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO david;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO david;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO david;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO david;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO david;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO david;

--
-- Name: machine_machine; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.machine_machine (
    id bigint NOT NULL,
    slug character varying(200) NOT NULL,
    name character varying(150) NOT NULL,
    description character varying(300),
    characteristics character varying(100)[],
    price numeric(15,2),
    visibility boolean NOT NULL,
    img character varying(100),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.machine_machine OWNER TO david;

--
-- Name: machine_machine_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.machine_machine ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.machine_machine_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: machine_machineuserrelation; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.machine_machineuserrelation (
    id bigint NOT NULL,
    machine_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.machine_machineuserrelation OWNER TO david;

--
-- Name: machine_machineuserrelation_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.machine_machineuserrelation ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.machine_machineuserrelation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: part_part; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.part_part (
    id bigint NOT NULL,
    slug character varying(200),
    name character varying(100) NOT NULL,
    description character varying(100),
    quantity integer NOT NULL,
    price numeric(15,2),
    img character varying(100),
    cad_file character varying(100),
    pdf_file character varying(100),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.part_part OWNER TO david;

--
-- Name: part_part_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.part_part ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.part_part_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: part_partmachinerelation; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.part_partmachinerelation (
    id bigint NOT NULL,
    machine_id bigint NOT NULL,
    part_id bigint NOT NULL
);


ALTER TABLE public.part_partmachinerelation OWNER TO david;

--
-- Name: part_partmachinerelation_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.part_partmachinerelation ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.part_partmachinerelation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_users; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.users_users (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    uuid character varying(36) NOT NULL,
    username character varying(30) NOT NULL,
    email character varying(254) NOT NULL,
    company character varying(100),
    type character varying(10) NOT NULL
);


ALTER TABLE public.users_users OWNER TO david;

--
-- Name: users_users_groups; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.users_users_groups (
    id bigint NOT NULL,
    users_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.users_users_groups OWNER TO david;

--
-- Name: users_users_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.users_users_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_users_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_users_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.users_users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_users_user_permissions; Type: TABLE; Schema: public; Owner: david
--

CREATE TABLE public.users_users_user_permissions (
    id bigint NOT NULL,
    users_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.users_users_user_permissions OWNER TO david;

--
-- Name: users_users_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

ALTER TABLE public.users_users_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_users_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add users	6	add_users
22	Can change users	6	change_users
23	Can delete users	6	delete_users
24	Can view users	6	view_users
25	Can add machine	7	add_machine
26	Can change machine	7	change_machine
27	Can delete machine	7	delete_machine
28	Can view machine	7	view_machine
29	Can add machine user relation	8	add_machineuserrelation
30	Can change machine user relation	8	change_machineuserrelation
31	Can delete machine user relation	8	delete_machineuserrelation
32	Can view machine user relation	8	view_machineuserrelation
33	Can add part	9	add_part
34	Can change part	9	change_part
35	Can delete part	9	delete_part
36	Can view part	9	view_part
37	Can add part machine relation	10	add_partmachinerelation
38	Can change part machine relation	10	change_partmachinerelation
39	Can delete part machine relation	10	delete_partmachinerelation
40	Can view part machine relation	10	view_partmachinerelation
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	users	users
7	machine	machine
8	machine	machineuserrelation
9	part	part
10	part	partmachinerelation
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-03-03 20:16:34.097265+00
2	contenttypes	0002_remove_content_type_name	2024-03-03 20:16:34.111128+00
3	auth	0001_initial	2024-03-03 20:16:34.284268+00
4	auth	0002_alter_permission_name_max_length	2024-03-03 20:16:34.296381+00
5	auth	0003_alter_user_email_max_length	2024-03-03 20:16:34.311836+00
6	auth	0004_alter_user_username_opts	2024-03-03 20:16:34.325714+00
7	auth	0005_alter_user_last_login_null	2024-03-03 20:16:34.339033+00
8	auth	0006_require_contenttypes_0002	2024-03-03 20:16:34.344941+00
9	auth	0007_alter_validators_add_error_messages	2024-03-03 20:16:34.35757+00
10	auth	0008_alter_user_username_max_length	2024-03-03 20:16:34.373218+00
11	auth	0009_alter_user_last_name_max_length	2024-03-03 20:16:34.396039+00
12	auth	0010_alter_group_name_max_length	2024-03-03 20:16:34.407554+00
13	auth	0011_update_proxy_permissions	2024-03-03 20:16:34.420672+00
14	auth	0012_alter_user_first_name_max_length	2024-03-03 20:16:34.433055+00
15	users	0001_initial	2024-03-03 20:16:34.612162+00
16	admin	0001_initial	2024-03-03 20:16:34.676834+00
17	admin	0002_logentry_remove_auto_add	2024-03-03 20:16:34.68906+00
18	admin	0003_logentry_add_action_flag_choices	2024-03-03 20:16:34.703513+00
19	machine	0001_initial	2024-03-03 20:16:34.786109+00
20	part	0001_initial	2024-03-03 20:16:34.887721+00
21	machine	0002_initial	2024-03-03 20:16:34.924765+00
22	machine	0003_initial	2024-03-03 20:16:34.997534+00
23	sessions	0001_initial	2024-03-03 20:16:35.044262+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: machine_machine; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.machine_machine (id, slug, name, description, characteristics, price, visibility, img, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: machine_machineuserrelation; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.machine_machineuserrelation (id, machine_id, user_id) FROM stdin;
\.


--
-- Data for Name: part_part; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.part_part (id, slug, name, description, quantity, price, img, cad_file, pdf_file, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: part_partmachinerelation; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.part_partmachinerelation (id, machine_id, part_id) FROM stdin;
\.


--
-- Data for Name: users_users; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.users_users (id, password, last_login, is_superuser, uuid, username, email, company, type) FROM stdin;
\.


--
-- Data for Name: users_users_groups; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.users_users_groups (id, users_id, group_id) FROM stdin;
\.


--
-- Data for Name: users_users_user_permissions; Type: TABLE DATA; Schema: public; Owner: david
--

COPY public.users_users_user_permissions (id, users_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 40, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 10, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 23, true);


--
-- Name: machine_machine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.machine_machine_id_seq', 1, false);


--
-- Name: machine_machineuserrelation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.machine_machineuserrelation_id_seq', 1, false);


--
-- Name: part_part_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.part_part_id_seq', 1, false);


--
-- Name: part_partmachinerelation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.part_partmachinerelation_id_seq', 1, false);


--
-- Name: users_users_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.users_users_groups_id_seq', 1, false);


--
-- Name: users_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.users_users_id_seq', 1, false);


--
-- Name: users_users_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: david
--

SELECT pg_catalog.setval('public.users_users_user_permissions_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: machine_machine machine_machine_name_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.machine_machine
    ADD CONSTRAINT machine_machine_name_key UNIQUE (name);


--
-- Name: machine_machine machine_machine_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.machine_machine
    ADD CONSTRAINT machine_machine_pkey PRIMARY KEY (id);


--
-- Name: machine_machine machine_machine_slug_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.machine_machine
    ADD CONSTRAINT machine_machine_slug_key UNIQUE (slug);


--
-- Name: machine_machineuserrelation machine_machineuserrelation_machine_id_user_id_b973ef3c_uniq; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.machine_machineuserrelation
    ADD CONSTRAINT machine_machineuserrelation_machine_id_user_id_b973ef3c_uniq UNIQUE (machine_id, user_id);


--
-- Name: machine_machineuserrelation machine_machineuserrelation_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.machine_machineuserrelation
    ADD CONSTRAINT machine_machineuserrelation_pkey PRIMARY KEY (id);


--
-- Name: part_part part_part_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.part_part
    ADD CONSTRAINT part_part_pkey PRIMARY KEY (id);


--
-- Name: part_part part_part_slug_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.part_part
    ADD CONSTRAINT part_part_slug_key UNIQUE (slug);


--
-- Name: part_partmachinerelation part_partmachinerelation_part_id_machine_id_5b7fb70b_uniq; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.part_partmachinerelation
    ADD CONSTRAINT part_partmachinerelation_part_id_machine_id_5b7fb70b_uniq UNIQUE (part_id, machine_id);


--
-- Name: part_partmachinerelation part_partmachinerelation_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.part_partmachinerelation
    ADD CONSTRAINT part_partmachinerelation_pkey PRIMARY KEY (id);


--
-- Name: users_users users_users_email_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users
    ADD CONSTRAINT users_users_email_key UNIQUE (email);


--
-- Name: users_users_groups users_users_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_groups
    ADD CONSTRAINT users_users_groups_pkey PRIMARY KEY (id);


--
-- Name: users_users_groups users_users_groups_users_id_group_id_02603a5e_uniq; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_groups
    ADD CONSTRAINT users_users_groups_users_id_group_id_02603a5e_uniq UNIQUE (users_id, group_id);


--
-- Name: users_users users_users_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users
    ADD CONSTRAINT users_users_pkey PRIMARY KEY (id);


--
-- Name: users_users_user_permissions users_users_user_permiss_users_id_permission_id_119659d5_uniq; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_user_permissions
    ADD CONSTRAINT users_users_user_permiss_users_id_permission_id_119659d5_uniq UNIQUE (users_id, permission_id);


--
-- Name: users_users_user_permissions users_users_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_user_permissions
    ADD CONSTRAINT users_users_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: users_users users_users_username_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users
    ADD CONSTRAINT users_users_username_key UNIQUE (username);


--
-- Name: users_users users_users_uuid_key; Type: CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users
    ADD CONSTRAINT users_users_uuid_key UNIQUE (uuid);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: machine_machine_name_364e8c6e_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX machine_machine_name_364e8c6e_like ON public.machine_machine USING btree (name varchar_pattern_ops);


--
-- Name: machine_machine_slug_1ef5f546_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX machine_machine_slug_1ef5f546_like ON public.machine_machine USING btree (slug varchar_pattern_ops);


--
-- Name: machine_machineuserrelation_machine_id_b4be6773; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX machine_machineuserrelation_machine_id_b4be6773 ON public.machine_machineuserrelation USING btree (machine_id);


--
-- Name: machine_machineuserrelation_user_id_ab96c5f0; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX machine_machineuserrelation_user_id_ab96c5f0 ON public.machine_machineuserrelation USING btree (user_id);


--
-- Name: part_part_slug_62ce7ce2_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX part_part_slug_62ce7ce2_like ON public.part_part USING btree (slug varchar_pattern_ops);


--
-- Name: part_partmachinerelation_machine_id_07ab4cb3; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX part_partmachinerelation_machine_id_07ab4cb3 ON public.part_partmachinerelation USING btree (machine_id);


--
-- Name: part_partmachinerelation_part_id_fed504d3; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX part_partmachinerelation_part_id_fed504d3 ON public.part_partmachinerelation USING btree (part_id);


--
-- Name: users_users_email_3f54f4c5_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX users_users_email_3f54f4c5_like ON public.users_users USING btree (email varchar_pattern_ops);


--
-- Name: users_users_groups_group_id_3e15ff0f; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX users_users_groups_group_id_3e15ff0f ON public.users_users_groups USING btree (group_id);


--
-- Name: users_users_groups_users_id_5572cf36; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX users_users_groups_users_id_5572cf36 ON public.users_users_groups USING btree (users_id);


--
-- Name: users_users_user_permissions_permission_id_9a117d64; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX users_users_user_permissions_permission_id_9a117d64 ON public.users_users_user_permissions USING btree (permission_id);


--
-- Name: users_users_user_permissions_users_id_04010ba6; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX users_users_user_permissions_users_id_04010ba6 ON public.users_users_user_permissions USING btree (users_id);


--
-- Name: users_users_username_9113b4c1_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX users_users_username_9113b4c1_like ON public.users_users USING btree (username varchar_pattern_ops);


--
-- Name: users_users_uuid_1a668d96_like; Type: INDEX; Schema: public; Owner: david
--

CREATE INDEX users_users_uuid_1a668d96_like ON public.users_users USING btree (uuid varchar_pattern_ops);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_users_users_id; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_users_id FOREIGN KEY (user_id) REFERENCES public.users_users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: machine_machineuserrelation machine_machineuserr_machine_id_b4be6773_fk_machine_m; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.machine_machineuserrelation
    ADD CONSTRAINT machine_machineuserr_machine_id_b4be6773_fk_machine_m FOREIGN KEY (machine_id) REFERENCES public.machine_machine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: machine_machineuserrelation machine_machineuserrelation_user_id_ab96c5f0_fk_users_users_id; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.machine_machineuserrelation
    ADD CONSTRAINT machine_machineuserrelation_user_id_ab96c5f0_fk_users_users_id FOREIGN KEY (user_id) REFERENCES public.users_users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: part_partmachinerelation part_partmachinerela_machine_id_07ab4cb3_fk_machine_m; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.part_partmachinerelation
    ADD CONSTRAINT part_partmachinerela_machine_id_07ab4cb3_fk_machine_m FOREIGN KEY (machine_id) REFERENCES public.machine_machine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: part_partmachinerelation part_partmachinerelation_part_id_fed504d3_fk_part_part_id; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.part_partmachinerelation
    ADD CONSTRAINT part_partmachinerelation_part_id_fed504d3_fk_part_part_id FOREIGN KEY (part_id) REFERENCES public.part_part(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_users_groups users_users_groups_group_id_3e15ff0f_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_groups
    ADD CONSTRAINT users_users_groups_group_id_3e15ff0f_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_users_groups users_users_groups_users_id_5572cf36_fk_users_users_id; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_groups
    ADD CONSTRAINT users_users_groups_users_id_5572cf36_fk_users_users_id FOREIGN KEY (users_id) REFERENCES public.users_users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_users_user_permissions users_users_user_per_permission_id_9a117d64_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_user_permissions
    ADD CONSTRAINT users_users_user_per_permission_id_9a117d64_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_users_user_permissions users_users_user_per_users_id_04010ba6_fk_users_use; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY public.users_users_user_permissions
    ADD CONSTRAINT users_users_user_per_users_id_04010ba6_fk_users_use FOREIGN KEY (users_id) REFERENCES public.users_users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

