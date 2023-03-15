CREATE TABLE task_status (
  value text PRIMARY KEY,
  comment text
);
INSERT INTO task_status (value, comment) VALUES
  ('backlog', 'Task needs more info'),
  ('todo', 'To start working on'),
  ('inprogress', 'Someone is working on the task'),
  ('done', 'Task is done'),
  ('archive', 'Archived task'),
  ('recurring', 'Recurring task')
;
