# Patients API
Patients RESTful API with Express.
Patients RESTful API. An RESTful API created just for my own educational purposes. I used Express and Sequelize for this project. Also I used Multer for manage images, this images are store into an folder inside the server and referenced it in the database.

## Instructions to use
1. Clone the repository.
2. Import the ___patientsdb.bak___ file in your DBMS.
3. Open a terminal, go to the repository folder and execute `npm install` to install all the dependencies.
4. Create a file inside the ___config___ folder and call it ___db.config.js___. 
5. Copy the code of the ___db.config.example___ file from the ___config___ folder and copy it into your ___db.config.js___ file. Then fill it with your own data. 
6. In a terminal, go to the project folder and execute `node app.js` command to run the API.

## API Endpoints

### Users
- Get all the users.  
    `(GET) http://localhost:3008/api/users`

- Get a user specifying the :userId.  
    `(GET) http://localhost:3008/api/user/:userId`

- Create a new user.  
    `(POST) http://localhost:3008/api/users`

- Update a user specifying the :userId.  
    `(PUT) http://localhost:3008/api/user/:userId`

- Delete a user specifying the :userId.   
    `(DELETE) http://localhost:3008/api/users/:userId`

### Patients
- Get all the patients.  
    `(GET) http://localhost:3008/api/patients`

- Get a user specifying the :patientId.  
    `(GET) http://localhost:3008/api/patient/:patientId`

- Create a new patient.  
    `(POST) http://localhost:3008/api/patients`

- Update a patient specifying the :patientId.  
    `(PUT) http://localhost:3008/api/patient/:patientId`

- Delete a patient specifying the :patientId.   
    `(DELETE) http://localhost:3008/api/patients/:patientId`

### Albums
- Get all the albums owned by the :patientId.  
    `(GET) http://localhost:3008/api/patient/:patientId/albums`

- Get a album specifying the :albumId owned by :patientId.  
    `(GET) http://localhost:3008/api/patient/:patientId/album/:albumId`

- Create a new album for the :patientId.  
    `(POST) http://localhost:3008/api/patient/:patientId/albums`

- Update an album owned by the specified :patientId.  
    `(PUT) http://localhost:3008/api/patient/:patientId/album/:albumId`

- Delete an album owned by the specified :patientId.  
    `(DELETE) http://localhost:3008/api/patient/:patientId/albums/:albumId`

### Files
- Get all images.  
    `(GET) http://localhost:3008/api/files`

- Get all the images owned by the :patientId.  
    `(GET) http://localhost:3008/api/patient/:patientId/files`

- Get an image owned by the :patientId specifying the image name.  
    `(GET) http://localhost:3008/api/patient/:patientId/file/:fileName`

- Upload a new image for the :patientId. Use a UI for this endpoint. A filename it's required.  
    `(POST) http://localhost:3008/api/patient/:patientId/files`

- Update a image owned by the specified :patientId.  
    `(PUT) http://localhost:3008/api/patient/:patientId/file/:fileId`

- Delete an image owned by the specified :patientId.  
    `(DELETE) http://localhost:3008/api/patient/:patientId/files/:fileId`
