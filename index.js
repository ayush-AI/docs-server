
import { Server } from "socket.io";
import connectDB from "./database/db.js";
import { config } from "dotenv";
import { updateDocument, getDocuments } from "./controller/document-controller.js";

const io = new Server(9000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
config();
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