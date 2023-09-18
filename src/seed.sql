-- DROP DATABASE IF EXISTS gl_project;

CREATE DATABASE gl_project
    WITH
    OWNER = michaelwhitham
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


    -- DROP SCHEMA IF EXISTS gl_store ;

CREATE SCHEMA IF NOT EXISTS gl_store
    AUTHORIZATION postgres;


    -- DROP TABLE IF EXISTS gl_store.users;

CREATE TABLE IF NOT EXISTS gl_store.users
(
    user_id integer NOT NULL DEFAULT nextval('gl_store.users_user_id_seq'::regclass),
    email character varying(250) COLLATE pg_catalog."default" NOT NULL,
    username character varying(250) COLLATE pg_catalog."default" NOT NULL,
    password character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS gl_store.users
    OWNER to postgres;


    -- DROP TABLE IF EXISTS gl_store.baskets;

CREATE TABLE IF NOT EXISTS gl_store.baskets
(
    basket_id integer NOT NULL DEFAULT nextval('gl_store.baskets_basket_id_seq'::regclass),
    user_id integer NOT NULL,
    products jsonb[],
    CONSTRAINT baskets_pkey PRIMARY KEY (basket_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES gl_store.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS gl_store.baskets
    OWNER to postgres;


    -- DROP TABLE IF EXISTS gl_store.orders;

CREATE TABLE IF NOT EXISTS gl_store.orders
(
    user_id integer NOT NULL,
    order_id uuid NOT NULL,
    products character varying COLLATE pg_catalog."default" NOT NULL,
    totalprice character varying(250) COLLATE pg_catalog."default" NOT NULL,
    date character varying(250) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (order_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES gl_store.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS gl_store.orders
    OWNER to postgres;