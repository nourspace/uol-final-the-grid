alter table "public"."assets" drop constraint "name_check";
alter table "public"."assets" add constraint "empty_name" check (COALESCE(btrim(name), ''::text) <> ''::text);
