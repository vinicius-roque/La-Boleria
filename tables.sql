--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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
-- Name: cakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cakes (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    price numeric(8,2) NOT NULL,
    image character varying(255) NOT NULL,
    description text NOT NULL
);


--
-- Name: cakes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cakes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cakes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cakes_id_seq OWNED BY public.cakes.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    address character varying(100) NOT NULL,
    phone character varying(20) NOT NULL
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer,
    "cakeId" integer,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "totalPrice" numeric(8,2) NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: cakes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes ALTER COLUMN id SET DEFAULT nextval('public.cakes_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: cakes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cakes VALUES (1, 'Bolo de pote', 13.00, 'https://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (2, 'oi', 13.00, 'https://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (3, 'ogdg', 13.00, 'https://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (4, 'Bolo gostoso', 12.00, 'https://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (5, 'Bolo de pote sem morango', 13.00, 'https://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');
INSERT INTO public.cakes VALUES (6, 'Bolo de pote sem jibgg', 13.00, 'https://encurtador.com.br/iDIX0', '');
INSERT INTO public.cakes VALUES (7, 'Bolo de pote sem pote', 13.00, 'https://encurtador.com.br/iDIX0', '1234');
INSERT INTO public.cakes VALUES (8, 'Bolo de pote sem bolo', 13.00, 'https://encurtador.com.br/iDIX0', '12');
INSERT INTO public.cakes VALUES (9, 'Bolo de pote sem ', 13.00, 'https://encurtador.com.br/iDIX0', '12');
INSERT INTO public.cakes VALUES (10, 'Bolo de pote semrgdfg ', 13.00, 'https://encurtador.com.br/iDIX0', '12');
INSERT INTO public.cakes VALUES (11, 'Bolo de pote sffz', 13.00, 'https://encurtador.com.br/iDIX0', '');
INSERT INTO public.cakes VALUES (12, 'Bolo de potinho', 13.00, 'https://encurtador.com.br/iDIX0', 'Bolo de chocolate com recheio de leite ninho');


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES (1, 'Fulana', 'Rua tal', '2199999999');
INSERT INTO public.clients VALUES (2, 'Jeisy', 'Rua E', '1111111111');
INSERT INTO public.clients VALUES (3, 'Viníciu', 'Rua vovo juju', '1234567890');
INSERT INTO public.clients VALUES (4, 'Vinícius Roque', 'Rua vovo juju', '1234567890');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES (18, 1, 1, 2, '2022-10-26 10:10:12.645088', 26.00);
INSERT INTO public.orders VALUES (19, 2, 4, 2, '2022-10-26 10:10:19.805773', 26.00);
INSERT INTO public.orders VALUES (20, 2, 5, 3, '2022-10-26 10:10:35.571243', 16.00);
INSERT INTO public.orders VALUES (21, 1, 7, 4, '2022-10-26 10:10:52.180378', 46.00);
INSERT INTO public.orders VALUES (22, 3, 8, 1, '2022-10-26 11:13:14.440163', 10.00);
INSERT INTO public.orders VALUES (23, 2, 8, 1, '2022-10-26 11:13:25.186378', 10.00);


--
-- Name: cakes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cakes_id_seq', 12, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 4, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 23, true);


--
-- Name: cakes cakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes
    ADD CONSTRAINT cakes_pkey PRIMARY KEY (id);


--
-- Name: clients clients_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_name_key UNIQUE (name);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: orders orders_cakeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES public.cakes(id);


--
-- Name: orders orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- PostgreSQL database dump complete
--

