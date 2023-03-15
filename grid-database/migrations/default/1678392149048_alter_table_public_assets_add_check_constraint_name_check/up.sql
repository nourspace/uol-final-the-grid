alter table "public"."assets" add constraint "name_check" check (coalesce(TRIM(name), '') != '');
