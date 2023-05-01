# scienox-backend-api-nodejs

Nodejs backend APIs for the MVP

## Api documentation with examples (Postman)

<https://documenter.getpostman.com/view/26608704/2s93eU1ttn>

## Implemented features

- User registration and login
- Separate authorisation for admin, instructor, student
- Hierarchical permission levels for each user type (admin > instructor > student)
- Proper error handling, response status codes and error messages
- User management (create, update, get one, get all, delete)
- Course management (create, update, delete, get one, get all, enroll, unenroll)
- Lecture management (create, update, delete, get one, get all, upload lecture files)

## Libraries / Frameworks used

- Nodejs - <https://nodejs.org/en/docs>
- Express - <https://expressjs.com/en/5x/api.html>
- MongoDB - <https://www.mongodb.com/docs/>
- Mongoose - <https://mongoosejs.com/docs/guide.html>
- JSON - <https://www.npmjs.com/package/jsonwebtoken>
- Multer - <https://www.npmjs.com/package/multer>
- Bcrypt - <https://www.npmjs.com/package/bcrypt>

## Getting Started

Clone this repository or download as zip and extract

Create a .env file and copy contents of .env.sample to the .env file

Enter the value of MONGO_URI and change othervalues if required

Install dependancies

```
npm install
```

Start the development server:

```
npm run dev
```

Backend server will start running on <http://localhost:3000> or other port as value given for API_PORT in .env file

## API endpoints

```
{{basURL}}
        |__ /auth
        |       |__ /register
        |       |__ /login
        |__ /users
        |       |__ /create-user
        |       |__ /get-users
        |       |__ /get-user/{userType}/{userId}
        |       |__ /update-user/{userType}/{userId}
        |       |__ /delete-user/{userType}/{userId}
        |__ /course
        |       |__ /create-course
        |       |__ /get-courses
        |       |__ /get-course/{courseId}
        |       |__ /update-course/{courseId}
        |       |__ /delete-course/{courseId}
        |       |__ /enroll-course/{courseId}
        |       |__ /unenroll-course/{courseId}
        |__ /lectures
                |__ /create-lecture
                |__ /get-lectures
                |__ /get-lecture/{lectureId}
                |__ /update-lecture/{lectureId}
                |__ /delete-lecture/{lectureId}
                |__ /upload-lecture-file/{lectureId}
```

## Directory structure

```
scienox-backend-api-nodejs
        |__ config
        |       |__ express.js
        |       |__ mongoose.js
        |__ constants
        |       |__ resCodes.js
        |__ controllers
        |       |__ auth
        |       |       |__ login.js
        |       |       |__ register.js
        |       |__ courses
        |       |       |__ create-course.js
        |       |       |__ delete-course.js
        |       |       |__ enroll-course.js
        |       |       |__ get-course.js
        |       |       |__ get-courses.js
        |       |       |__ unenroll-course.js
        |       |       |__ update-course.js
        |       |__ lectures
        |       |       |__ create-lecture.js
        |       |       |__ delete-lecture.js
        |       |       |__ get-lecture.js
        |       |       |__ get-lectures.js
        |       |       |__ update-lecture.js
        |       |       |__ upload-lecture-file.js
        |       |__ users
        |               |__ create-user.js
        |               |__ delete-user.js
        |               |__ get-user.js
        |               |__ get-users.js
        |               |__ update-user.js
        |__ middlewares
        |       |__ document-upload.js
        |       |__ image-upload.js
        |       |__ verifyAuth.js
        |__ models
        |       |__ Admin.js
        |       |__ Course.js
        |       |__ File.js
        |       |__ Instructor.js
        |       |__ Lecture.js
        |       |__ Student.js
        |__ routes
        |       |__ auth.js
        |       |__ courses.js
        |       |__ lectures.js
        |       |__ users.js
        |__ uploads
        |       |__ images
        |       |       |__ sample.jpeg
        |       |__ uploadedLectureFiles
        |               |__ dummy.pdf
        |__ .env
        |__ .env.sample
        |__ .gitignore
        |__ index.js
        |__ package-lock.json
        |__ package.json
        |__ README.md
```
