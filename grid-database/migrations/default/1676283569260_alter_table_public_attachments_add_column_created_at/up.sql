alter table "public"."attachments" add column "created_at" timestamptz
 null default now();
