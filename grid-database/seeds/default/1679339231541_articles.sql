SET check_function_bodies = false;

DELETE FROM public.articles where id < 4;

INSERT INTO public.articles
    (id, title, summary, body, status, type, created_by)
VALUES (1, 'AI Healthcare ETF', 'Start of an article about Healthcare ETF using AI', '', 'in_progress', 'blog_post', 1),
       (2, 'Ethereum PoS', 'Research paper on the implications of Ethereum move to PoS', '', 'planned',
        'research_paper', 1),
       (3, 'Gold and its relation to Bitcoin mining', 'Comparison between gold and Bitcoin mining.', '', 'in_review',
        'news_report', 1);

SELECT pg_catalog.setval('public.articles_id_seq', 4, true);
