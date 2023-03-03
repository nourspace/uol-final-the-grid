alter table "public"."users" alter column "age" drop not null;
alter table "public"."users" add column "age" numeric;
