import Document from "../schema/documentSchema.js";

export const getDocuments = async (id) => {

    if(id === null) return;

    const document = await Document.findById(id);

    if(document) return document;

    return await Document.create({ _id: id, content: ""});

};

export const updateDocument = async (id, content) => {
    return await Document.findByIdAndUpdate(id, { content });
};