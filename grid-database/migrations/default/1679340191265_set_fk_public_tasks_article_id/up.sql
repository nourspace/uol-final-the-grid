alter table "public"."tasks"
  add constraint "tasks_article_id_fkey"
  foreign key ("article_id")
  references "public"."articles"
  ("id") on update restrict on delete restrict;
