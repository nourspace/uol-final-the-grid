alter table "public"."articles"
  add constraint "articles_status_fkey"
  foreign key ("status")
  references "public"."article_status"
  ("value") on update cascade on delete restrict;
