
import { Server } from "socket.io";
import connectDB from "./database/db.js";
import { config } from "dotenv";
import express from "express";
import { updateDocument, getDocuments } from "./controller/document-controller.js";

config();
const PORT = process.env.PORT || 5000;

const app = express();

// Create an HTTP server using Express
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
connectDB();

io.on("connection", (socket) => {
    socket.on('get-document', async (documentId) => {
        const document = await getDocuments(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.content);

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async (data) => {
            updateDocument(documentId, data);
        });
    });
});