SET check_function_bodies = false;
INSERT INTO public.users (id, username, password, name, role, last_login, created_at, updated_at) VALUES (1, 'nour', '$2b$10$HYDCtqc6NMMBUCjwTUate.QUKkse81.O.C/x4IkguAEDbLFT0wxwq', 'Nour S', 'admin', NULL, '2023-02-13 10:24:39.45355+00', '2023-03-09 21:47:50.845259+00');
INSERT INTO public.users (id, username, password, name, role, last_login, created_at, updated_at) VALUES (2, 'alice', '$2b$10$uBQpwVyZ4f8/uYGyONg.e.WhjXGT5lVSiX0sEpGqA0oK7dMbCUhFS', 'Alice G.', 'user', NULL, '2023-03-09 21:46:55.540094+00', '2023-03-09 21:48:20.175942+00');
INSERT INTO public.users (id, username, password, name, role, last_login, created_at, updated_at) VALUES (3, 'bob', '$2b$10$n7I4nhkWU66.ftxhwbhtBuGIkiRrfLNY3XHbzJdHOa3TVu/rT5PIG', 'Bob M.', 'user', NULL, '2023-03-09 21:47:01.145387+00', '2023-03-09 21:47:01.145387+00');
INSERT INTO public.users (id, username, password, name, role, last_login, created_at, updated_at) VALUES (4, 'carol', '$2b$10$qZ21R6huu3xB/QL2OoCuiuaeLAvgjl46q.m9bGuHfL5K8mQ7t5eGC', 'Carol D.', 'user', NULL, '2023-03-09 21:47:05.842618+00', '2023-03-09 21:47:05.842618+00');
SELECT pg_catalog.setval('public.users_id_seq', 5, true);
