import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    }
});

const Document = mongoose.model("Document", documentSchema);

export default Document;