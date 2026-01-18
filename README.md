# Product Inventory System - Full Stack Application

## 📋 Project Overview
This project is a Full-Stack CRUD (Create, Read, Update, Delete) application designed to manage a product inventory. It demonstrates the integration of a **Spring Boot** backend with a **React (TypeScript)** frontend.

## 🚀 Tech Stack
- **Backend:** Java Spring Boot (Maven, Spring Data JPA, H2 Database)
- **Frontend:** React + TypeScript (Vite, Axios)
- **Environment:** GitHub Codespaces / VS Code

## 🏗️ High-Level System Architecture
The system follows a standard Client-Server architecture:
*   **Frontend (Client):** Built using React and TypeScript. It serves as the user interface where users can view the inventory in a table format and interact with a form to add or edit products. It uses `Axios` to send HTTP requests to the backend.
*   **Backend (Server):** Built using Java Spring Boot. It exposes a RESTful API. The `ProductController` handles incoming HTTP requests and communicates with the `ProductRepository`.
*   **Database:** An H2 in-memory database is used for data persistence during the application runtime. It is accessed via Spring Data JPA.

## 🔄 Interaction between Frontend, Backend, and Codespaces
*   **Codespaces/Dev Container:** The project includes a `.devcontainer` configuration. This ensures that any developer opening the project on GitHub Codespaces gets a pre-configured environment with Java 17 and Node.js installed automatically.
*   **Communication:** When a user clicks "Add" on the frontend, React sends a JSON object (e.g., `{ "name": "Laptop", "price": 1000 }`) to the Spring Boot endpoint `http://localhost:8080/api/products`. The backend saves this to the database and returns the saved object with a generated ID.

## ⚙️ CRUD Workflow Explanation
*   **Create:** The user fills the form. `handleSubmit` function calls `axios.post()`. The backend `create()` method saves the entity using `repo.save()`.
*   **Read:** On page load (`useEffect`), the frontend calls `axios.get()`. The backend `getAll()` method returns a list of all products from the database.
*   **Update:** Clicking "Edit" populates the form with existing data. Submitting calls `axios.put()` with the specific ID. The backend updates the existing record.
*   **Delete:** Clicking "Delete" calls `axios.delete()`. The backend `delete()` method removes the record by ID.

## 🧠 Object-Oriented Principles Used
*   **Encapsulation:** The `Product` class uses private fields (`id`, `name`, `price`) with public Getters and Setters to control access to the data.
*   **Inheritance:** The `ProductRepository` interface extends `JpaRepository`, inheriting all standard database methods (save, findAll, delete) without writing SQL manually.
*   **Abstraction:** The implementation details of the database connections are hidden behind the Spring Data JPA interfaces.

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