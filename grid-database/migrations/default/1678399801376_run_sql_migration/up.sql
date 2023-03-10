CREATE TABLE user_role (
  value text PRIMARY KEY,
  comment text
);
INSERT INTO user_role (value, comment) VALUES
  ('admin', 'Users with the privilege to set users’ roles'),
  ('user', 'Ordinary users');
