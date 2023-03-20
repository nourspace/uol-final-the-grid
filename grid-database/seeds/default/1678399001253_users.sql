SET check_function_bodies = false;

INSERT INTO public.users (id, username, password, name, role)
VALUES (1, 'nour', '$2b$10$HYDCtqc6NMMBUCjwTUate.QUKkse81.O.C/x4IkguAEDbLFT0wxwq', 'Nour S', 'admin'),
       (2, 'alice', '$2b$10$uBQpwVyZ4f8/uYGyONg.e.WhjXGT5lVSiX0sEpGqA0oK7dMbCUhFS', 'Alice G.', 'user'),
       (3, 'bob', '$2b$10$n7I4nhkWU66.ftxhwbhtBuGIkiRrfLNY3XHbzJdHOa3TVu/rT5PIG', 'Bob M.', 'user'),
       (4, 'carol', '$2b$10$qZ21R6huu3xB/QL2OoCuiuaeLAvgjl46q.m9bGuHfL5K8mQ7t5eGC', 'Carol D.', 'user');
SELECT pg_catalog.setval('public.users_id_seq', 5, true);
