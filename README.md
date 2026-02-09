# CollabX v0.1 🚀

**Connect. Collaborate. Code.** A college-wide collaboration platform designed to bridge the gap between students seeking help on software projects and peers willing to contribute.

## 🧐 The Problem

In college, students often work independently on coursework, hackathons, or personal projects. While building these, they frequently face roadblocks—bugs, lack of experience with a specific tech stack, or the need for extra hands to implement features.

**Current challenges:**
* **Siloed Development:** Students rely on small friend circles for help, limiting their learning potential.
* **Missed Opportunities:** Skilled students often want to contribute to projects but don't know where to find them.
* **Lack of Structure:** There is no centralized platform to transparently share projects, describe issues, and invite collaboration.

## 💡 The Solution

**CollabX** is a centralized hub where students can openly share their ongoing projects. It creates a structured workflow for seeking help and offering expertise.

* **For Project Owners:** Post your project, describe the issue, and invite the best talent on campus to help you fix bugs or build features.
* **For Contributors:** Browse the feed, find projects matching your tech stack, and build your portfolio by solving real-world problems.

## ✨ Key Features (v0.1)

### 1. 📢 Create & Manage Help Posts
* Share project details including **Title**, **Description**, **Tech Stack**, and **GitHub Repository Link**.
* Define specific "Expected Contributions" (e.g., "Fix API bug," "Design Landing Page").
* Mark posts as **Open** or **Closed** based on completion status.

### 2. 🤝 Contribution Workflow
* **Request System:** Students can send a "Request to Contribute" with a personalized message.
* **Owner Control:** Project owners can view requester profiles and **Accept** or **Reject** requests.
* **Team Management:** Multiple contributors can be accepted for a single project.

### 3. 🔍 Discovery Feed
* A global feed visible to all students to explore active projects.
* Search functionality to find projects by keywords or tech stacks.

### 4. 👤 Developer Profiles
* User profiles displaying **Skills**, **GitHub links**, and bio.
* **"My Contributions"** section to showcase projects a student has successfully joined.

## 🗄️ Database Schema (v0.1)

The following diagram outlines the initial database structure for the application, illustrating the relationships between Users, Help Posts, and Contribution Requests.

![CollabX v0.1 Database Schema](https://ik.imagekit.io/u47fxtwat/Screenshot%202026-02-10%20014023.png)

## 🛠️ Tech Stack

This project is built using the **MERN** stack with a modern, dark-themed UI.

* **Frontend:** React.js, Tailwind CSS, Lucide Icons.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB.
* **Authentication:** JWT (JSON Web Tokens).

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v14 or higher)
* MongoDB (Local or Atlas URL)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/shashank2327/CollabX.git]
    cd CollabX
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    * Create a `.env` file in the `backend` folder:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```
    * Start the server:
        ```bash
        nodemon test.js
        ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```
    * Start the React app:
        ```bash
        npm run dev
        ```

4.  **Access the App**
    Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Open Source starts here. Built for students, by students.**
