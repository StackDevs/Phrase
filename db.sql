create user freechat@localhost;
grant all privileges on freechat.* to freechat@localhost;
create database freechat;
use freechat;

create table users (
    id int auto_increment,
    mail text,
    nickname text,
    profileImg text,
    salt text,
    pw text
);

create table messages (
    idx int,
    authorId varchar(10),
    content text
)