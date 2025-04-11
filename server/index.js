const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Create HTTP and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'chat_app',
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// WebSocket Chat Handling
io.on('connection', (socket) => {
  console.log('🔌 A user connected');

  socket.on('send_message', (data) => {
    const { sender, receiver, message } = data;

    // Broadcast to all clients
    io.emit('receive_message', data);

    // Save message to DB
    db.query(
      'INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)',
      [sender, receiver, message],
      (err) => {
        if (err) console.error('❌ DB insert error:', err.message);
      }
    );

    // Simulate bot reply
    setTimeout(() => {
      const msg = message.toLowerCase();
      const commands = [
        { keywords: ['hello', 'hi'], reply: `Hi ${sender}! 👋 How can I assist you today?` },
        { keywords: ['help', 'assistant', 'support'], reply: `Of course, ${sender}. I'm here to help! Could you tell me more about the issue you're facing?` },
        { keywords: ['problem', 'issue'], reply: `I'm sorry you're experiencing trouble, ${sender}. Please provide a few more details so I can assist better.` },
        { keywords: ['price', 'cost'], reply: `Prices vary depending on the item. Can you let me know which product you're referring to, ${sender}?` },
        { keywords: ['refund'], reply: `No worries, ${sender}. Refunds are processed in 5–7 business days. Do you want to initiate one?` },
        { keywords: ['return'], reply: `You can return items within 30 days, ${sender}. Would you like to start a return request?` },
        { keywords: ['delivery', 'shipping'], reply: `Shipping usually takes 3–5 business days, ${sender}. Need help tracking your order?` },
        { keywords: ['delay'], reply: `Apologies for the delay, ${sender}. Let me check your order status right away.` },
        { keywords: ['cancel'], reply: `To cancel an order, I’ll need your order number, ${sender}. Could you provide that?` },
        { keywords: ['contact'], reply: `You can reach us at support@example.com or continue chatting with me here, ${sender}.` },
        { keywords: ['account'], reply: `You can manage your account under the “Settings” tab, ${sender}. Need help with anything specific?` },
        { keywords: ['login', 'signin'], reply: `Having trouble logging in, ${sender}? Make sure your email and password are correct. Need a reset link?` },
        { keywords: ['signup', 'register'], reply: `To sign up, click the “Register” button and fill in your details. Let me know if you get stuck, ${sender}.` },
        { keywords: ['password'], reply: `If you forgot your password, just click “Forgot Password” on the login page, ${sender}.` },
        { keywords: ['offer', 'discount'], reply: `Great news, ${sender}! 🎉 We currently have a 10% discount on selected items.` },
        { keywords: ['warranty'], reply: `Most items come with a 1-year warranty, ${sender}. Want me to check the warranty on a specific product?` },
        { keywords: ['damaged'], reply: `I'm really sorry about the damage, ${sender}. Could you upload a photo so we can file a replacement request?` },
        { keywords: ['technical'], reply: `Let’s sort this out, ${sender}. Can you describe the technical issue you're facing?` },
        { keywords: ['slow', 'lag'], reply: `Please try clearing cache or restarting the app, ${sender}. Still having issues? I can escalate this.` },
        { keywords: ['update'], reply: `You can update the app from the Play Store or App Store, ${sender}. The latest version includes performance fixes.` },
        { keywords: ['feedback'], reply: `We’d love your feedback, ${sender}! 😊 Please let us know how we can improve.` },
        { keywords: ['complaint'], reply: `I’m really sorry to hear that, ${sender}. Would you like to lodge a formal complaint?` },
        { keywords: ['location'], reply: `Our headquarters is in Hyderabad, India 🇮🇳. Want the full address, ${sender}?` },
        { keywords: ['availability'], reply: `Sure ${sender}, can you tell me which product you're checking availability for?` },
        { keywords: ['inventory'], reply: `I’ll check our inventory for that item, ${sender}. Please give me a second.` },
        { keywords: ['opening hours'], reply: `We’re open Monday to Friday from 9AM to 6PM IST, ${sender}.` },
        { keywords: ['thank'], reply: `You’re most welcome, ${sender}! 🙌 Let me know if there’s anything else I can do.` },
        { keywords: ['bye', 'goodbye'], reply: `Goodbye, ${sender}! 👋 Have a great day and feel free to chat with us again.` },
        { keywords: ['payment'], reply: `We support credit cards, UPI, and net banking, ${sender}. Need help completing a payment?` },
        { keywords: ['invoice'], reply: `Sure ${sender}, I can send your invoice. Can you confirm your order number?` },
        { keywords: ['feature', 'features'], reply: `Great question, ${sender}! Here are some key features of our service:\n- 🔍 Real-time chat with instant support\n- 💬 Quick replies for FAQs\n- 📦 Order tracking & support\n- 🔐 Account management help\n- 📄 Chat history & saved messages\nLet me know if you want more info on any of these.` },
      ];

      const found = commands.find(cmd =>
        cmd.keywords.some(kw => msg.includes(kw))
      );

      const replyMessage = found
        ? found.reply
        : `Hi ${sender}, I’m not sure I understand. Can you rephrase that or ask about orders, refunds, login, etc.?`;

      const botReply = {
        sender: 'Agent',
        receiver: sender,
        message: replyMessage,
      };

      io.emit('receive_message', botReply);

      db.query(
        'INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)',
        [botReply.sender, botReply.receiver, botReply.message],
        (err) => {
          if (err) console.error('❌ DB insert error (bot):', err.message);
        }
      );
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected');
  });
});

// REST API to get message history
app.get('/messages', (req, res) => {
  db.query('SELECT * FROM messages ORDER BY timestamp ASC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Serve frontend HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
