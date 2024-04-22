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
                    
-- Some songs from 1989 (Taylor's Version)
insert into Song values('Blank Space (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)');
insert into Song values('Style (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version)');

-- All songs from Kids See Ghosts
insert into Song values('Feel the Love (Ft. Pusha T)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Fire', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('4th Dimension (Ft. Louis Prima)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Freeee (Ghost Town, Pt. 2) (Ft. Ty Dolla $ign)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Reborn', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Kids See Ghosts (Ft. Yasiin Bey)', 'Kids See Ghosts', 'Kids See Ghosts');
insert into Song values('Cudi Montage', 'Kids See Ghosts', 'Kids See Ghosts');

-- All songs from Lahai
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

-- Some songs from Time 'n' Place
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

-- Table to store friendships between accounts, this is a one way (maybe more like following?)
create table UserFriend(
						`uid` int NOT NULL,
                        `friendID` int NOT NULL);
                        
insert into UserFriend values(1, 2); -- elijah friends with conner
insert into UserFriend values(1, 3); -- elijah friends with finngalvin
insert into UserFriend values(2, 1); -- conner friends with elijah

-- General list, users can create their own lists this way
create table UserList( 
						`uid` int NOT NULL,
                        `name` varchar(50) NOT NULL,
                        primary key (`name`),
                        foreign key (`uid`) references User(`uid`));

insert into UserList values(1, 'Listened List');

-- Lists of albums
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
                        
-- Elijah's Listened List
insert into UserListAlbum values(1, 'Listened List', 'Time \'n\' Place', 'Kero Kero Bonito', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', 'Lahai', 'Sampha', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', '1989 (Taylor\'s Version)', 'Taylor Swift', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', 'Kids See Ghosts', 'Kids See Ghosts', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', 'Atrocity Exhibition', 'Danny Brown', '2024-03-28', null);


-- Listened list for all previously listened albums for one user // not sure if i want this implementation or above
create Table ListenedList(
						`uid` int NOT NULL,
                        `album` varchar(50),
                        `artist` varchar(50),
                        `dateAdded` date NOT NULL,
                        `rating` int, -- 1 -> 10
                        foreign key(`uid`) references User(`uid`),
                        foreign key(`album`) references Album(`name`),
                        foreign key(`artist`) references Artist(`name`));
                        
-- Elijah's Listened List 
insert into ListenedList values(1, 'Time \'n\' Place', 'Kero Kero Bonito', '2024-03-28', 8);
insert into ListenedList values(1, 'Lahai', 'Sampha', '2024-03-28', '9');
insert into ListenedList values(1, '1989 (Taylor\'s Version)', 'Taylor Swift', '2024-03-28', '1');
insert into ListenedList values(1, 'Kids See Ghosts', 'Kids See Ghosts', '2024-03-28', '10');
insert into ListenedList values(1, 'Atrocity Exhibition', 'Danny Brown', '2024-03-28', '10');

-- User created posts
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
                    
insert into UserPost values('1', 'elijah', 'This album is so good I can\'t believe it\'s the same songs released again.', '1_02022024.jpg', '', '1989 (Taylor\'s Version)', '2024-02-02', '08:55:00');
insert into UserPost values('2', 'conner', 'good stuff', '', 'Time Today' , 'Time \'n\' Place', '2024-04-03', '13:53:00');
insert into UserPost values('2', 'conner', 'one of my favorite albums right now', '', '', 'Atrocity Exhibition', '2024-04-03', '13:54:00');
insert into UserPost values('3', 'finngalvin', 'not as good as twosoft but it\'ll do', '', 'Blank Space (Taylor\'s Version)', '1989 (Taylor\'s Version)', '2024-02-02', '08:55:00');

-- User specific top 5 artists, with rankings 1-5
create Table TopFiveArtists(
						`uid` int NOT NULL,
                        `position` int NOT NULL, -- 1 -> 5
                        `name` varchar(50) NOT NULL,
                        foreign key (`uid`) references User(`uid`),
                        foreign key(`name`) references Artist(`name`));
                        
insert into TopFiveArtists values('1', '1', 'Danny Brown');
insert into TopFiveArtists values('1', '2', 'Kero Kero Bonito');
insert into TopFiveArtists values('1', '3', 'Sampha');
insert into TopFiveArtists values('1', '4', 'Kids See Ghosts');
insert into TopFiveArtists values('1', '5', 'Taylor Swift');
                        
-- User specific top 5 albums list, with rankings 1-5
create Table TopFiveAlbums(
						`uid` int NOT NULL,
                        `position` int NOT NULL, -- 1 -> 5
                        `name` varchar(50) NOT NULL,
                        `artistName` varchar(50) NOT NULL,
                        foreign key (`uid`) references User(`uid`),
                        foreign key(`name`) references Album(`name`),
                        foreign key(`artistname`) references Album(`artist`));
                        
insert into TopFiveAlbums values('1', '1', 'Atrocity Exhibition', 'Danny Brown');
insert into TopFiveAlbums values('1', '2', 'Kids See Ghosts', 'Kids See Ghosts');
insert into TopFiveAlbums values('1', '3', 'Time \'n\' Place', 'Kero Kero Bonito');
insert into TopFiveAlbums values('1', '4', 'Lahai', 'Sampha');
insert into TopFiveAlbums values('1', '5', '1989 (Taylor\'s Version)', 'Taylor Swift');
                 
                    
-- ALBUM QUERIES
-- select * from album where releaseDate = (select MAX(releaseDate) from album); -- most recently released album
-- select * from album where releaseDate = (select TOP(3) releaseDate from album); --trying to get top 3 most recently released albums
-- select MIN(releaseDate) from album; -- oldest album DATE

-- USER QUERIES
-- select MAX(uid) from User; -- selects max UID, which is the most recently created user (used when creating a new account to automatically assign a UID)

-- FRIEND QUERIES
-- select friendID from UserFriend where uid = 1; -- all friends uid for user with uid 1
-- select ALL username from User where uid IN (select ALL friendID from UserFriend where uid = 1); -- username of all friends of user with uid 1


-- LISTS
-- select * from UserList where uid = 1 AND (NOT (name = 'Top 5 Albums' OR name = 'Top 5 Artists')); -- select all OTHER lists (not top 5s)
-- select * from TopFiveArtists where uid = 1; -- gets top five artists list for user with uid 1
-- select * from TopFiveAlbums where uid = 1; -- gets top five albums list for user with uid 1
-- select * from ListenedList where uid = 1;

-- POSTS
-- select * from UserPost where uid = 1 OR uid IN ((select friendID from UserFriend where uid = 1)); -- select all posts from uid 1 or friends of uid 1 

-- SEARCH BAR
-- select * from User where username LIKE '%elij%'; -- search for all users with username containing elij
-- select * from Album where name LIKE '%a%'; -- search for all albums with name containing a
-- select * from User, Album, Artist where Album.name LIKE '%a%' OR Artist.name LIKE '%a%' OR User.username LIKE '%a%'; -- search for user, album, and artist