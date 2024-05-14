--
-- PostgreSQL database dump
--

-- Dumped from database version 11.16 (Debian 11.16-1.pgdg90+1)
-- Dumped by pg_dump version 14.11 (Homebrew)

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: job_offer_experiencelevel_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.job_offer_experiencelevel_enum AS ENUM (
    'INTERNSHIP',
    'ENTRY_LEVEL',
    'ASSOCIATE',
    'JUNIOR',
    'MID',
    'MID_SENIOR',
    'SENIOR',
    'DIRECTOR',
    'EXECUTIVE'
);


ALTER TYPE public.job_offer_experiencelevel_enum OWNER TO admin;

--
-- Name: job_offer_jobtype_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.job_offer_jobtype_enum AS ENUM (
    'FULL_TIME',
    'PART_TIME',
    'CONTRACT'
);


ALTER TYPE public.job_offer_jobtype_enum OWNER TO admin;

--
-- Name: job_offer_remote_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.job_offer_remote_enum AS ENUM (
    'REMOTE',
    'ON_SITE',
    'HYBRID'
);


ALTER TYPE public.job_offer_remote_enum OWNER TO admin;

--
-- Name: question_codelanguage_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.question_codelanguage_enum AS ENUM (
    'python',
    'javascript'
);


ALTER TYPE public.question_codelanguage_enum OWNER TO admin;

--
-- Name: question_questiontype_enum; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.question_questiontype_enum AS ENUM (
    'MCQ',
    'CODE',
    'OPEN'
);


ALTER TYPE public.question_questiontype_enum OWNER TO admin;

SET default_tablespace = '';

--
-- Name: api_data; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.api_data (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    endpoint character varying NOT NULL,
    method character varying NOT NULL,
    status integer NOT NULL,
    request_body jsonb,
    response_body jsonb,
    ip character varying,
    headers jsonb,
    call_api boolean,
    error character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.api_data OWNER TO admin;

--
-- Name: applicant; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.applicant (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    email character varying NOT NULL,
    phone_number character varying NOT NULL,
    country character varying NOT NULL,
    about text NOT NULL,
    city character varying NOT NULL,
    applied boolean DEFAULT false NOT NULL,
    "jobOfferId" uuid NOT NULL,
    apply_date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.applicant OWNER TO admin;

--
-- Name: applicant_answer; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.applicant_answer (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "codeOutput" text,
    "answerText" text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    applicant_id uuid,
    "questionId" uuid
);


ALTER TABLE public.applicant_answer OWNER TO admin;

--
-- Name: applicant_answer_choices; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.applicant_answer_choices (
    answer_id uuid NOT NULL,
    choice_id uuid NOT NULL
);


ALTER TABLE public.applicant_answer_choices OWNER TO admin;

--
-- Name: data_reset; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.data_reset (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id character varying NOT NULL,
    reset_password_expires timestamp with time zone DEFAULT now(),
    reseted boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.data_reset OWNER TO admin;

--
-- Name: job_offer; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.job_offer (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description text NOT NULL,
    country character varying NOT NULL,
    city character varying NOT NULL,
    "jobType" public.job_offer_jobtype_enum DEFAULT 'FULL_TIME'::public.job_offer_jobtype_enum NOT NULL,
    remote public.job_offer_remote_enum DEFAULT 'ON_SITE'::public.job_offer_remote_enum NOT NULL,
    "experienceLevel" public.job_offer_experiencelevel_enum DEFAULT 'MID'::public.job_offer_experiencelevel_enum NOT NULL,
    role character varying NOT NULL,
    benefits text NOT NULL,
    commitments text NOT NULL,
    "userId" uuid NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.job_offer OWNER TO admin;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: question; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.question (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "questionText" text NOT NULL,
    "questionType" public.question_questiontype_enum DEFAULT 'MCQ'::public.question_questiontype_enum NOT NULL,
    "codeLanguage" public.question_codelanguage_enum,
    "isActive" boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "quizId" uuid
);


ALTER TABLE public.question OWNER TO admin;

--
-- Name: question_choice; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.question_choice (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "choiceText" text NOT NULL,
    "isCorrect" boolean DEFAULT false NOT NULL,
    "questionId" uuid
);


ALTER TABLE public.question_choice OWNER TO admin;

--
-- Name: quiz; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.quiz (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "jobOfferId" uuid
);


ALTER TABLE public.quiz OWNER TO admin;

--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    verification_expires timestamp with time zone DEFAULT now(),
    password character varying NOT NULL,
    phone_number character varying,
    name character varying,
    country character varying,
    about text,
    city character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: applicant; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.applicant (id, name, surname, email, phone_number, country, about, city, applied, "jobOfferId", apply_date) FROM stdin;
37bf265d-c4ed-46a5-9f9e-eb51cf6155ea	Monika	Petrulevic	petrulevicmonika@gmail.com	868238136	Lithuania	Briefly about me	Vilnius	t	e27995c3-1c78-4371-b85d-7c16dd25ae1b	2024-05-02 19:49:49.430617+00
8d2e9f2e-4b9e-4d30-a0bd-8a3b2960e15e	Monika	Petrulevic	petrulevicmonika@gmail.com	868238136	Austria	I am writing to express my interest in the Mobile Developer position at [Company Name], as advertised on your careers page. With a robust background in mobile application development and a passion for crafting user-centric solutions, I am excited about the opportunity to contribute to your innovative team that is known for pushing the boundaries of mobile technology.\n\nDuring my tenure at [Previous Company Name], I spearheaded a project where I developed a cross-platform application using React Native, which improved user engagement by 30% within the first three months post-launch. This experience honed my skills in efficient cross-platform development and deepened my understanding of user experience design. My commitment to excellence in software development is complemented by my proficiency in multiple programming languages, including Swift, Kotlin, and JavaScript, ensuring that I can adapt to and thrive in diverse development environments.\n\nWhat excites me most about the opportunity at [Company Name] is your commitment to leveraging mobile technology to solve real-world problems. I am particularly impressed by [mention any specific project or initiative by the company], and I am eager to bring my expertise in mobile architecture and performance optimization to contribute to such impactful projects.\n\nI am also a strong advocate for continuous learning and improvement, values that I see reflected in [Company Name]'s culture. I regularly engage in professional development sessions and have recently completed a course on advanced application security to ensure that my development practices not only deliver superior functionality but also protect user data against emerging threats.\n\nI am looking forward to the possibility of discussing how my background, skills, and enthusiasms align with the goals of [Company Name]. I am available for an interview at your earliest convenience and can be reached by telephone at [Your Phone Number] or via email at [Your Email Address]. Thank you for considering my application. I am excited about the possibility of contributing to your team and am eager to bring my passion for mobile development to [Company Name].	Achenkirch	t	00d6a11b-883f-4c25-a890-cb339f94499d	2024-05-06 20:28:22.54595+00
4027fa82-3ded-41a1-b896-df6e818146f3	Monika	Petrulevic	petrulevicmonika@gmail.com	868238136	Antigua And Barbuda	I am very very very motivated student	Potters Village	f	59bfd50e-0961-44c3-9bbf-b6e83171aae1	2024-05-06 20:35:57.784723+00
5e0c4a2c-28bd-48d2-8dd4-868e636f7594	Ramūnas	Yla	ramunasyla@gmail.com	+37067313544	Lithuania	Test	Vilnius	t	00d6a11b-883f-4c25-a890-cb339f94499d	2024-05-07 08:02:29.72174+00
28e12723-c76d-48bf-9ef5-494e29462c7b	Erika	Mikalajūnaitė	mikalajunaiteerika@gmail.com	865854843	Lithuania	I'm a suitable candidate	Elektrėnai	t	e27995c3-1c78-4371-b85d-7c16dd25ae1b	2024-05-08 15:23:55.426668+00
0cba3639-9eb0-485f-a3de-2ec556d218f5	Erika	Mikalajūnaitė	mikalajunaiteerika@gmail.com	865854843	Andorra	im great	Ordino	t	59bfd50e-0961-44c3-9bbf-b6e83171aae1	2024-05-08 15:25:56.986116+00
ae197ce2-6b0a-4231-b4c1-3583bdff05ad	Gabrielė	Plepytė	gabriele.plepyte@stud.vilniustech.lt	+37068126987	Lithuania	I am responsible	Vilnius	t	59bfd50e-0961-44c3-9bbf-b6e83171aae1	2024-05-08 15:31:01.256986+00
4b6a9f36-ab96-4675-8cca-2ed5acf13af8	Monika	Petrulevic	petrulevicmonika@gmail.com	868238136	Albania	I am the best candidate	Bashkia Bulqizë	f	c616f557-43b3-4457-a9f0-77f0c5d521b7	2024-05-08 15:44:02.912545+00
181f5fa2-fa21-4002-80b4-c82bb6a01845	Monika	Petrulevic	monika.petrulevic@stud.vilniustech.lt	8683333333	Andorra	I am responsible and motivated	Encamp	f	59bfd50e-0961-44c3-9bbf-b6e83171aae1	2024-05-08 15:46:51.046497+00
3beb2fa8-8522-4a09-ad1a-f14aae1ab86f	Monika	Petrulevic	monika.petrulevic@stud.vilniustech.lt	868238144	Albania	I am motivated student	Bashkia Bulqizë	f	00d6a11b-883f-4c25-a890-cb339f94499d	2024-05-08 15:49:02.63378+00
f03e2ab3-3284-4d80-9276-339df1408584	Ponas	Makaronas	Makaronas@gmail.com	+37064813548	Brazil	Sveiki, noriu darbo	São Paulo	f	c616f557-43b3-4457-a9f0-77f0c5d521b7	2024-05-08 16:23:15.579071+00
\.


--
-- Data for Name: applicant_answer; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.applicant_answer (id, "codeOutput", "answerText", created_at, applicant_id, "questionId") FROM stdin;
31597ef0-6b1d-4883-89d1-142ded3e4e34	5\n	function fibonacci(n) {\n   return n < 1 ? 0\n        : n <= 2 ? 1\n        : fibonacci(n - 1) + fibonacci(n - 2)\n}\n\nconsole.log(fibonacci(5))	2024-05-02 19:50:59.680803+00	37bf265d-c4ed-46a5-9f9e-eb51cf6155ea	f8e14457-cfa7-4574-925e-bb51a47fa0a4
228295de-2ed5-4673-b8eb-08c955563f99	\N	\N	2024-05-02 19:50:59.680803+00	37bf265d-c4ed-46a5-9f9e-eb51cf6155ea	8431f51c-5e74-4274-811e-21833d1ef328
a2ad4421-fed0-4a17-a943-22963f948873	\N	4 cups a day	2024-05-02 19:50:59.680803+00	37bf265d-c4ed-46a5-9f9e-eb51cf6155ea	fdc1aa66-a0b8-42d1-925c-bff52fe8fbf0
603049bf-fe57-4b8a-a9e4-5ed487849981	\N	no	2024-05-02 19:50:59.680803+00	37bf265d-c4ed-46a5-9f9e-eb51cf6155ea	5afa312a-a61a-4f32-8a9e-8d4cd9113f29
1cddd6d0-cd91-40f1-826b-e0cf1870dd32	\N	\N	2024-05-06 20:29:09.439468+00	8d2e9f2e-4b9e-4d30-a0bd-8a3b2960e15e	8e4828fa-8320-4798-ab12-496d3fef511c
96856270-8ec5-4714-827f-66810e9d0cff	\N	\N	2024-05-06 20:29:09.439468+00	8d2e9f2e-4b9e-4d30-a0bd-8a3b2960e15e	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
451f9ee3-890e-4cfe-8d04-1a26ef49faa2	\N	\N	2024-05-06 20:29:09.439468+00	8d2e9f2e-4b9e-4d30-a0bd-8a3b2960e15e	c127c4b3-48cf-4aec-b5a3-979da353231c
17318476-7df0-4680-870b-572ad70cb9e2	\N	\N	2024-05-07 08:04:14.872272+00	5e0c4a2c-28bd-48d2-8dd4-868e636f7594	8e4828fa-8320-4798-ab12-496d3fef511c
1ff0157e-f24c-414e-b391-d50e225ff678	\N	\N	2024-05-07 08:04:14.872272+00	5e0c4a2c-28bd-48d2-8dd4-868e636f7594	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
e37ceb2f-08a6-44a6-8d91-e7c7efefe115	\N	\N	2024-05-07 08:04:14.872272+00	5e0c4a2c-28bd-48d2-8dd4-868e636f7594	c127c4b3-48cf-4aec-b5a3-979da353231c
349d1d1a-e588-49a1-b177-c5b3b4b4e1a9	H[eval]:1\n*\n^\n\nSyntaxError: Unexpected token '*'\n    at new Script (vm.js:102:7)\n    at createScript (vm.js:262:10)\n    at Object.runInThisContext (vm.js:310:10)\n    at internal/process/execution.js:81:19\n    at [eval]-wrapper:6:22\n    at evalScript (internal/process/execution.js:80:60)\n    at internal/main/eval_string.js:27:3\n	*\r\n**\r\n***\r\n****	2024-05-08 15:25:02.214423+00	28e12723-c76d-48bf-9ef5-494e29462c7b	f8e14457-cfa7-4574-925e-bb51a47fa0a4
d0fde04c-7b53-4dfa-aa41-a3dcf2b3d897	\N	\N	2024-05-08 15:25:02.214423+00	28e12723-c76d-48bf-9ef5-494e29462c7b	8431f51c-5e74-4274-811e-21833d1ef328
dadb7613-2287-4ef4-b499-7ae69401b601	\N	0	2024-05-08 15:25:02.214423+00	28e12723-c76d-48bf-9ef5-494e29462c7b	fdc1aa66-a0b8-42d1-925c-bff52fe8fbf0
c407723c-1f57-4544-99bb-4fa26bb10190	\N	Yes of course	2024-05-08 15:25:02.214423+00	28e12723-c76d-48bf-9ef5-494e29462c7b	5afa312a-a61a-4f32-8a9e-8d4cd9113f29
f2774012-e2b6-476d-91c7-7615d5791626	\N	friday	2024-05-08 15:26:29.176198+00	0cba3639-9eb0-485f-a3de-2ec556d218f5	4a515120-e8f7-490b-b4ea-16f9b0c36ff5
5486d0ea-dd8e-4c3c-956f-77fe6f5055ba	\N	22	2024-05-08 15:26:29.176198+00	0cba3639-9eb0-485f-a3de-2ec556d218f5	4f0e3d56-d7c0-46ab-8170-6bb6fbddb676
487aeea4-3585-4d03-b8a4-fb408a0e5da1	\N	no	2024-05-08 15:26:29.176198+00	0cba3639-9eb0-485f-a3de-2ec556d218f5	3675d7c1-c25e-454b-9acb-8533020477e9
f651dbc9-2952-4586-bd93-1505c35c8425	\N	Saturday	2024-05-08 15:34:49.962416+00	ae197ce2-6b0a-4231-b4c1-3583bdff05ad	4a515120-e8f7-490b-b4ea-16f9b0c36ff5
97199b2b-cd7d-4493-be15-d44ce173e486	\N	22	2024-05-08 15:34:49.962416+00	ae197ce2-6b0a-4231-b4c1-3583bdff05ad	4f0e3d56-d7c0-46ab-8170-6bb6fbddb676
d03d911c-75e1-4bc9-87bc-71774e44b552	\N	Yes	2024-05-08 15:34:49.962416+00	ae197ce2-6b0a-4231-b4c1-3583bdff05ad	3675d7c1-c25e-454b-9acb-8533020477e9
\.


--
-- Data for Name: applicant_answer_choices; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.applicant_answer_choices (answer_id, choice_id) FROM stdin;
228295de-2ed5-4673-b8eb-08c955563f99	91f1b92c-5879-4af6-b577-e71e6a3ef20e
1cddd6d0-cd91-40f1-826b-e0cf1870dd32	cab3d6ea-6ea1-44bb-b127-5fc350268a4e
96856270-8ec5-4714-827f-66810e9d0cff	88bdd1b1-9124-4cb6-bd12-0740351ce45a
96856270-8ec5-4714-827f-66810e9d0cff	9c6669b9-6bf1-4646-8d82-461e688a1479
96856270-8ec5-4714-827f-66810e9d0cff	2a5515d2-cd70-405f-a08e-02848718b604
451f9ee3-890e-4cfe-8d04-1a26ef49faa2	77ce4a42-deac-42eb-a21b-93aef86c5d66
17318476-7df0-4680-870b-572ad70cb9e2	fcb03175-3f41-47fe-b0dc-60ba383d68b5
1ff0157e-f24c-414e-b391-d50e225ff678	9c6669b9-6bf1-4646-8d82-461e688a1479
e37ceb2f-08a6-44a6-8d91-e7c7efefe115	77ce4a42-deac-42eb-a21b-93aef86c5d66
d0fde04c-7b53-4dfa-aa41-a3dcf2b3d897	91f1b92c-5879-4af6-b577-e71e6a3ef20e
d0fde04c-7b53-4dfa-aa41-a3dcf2b3d897	1a153cd9-3b6e-4a3d-95c5-711cfc1e7af6
d0fde04c-7b53-4dfa-aa41-a3dcf2b3d897	0ef6bd1a-d9f0-4495-a79e-1e1acc65e65b
\.


--
-- Data for Name: data_reset; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.data_reset (id, user_id, reset_password_expires, reseted, created_at, updated_at) FROM stdin;
1b6e30fd-80ff-43d4-a593-22b18a3d889a	422f9e27-32c8-43db-bb33-55b0826616e0	2024-05-15 14:17:24.475+00	t	2024-05-08 14:17:24.476848+00	2024-05-08 14:18:05.560924+00
9b2323a6-222c-4f85-a69c-122e12206fbe	422f9e27-32c8-43db-bb33-55b0826616e0	2024-05-15 14:19:47.138+00	t	2024-05-08 14:19:47.139826+00	2024-05-08 14:20:06.832943+00
\.


--
-- Data for Name: job_offer; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.job_offer (id, title, description, country, city, "jobType", remote, "experienceLevel", role, benefits, commitments, "userId", "isActive", created_at, updated_at) FROM stdin;
e27995c3-1c78-4371-b85d-7c16dd25ae1b	Middle/Senior React Front-End Developer	About the job\n\nAre you a passionate React Developer looking for your next challenge? Do you have an interest in the web industry, and thrive in dynamic environments? If your answer is yes, then we have the perfect role for you in the vibrant city of Vilnius!\n\n\nAbout Us:\n\nWe're an innovative tech company at the forefront of creating impactful digital products, with our current focus on cutting-edge projects. Located in Vilnius, we're poised for significant growth and seeking talented individuals who share our passion for gaming and technology.\n\n\nThe Role:\n\nAs a Middle/Senior React Front-End Developer, you’ll be instrumental in developing the front end of our groundbreaking platform. Working closely with UX/UI designers, back-end developers, and product managers, you'll help bring to life engaging, seamless, and high-performing gaming experiences for our users.\n\n\nYour Responsibilities:\n\n-Develop and implement responsive, user-centric interface components using React.js.\n-Write clean, efficient, and scalable code that meets our high standards.\n-Optimize applications for maximum performance across a vast array of web-capable devices and browsers.\n-Collaborate with team members to ensure timely and quality project deliveries.\n-Embrace emerging technologies and methodologies to keep our platform at the cutting edge.\n\n\nWhat We're Looking For:\n-Deep understanding of JavaScript, Typescript and React.js, along with its core principles and workflows (Redux).\n-Experience in building complex, high-quality web applications, with a portfolio that includes work in the gaming or casino industry (preferred).\n-Familiarity with RESTful APIs, modern authentication mechanisms, and front-end build pipelines.\n-A proactive problem-solver with meticulous attention to detail.\n-Excellent communication skills and a collaborative spirit.\n-A Bachelor's degree in Computer Science (a plus, not required), or equivalent experience, with at least 4+ years of front-end development experience.\n\n\nWhy Join Us?\n\n-Impactful Work: Play a key role in developing a platform that’s set to disrupt the industry.\n-Competitive Salary: Enjoy a salary range of €2,800 to €7,000 gross per month, commensurate with experience.\n-Growth Opportunities: Tackle challenging projects that expand your skills and career.\n-Creative Environment: Work with a team of passionate professionals	Lithuania	Vilnius	FULL_TIME	ON_SITE	MID_SENIOR	FRONTEND_DEV	Paid maternity leave,Paid paternity leave,Dental insurance,Medical insurance	Career growth and learning,Social impact	4dcd1344-8862-4358-86b2-b845725b18fe	t	2024-05-02 19:44:36.183627+00	2024-05-02 20:10:07.913993+00
00d6a11b-883f-4c25-a890-cb339f94499d	Senior Mobile Developer (React Native/Typescript)	In this role, you will play a pivotal role in the development and maintenance of our mobile application, ensuring its optimal performance, usability, and security. You will work closely with our development team to deliver high-quality solutions. \n\n\n\nKey Responsibilities\n\nDevelop and maintain the mobile application using React Native and other relevant technologies. \nOptimize the mobile application for performance, usability, and security. \nStay updated with the latest mobile app development trends and emerging technologies. \nCollaborate with the team to identify requirements, meet project milestones, and maintain regular communication. \nEffectively communicate and resolve issues with internal and external stakeholders. \nReview and enhance source code to align with project coding standards. \nParticipate in the development of new features and provide support for existing ones. \n\n\nQualifications\n\nBachelor's or Master's degree in Computer Science or a related field, or equivalent professional experience. \n10+ years of professional experience. \n7+ years of experience in mobile development. \nProven expertise as a Senior Mobile Engineer with a strong focus on React Native, iOS, and Android expertise. \nProficiency in TypeScript. \nStrong background in Unit Testing. \nSolid knowledge of Git. \nExperience with modern CSS/Sass/Less. \nUnderstanding of SOLID principles and design patterns. \n\n\nNice to Have\n\nFamiliarity with connected devices (e.g., Apple TV) is a plus. \nExperience with GraphQL. \nExperience with Jest.\nKnowledge of CI/CD and automated testing. \nKnowledge of GitHub Actions.\nExperience with pair programming. \nFamiliarity with Agile methodologies (Scrum preferred) and having worked with agile teams.\nExperience with ads, news, or Connected devices (Apple TV, etc). 	Austria	Admont	FULL_TIME	REMOTE	SENIOR	MOBILE_DEV			4dcd1344-8862-4358-86b2-b845725b18fe	t	2024-05-06 20:13:03.177833+00	2024-05-06 20:26:25.055683+00
59bfd50e-0961-44c3-9bbf-b6e83171aae1	Software Engineer	We Will Rely On You For The Following\n\nDevelop new user-facing UI components using React.js.\nBuild reusable components and front-end libraries for future use.\nTranslate designs and wireframes into high-quality code.\nCollaborate with back-end developers and web designers to improve usability.\nParticipate in code reviews and provide constructive feedback to peers.\nStay up to date with emerging technologies and trends in front-end development.\n\n\nWhat You Bring To The Team\n\nDegree in computer science, software engineering or relevant training and/or experience.\nAt least 2+ years' experience in responsive design.\nStrong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.\nSolid understanding of React.js and its core principles.\nExpertise in HTML 5, CSS3, SCSS, TypeScript, along with familiarity with modern CSS techniques and frameworks.\nExcellent problem-solving skills and attention to detail with artistic tendency.\nAbility to work in a fast-paced environment and meet deadlines.\n\n\nIt Would Be Awesome If You Have\n\nFamiliarity with code versioning tools, such as Git.\nExperience with UI/UX design principles.\nKnowledge of Kanban.\n\n\nWhat We Offer\n\nA great Team and culture – please see our Recruitment Video.\nThe opportunity to work within a global and diversely international team.\nA supportive and collaborative environment.\nAn exciting career as an integral part of a world-leading software company providing solutions for architecture, engineering, and construction.\nTraining and professional development opportunities (certifications programs, conferences etc.).\nChallenging and interesting tasks at work every day, opportunity to work with highly skilled professionals on next generation software.\nMaking a positive impact on the world by creating future infrastructure.\nWork environment that suits concentration as well as teamwork.\nAdditional annual leave days and extra paid days for different occasions (marriage, moving day, bereavement leave etc.).\nHealth insurance package and accidents insurance 24/7.\nReferral program with bonus starting with 1500 Eur. Gross.\nSeniority bonus.\nColleague Recognition Awards.\nOpportunity to join Bentley’s employee stock purchase plan.\nPet-friendly office.\nAreas for leisure time (games tables, Xbox, library) in offices.\nPossibility to choose 3rd pillar pension coverage.\nExtra paid day for volunteering in the organization of your choice.\nAbility to work from office or fully remote from home (offices are in Vilnius and Kaunas).\n\n\nPlease note if you are employed full-time salary for this position ranges from 3750 EUR gross (before taxes).	Chile	Alhué	PART_TIME	HYBRID	JUNIOR	SOFTWARE_DEV			4dcd1344-8862-4358-86b2-b845725b18fe	t	2024-05-06 20:34:42.954075+00	2024-05-08 15:24:59.960803+00
c616f557-43b3-4457-a9f0-77f0c5d521b7	Mobile Development Specialist	Join us please	Bosnia and Herzegovina	Bijela	FULL_TIME	ON_SITE	SENIOR	MOBILE_DEV	Vision insurance,Student loan assistance,Dental insurance,Paid paternity leave	Career growth and learning,Social impact	422f9e27-32c8-43db-bb33-55b0826616e0	t	2024-05-08 15:42:19.286935+00	2024-05-08 15:42:19.286935+00
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.question (id, "questionText", "questionType", "codeLanguage", "isActive", created_at, updated_at, "quizId") FROM stdin;
5afa312a-a61a-4f32-8a9e-8d4cd9113f29	Do you regularly review code?	OPEN	\N	t	2024-05-02 19:44:36.183627+00	2024-05-02 19:44:36.183627+00	3b5f47be-22f5-4df1-bdfa-23eb8cf00e41
fdc1aa66-a0b8-42d1-925c-bff52fe8fbf0	How much coffee do you drink?	OPEN	\N	t	2024-05-02 19:44:36.183627+00	2024-05-02 19:44:36.183627+00	3b5f47be-22f5-4df1-bdfa-23eb8cf00e41
f8e14457-cfa7-4574-925e-bb51a47fa0a4	Generating Fibonacci Sequence (5)	CODE	javascript	t	2024-05-02 19:44:36.183627+00	2024-05-02 19:44:36.183627+00	113a9d2d-6194-4ce7-8156-1c9a231568cb
8431f51c-5e74-4274-811e-21833d1ef328	How many days does a month have?	MCQ	\N	t	2024-05-02 19:44:36.183627+00	2024-05-02 19:44:36.183627+00	113a9d2d-6194-4ce7-8156-1c9a231568cb
c127c4b3-48cf-4aec-b5a3-979da353231c	What is 2+2	MCQ	\N	t	2024-05-06 20:26:09.780155+00	2024-05-06 20:26:09.780155+00	e45228be-0dd4-4ad8-8294-44f5f6210bff
4d997d6e-53db-42ba-bd89-76ca0e0b17d4	how to say true in javascript	MCQ	\N	t	2024-05-06 20:26:09.780155+00	2024-05-06 20:26:09.780155+00	e45228be-0dd4-4ad8-8294-44f5f6210bff
8e4828fa-8320-4798-ab12-496d3fef511c	What is the output of this function:\n\nfunction main(){\n    a = 0\n    console.log(a+1)\n}	MCQ	\N	t	2024-05-06 20:26:09.780155+00	2024-05-06 20:26:09.780155+00	e45228be-0dd4-4ad8-8294-44f5f6210bff
3675d7c1-c25e-454b-9acb-8533020477e9	Do you like coffee?	OPEN	\N	t	2024-05-06 20:34:42.954075+00	2024-05-06 20:34:42.954075+00	22ce34c8-fe52-4b88-a52b-2ec18dad6151
4a515120-e8f7-490b-b4ea-16f9b0c36ff5	What is your favourite week-day?	OPEN	\N	t	2024-05-06 20:34:42.954075+00	2024-05-06 20:34:42.954075+00	22ce34c8-fe52-4b88-a52b-2ec18dad6151
4f0e3d56-d7c0-46ab-8170-6bb6fbddb676	How old are you?	OPEN	\N	t	2024-05-06 20:34:42.954075+00	2024-05-06 20:34:42.954075+00	22ce34c8-fe52-4b88-a52b-2ec18dad6151
\.


--
-- Data for Name: question_choice; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.question_choice (id, "choiceText", "isCorrect", "questionId") FROM stdin;
0ef6bd1a-d9f0-4495-a79e-1e1acc65e65b	30	f	8431f51c-5e74-4274-811e-21833d1ef328
1a153cd9-3b6e-4a3d-95c5-711cfc1e7af6	31	f	8431f51c-5e74-4274-811e-21833d1ef328
91f1b92c-5879-4af6-b577-e71e6a3ef20e	28	t	8431f51c-5e74-4274-811e-21833d1ef328
5c8696ca-0ff8-4283-9be3-976d499f368a	29	f	8431f51c-5e74-4274-811e-21833d1ef328
77ce4a42-deac-42eb-a21b-93aef86c5d66	4	t	c127c4b3-48cf-4aec-b5a3-979da353231c
2f5dcb02-f37c-4cee-91a8-d309d0fc64d1	5	f	c127c4b3-48cf-4aec-b5a3-979da353231c
24b7b14d-e350-4a9e-9b59-fb80a5a5c98c	8	f	c127c4b3-48cf-4aec-b5a3-979da353231c
2a5515d2-cd70-405f-a08e-02848718b604	1	t	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
7e05581b-78c3-4436-abae-72cc60a6f806	0	f	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
9c6669b9-6bf1-4646-8d82-461e688a1479	true	t	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
61f14e3f-24f8-4030-9581-3c31dd7d6f8a	false	f	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
88bdd1b1-9124-4cb6-bd12-0740351ce45a	!false	t	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
47475933-c62c-4cc3-8dd1-f7282258436b	0	f	8e4828fa-8320-4798-ab12-496d3fef511c
173de933-4a33-4c5c-b798-512ee09d8e99	!true	f	4d997d6e-53db-42ba-bd89-76ca0e0b17d4
cab3d6ea-6ea1-44bb-b127-5fc350268a4e	Error	t	8e4828fa-8320-4798-ab12-496d3fef511c
fcb03175-3f41-47fe-b0dc-60ba383d68b5	1	f	8e4828fa-8320-4798-ab12-496d3fef511c
\.


--
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.quiz (id, title, created_at, updated_at, "jobOfferId") FROM stdin;
3b5f47be-22f5-4df1-bdfa-23eb8cf00e41	About you	2024-05-02 19:44:36.183627+00	2024-05-02 19:44:36.183627+00	e27995c3-1c78-4371-b85d-7c16dd25ae1b
113a9d2d-6194-4ce7-8156-1c9a231568cb	Let's see how you think	2024-05-02 19:44:36.183627+00	2024-05-02 19:44:36.183627+00	e27995c3-1c78-4371-b85d-7c16dd25ae1b
e45228be-0dd4-4ad8-8294-44f5f6210bff	Test	2024-05-06 20:26:09.780155+00	2024-05-06 20:26:09.780155+00	00d6a11b-883f-4c25-a890-cb339f94499d
22ce34c8-fe52-4b88-a52b-2ec18dad6151	About you	2024-05-06 20:34:42.954075+00	2024-05-06 20:34:42.954075+00	59bfd50e-0961-44c3-9bbf-b6e83171aae1
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, email, "isVerified", verification_expires, password, phone_number, name, country, about, city, created_at, updated_at) FROM stdin;
422f9e27-32c8-43db-bb33-55b0826616e0	petrulevicmonika@gmail.com	t	2024-05-08 14:46:38.399+00	$2b$10$zZxjyW1FxlxmLgKcO98YW.oBfWPtrivRtogO0w6.6yyRfV.gXMmQq	868238136	Monika Corp	Lithuania	\N	Palanga	2024-05-08 14:06:08.453542+00	2024-05-08 14:20:06.929332+00
4dcd1344-8862-4358-86b2-b845725b18fe	dev@dev.com	t	2024-05-02 20:03:23.774+00	$2b$10$hpk5ksJJp.ljtdiIOcu0WuvH8JX7PGp8hzfK.nQS9lXOBBn3Vbwcq	868238555	SEARCH.DEV	Lithuania	My company searches for the best devs in whole world hehe	Vilnius	2024-05-02 19:31:53.503402+00	2024-05-07 19:33:52.919719+00
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: question PK_21e5786aa0ea704ae185a79b2d5; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY (id);


--
-- Name: applicant_answer_choices PK_30720cbfd1f53ca884d95043e9f; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant_answer_choices
    ADD CONSTRAINT "PK_30720cbfd1f53ca884d95043e9f" PRIMARY KEY (answer_id, choice_id);


--
-- Name: quiz PK_422d974e7217414e029b3e641d0; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY (id);


--
-- Name: job_offer PK_5286026037ab5fb5acfcb7e1829; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.job_offer
    ADD CONSTRAINT "PK_5286026037ab5fb5acfcb7e1829" PRIMARY KEY (id);


--
-- Name: applicant_answer PK_6e26275127c2fda0bb75b573163; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant_answer
    ADD CONSTRAINT "PK_6e26275127c2fda0bb75b573163" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: api_data PK_d41089d80749177d55a9c8b1ad0; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.api_data
    ADD CONSTRAINT "PK_d41089d80749177d55a9c8b1ad0" PRIMARY KEY (id);


--
-- Name: question_choice PK_e068eae752b4911ff1f9e508b24; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.question_choice
    ADD CONSTRAINT "PK_e068eae752b4911ff1f9e508b24" PRIMARY KEY (id);


--
-- Name: data_reset PK_ec7d58641032dfbe54b43c075ab; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.data_reset
    ADD CONSTRAINT "PK_ec7d58641032dfbe54b43c075ab" PRIMARY KEY (id);


--
-- Name: applicant PK_f4a6e907b8b17f293eb073fc5ea; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT "PK_f4a6e907b8b17f293eb073fc5ea" PRIMARY KEY (id);


--
-- Name: applicant UQ_4b026cff6fe543ed0d5ebbc6db2; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT "UQ_4b026cff6fe543ed0d5ebbc6db2" UNIQUE (email, "jobOfferId");


--
-- Name: applicant_answer UQ_5a671c420b6e2934cbb11c789c7; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant_answer
    ADD CONSTRAINT "UQ_5a671c420b6e2934cbb11c789c7" UNIQUE (applicant_id, "questionId");


--
-- Name: applicant UQ_6b4c5ccc8fc0b79451b60c69576; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT "UQ_6b4c5ccc8fc0b79451b60c69576" UNIQUE (phone_number, "jobOfferId");


--
-- Name: IDX_32bb8951a1908e6bf1683e80c5; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IDX_32bb8951a1908e6bf1683e80c5" ON public.applicant_answer_choices USING btree (choice_id);


--
-- Name: IDX_68e4027ae8d1713f1572670d81; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IDX_68e4027ae8d1713f1572670d81" ON public.applicant_answer_choices USING btree (answer_id);


--
-- Name: IDX_e12875dfb3b1d92d7d7c5377e2; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON public."user" USING btree (email);


--
-- Name: applicant_answer_choices FK_32bb8951a1908e6bf1683e80c5e; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant_answer_choices
    ADD CONSTRAINT "FK_32bb8951a1908e6bf1683e80c5e" FOREIGN KEY (choice_id) REFERENCES public.question_choice(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: question FK_4959a4225f25d923111e54c7cd2; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES public.quiz(id);


--
-- Name: job_offer FK_5fd892e88b6ee54d2f2b7944605; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.job_offer
    ADD CONSTRAINT "FK_5fd892e88b6ee54d2f2b7944605" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: applicant_answer_choices FK_68e4027ae8d1713f1572670d81a; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant_answer_choices
    ADD CONSTRAINT "FK_68e4027ae8d1713f1572670d81a" FOREIGN KEY (answer_id) REFERENCES public.applicant_answer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: applicant FK_94c72cc3e4eed3605f94b40e081; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant
    ADD CONSTRAINT "FK_94c72cc3e4eed3605f94b40e081" FOREIGN KEY ("jobOfferId") REFERENCES public.job_offer(id);


--
-- Name: question_choice FK_bb9e612b485325ac0fc1b8c2854; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.question_choice
    ADD CONSTRAINT "FK_bb9e612b485325ac0fc1b8c2854" FOREIGN KEY ("questionId") REFERENCES public.question(id);


--
-- Name: applicant_answer FK_de94840556b2a322567978f442d; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant_answer
    ADD CONSTRAINT "FK_de94840556b2a322567978f442d" FOREIGN KEY (applicant_id) REFERENCES public.applicant(id);


--
-- Name: quiz FK_f5579082c9c5f57df00628ece58; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT "FK_f5579082c9c5f57df00628ece58" FOREIGN KEY ("jobOfferId") REFERENCES public.job_offer(id);


--
-- Name: applicant_answer FK_ffbe98e918716c92d685e4a37de; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.applicant_answer
    ADD CONSTRAINT "FK_ffbe98e918716c92d685e4a37de" FOREIGN KEY ("questionId") REFERENCES public.question(id);


--
-- PostgreSQL database dump complete
--

