alter table "public"."articles"
  add constraint "articles_type_fkey"
  foreign key ("type")
  references "public"."activity_type"
  ("value") on update cascade on delete restrict;
