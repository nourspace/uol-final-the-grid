alter table "public"."articles"
  add constraint "articles_type_fkey2"
  foreign key ("type")
  references "public"."article_type"
  ("value") on update cascade on delete restrict;
