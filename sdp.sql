drop database if exists SDP;
create database	SDP;
use SDP;

create table Artist(
					`name` varchar(50) NOT NULL,
                    `bio` varchar(250),
                    `photo` varchar(50),
                    primary key (`name`));
                    
insert into Artist values('Taylor Swift', 'big fat bitch', 'tswift.jpg');
insert into Artist values('Kids See Ghosts', '', 'kidsseeghosts.jpg');

create table Album(
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `description` varchar(250),
                    `photo` varchar(50),
                    `releaseDate` date NOT NULL,
                    primary key (`name`),
                    foreign key (`artist`) references Artist(`name`));
                    
insert into Album values('1989 (Taylor\'s Version)', 'Taylor Swift', 'shits awesome she totally re-released the same songs again', null, '2023-10-27');
insert into Album values('Kids See Ghosts', 'Kids See Ghosts', 'Kids See Ghosts is a collaborative studio album by American hip hop supergroup Kids See Ghosts, composed of rapper-producers Kanye West and Kid Cudi. (Wikipedia)', 'kidsseeghostsALBUM.jpg', '2018-06-08');                    
                    
create table Song(
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `album` varchar(50) NOT NULL,
                    primary key (`name`),
                    foreign key (`artist`) references Artist(`name`),
                    foreign key (`album`) references Album(`name`));
                    
insert into Song values('Blank Space (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)');

insert into Song values('Feel the Love (Ft. Pusha T)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Fire', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('4th Dimension (Ft. Louis Prima)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Freeee (Ghost Town, Pt. 2) (Ft. Ty Dolla $ign)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Reborn', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Kids See Ghosts (Ft. Yasiin Bey)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Cudi Montage', 'Kids See Ghosts', 'Kids See Ghosts');


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

create Table UserPost(
					`uid` int NOT NULL,
                    `content` varchar(250),
                    `photo` varchar(50),
                    `song_name` varchar(50),
                    `album_name` varchar(50),
                    `date` date,
                    `time` time,
                    foreign key (`uid`) references User(`uid`),
                    foreign key (`song_name`) references Song(`name`),
                    foreign key (`album_name`) references Album(`name`));
                    
insert into UserPost values('1', 'This album is so good I can\'t believe it\'s the same songs again.', null, null, '1989 (Taylor\'s Version)', '2024-02-02', '08:55:00');
                    

                        
-- select * from Song where artist = "Taylor Swift";
-- select * from Song where artist = "Drake";
-- select * from UserSong where uid = "1";
-- select * from UserSong where rating = "1";
-- select * from Song where album = "Kids See Ghosts";
-- select * from UserPost where date = "2024-02-02";