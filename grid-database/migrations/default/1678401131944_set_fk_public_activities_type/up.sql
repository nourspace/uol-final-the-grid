alter table "public"."activities"
  add constraint "activities_type_fkey"
  foreign key ("type")
  references "public"."activity_type"
  ("value") on update cascade on delete restrict;
