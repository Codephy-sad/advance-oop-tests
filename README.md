# Product Inventory System - Full Stack Application

## 📋 Project Overview
This project is a Full-Stack CRUD (Create, Read, Update, Delete) application designed to manage a product inventory. It demonstrates the integration of a **Spring Boot** backend with a **React (TypeScript)** frontend.

## 🚀 Tech Stack
- **Backend:** Java Spring Boot (Maven, Spring Data JPA, H2 Database)
- **Frontend:** React + TypeScript (Vite, Axios)
- **Environment:** GitHub Codespaces / VS Code
## 🛠️ How to Run the Project

### Option 1: Using GitHub Codespaces
1. Open the repository in GitHub.
2. Click **Code** -> **Codespaces** -> **Create codespace on main**.
3. The environment will automatically set up Java and Node.js.
4. Run the backend and frontend in separate terminals as shown below.

### Option 2: Local Development (VS Code)

#### 1. Start the Backend
Open a terminal and run:
```bash
cd backend
./mvnw spring-boot:run

```
#### 2. Start the Frontend
Open a new terminal and run:
```bash
cd frontend
npm install
npm run dev
```

## 📝 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/{id}` | Retrieve a single product |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/{id}` | Update an existing product |
| DELETE | `/api/products/{id}` | Delete a product |

## 💡 Design Decisions
- **H2 Database:** Used an in-memory database for simplicity and easy testing.
- **CORS:** Enabled globally in the controller to allow the React frontend to communicate with the Java backend.