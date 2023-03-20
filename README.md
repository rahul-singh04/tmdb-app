Title: TMDB-app 

Description:
This is a frontend web application built with React that allows users to create and manage their movie and TV show watchlists. The application utilizes the TMDB API to retrieve movie and TV show data, ensuring that users have access to the latest and most up-to-date information. With a clean and intuitive user interface.

The application features authentication using tmdb's api, I obtain the session id by succesfully authentication and then storing it in browser cookies, allowing users to securely login and access their saved watchlists and list of favourite movies. Users can view and update their saved lists of favorite movies or TV shows, and can also save favorite items to browsers's local storage if not logged in.

In addition, the application includes a global search feature that allows users to search for movies, TV shows, and people across the entire database. Users can sort movies based on popularity and rating, providing an easy way to discover new content.

To ensure a smooth user experience, the application includes a loading state when performing searches and utilizes debouncing to limit the number of API calls made.

Used React router for navigation also used context api to store information regarding a list of top trending movies.

Also added pagination allowing user to browse through movies.

Created Modal for the login function using ReactDom's create Portal method
