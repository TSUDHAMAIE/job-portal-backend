# job-portal-backend
A **Node.js + Express + MongoDB** backend for a university job portal with role-based authentication, authorization, and job management features.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Available Routes](#available-routes)  
- [User Roles](#user-roles)  
- [License](#license)  

---

## Features

- User authentication with **JWT tokens**  
- Role-based access control:
  - **Chief Administrator**: Full CRUD on students, staff, coordinators, and job notifications  
  - **Placement Coordinator**: Manage student eligibility, job status, and view reports  
  - **PAT Staff**: Approve student profiles, track job applications  
  - **Student**: Create/update profile, upload resumes, opt-in/out for jobs  
- Password hashing & **secure login**  
- Login/logout timestamp tracking  
- Password expiration policy (90 days)  
- Email & phone verification after signup  

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT, bcrypt  
- **Version Control:** Git, GitHub  

---

## Installation
1. Clone the repository:

```bash
git clone https://github.com/TSUDHAMAIE/job-portal-backend.git
cd job-portal-backend
npm install
```
## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=90d
EMAIL_USER=<your_email_for_verification>
EMAIL_PASS=<your_email_password>
```
