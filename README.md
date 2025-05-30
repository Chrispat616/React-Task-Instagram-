#REACT-TASK: To build a social application like Instagram

Overview:
This is a social app project similar to Instagram with interaction features and all
Features:

- User can login with email, username,fullname and password.
- While logged in, the user can create image posts
- User can start a chat with another user by clicking on messages on the sidebar, searching their username and adding them with the "add user" button
- User can also delete their image posts
- User can follow and unfollow other users
- User can find other users by searching them using the search on the sidebar.
- User can also see posts from other users they are following on their feed
- User can comment on their post and others' post
- User can delete their own comment
- User can reply to other comment and theirs
- User can like and unlike posts

The app is intuitive and provides real-time feedback, ensuring a seamless user experience.

Installation and Setup
Prerequisites
Before proceeding, ensure you have the following installed:

-Node.js
Steps to Install and Run

Create the environment file:

make create-env
(This checks if a .env file exists.
If not, it copies .env.example to .env.)
add the following keys

VITE_API_KEY=your_api_key_here

VITE_AUTH_DOMAIN=your_auth_domain

VITE_PROJECT_ID=your_project_id

VITE_STORAGE_BUCKET=your_storage_bucket

VITE_MESSAGING_SENDER_ID=your_messaging_sender_id

VITE_APP_ID=your_app_id

VITE_MEASUREMENT_ID=your_measurment_id

Install dependencies:
npm install

Start the development server:
npm run dev
