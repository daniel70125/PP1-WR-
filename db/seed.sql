CREATE TABLE users2 (
    id serial primary key,
    email varchar(250),
    username varchar(50),
    password varchar(200),
    img varchar(250),
    rating int,
    skill_1 varchar(50),
    skill_2 varchar(50),
    skill_3 varchar(50)
);
CREATE TABLE admins (
    id serial primary key,
    email varchar(250),
    username varchar(50),
    password varchar(50),
    img varchar(250),
    description varchar(250),
    location varchar(250),
    rating int,
    number int,
    role_id int
);
CREATE TABLE jobs (
    id serial primary key,
    title varchar(100),
    description varchar(500),
    location varchar(75),
    company_id int references admins(id),
    worker_id int references users2(id),
    category varchar(50),
    img varchar(250),
    pay int
);