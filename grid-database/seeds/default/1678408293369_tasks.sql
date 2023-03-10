SET check_function_bodies = false;
DELETE FROM public.tasks where id < 9;
INSERT INTO public.tasks (id, title, "desc", status, created_by)
VALUES
        (1, 'Research Crypto Mining in Top Countries', 'Investigate Bitcoin and Ethereum mining in top 5 countries, their energy consumption, and environmental impact', 'backlog', 2),
    (2, 'Analyze Ethereum PoS Switch', 'Analyze the impact of Ethereum switching from PoW to PoS on the market and make recommendations', 'todo', 3),
    (3, 'Study El Salvador Mining Facility', 'Study the new El Salvador mining facility and its potential impact on the market', 'inprogress', 4),
    (4, 'Create AI-powered Trading Model', 'Develop an AI-powered trading model for USD Coin and Gold based on historical data and market trends', 'done', 2),
    (5, 'Analyze Political Impact on Commodities', 'Analyze the impact of political events on commodity prices, including oil and gold', 'backlog', 3),
    (6, 'Create Healthcare ETF', 'Develop a healthcare exchange-traded fund (ETF) that includes companies involved in AI and technology', 'todo', 4),
    (7, 'Study AI''s Impact on Environment', 'Study the impact of AI development on the environment and make recommendations for sustainable practices', 'inprogress', 2),
    (8, 'Create Podcast on Crypto Mining', 'Create a podcast episode on the current state of crypto mining and its impact on the environment and energy consumption', 'done', 3);
SELECT pg_catalog.setval('public.tasks_id_seq', 9, true);

INSERT INTO public.task_activity (task_id, activity_id)
VALUES
    (1, 1),
    (1, 5),
    (1, 10),
    (2, 2),
    (2, 4),
    (2, 19),
    (3, 3),
    (3, 11),
    (3, 14),
    (4, 6),
    (4, 7),
    (4, 22),
    (5, 8),
    (5, 9),
    (5, 24),
    (6, 12),
    (6, 13),
    (6, 27),
    (7, 15),
    (7, 17),
    (7, 21),
    (8, 16),
    (8, 18),
    (8, 28);




