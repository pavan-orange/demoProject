const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser")
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
const addProductRoute = require("./routes/addProductRoute")
const blogDataModel = require("./models/blogData");
var cookieParser = require('cookie-parser')
const cors = require("cors")
const mongoose = require("mongoose");
var morgan = require('morgan');
require('dotenv').config()
// app level middleware
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded());
app.use(morgan('tiny'))
app.use(cors())
// DB Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongodb database connect successfully")
}).catch((error) => {
    console.log("Something goes wrong during API Connection:", error)
})
const data = JSON.parse(fs.readFileSync('services/data.json', 'utf-8'));
const importData = async () => {
    try {
        await blogDataModel.create(data);
        console.log('Data successfully imported');
        process.exit();
    } catch (error) {
        console.log('Error:', error);
        process.exit(1);
    }
};
// importData()
// BASE ROUTE
app.use("/demo/v1/user", userRoute)
app.use("/demo/v1/auth", authRoute)
app.use("/demo/v1/product", addProductRoute)
app.listen(process.env.PORT || 8000, function (err) {
    if (err) {
        console.log("Somethig went wrong to run the server")
        return
    }
    console.log(`Server UP and fire at port ${process.env.PORT}`)
})
// Socket.io setup
// const express = require('express');
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');
// const Message = require("./models/Message")
// const mongoose = require("mongoose");
// require('dotenv').config()
// const app = express();
// const server = createServer(app);
// // const io = new Server(server);
// const io = new Server(server, {
//     connectionStateRecovery: {}
// });
//  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//         console.log("Mongodb database connect successfully")
//     }).catch((error) => {
//         console.log("Something goes wrong during API Connection:", error)
//     })
// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, '/views/index.html'));
// });

// io.on('connection', async (socket) => {
//     // socket.on('chat message', (msg) => {
//     //     console.log('message: ' + msg);
//     // });
//     // Send previous messages to the connected user
//     // const messages = await Message.find().sort({ timestamp: 1 });
//     // socket.emit("chat history", messages);

//     socket.on('chat message', async(msg) => {
//         try {
//             // Save message in MongoDB
//             const newMessage = new Message({content:msg});
//             await newMessage.save();
//             // send message to all client
//             // io.emit('chat message', msg);
//             // io.emit('chat message', { msg, timestamp: newMessage.timestamp });
//             io.emit('chat message', msg, newMessage.timestamp,newMessage.id);

//         } catch (error) {
//             return console.error("Error saving message:", error);
//         }
//     });
//   if (!socket.recovered) {
//     // if the connection state recovery was not successful
//     try {
//         const messages = await Message.find().sort({ timestamp: 1 });
//     socket.emit("chat history", messages,messages.timestamp);
//     //   await db.each('SELECT id, content FROM messages WHERE id > ?',
//     //     [socket.handshake.auth.serverOffset || 0],
//     //     (_err, row) => {
//     //       socket.emit('chat message', row.content, row.id);
//     //     }
//     //   )
//     } catch (e) {
//       // something went wrong
//     }
//   }
// });
// server.listen(8000, () => {
//     console.log('server running at http://localhost:8000');
// });
