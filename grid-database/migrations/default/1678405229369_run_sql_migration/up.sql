CREATE TABLE asset_category (
  value text PRIMARY KEY,
  comment text
);
INSERT INTO asset_category (value, comment) VALUES
  ('topic', 'Generic topic'),
  ('country', 'Country or nation'),
  ('currency', 'Fiat or Bitcoin'),
  ('crypto', 'Cryptocurrency project'),
  ('other', 'Other category')
;
