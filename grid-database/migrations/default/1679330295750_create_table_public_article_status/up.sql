CREATE TABLE "public"."article_status"
(
    "value"   text NOT NULL,
    "comment" text,
    PRIMARY KEY ("value")
);
INSERT INTO "public"."article_status" (value, comment)
VALUES ('planned', 'Article is planed'),
       ('in_progress', 'There are in progress tasks related to the article'),
       ('in_review', 'Someone is reviewing the article'),
       ('published', 'Article is published'),
       ('archived', 'Archived article')
;
