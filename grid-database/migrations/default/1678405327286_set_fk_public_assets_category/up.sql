alter table "public"."assets"
  add constraint "assets_category_fkey"
  foreign key ("category")
  references "public"."asset_category"
  ("value") on update cascade on delete restrict;
