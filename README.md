# AI-Based Portal

A web portal that allows users to describe an app they want, captures the requirements using AI, and generates a simple mock UI based on those requirements. Built using **React**, **Node.js**, and **MongoDB**, and deployed live for easy access.  

**Live Demo:** [https://ai-based-portal.vercel.app/](https://ai-based-portal.vercel.app/)  

---

## Objective

The project aims to:

1. Capture app requirements from a user’s description.  
2. Extract structured information (App Name, Entities, Roles, Features) using an AI API.  
3. Generate a **simple, mock user interface** dynamically based on the captured requirements.  

This portal demonstrates the integration of AI with web development to automate basic app prototyping.

---

## Features

### Requirement Capture Portal
- Input box for users to describe their app idea.
- Submit button to extract structured requirements.
- Display extracted data:
  - **App Name**  
  - **Entities**  
  - **Roles**  
  - **Features**

### Dynamic UI Generation
- Generates forms for each entity with relevant input fields.
- Creates menus/tabs for roles and features.
- Mock/demo UI — not fully functional, but visually represents the app structure.

### Frontend
- Built using **React**.
- Clean, simple, and easy-to-navigate interface.

---

## Example

**User Input:**  
> "I want an app to manage student courses and grades. Teachers add courses, students enrol, and admins manage reports."

**AI Captured Requirements:**  
- App Name: **Course Manager**  
- Entities: **Student, Course, Grade**  
- Roles: **Teacher, Student, Admin**  
- Features: **Add course, Enrol students, View reports**

**Generated UI:**  
- **Menu:** Student | Teacher | Admin  
- **Forms:**  
  - Student → Name, Email, Age  
  - Course → Title, Code, Credits  
  - Grade → Student, Course, Grade  

---

## Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Deployment:** Vercel (Frontend), Render (Backend)  
- **AI API:** Deepseek-ai API for requirement extraction  

---

## Setup Instructions

### Prerequisites
- Node.js >= 16  
- MongoDB account / Atlas cluster  
- npm or yarn  

### Clone Repository
```bash
git clone https://github.com/FatimaBadar/Ai-based-portal.git
cd Ai-based-portal

## Backend Setup
```bash
cd Server
npm install

### Create a .env file with the following variables:
PORT=3000
ATLAS_URL=<your_mongodb_connection_string>
HUGGING_FACE_API_KEY=<your_openai_api_key>

### Start backend server:
```bash
npm start

##Frontend Setup

### Create a .env file with the following variables:
VITE_SERVER_API_BASE_URL=http://localhost:3000/api

```bash
cd ../Frontend
npm install
npm run dev

Frontend runs on http://localhost:5173 and Backend on http://localhost:3000 by default.

Enter app descriptions and see requirements extraction and UI generation in action.
