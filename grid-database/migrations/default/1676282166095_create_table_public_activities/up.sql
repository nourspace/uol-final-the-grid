CREATE TABLE "public"."activities"
(
    "id"         serial      NOT NULL,
    "timestamp"  timestamptz NOT NULL,
    "type"       text,
    "notes"      text,
    "source"     text,
    "created_by" integer     NOT NULL,
    "is_hidden"  boolean     NOT NULL DEFAULT false,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON UPDATE restrict ON DELETE restrict
);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
    RETURNS TRIGGER AS
$$
DECLARE
    _new record;
BEGIN
    _new := NEW;
    _new."updated_at" = NOW();
    RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_activities_updated_at"
    BEFORE UPDATE
    ON "public"."activities"
    FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_activities_updated_at" ON "public"."activities"
    IS 'trigger to set value of column "updated_at" to current timestamp on row update';
