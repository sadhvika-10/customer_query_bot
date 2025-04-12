# 💬 customer_query_bot

A real-time customer support chatbot built with **Node.js**, **Socket.io**, **MySQL**, and **HTML/CSS/JS**. This project simulates customer-agent conversations and provides intelligent auto-responses using keyword matching.

---

## 🚀 Features

- 🔌 Real-time messaging using Socket.IO
- 🧠 Auto-responses based on common queries
- 📂 Chat history stored in a MySQL database
- 🕵️ Displays sender names and timestamps
- 🌐 Clean frontend using plain HTML, CSS, and JavaScript
- 🔐 Secure environment configuration using `.env` file

---

## 📷 Demo (Screen Recording)

🎥 [Watch the demo video on Google Drive](https://drive.google.com/file/d/1gEVIRit18XSai_VmCzi0bjgSYuPXrlzQ/view?usp=drivesdk)

---

## 🛠 Technologies Used

- **Node.js + Express** – Backend server
- **Socket.IO** – Real-time WebSocket communication
- **MySQL** – Chat message storage
- **HTML/CSS/JS** – Frontend interface
- **dotenv** – Environment variable handling

---

## 📁 Project Structure

```
customer_query_bot/
├── server/
│   ├── server.js         # Backend logic
│   ├── .env              # Environment variables (not pushed to GitHub)
│   └── public/           # Frontend files
│       └── index.html
├── README.md
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/customer_query_bot.git
cd customer_query_bot/server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables  
Create a `.env` file inside the `server/` directory:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=chatbotdb
```

### 4. Start MySQL and Set Up the Database
Login to your MySQL terminal and run:

```sql
CREATE DATABASE chatbotdb;

USE chatbotdb;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(255),
  receiver VARCHAR(255),
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the Server
```bash
node server.js
```

### 6. Open in Browser  
Go to:  
[http://localhost:3000](http://localhost:3000)

---

## 💬 Try Asking the Bot:

- “Hello”
- “What are your features?”
- “I need help”
- “How can I return an item?”
- “What is the price?”
- “How to reset my password?”

The bot will respond with smart, predefined answers.

