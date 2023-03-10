CREATE TABLE activity_type (
  value text PRIMARY KEY,
  comment text
);
INSERT INTO activity_type (value, comment) VALUES
  ('update', 'Observed an update on the asset'),
  ('news', 'Read news article on the asset'),
  ('post', 'Read blog post on the asset'),
  ('video', 'Watched video about the asset'),
  ('podcast', 'Heard podcast about the asset'),
  ('other', 'Did or observed something else related to the asset')
;
