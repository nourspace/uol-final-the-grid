CREATE TABLE "public"."article_type" ("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );
INSERT INTO "public"."article_type" (value, comment)
VALUES ('blog_post', 'Blog post'),
       ('news_report', 'News report'),
       ('research_paper', 'Research paper')
;
