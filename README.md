# 💬 Real-Time Customer Support Chatbot

A simple real-time customer service chatbot built with **Node.js**, **Socket.io**, **MySQL**, **HTML/CSS/JS**. It simulates a customer-agent interaction and supports smart auto-replies using keyword matching.

---

## 🚀 Features

- 🔌 Real-time chat via Socket.IO
- 🧠 Smart automated replies based on common customer queries
- 💾 Stores chat history in a MySQL database
- 🕵️ Shows sender name and timestamp for each message
- 🌐 Frontend served with static HTML, CSS, and vanilla JavaScript
- 🔐 Secure environment config using `.env` file

---

## 📷 Demo (Screen Recording)

> _[Include your screen-recording video or link here after uploading it, e.g., Loom, YouTube, or GitHub assets]_

---

## 🛠 Technologies Used

- **Node.js + Express** – Backend server
- **Socket.IO** – Real-time WebSocket communication
- **MySQL** – For storing chat messages
- **HTML/CSS/JS** – Frontend UI
- **dotenv** – Secure environment variable management

---

## 📁 Project Structure

project/ ├── server/ │ ├── server.js # Backend logic │ ├── .env # Environment variables (not committed) │ └── public/ # Static frontend files │ └── index.html ├── README.md └── package.json



---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/server

2. Install Dependencies

npm install

3. Setup Environment Variables
Create a .env file inside the server/ folder:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=chatbotdb

4. Start MySQL and Create Database
Log into MySQL and create the required table:

CREATE DATABASE chatbotdb;

USE chatbotdb;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender VARCHAR(255),
  receiver VARCHAR(255),
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


5. Start the Server

node server.js


6. Open in Browser
Go to:

http://localhost:3000

🤖 Test the Bot
You can try asking the bot things like:

“Hello”

“What are your features?”

“I need help”

“How can I return an item?”

“What is the price?”

“How to reset my password?”

It will respond with a predefined smart message.