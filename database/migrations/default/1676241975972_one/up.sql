
CREATE TABLE "public"."users"
(
    "id"   serial NOT NULL,
    "name" text   NOT NULL,
    PRIMARY KEY ("id")
);

alter table "public"."users" add column "age" numeric
 null;
