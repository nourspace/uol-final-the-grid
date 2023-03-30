create table public.user_role
(
    value   text not null
        primary key,
    comment text
);

alter table public.user_role
    owner to postgres;

create table public.users
(
    id         serial
        primary key,
    username   text                                          not null
        unique,
    password   text                                          not null,
    name       text,
    role       text                     default 'user'::text not null
        references public.user_role
            on update cascade on delete restrict,
    last_login timestamp with time zone,
    created_at timestamp with time zone default now()        not null,
    updated_at timestamp with time zone default now()        not null
);

alter table public.users
    owner to postgres;

create trigger set_public_users_updated_at
    before update
    on public.users
    for each row
execute procedure public.set_current_timestamp_updated_at();


create table public.activity_type
(
    value   text not null
        primary key,
    comment text
);

alter table public.activity_type
    owner to postgres;

create table public.activities
(
    id         serial
        primary key,
    timestamp  timestamp with time zone,
    type       text
        references public.activity_type
            on update cascade on delete restrict,
    notes      text,
    source     text,
    created_by integer                                not null
        references public.users
            on update restrict on delete restrict,
    is_hidden  boolean                  default false not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

alter table public.activities
    owner to postgres;

create trigger set_public_activities_updated_at
    before update
    on public.activities
    for each row
execute procedure public.set_current_timestamp_updated_at();


create table public.task_status
(
    value   text not null
        primary key,
    comment text
);

alter table public.task_status
    owner to postgres;

create table public.asset_category
(
    value   text not null
        primary key,
    comment text
);

alter table public.asset_category
    owner to postgres;

create table public.assets
(
    id          serial
        primary key,
    name        text                                           not null
        constraint empty_name
            check (COALESCE(btrim(name), ''::text) <> ''::text),
    category    text                     default 'other'::text not null
        references public.asset_category
            on update cascade on delete restrict,
    description text,
    url         text,
    created_by  integer                                        not null
        references public.users
            on update restrict on delete restrict,
    created_at  timestamp with time zone default now()         not null,
    updated_at  timestamp with time zone default now()         not null
);

alter table public.assets
    owner to postgres;

create trigger set_public_assets_updated_at
    before update
    on public.assets
    for each row
execute procedure public.set_current_timestamp_updated_at();


create table public.activity_asset
(
    activity_id integer not null
        references public.activities
            on update restrict on delete restrict,
    asset_id    integer not null
        references public.assets
            on update restrict on delete restrict,
    primary key (activity_id, asset_id)
);

alter table public.activity_asset
    owner to postgres;

create table public.article_status
(
    value   text not null
        primary key,
    comment text
);

alter table public.article_status
    owner to postgres;

create table public.article_type
(
    value   text not null
        primary key,
    comment text not null
);

alter table public.article_type
    owner to postgres;

create table public.articles
(
    id           serial
        primary key,
    title        text                                             not null,
    summary      text,
    body         text,
    status       text                     default 'planned'::text not null
        references public.article_status
            on update cascade on delete restrict,
    type         text                                             not null
        references public.article_type
            on update cascade on delete restrict,
    created_by   integer                                          not null
        references public.users
            on update restrict on delete restrict,
    published_at date,
    created_at   timestamp with time zone default now()           not null,
    updated_at   timestamp with time zone default now()           not null,
    url          text
);

alter table public.articles
    owner to postgres;

create table public.tasks
(
    id         serial
        primary key,
    title      text                                             not null,
    "desc"     text,
    status     text                     default 'backlog'::text not null
        references public.task_status
            on update cascade on delete restrict,
    created_by integer                                          not null
        references public.users
            on update restrict on delete restrict,
    created_at timestamp with time zone default now()           not null,
    updated_at timestamp with time zone default now()           not null,
    article_id integer
        references public.articles
            on update restrict on delete restrict
);

alter table public.tasks
    owner to postgres;

create trigger set_public_tasks_updated_at
    before update
    on public.tasks
    for each row
execute procedure public.set_current_timestamp_updated_at();


create table public.task_activity
(
    task_id     integer not null
        references public.tasks
            on update restrict on delete restrict,
    activity_id integer not null
        references public.activities
            on update restrict on delete restrict,
    primary key (task_id, activity_id)
);

alter table public.task_activity
    owner to postgres;

create trigger set_public_articles_updated_at
    before update
    on public.articles
    for each row
execute procedure public.set_current_timestamp_updated_at();


