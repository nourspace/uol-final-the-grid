alter table "public"."users"
  add constraint "users_role_fkey"
  foreign key ("role")
  references "public"."user_role"
  ("value") on update cascade on delete restrict;
