SET check_function_bodies = false;

DELETE FROM public.assets where id < 22;

INSERT INTO public.assets (id, name, category, description, url, created_by ) VALUES
    (21, 'Bitcoin', 'currency', 'Bitcoin cryptocurrency', 'https://bitcoin.org/', 1),
    (2, 'Ethereum', 'crypto', 'Ethereum cryptocurrency', 'https://www.ethereum.org/', 1),
    (3, 'Cosmos', 'crypto', 'Cosmos cryptocurrency', 'https://cosmos.network/', 1),
    (4, 'USD Coin', 'crypto', 'USD-backed cryptocurrency', 'https://www.coinbase.com/usd-coin', 1),
    (5, '0L', 'crypto', '0L cryptocurrency', 'https://0l.com/', 1),
    (6, 'Gold', 'topic', 'Gold commodity', 'https://www.gold.org/', 1),
    (7, 'Euro (fiat)', 'currency', 'European Union currency', 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html', 1),
    (8, 'USD (fiat)', 'currency', 'United States currency', 'https://www.federalreserve.gov/releases/h10/hist/default.htm', 1),
    (9, 'Crypto', 'topic', 'Cryptocurrency market', 'https://coinmarketcap.com/', 1),
    (10, 'Economy', 'topic', 'Economic news and events', 'https://www.bloomberg.com/economics', 1),
    (11, 'Politics', 'topic', 'Political news and events', 'https://www.bbc.com/news/politics', 1),
    (12, 'Commodities', 'topic', 'General commodities', 'https://www.investing.com/commodities/', 1),
    (13, 'Stocks', 'topic', 'Stock market', 'https://www.nasdaq.com/market-activity/stocks', 1),
    (14, 'Metaverse', 'topic', 'Metaverse technologies', 'https://en.wikipedia.org/wiki/Metaverse', 1),
    (15, 'CBDC', 'currency', 'Central Bank Digital Currency', 'https://www.bis.org/cbdc/index.htm', 1),
    (16, 'Science', 'topic', 'Scientific research and discoveries', 'https://www.sciencemag.org/', 1),
    (17, 'Healthcare', 'topic', 'Healthcare industry', 'https://www.who.int/health-topics/health-systems-financing/', 1),
    (18, 'Energy', 'topic', 'Energy news and events', 'https://www.iea.org/', 1),
    (19, 'Blockchain', 'topic', 'Blockchain technologies', 'https://en.wikipedia.org/wiki/Blockchain', 1),
    (20, 'AI', 'topic', 'Artificial Intelligence technologies', 'https://en.wikipedia.org/wiki/Artificial_intelligence', 1),
    (1, 'Environment', 'topic', 'Environmental related assets', 'https://en.wikipedia.org/wiki/Environment_(biophysical)', 1);
SELECT pg_catalog.setval('public.assets_id_seq', 22, true);
