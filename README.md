## Elijah Gott - Senior Design Project

### About

This is my unnamed senior design project, hence the "Music App" title. It is mainly inspired by Letterboxd (https://letterboxd.com/), which I have found useful for tracking the movies I want to watch and have already watched, and rating them. In a previous course, a partner and I made a similar, yet very simple, application for video games, so it felt natural for my Senior Design Project to be in the same vein, but expanded upon.

The main purpose of this project is to aid in tracking and rating albums you have listened to. However, there are plenty of other functions that naturally coincide with this main objective. For example, creating and signing into accounts, updating info about these accounts, creating lists for each account, adding new albums and artists into the database, and many more functions were needed just for the basic functionality of the project. 

### Design

This app was designed using React and React Bootstrap, so many of the smaller aesthetic choices, like the rounded corners on buttons, for example, were predetermined by the bootstrap. I wanted the overall look to feel somewhat professional, but not boring, which led me to choose dark blue and light gray as the main colors, with black text and a white background on the main content for readability. In a few places, I left buttons disabled to show that I have plans for further functionality, but I may have run out of time, not quite figured out how to implement the functionality, or felt that it was more important to add functionality elsewhere before coming back to implement this at a later time. 

### Technical Details

This project uses React (https://react.dev/) for the Frontend, Javascript for the Backend, and React Bootstrap (https://react-bootstrap.netlify.app/) and CSS for the styling.  
The SQL database was created using MySQL (https://www.mysql.com/), and XAMPP (https://www.apachefriends.org/) is used to run a local Apache server and a local MySQL server.  
To run the local server to view/debug the webpages, NPM is used (https://www.npmjs.com/).

### Known Issues

Due to myself having no prior experience with JavaScript or React, and very little experience overall in web development, there are some glaring issues with the Music App. Many of these are things that will get fixed over time, however they were not deemed important enough to focus my efforts on at this time. Some of these issues are:

- Passwords are stored in database
- Refreshing the page signs the user out
- Unable to upload images for profile pictures, artist photos, or album cover photos. 
- When entering a photo file name for Artists or Albums that is not present in the /MusicImages folder, the Artists or Albums page will crash. 
    - To avoid this, only enter a file name that is already present in the /MusicImages folder, or enter no file name at all. 

### Planned Features

With further development time, I would like to implement many more features to the app, including:

- Scrape data from Spotify for artists, albums, and potentially songs.
- Display album tracklists
- Add DMs between users
- Add ability for users to review albums, rather than just rate them. 

### Getting Started

#### (1) Using XAMPP:

    1. After installing, open XAMPP Control Panel and start the Apache and MYSQL servers.
        - The default ports for the Apache server should be 80, 443
        - The default ports for the MYSQL server should be 3306

    2. In your browser, type "localhost/dashboard" into the address bar, and 
        navigate to phpMyAdmin using the top Navbar. 

    3. At the top of phpMyAdmin, click "Import" to import the MYSQL database.

    4. Choose the "sdp.sql" file located in the /seniordesignproject folder, 
        and click import at the bottom of the page. 

    5. You should now see the sdp database present on the left-side database
        listing. 

#### (2) Run Frontend server from terminal:

    1. Open a terminal in the /seniordesignproject directory

    2. <.../seniordesignproject> cd Frontend 

    3. <.../seniordesignproject/Frontend> npm start 

#### (3) Run backend server from terminal:
##### NOTE: You must start the XAMPP Apache and MYSQL servers BEFORE running the backend server. 

    1. Open a terminal in the /seniordesignproject directory

    2. <.../seniordesignproject> cd Backend

    3. <.../seniordesignproject/Backend> npm start

### (4) Use the app!

    - You can now use the app. You will need to create an account to use all of the app's 
        features, but there are some features accessible without making an account. 
        - The account I've used for testing is:
            username: elijah
            password: 1234
    - NOTE
        - There is a rare issue where the XAMPP MySQL database gives an error and will not start. 
           The only solution I have found for this is to uninstall and reinstall XAMPP. 
