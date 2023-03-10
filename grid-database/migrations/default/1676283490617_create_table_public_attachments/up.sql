CREATE TABLE "public"."attachments" ("id" serial NOT NULL, "user_id" integer NOT NULL, "url" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);