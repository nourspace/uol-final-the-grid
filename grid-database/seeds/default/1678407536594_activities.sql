SET check_function_bodies = false;
DELETE FROM public.activities where id < 31;

INSERT INTO public.activities (id, "timestamp", type, notes, source, created_by)
VALUES
    (1, '2022-01-01 13:24:01', 'post', 'Read an article about AI and its impact on Create Healthcare ETF', 'www.ai.com', 2),
    (2, '2022-01-01 03:06:34', 'podcast', 'Researched Create AI-powered Trading Model using USD Coin', 'podcast.ai.com', 3),
    (3, '2022-01-01 04:16:10', 'video', 'Interviewed an expert on Analyze Political Impact on Commodities and its relation to Environment', 'youtube.com/watch=5687', 4),
    (4, '2022-01-01 19:08:08', 'news', 'Watched a video on Ethereum and its impact on Analyze Ethereum PoS Switch', 'news.ethereum.com', 2),
    (5, '2022-01-01 02:13:11', 'post', 'Read the news about Gold and its impact on Research Crypto Mining in Top Countries', 'news.gold.com', 3),
    (6, '2022-01-01 17:01:33', 'podcast', 'Read an article about AI and its impact on Study AI''s Impact on Environment', 'podcast.ai.com', 4),
    (7, '2022-01-01 06:22:09', 'video', 'Watched a video on Ethereum and its impact on Analyze Ethereum PoS Switch', 'youtube.com/watch=2304', 2),
    (8, '2022-01-01 13:53:43', 'news', 'Researched Research Crypto Mining in Top Countries using Politics', 'news.politics.com', 3),
    (9, '2022-01-01 03:44:04', 'podcast', 'Watched a video on Gold and its impact on Analyze Political Impact on Commodities', 'podcast.gold.com', 4),
    (10, '2022-01-01 14:20:09', 'post', 'Researched Create Healthcare ETF using AI', 'www.ai.com', 2),
    (11, '2022-01-01 07:15:17', 'video', 'Joined a discussion on Create AI-powered Trading Model and its relation to Healthcare', 'discussion.healthcare.com', 3),
    (12, '2022-01-01 12:57:44', 'news', 'Watched a video on Ethereum and its impact on Analyze Ethereum PoS Switch', 'news.ethereum.com', 4),
    (13, '2022-01-01 21:50:18', 'podcast', 'Read an article about AI and its impact on Study AI''s Impact on Environment', 'podcast.ai.com', 2),
    (14, '2022-01-01 16:38:51', 'post', 'Researched Research Crypto Mining in Top Countries using Gold', 'www.gold.com', 3),
    (15, '2022-01-01 11:27:26', 'news', 'Joined a discussion on Analyze Political Impacton Commodities and its relation to Environment', 'discussion.politics.com', 4),
    (16, '2022-01-01 22:53:14', 'podcast', 'Watched a video on AI and its impact on Create Healthcare ETF', 'podcast.ai.com', 2),
    (17, '2022-01-01 15:20:45', 'video', 'Listened to a podcast on Gold and its impact on Analyze Political Impact on Commodities', 'podcast.gold.com', 3),
    (18, '2022-01-01 19:38:22', 'news', 'Interviewed an expert on Research Crypto Mining in Top Countries and its relation to AI', 'interview.ai.com', 4),
    (19, '2022-01-01 08:16:53', 'podcast', 'Watched a video on Ethereum and its impact on Analyze Ethereum PoS Switch', 'podcast.ethereum.com', 2),
    (20, '2022-01-01 01:05:29', 'post', 'Read an article about Politics and its impact on Analyze Political Impact on Commodities', 'www.politics.com', 3),
    (21, '2022-01-01 18:29:57', 'video', 'Researched Create AI-powered Trading Model using Gold', 'youtube.com/watch=3456', 4),
    (22, '2022-01-01 09:18:36', 'news', 'Listened to a podcast on Ethereum and its impact on Analyze Ethereum PoS Switch', 'podcast.ethereum.com', 2),
    (23, '2022-01-01 05:10:23', 'post', 'Researched Study AI''s Impact on Environment using Gold', 'www.gold.com', 3),
    (24, '2022-01-01 20:01:52', 'podcast', 'Interviewed an expert on Analyze Political Impact on Commodities and its relation to Environment', 'interview.politics.com', 4),
    (25, '2022-01-01 07:37:25', 'post', 'Watched a video on Create AI-powered Trading Model and its impact on USD Coin', 'www.ai.com', 2),
    (26, '2022-01-01 02:26:01', 'video', 'Researched Study AI''s Impact on Environment using Healthcare', 'youtube.com/watch=8976', 3),
    (27, '2022-01-01 17:14:33', 'news', 'Joined a discussion on Gold and its relation to Research Crypto Mining in Top Countries', 'discussion.gold.com', 4),
    (28, '2022-01-01 10:03:08', 'podcast', 'Interviewed an expert on Analyze Political Impact on Commodities and its relation to Environment', 'interview.politics.com', 2),
    (29, '2022-01-01 00:51:43', 'post', 'Researched Create Healthcare ETF using Politics', 'www.healthcare.com', 3),
    (30, '2022-01-01 15:43:19', 'video', 'Watched a video on Ethereum and its impact on Analyze Ethereum PoS Switch', 'youtube.com/watch=333', 2);
SELECT pg_catalog.setval('public.activities_id_seq', 31, true);

-- DELETE FROM activity_asset;
INSERT INTO activity_asset (activity_id, asset_id)
VALUES
    (1, 20),
    (1, 17),
    (2, 4),
    (3, 11),
    (4, 2),
    (5, 6),
    (6, 20),
    (7, 2),
    (8, 11),
    (9, 6),
    (10, 20),
    (11, 20),
    (12, 2),
    (13, 20),
    (14, 6),
    (15, 6),
    (16, 20),
    (17, 6),
    (18, 2),
    (19, 11),
    (20, 11),
    (21, 20),
    (22, 6),
    (23, 6),
    (24, 11),
    (25, 20),
    (26, 2),
    (27, 6),
    (28, 11),
    (29, 1),
    (30, 2);


