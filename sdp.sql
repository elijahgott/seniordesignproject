drop database if exists SDP;
create database	SDP;
use SDP;

create table Artist(
					`name` varchar(50) NOT NULL,
                    `bio` varchar(250),
                    `photo` varchar(50),
                    primary key (`name`));
                    
insert into Artist values('Taylor Swift', 'Big Chiefs fan', 'tswift.jpg');
insert into Artist values('Kids See Ghosts', 'Kanye and Kid Cudi', 'kidsseeghosts.jpg');
insert into Artist values('Sampha', 'Proper Englishman, cheers mate.', 'sampha.jpg');
insert into Artist values('Kero Kero Bonito', 'Proper Englishwoman, 歓声メイト.', 'kerokerobonito.jpg');

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
                    
insert into UserPost values('1', 'This album is so good I can\'t believe it\'s the same songs released again.', null, null, '1989 (Taylor\'s Version)', '2024-02-02', '08:55:00');
                    

                        
-- select * from Song where artist = "Taylor Swift";
-- select * from Song where artist = "Drake";
-- select * from UserSong where uid = "1";
-- select * from UserSong where rating = "1";
-- select * from Song where album = "Kids See Ghosts";
-- select * from UserPost where date = "2024-02-02";