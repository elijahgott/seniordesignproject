drop database if exists SDP;
create database	SDP;
use SDP;

create table Artist(
					`name` varchar(50) NOT NULL,
                    `bio` varchar(250),
                    `photo` varchar(50),
                    primary key (`name`));
                    
insert into Artist values('Taylor Swift', 'big fat bitch', 'tswift.jpg');

create table Album(
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `description` varchar(250),
                    `photo` varchar(50),
                    `releaseDate` date NOT NULL,
                    primary key (`name`),
                    foreign key (`artist`) references Artist(`name`));
                    
insert into Album values('1989 (Taylor\'s Version)', 'Taylor Swift', 'shits awesome she totally re-released the same songs again', '', '2023-10-27');
                    
create table Song(
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `album` varchar(50) NOT NULL,
                    primary key (`name`),
                    foreign key (`artist`) references Artist(`name`),
                    foreign key (`album`) references Album(`name`));
                    
insert into Song values('Blank Space (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)');



create table User(
					`uid` int NOT NULL AUTO_INCREMENT,
                    `username` varchar(20) NOT NULL,
                    `pass_hash` varchar(255) NOT NULL,
                    `date_joined` date NOT NULL,
					primary key (`uid`));
                    
insert into User values (1, 'elijah', '0', '2024-01-17');
                    
create table UserSong(
					`uid` int NOT NULL,
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `album` varchar(50) NOT NULL,
                    `addedDate` date,
                    `rating` double, -- may need to change to int or something, don't really want to rate individual songs
                    foreign key (`uid`) references User(`uid`),
                    foreign key (`name`) references Song(`name`),
                    foreign key (`artist`) references Artist(`name`),
                    foreign key (`album`) references Album(`name`));
                    
insert into UserSong values('1', 'Blank Space (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)', '2024-01-17', '1');
                    
create table UserAlbum(
					`uid` int NOT NULL,
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `addedDate` date,
                    `rating` double, -- may need to change to int or something
                    foreign key (`uid`) references User(`uid`),
                    foreign key (`name`) references Album(`name`),
                    foreign key (`artist`) references Artist(`name`));
                    
insert into UserAlbum values('1', '1989 (Taylor\'s Version)', 'Taylor Swift', '2024-01-17', '1.0');
                        
-- select * from Song where artist = "Taylor Swift";
-- select * from Song where artist = "Drake";
-- select * from UserSong where uid = "1";
-- select * from UserSong where rating = "1";