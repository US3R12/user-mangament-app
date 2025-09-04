# User Management App

Backend: Strapi  
Frontend: Next.js (TS)


## Project Setup Instructions

1. **Clone the repository**

git clone <your-repo-url>
cd <your-project-folder>

text

2. **Install dependencies**

npm install

or
yarn install

text

---

## How to Run

### Backend

- The backend runs on Strapi (or your chosen backend)
- Make sure Strapi is installed and running on `http://localhost:1337`
- Run the backend server (adjust according to your backend setup)

cd backend
npm run develop

text

### Frontend

- The frontend is a Next.js app (React framework)
- To start the development server:

npm run dev

or
yarn dev

text

- Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

---

## Features
 
- Pagination and server-side search/sort of users  
- User add form with validation  
- Responsive UI with Tailwind CSS  
- Integration with backend API for user data  

---

## Assumptions & Decisions

- Backend API follows REST conventions and runs locally on port 1337.
- The application assumes modern browsers supporting CSS variables and JavaScript ES6+.
- Date fields are handled with native HTML `<input type="date">` for simplicity.
- Form validation is minimal; additional validation can be added as needed.

---

## Usage Notes

- Pagination page size is fixed at 5 users per page.
- Account numbers in the user list are masked except the first and last 3 digits.
- Navigation includes Home, Users List, and Add User pages.

---

## License

This project is licensed under the MIT License.

---

## Contact

Developed by Shaik Faizal Meeran - shaikfaizal1414@gmail.com

---
