
# Learning Management System

## Overview
The Learning Management System (LMS) is a  full-stack application crafted to manage and  deliver the education content. It serves as a comprehensive platform where instructors can create and manage courses, and students can access and enroll in courses tailored to their learning needs.

## Features

### For Instructors
- Create, edit, and delete courses effortlessly using a user-friendly interface.
- Add, manage, and organize lectures within courses for streamlined content delivery.
- Efficient tools to maintain and modify course content as needed.

### For Students
- Browse and enroll in both free and premium courses with ease.
- Rate courses and provide feedback to help others make informed choices.
- Access a detailed purchase history for better tracking of enrolled courses.

### General Features
- Intuitive and fully responsive design ensures a seamless experience across all devices and platforms.
- Highly interactive and visually appealing user interface.

## Technology Stack

- **Frontend**: React (Vite), TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: 
  - **Client**: Hosted on Vercel at [codeacademy-vishal.vercel.app](https://codeacademy-vishal.vercel.app)
  - **Server**: Hosted on AWS at [codeacademy.root.sx](http://codeacademy.root.sx)

## Installation

### Prerequisites
- Ensure Node.js and MongoDB are installed on your system.

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/vishalamin200/Learning_Management_System
   cd Learning_Management_System
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Backend setup
   cd Server
   npm install

   # Frontend setup
   cd ../Client
   npm install
   ```

3. Configure environment variables:
   - Create `.env` files in both `Server` and `Client` directories.
   - Add relevant configurations such as database URI, API keys, and server ports.

4. Start the development servers:
   ```bash
   # Run backend server
   cd server
   npm run start

   # Run frontend client
   cd ../client
   npm run dev
   ```

5. Access the application locally:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:4050`


