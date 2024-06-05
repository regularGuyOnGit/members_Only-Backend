# **ChatRoom**
### Description
This project is a backend application built using Node.js,Express.js. It provides a platform where users can log in to view messages posted by other users. The visibility of message details varies based on user roles, and only administrators have the privilege to delete messages.

### **Features**
+ User Authentication: Users are prompted to log in.

+ Role-Based Message Viewing:
1 Elite Members: Can see the message title, content, and date.
2 Non-Elite Members: Can only see the message content.

+ Message Management:
1 Admin: Can delete messages.

+ Technologies Used
1 Backend: Node.js
2 Database: MongoDB

## Setup Instructions
1 Clone the repository:
+ bash
+ Copy code
+ git clone https://github.com/regularGuyOnGit/members_Only-Backend.git
  
2 Navigate to the project directory:
+ bash
+ Copy code
+ cd project name

3 Install the dependencies:
+ bash
+ Copy code
+ npm install

4 Set up environment variables:
+ Create a .env file in the root directory and add the following variables:
+ env
+ Copy code
+ DB_CONNECTION_STRING=your_database_connection_string
+ SECRET= your_session_secret

5 Start the application:
+ bash
+ Copy code
+ npm start


## Contributing
+ Fork the repository.
+ Create a new branch (git checkout -b feature-branch).
+ Make your changes.
+ Commit your changes (git commit -m 'Add some feature').
+ Push to the branch (git push origin feature-branch).
+ Open a pull request.

#### License
This project is licensed under the MIT License.

Contact
For any inquiries or support, please reach out to nitinrai3000@gmail.com
