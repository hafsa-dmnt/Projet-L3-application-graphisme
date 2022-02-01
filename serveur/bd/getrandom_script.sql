--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

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
-- Name: defi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.defi (
    defi_themeid integer NOT NULL,
    defi_paletteid integer NOT NULL,
    defi_date date NOT NULL
);



--
-- Name: palette; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.palette (
    palette_id integer NOT NULL,
    palette_nom character(255) DEFAULT ''::bpchar NOT NULL
);


--
-- Name: palette_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.palette_list (
    pl_id integer NOT NULL,
    pl_utilisateurpseudo char(30) NOT NULL,
    pl_nom character(255) NOT NULL,
    pl_icon character(255)
);



--
-- Name: publication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publication (
    publication_date date NOT NULL,
    publication_heure date NOT NULL,
    publication_id integer NOT NULL,
    publication_utilisateurpseudo char(30) NOT NULL,
    publication_theme character(255) NOT NULL,
    publication_datedefi date NOT NULL,
    publication_image character(255) NOT NULL
);


--
-- Name: publication_publication_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publication_publication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: publication_publication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publication_publication_id_seq OWNED BY public.publication.publication_id;


--
-- Name: theme; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.theme (
    theme_id integer NOT NULL,
    theme_nom character(30) DEFAULT ''::bpchar NOT NULL
);


--
-- Name: theme_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.theme_list (
    pl_id integer NOT NULL,
    tl_utilisateurpseudo char(30) NOT NULL,
    tl_nom character(255) NOT NULL,
    tl_icon character(255),
    tl_
);


--
-- Name: theme_theme_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.theme_theme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: theme_theme_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.theme_theme_id_seq OWNED BY public.theme.theme_id;


--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    utilisateur_pseudo character(30) NOT NULL,
    utilisateur_admin boolean,
    utilisateur_email character(100) NOT NULL,
    utilisateur_mdp character(100) NOT NULL,
    utilisateur_pdp character(100) NOT NULL,
    utilisateur_bio character(500) DEFAULT 'voici ma bio.'::bpchar NOT NULL
);

--
-- Name: publication publication_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication ALTER COLUMN publication_id SET DEFAULT nextval('public.publication_publication_id_seq'::regclass);


--
-- Name: theme theme_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theme ALTER COLUMN theme_id SET DEFAULT nextval('public.theme_theme_id_seq'::regclass);


--
-- Data for Name: defi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.defi (defi_themeid, defi_paletteid, defi_date) FROM stdin;
\.


--
-- Data for Name: palette; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.palette (palette_id, palette_nom) FROM stdin;
1	#7E4F03,#12EC73,#988208,#1E1499,#A3981B                                                                                                                                                                                                                        
2	#58D1D5,#8EFE2A,#C52356,#E04375,#0973A7,#3A94CA                                                                                                                                                                                                                
3	#6CAC07,#8EC5E5,#A7FA2A,#C43054                                                                                                                                                                                                                                
4	#8147D3,#B16785,#DE87B1,#F8B6E1                                                                                                                                                                                                                                
5	#DB0D4D,#10285E,#3A3C71,#705072,#8E738A,#B494BC                                                                                                                                                                                                                
6	#6AAA9A,#A0D304,#C5F21F,#E62351                                                                                                                                                                                                                                
7	#3C0442,#722245,#A64C7C,#C9608A,#F57FAE,#1AAFC9                                                                                                                                                                                                                
8	#969533,#CCCCEA,#EAEE15,#120D35,#432257,#5C466E                                                                                                                                                                                                                
9	#2E436A,#645782,#8E80B4,#C3B7E8                                                                                                                                                                                                                                
\.


--
-- Data for Name: palette_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.palette_list (pl_id, pl_utilisateurpseudo, pl_nom) FROM stdin;
1	user1	1                                                                                                                                                                                                                                                              
2	user1	2                                                                                                                                                                                                                                                              
3	user1	3                                                                                                                                                                                                                                                              
4	user1	4                                                                                                                                                                                                                                                              
5	user3	1                                                                                                                                                                                                                                                              
6	user3	3                                                                                                                                                                                                                                                              
7	user3	4                                                                                                                                                                                                                                                              
8	user4	2                                                                                                                                                                                                                                                              
9	user4	1                                                                                                                                                                                                                                                              
10	user5	1                                                                                                                                                                                                                                                              
11	user5	2                                                                                                                                                                                                                                                              
\.


--
-- Data for Name: publication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publication (publication_date, publication_id, publication_utilisateurpseudo, publication_theme, publication_datedefi, publication_image) FROM stdin;
\.


--
-- Data for Name: theme; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.theme (theme_id, theme_nom) FROM stdin;
1	carte                         
2	robe                          
3	foret                         
4	cadenas                       
5	steampunk                     
6	robot                         
7	toxic                         
8	poison                        
9	vase                          
10	animaux                       
11	lac                           
12	coussin                       
13	cour                          
14	linge                         
15	jardin abandonné              
16	créature                      
17	vampire                       
18	arbre                         
19	lit                           
20	magie                         
21	organe                        
22	balançoire                    
23	route                         
24	fenêtre                       
25	alcool                        
26	parc                          
27	pull                          
28	Dans la mer                   
29	oiseaux                       
30	plante carnivore              
31	parking                       
32	pirate                        
33	herbier                       
34	porte                         
35	casserole                     
36	ordinateur                    
37	chaise                        
38	zibeline                      
39	drogue                        
40	café                          
41	main                          
42	miroir                        
43	ange                          
44	espace                        
45	bulle                         
46	pantalon                      
47	corps                         
48	fleur                         
49	maison                        
50	électronique                  
51	nature                        
52	liberté                       
53	chemin                        
54	réparation                    
55	bois                          
56	matériel                      
57	musique                       
58	ancien                        
59	trésor                        
60	antique                       
61	mouvement                     
62	statique                      
63	fin du monde                  
64	joie                          
65	tristesse                     
66	colère                        
67	enthousiasme                  
68	mélancolie                    
69	résilience                    
70	urbain                        
71	cartoon                       
72	réaliste                      
\.


--
-- Data for Name: theme_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.theme_list (tl_id, tl_utilisateurpseudo, tl_nom) FROM stdin;
1	user1	peinture               
2	user2	peinture       
3	user3	peinture      
4	user4	vent          
5	user5	vent          
6	user6	listerandom   
7	user3	jesuisuneliste
8	user3	jsuisuneliste 
9	user2	jsuisuneliste 
10	user1	jsuisuneliste 
11	user1	jsuisuneliste2
12	user1	jsuisuneliste3
13	user1	jsuisuneliste4
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (utilisateur_pseudo, utilisateur_admin, utilisateur_email, utilisateur_mdp, utilisateur_pdp, utilisateur_bio) FROM stdin;
user1	t	user1@gmail.com	user1	../images/defaultpicture.jpg	1
user2	f	user2@gmail.com	user2	../images/defaultpicture.jpg	2
user3	f	user3@gmail.com	user3	../images/defaultpicture.jpg	3
user4	f	user4@gmail.com	user4	../images/defaultpicture.jpg	4
user5	f	user5@gmail.com	user5	../images/defaultpicture.jpg	5
user6	f	user6@gmail.com	user6	../images/defaultpicture.jpg	6
user7	f	user7@gmail.com	user7	../images/defaultpicture.jpg	7
user8	f	user8@gmail.com	user8	../images/defaultpicture.jpg	8
user9	f	user9@gmail.com	user9	../images/defaultpicture.jpg	9
\.

--
-- Name: publication_publication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publication_publication_id_seq', 1, false);


--
-- Name: theme_theme_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.theme_theme_id_seq', 1, false);


--
-- Name: defi defi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defi
    ADD CONSTRAINT defi_pkey PRIMARY KEY (defi_date);


--
-- Name: palette_list palette_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.palette_list
    ADD CONSTRAINT palette_list_pkey PRIMARY KEY (pl_nom, pl_utilisateurpseudo);


--
-- Name: palette palette_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.palette
    ADD CONSTRAINT palette_pkey PRIMARY KEY (palette_id);


--
-- Name: publication publication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT publication_pkey PRIMARY KEY (publication_id);


--
-- Name: theme_list theme_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theme_list
    ADD CONSTRAINT theme_list_pkey PRIMARY KEY (tl_utilisateurpseudo, tl_nom);


--
-- Name: theme theme_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (theme_id);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (utilisateur_pseudo);


--
-- Name: defi defi_defi_paletteid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defi
    ADD CONSTRAINT defi_defi_paletteid_fkey FOREIGN KEY (defi_paletteid) REFERENCES public.palette(palette_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: defi defi_defi_themeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defi
    ADD CONSTRAINT defi_defi_themeid_fkey FOREIGN KEY (defi_themeid) REFERENCES public.theme(theme_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: palette_list palette_list_pl_paletteid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--


ALTER TABLE ONLY public.palette_list
    ADD CONSTRAINT palette_list_pl_paletteid_fkey FOREIGN KEY (pl_paletteid) REFERENCES public.palette(palette_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: palette_list palette_list_pl_utilisateurpseudo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.palette_list
    ADD CONSTRAINT palette_list_pl_utilisateurpseudo_fkey FOREIGN KEY (pl_utilisateurpseudo) REFERENCES public.utilisateur(utilisateur_pseudo) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: publication publication_publication_datedefi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT publication_publication_datedefi_fkey FOREIGN KEY (publication_datedefi) REFERENCES public.defi(defi_date) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: publication publication_publication_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT publication_publication_utilisateurpseudo_fkey FOREIGN KEY (publication_utilisateurpseudo) REFERENCES public.utilisateur(utilisateur_pseudo) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: theme_list theme_list_tl_utilisateurpseudo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theme_list
    ADD CONSTRAINT theme_list_tl_utilisateurpseudo_fkey FOREIGN KEY (tl_utilisateurpseudo) REFERENCES public.utilisateur(utilisateur_pseudo) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

