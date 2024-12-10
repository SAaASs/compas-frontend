import FileManager from "./FileManager";
import { Route, Routes } from 'react-router-dom';
import Canvas from "./Canvas";
import React from "react";
import {CurrentFileContext} from "../contexts/CurrentFileContext";
function App() {
    const [currentFile, setCurrentFile] = React.useState({});
    return (
        <CurrentFileContext.Provider value={{currentFile, setCurrentFile}}>
            <Routes>
                <Route path="/" element={<FileManager/>} />
                <Route path="/viewer" element={<Canvas/>} />
            </Routes>
        </CurrentFileContext.Provider>

    );
}

export default App;