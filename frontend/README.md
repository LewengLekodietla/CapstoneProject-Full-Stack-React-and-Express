# Capstone Project: Full-Stack GitHub User Explorer (React + Express)

This project is a full-stack web application built with **React** (frontend) and **Express** (backend) that allows users to:

- Search for GitHub users by username
- View user profiles and bios
- Explore public repositories
- See the latest 5 commits of any repository

> ✅ Built as part of the HyperionDev Capstone IV project.

---

## 📁 Project Structure

```
CapstoneProject-Full-Stack-React-and-Express/
├── backend/
│   ├── controllers/
│   │   └── githubController.js
│   ├── tests/
│   │   └── githubController.test.js
│   ├── routes.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Search.js
│   │   ├── pages/
│   │   │   └── UserProfile.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── tests/
│   │   │   ├── Search.test.js
│   │   │   └── UserProfile.test.js
│   │   ├── App.js
│   │   └── setupTests.js
│   ├── public/
│   └── package.json
├── README.md
└── package-lock.json
```

---

## 🛠️ Technologies Used

- **Frontend:** React 18, Axios, React Router DOM, Jest, React Testing Library
- **Backend:** Node.js, Express, Axios, Jest, Supertest
- **Security:** Helmet, CORS
- **Environment Management:** dotenv

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/LewengLekodietla/CapstoneProject-Full-Stack-React-and-Express.git
cd CapstoneProject-Full-Stack-React-and-Express
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Add your GitHub token to the .env file
npm install
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

---

## 🔐 .env Configuration

Create a `.env` file in your `backend` directory:

```
PORT=8080
GITHUB_TOKEN=your_github_personal_access_token
```

> ⚠️ Your token must have **public_repo** access if rate-limiting issues arise.

---

## 🧪 Running Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

---

## 📸 Screenshots
*Coming soon...*

---

## 📌 Features Implemented

- ✅ GitHub User Search
- ✅ Profile Detail View
- ✅ Repository List
- ✅ Last 5 Commits Per Repo
- ✅ Axios-based API communication
- ✅ Unit Tests (Frontend & Backend)
- ✅ Modular File Structure
- ✅ Error & Loading Handling

---

## 🧠 Author

**Leweng Makgopa**  
HyperionDev Capstone Project IV

---

## 📄 License

This project is licensed for educational purposes only.

---

## 🙌 Acknowledgements

- GitHub REST API
- HyperionDev Bootcamp (Full-Stack Development)