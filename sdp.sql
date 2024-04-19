drop database if exists SDP;
create database	SDP;
use SDP;

create table Artist(
					`name` varchar(50) NOT NULL,
                    `bio` varchar(250) NOT NULL,
                    `photo` varchar(50) DEFAULT 'default.jpg',
                    primary key (`name`));
                    
insert into Artist values('Taylor Swift', 'Big Chiefs fan', 'tswift.jpg');
insert into Artist values('Kids See Ghosts', 'Kanye and Kid Cudi', 'kidsseeghosts.jpg');
insert into Artist values('Sampha', 'Proper Englishman, cheers mate.', 'sampha.jpg');
insert into Artist values('Kero Kero Bonito', 'Proper Englishwoman, 歓声メイト.', 'kerokerobonito.jpg');
insert into Artist values('Danny Brown', 'Real Detroit Bloke', 'dannybrown.jpg');

create table Album(
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `description` varchar(250),
                    `photo` varchar(100),
                    `releaseDate` date NOT NULL,
                    primary key (`name`),
                    foreign key (`artist`) references Artist(`name`));
                    
insert into Album values('1989 (Taylor\'s Version)', 'Taylor Swift', 'Its awesome that she totally re-released the same songs again', 'TaylorSwift_1989(Taylor\'s_Version).jpg', '2023-10-27');
insert into Album values('Kids See Ghosts', 'Kids See Ghosts', 'Kids See Ghosts is a collaborative studio album by American hip hop supergroup Kids See Ghosts, composed of rapper-producers Kanye West and Kid Cudi. (Wikipedia)', 'KidsSeeGhosts_KidsSeeGhosts.jpg', '2018-06-08');
insert into Album values('Lahai', 'Sampha', 'Lahai is the second studio album by English musician Sampha, released on 20 October 2023 through Young, marking his first release in over six years. (Wikipedia)', 'Sampha_Lahai.jpg', '2023-10-20');
insert into Album values('Time \'n\' Place', 'Kero Kero Bonito', 'Time \'n\' Place is the second studio album by British indie pop band Kero Kero Bonito, released on 1 October 2018 through Polyvinyl Record Co in North America and self-released worldwide. (Wikipedia)', 'KeroKeroBonito_TimenPlace.jpg', '2018-10-1');
insert into Album values('Atrocity Exhibition', 'Danny Brown', 'Cool Album! Very Good! - Elijah', 'DannyBrown_AtrocityExhibition.jpg', '2016-09-27');
                    
create table Song(
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `album` varchar(50) NOT NULL,
                    primary key (`name`),
                    foreign key (`artist`) references Artist(`name`),
                    foreign key (`album`) references Album(`name`));
                    
insert into Song values('Blank Space (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)');
insert into Song values('Style (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)');

insert into Song values('Feel the Love (Ft. Pusha T)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Fire', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('4th Dimension (Ft. Louis Prima)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Freeee (Ghost Town, Pt. 2) (Ft. Ty Dolla $ign)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Reborn', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Kids See Ghosts (Ft. Yasiin Bey)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Cudi Montage', 'Kids See Ghosts', 'Kids See Ghosts');

insert into Song values('Stereo Color Cloud (Shaman\'s Dream)', 'Sampha', 'Lahai');
insert into Song values('Spirit 2.0', 'Sampha', 'Lahai');
insert into Song values('Dancing Circles', 'Sampha', 'Lahai');
insert into Song values('Suspended', 'Sampha', 'Lahai');
insert into Song values('Satellite Business', 'Sampha', 'Lahai');
insert into Song values('Jonathan L. Seagull', 'Sampha', 'Lahai');
insert into Song values('Inclination Compass (Tenderness)', 'Sampha', 'Lahai');
insert into Song values('Only', 'Sampha', 'Lahai');
insert into Song values('Time Piece', 'Sampha', 'Lahai');
insert into Song values('Can\'t Go Back', 'Sampha', 'Lahai');
insert into Song values('Evidence', 'Sampha', 'Lahai');
insert into Song values('Wave Therapy', 'Sampha', 'Lahai');
insert into Song values('What If You Hypnotise Me? (Ft. Lea Sen)', 'Sampha', 'Lahai');
insert into Song values('Rose Tint', 'Sampha', 'Lahai');

insert into Song values('Outside', 'Kero Kero Bonito', 'Time \'n\' Place');
insert into Song values('Time Today', 'Kero Kero Bonito', 'Time \'n\' Place');

create table User(
					`uid` int NOT NULL AUTO_INCREMENT,
                    `username` varchar(20) NOT NULL,
                    `password` varchar(255) NOT NULL,
                    `date_joined` date NOT NULL,
                    `bio` varchar(250),
					primary key (`uid`),
					key(`username`));
                    
insert into User values (1, 'elijah', '1234', '2024-01-17', 'i am elijah this is my bio about me');
insert into User values (2, 'conner', '1234', '2024-03-25', null);
insert into User values (3, 'finngalvin', '1234', '2024-03-25', null);

create table UserFriend(
						`uid` int NOT NULL,
                        `friendID` int NOT NULL);
                        
insert into UserFriend values(1, 2); -- elijah friends with conner
insert into UserFriend values(1, 3); -- elijah friends with finngalvin
insert into UserFriend values(2, 1); -- conner friends with elijah

create table UserList(
						`uid` int NOT NULL,
                        `name` varchar(50) NOT NULL,
                        primary key (`name`),
                        foreign key (`uid`) references User(`uid`));

insert into UserList values(1, 'Top 5 Artists'); -- make this a default list on every profile
insert into UserList values(1, 'Top 5 Albums'); -- make this a default list on every profile
insert into UserList values(1, 'Fav 2024');
                        
create table UserListSong(
						`uid` int NOT NULL,
						`listName` varchar(50) NOT NULL,
                        `name` varchar(50) NOT NULL, 
                        `artist` varchar(50) NOT NULL,
                        `album` varchar(50) NOT NULL,
                        `addedDate` date,
                        foreign key(`uid`) references User(`uid`),
                        foreign key(`listName`) references UserList(`name`),
                        foreign key(`name`) references Song(`name`),
                        foreign key(`artist`) references Artist(`name`),
                        foreign key(`album`) references Album(`name`));
-- Elijah's Fav 2024 list
insert into UserListSong values(1 , 'Fav 2024', 'Fire', 'Kids See Ghosts', 'Kids See Ghosts', '2024-03-28');
insert into UserListSong values(1 , 'Fav 2024', 'Dancing Circles', 'Sampha', 'Lahai', '2024-03-28');
insert into UserListSong values(1 , 'Fav 2024', 'Outside', 'Kero Kero Bonito', 'Time \'n\' Place', '2024-03-28');
insert into UserListSong values(1 , 'Fav 2024', 'Time Today', 'Kero Kero Bonito', 'Time \'n\' Place', '2024-03-28');
insert into UserListSong values(1 , 'Fav 2024', '4th Dimension (Ft. Louis Prima)', 'Kids See Ghosts', 'Kids See Ghosts', '2024-03-28');
insert into UserListSong values(1 , 'Fav 2024', 'Blank Space (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)', '2024-03-28');

-- Elijah's Top 5 Songs List

create table UserListAlbum(
						`uid` int NOT NULL,
						`listName` varchar(50) NOT NULL,
                        `name` varchar(50) NOT NULL,
                        `artist` varchar(50) NOT NULL,
                        `addedDate` date,
                        `rating` int, -- 1-10 scale, not easy to set a max int value on MySQL
                        foreign key(`uid`) references User(`uid`),
                        foreign key(`listName`) references UserList(`name`),
                        foreign key(`name`) references Album(`name`),
                        foreign key(`artist`) references Artist(`name`));
                        
-- Elijah's Top 5 Albums List
insert into UserListAlbum values(1, 'Top 5 Albums', 'Time \'n\' Place', 'Kero Kero Bonito', '2024-03-28', null);
insert into UserListAlbum values(1, 'Top 5 Albums', 'Lahai', 'Sampha', '2024-03-28', null);
insert into UserListAlbum values(1, 'Top 5 Albums', '1989 (Taylor\'s Version)', 'Taylor Swift', '2024-03-28', null);
insert into UserListAlbum values(1, 'Top 5 Albums', 'Kids See Ghosts', 'Kids See Ghosts', '2024-03-28', null);
insert into UserListAlbum values(1, 'Top 5 Albums', 'Atrocity Exhibition', 'Danny Brown', '2024-03-28', null);

create table UserListArtist(
						`uid` int NOT NULL,
						`listName` varchar(50) NOT NULL,
                        `name` varchar(50) NOT NULL,
                        foreign key(`uid`) references User(`uid`),
                        foreign key(`listName`) references UserList(`name`),
                        foreign key(`name`) references Artist(`name`));
                        
-- Elijah's Top 5 Artists List
insert into UserListArtist values(1, 'Top 5 Artists', 'Sampha'); -- might only allow the Top 5 Artists list for Artist Lists 
insert into UserListArtist values(1, 'Top 5 Artists', 'Kero Kero Bonito');
insert into UserListArtist values(1, 'Top 5 Artists', 'Kids See Ghosts');
insert into UserListArtist values(1, 'Top 5 Artists', 'Taylor Swift');
insert into UserListArtist values(1, 'Top 5 Artists', 'Danny Brown');

create Table UserPost(
					`uid` int NOT NULL,
                    `username` varchar(20) NOT NULL,
                    `content` varchar(250) NOT NULL,
                    `photo` varchar(50),
                    `song_name` varchar(50),
                    `album_name` varchar(50),
                    `date` date NOT NULL,
                    `time` time NOT NULL,
                    foreign key (`uid`) references User(`uid`),
                    foreign key (`username`) references User(`username`),
                    foreign key (`album_name`) references Album(`name`));
                    
insert into UserPost values('1', 'elijah','This album is so good I can\'t believe it\'s the same songs released again.', '1_02022024.jpg', '', '1989 (Taylor\'s Version)', '2024-02-02', '08:55:00');
insert into UserPost values('2', 'conner', 'good stuff', '', 'Time Today' , 'Time \'n\' Place', '2024-04-03', '13:53:00');
insert into UserPost values('2', 'conner', 'one of my favorite albums right now', '', '', 'Atrocity Exhibition', '2024-04-03', '13:54:00');
insert into UserPost values('3', 'finngalvin', 'not as good as twosoft but it\'ll do', '', 'Blank Space (Taylor\'s Version)', '1989 (Taylor\'s Version)', '2024-02-02', '08:55:00');
                 
                    
-- ALBUM QUERIES
-- select * from album where releaseDate = (select MAX(releaseDate) from album); -- most recently released album
-- select * from album where releaseDate = (select TOP(3) releaseDate from album); --trying to get top 3 most recently released albums
-- select MIN(releaseDate) from album; -- oldest album DATE

-- USER QUERIES
-- select MAX(uid) from User; selects max UID, which should be the most recently created user

-- FRIEND QUERIES
-- select friendID from UserFriend where uid = 1; -- all friends for user with uid 1
-- select ALL username from User where uid IN (select ALL friendID from UserFriend where uid = 1); -- username of all friends of user with uid 1


-- LISTS
-- select * from UserList where uid = 1 AND (NOT (name = 'Top 5 Albums' OR name = 'Top 5 Artists')); -- select all OTHER lists

-- POSTS
-- select * from UserPost where uid IN (select friendID from UserFriend where uid = 1); -- select all posts from friends of user with uid 1

-- SEARCH BAR
-- select * from User where username LIKE '%elij%'; -- search for all users with username containing elij
-- select * from Album where name LIKE '%a%'; -- search for all albums with name containing a
-- select * from User, Album, Artist where Album.name LIKE '%a%' OR Artist.name LIKE '%a%' OR User.username LIKE '%a%'; -- search for user, album, and artist