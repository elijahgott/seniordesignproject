drop database if exists SDP;
create database	SDP;
use SDP;

create table Artist(
					`name` varchar(50) NOT NULL,
                    `bio` varchar(350) NOT NULL,
                    `photo` varchar(50) DEFAULT 'default.jpg',
                    primary key (`name`));
                    
insert into Artist values('Taylor Swift', 'Taylor Alison Swift is an American singer-songwriter. A subject of widespread public interest with a vast fanbase, she has influenced the music industry, popular culture and politics through her songwriting, artistry, entrepreneurship, and advocacy. Swift began professional songwriting at age 14. (Wikipedia)', 'tswift.jpg');
insert into Artist values('Kids See Ghosts', 'Kids See Ghosts was an American hip-hop supergroup composed of musicians Kanye West and Kid Cudi, which formed in 2018 and dissolved in 2022. (Wikipedia)', 'kidsseeghosts.jpg');
insert into Artist values('Sampha', 'Sampha Lahai Sisay is a British singer, songwriter, musician and record producer from Morden, South London. Sampha is widely known for his collaborative work with Kendrick Lamar, Drake, Frank Ocean, Kanye West, Solange and others. (Wikipedia)', 'sampha.jpg');
insert into Artist values('Kero Kero Bonito', 'Kero Kero Bonito are a British indie pop band formed in London in 2011. The band consists of vocalist Sarah Midori Perry and producers and multi-instrumentalists Gus Lobban and Jamie Bulled. Their musical style consists of indie pop, electropop, dance-rock, hyperpop, and bubblegum pop. (Wikipedia)', 'kerokerobonito.jpg');
insert into Artist values('Danny Brown', 'Daniel Dewan Sewell, better known as Danny Brown, is an American rapper and singer. He was described by MTV in 2011 as "one of rap\'s most unique figures in recent memory." (Wikipedia)', 'dannybrown.jpg');
insert into Artist values('Nirvana', 'Nirvana was an American rock band formed in Aberdeen, Washington, in 1987. Founded by lead singer and guitarist Kurt Cobain and bassist Krist Novoselic, the band went through a succession of drummers, most notably Chad Channing, before recruiting Dave Grohl in 1990. (Wikipedia)', 'nirvana.jpg');
insert into Artist values('Alice In Chains', 'Alice in Chains is an American rock band formed in Seattle, Washington, in 1987. Since 2006, the band\'s lineup has comprised vocalist/guitarists Jerry Cantrell and William DuVall, bassist Mike Inez and drummer Sean Kinney. Vocalist Layne Staley and bassist Mike Starr are former members of the band. (Wikipedia)', 'aliceinchains.jpg');
insert into Artist values('Kanye West', 'Ye is an American rapper, singer, songwriter, record producer, and fashion designer. A subject of widespread controversy and public interest, West is a figure in contemporary pop culture. (Wikipedia)', 'kanyewest.jpg');
insert into Artist values('Childish Gambino', 'Donald McKinley Glover Jr., also known by his stage name Childish Gambino, is an American actor, comedian, singer, rapper, writer, director, and producer. (Wikipedia)', 'childishgambino.jpg');
insert into Artist values('Metallica', 'Metallica is an American heavy metal band. The band was formed in 1981 in Los Angeles by vocalist and guitarist James Hetfield and drummer Lars Ulrich, and has been based in San Francisco for most of its career. (Wikipedia)', 'metallica.jpg');
insert into Artist values('Michael Jackson', 'Michael Joseph Jackson was an American singer, songwriter, dancer, and philanthropist. Known as the "King of Pop", he is regarded as one of the most significant cultural figures of the 20th century. (Wikipedia)', 'michaeljackson.jpg');


create table Album(
					`name` varchar(50) NOT NULL,
                    `artist` varchar(50) NOT NULL,
                    `description` varchar(350),
                    `photo` varchar(100),
                    `releaseDate` date NOT NULL,
                    primary key (`name`),
                    foreign key (`artist`) references Artist(`name`));
                    
insert into Album values('1989 (Taylor\'s Version)', 'Taylor Swift', '1989 (Taylor\'s Version) is the fourth re-recorded album by the American singer-songwriter Taylor Swift. It is a re-recording of Swift\'s fifth studio album, 1989, and was released on October 27, 2023, by Republic Records. (Wikipedia)', 'TaylorSwift_1989(Taylor\'s_Version).jpg', '2023-10-27');
insert into Album values('Kids See Ghosts', 'Kids See Ghosts', 'Kids See Ghosts is a collaborative studio album by American hip hop supergroup Kids See Ghosts, composed of rapper-producers Kanye West and Kid Cudi. (Wikipedia)', 'KidsSeeGhosts_KidsSeeGhosts.jpg', '2018-06-08');
insert into Album values('Lahai', 'Sampha', 'Lahai is the second studio album by English musician Sampha, released on 20 October 2023 through Young, marking his first release in over six years. (Wikipedia)', 'Sampha_Lahai.jpg', '2023-10-20');
insert into Album values('Time \'n\' Place', 'Kero Kero Bonito', 'Time \'n\' Place is the second studio album by British indie pop band Kero Kero Bonito, released on 1 October 2018 through Polyvinyl Record Co in North America and self-released worldwide. (Wikipedia)', 'KeroKeroBonito_TimenPlace.jpg', '2018-10-1');
insert into Album values('Atrocity Exhibition', 'Danny Brown', 'Atrocity Exhibition is the fourth studio album by American rapper Danny Brown. It was released on September 27, 2016, by Fool\'s Gold Records and Warp Records. (Wikipedia)', 'DannyBrown_AtrocityExhibition.jpg', '2016-09-27');
insert into Album values('Bleach', 'Nirvana', 'Bleach is the debut studio album by American rock band Nirvana, released on June 15, 1989, by Sub Pop. (Wikipedia)', 'Nirvana_Bleach.jpg', '1989-06-15');
insert into Album values('In Utero', 'Nirvana', 'In Utero is the third and final studio album by the American rock band Nirvana, released on September 21, 1993, by DGC Records. (Wikipedia)', 'Nirvana_InUtero.jpg', '1991-09-21');
insert into Album values('Dirt', 'Alice in Chains', 'Dirt is the second studio album by American rock band Alice in Chains. It was released on September 29, 1992, by Columbia Records. Peaking at No. 6 on the Billboard 200 chart, the album received critical acclaim. (Wikipedia)', 'AliceInChains_Dirt.jpg', '1992-09-29');
insert into Album values('Facelift', 'Alice in Chains', 'Facelift is the debut studio album by the American rock band Alice in Chains, released by Columbia Records on August 28, 1990. (Wikipedia)', 'AliceInChains_Facelift.jpg', '1990-08-21');
insert into Album values('Late Registration', 'Kanye West', 'Late Registration is the second studio album by the American rapper and record producer Kanye West. It was released on August 30, 2005, through Def Jam Recordings and Roc-A-Fella Records. (Wikipedia)', 'KanyeWest_LateRegistration.jpg', '2005-08-30');
insert into Album values('808s & Heartbreak', 'Kanye West', '808s & Heartbreak is the fourth studio album by the American rapper and record producer Kanye West. It was released by Def Jam Recordings and Roc-A-Fella Records on November 24, 2008. (Wikipedia)', 'KanyeWest_808s&Heartbreak.jpg', '2008-08-30');
insert into Album values('Awaken, My Love!', 'Childish Gambino', '"Awaken, My Love!" is the third studio album by American recording artist Donald Glover, under his stage name Childish Gambino. It was released by Glassnote Records on December 2, 2016. (Wikipedia)', 'ChildishGambino_AwakenMyLove.jpg', '2016-12-02');
insert into Album values('Because the Internet', 'Childish Gambino', 'Because the Internet is the second studio album by American recording artist Donald Glover, under the stage name Childish Gambino. It was released on December 10, 2013, by Glassnote Records. The recording process began in 2012 and ended in October 2013. (Wikipedia)', 'ChildishGambino_BecauseTheInternet.jpg', '2013-12-06');
insert into Album values('Ride the Lightning', 'Metallica', 'Ride the Lightning is the second studio album by the American heavy metal band Metallica, released on July 27, 1984, by the independent record label Megaforce Records. The album was recorded in three weeks with producer Flemming Rasmussen at Sweet Silence Studios in Copenhagen, Denmark. (Wikipedia)', 'Metallica_RideTheLightning.jpg', '1984-07-27');
insert into Album values('Thriller', 'Michael Jackson', 'Thriller is the sixth studio album by the American singer and songwriter Michael Jackson, released on November 29, 1982, by Epic Records. It was produced by Quincy Jones, who had previously worked with Jackson on his 1979 album Off the Wall and who would later produce his 1987 album Bad. (Wikipedia)', 'MichaelJackson_Thriller.jpg', '1982-11-29');
insert into Album values('Bad', 'Michael Jackson', 'Bad is the seventh studio album by the American singer-songwriter Michael Jackson. It was released on August 31, 1987, by Epic Records. Written and recorded between 1985 and 1987, Bad was Jackson\'s third and final collaboration with the producer Quincy Jones. (Wikipedia)', 'MichaelJackson_Bad.jpg', '1987-08-31');


/* Didn't end up using this in project, may use in future
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
*/

create table User(
					`uid` int NOT NULL AUTO_INCREMENT,
                    `username` varchar(20) NOT NULL,
                    `password` varchar(255) NOT NULL,
                    `date_joined` date NOT NULL,
                    `bio` varchar(350),
					primary key (`uid`),
					key(`username`));
                    
insert into User values (1, 'elijah', '1234', '2024-01-17', 'i am elijah this is my bio about me');
insert into User values (2, 'conner', '1234', '2024-03-25', null);

-- Table to store friendships between accounts, one way relationship (maybe more like following?)
create table UserFriend(
						`uid` int NOT NULL,
                        `friendID` int NOT NULL);
                        
insert into UserFriend values(1, 2); -- elijah friends with conner
insert into UserFriend values(2, 1); -- conner friends with elijah

/*
-- General list, users can create their own lists this way
create table UserList( 
						`uid` int NOT NULL,
                        `name` varchar(50) NOT NULL,
                        primary key (`name`),
                        foreign key (`uid`) references User(`uid`) on delete cascade);

insert into UserList values(1, 'Listened List');*/

/*
-- User Created Lists of albums
create table UserListAlbum(
						`uid` int NOT NULL,
						`listName` varchar(50) NOT NULL,
                        `name` varchar(50) NOT NULL,
                        `artist` varchar(50) NOT NULL,
                        `addedDate` date,
                        `rating` int, -- 1-10 scale, not easy to set a max int value on MySQL
                        foreign key(`uid`) references User(`uid`) on delete cascade,
                        foreign key(`listName`) references UserList(`name`) on delete cascade,
                        foreign key(`name`) references Album(`name`),
                        foreign key(`artist`) references Artist(`name`));
                        
-- Elijah's Listened List
insert into UserListAlbum values(1, 'Listened List', 'Time \'n\' Place', 'Kero Kero Bonito', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', 'Lahai', 'Sampha', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', '1989 (Taylor\'s Version)', 'Taylor Swift', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', 'Kids See Ghosts', 'Kids See Ghosts', '2024-03-28', null);
insert into UserListAlbum values(1, 'Listened List', 'Atrocity Exhibition', 'Danny Brown', '2024-03-28', null); */

-- User created posts
create Table UserPost(
					`uid` int NOT NULL,
                    `username` varchar(20) NOT NULL,
                    `content` varchar(350) NOT NULL,
                    `photo` varchar(50),
                    `song_name` varchar(50),
                    `album_name` varchar(50),
                    `date` date NOT NULL,
                    `time` time NOT NULL,
                    foreign key (`uid`) references User(`uid`)on delete cascade,
                    foreign key (`username`) references User(`username`) on update cascade on delete cascade,
                    foreign key (`album_name`) references Album(`name`));
                    
insert into UserPost values('1', 'elijah', 'This album is so good I can\'t believe it\'s the same songs released again.', '1_02022024.jpg', '', '1989 (Taylor\'s Version)', '2024-02-02', '08:55:00');
insert into UserPost values('2', 'conner', 'good stuff', '', 'Time Today' , 'Time \'n\' Place', '2024-04-03', '13:53:00');
insert into UserPost values('2', 'conner', 'one of my favorite albums right now', '', '', 'Atrocity Exhibition', '2024-04-03', '13:54:00');

-- User specific top 5 artists, with rankings 1-5
create Table TopFiveArtists(
						`uid` int NOT NULL,
                        `position` int NOT NULL, -- 1 -> 5
                        `name` varchar(50) NOT NULL,
                        primary key(`uid`, `position`),
                        foreign key (`uid`) references User(`uid`) on delete cascade,
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
                        primary key(`uid`, `position`),
                        foreign key (`uid`) references User(`uid`) on delete cascade,
                        foreign key(`name`) references Album(`name`),
                        foreign key(`artistname`) references Album(`artist`));
                        
insert into TopFiveAlbums values('1', '1', 'Atrocity Exhibition', 'Danny Brown');
insert into TopFiveAlbums values('1', '2', 'Kids See Ghosts', 'Kids See Ghosts');
insert into TopFiveAlbums values('1', '3', 'Time \'n\' Place', 'Kero Kero Bonito');
insert into TopFiveAlbums values('1', '4', 'Lahai', 'Sampha');
insert into TopFiveAlbums values('1', '5', '1989 (Taylor\'s Version)', 'Taylor Swift');

-- Listened list for all previously listened albums for one user
create Table ListenedList(
						`uid` int NOT NULL,
                        `album` varchar(50),
                        `artist` varchar(50),
                        `dateAdded` date NOT NULL,
                        `rating` int, -- 1 -> 10
                        primary key(`uid`, `album`),
                        foreign key(`uid`) references User(`uid`) on delete cascade,
                        foreign key(`album`) references Album(`name`),
                        foreign key(`artist`) references Artist(`name`));
                        
-- Elijah's Listened List 
insert into ListenedList values(1, 'Time \'n\' Place', 'Kero Kero Bonito', '2024-03-28', 8);
insert into ListenedList values(1, 'Lahai', 'Sampha', '2024-03-28', '9');
insert into ListenedList values(1, '1989 (Taylor\'s Version)', 'Taylor Swift', '2024-03-28', '1');
insert into ListenedList values(1, 'Kids See Ghosts', 'Kids See Ghosts', '2024-03-28', '10');
insert into ListenedList values(1, 'Atrocity Exhibition', 'Danny Brown', '2024-03-28', '10');
             
-- ARTIST QUERIES
-- select * from Artist INNER JOIN(SELECT artist, AVG(rating) AS average_rating FROM listenedlist GROUP BY artist ORDER BY average_rating DESC LIMIT 3) as T ON Artist.name = T.artist; -- top 3 artists
             
-- ALBUM QUERIES
-- select * from album where releaseDate = (select MAX(releaseDate) from album); -- most recently released album
-- select * from Album INNER JOIN(SELECT album, AVG(rating) AS average_rating FROM listenedlist GROUP BY album ORDER BY average_rating DESC LIMIT 3) as T ON Album.name = T.album; -- top 3 rated albums

-- USER QUERIES
-- select MAX(uid) from User; -- selects max UID, which is the most recently created user (used when creating a new account to automatically assign a UID)
-- update User set username = "gelo", bio = "im elijah this is my new bio about me" where uid = 1; -- update bio for user where uid = 1;
-- delete from User where uid = 2; -- deletes user with uid 2

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