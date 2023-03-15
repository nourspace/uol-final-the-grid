alter table "public"."tasks"
  add constraint "tasks_status_fkey"
  foreign key ("status")
  references "public"."task_status"
  ("value") on update cascade on delete restrict;
