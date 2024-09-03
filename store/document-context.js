import { createContext, useState } from "react";

export const DocumentContext = createContext();
export const DocumentProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);

    return (
        <DocumentContext.Provider value={{ documents, setDocuments }}>
            {children}
        </DocumentContext.Provider>
    )
}