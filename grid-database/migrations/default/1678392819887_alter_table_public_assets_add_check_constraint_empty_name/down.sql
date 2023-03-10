alter table "public"."assets" drop constraint "empty_name";
alter table "public"."assets" add constraint "name_check" check (CHECK (COALESCE(btrim(name), ''::text) <> ''::text));
