create user freechat@localhost;
grant all privileges on freechat.* to freechat@localhost;
create database freechat;
use freechat;

create table users (
    idx int auto_increment key,
    id text,
    salt text,
    pw text
);
 
create table groups (
    id int auto_increment key,
    `name` text,
    `owner` int
);

create table members (
    groupId int,
    userId int
);

create table messages (
    id int auto_increment key,
    groupId int,
    authorId varchar(10),
    `message` text,
    `date` timestamp default current_timestamp,
)
