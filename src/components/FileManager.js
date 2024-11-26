import {useState} from "react";
import FileList from "./FileList";
function FileManager() {
    const [files, setFiles] = useState([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.files && e.target.files[0]) {
            setFiles([...e.target.files]);
        }
    }
    const handleDrag = (e) => {
        e.preventDefault()
        setIsDragActive(true)
    }
    const handleLeave = (e) => {
        e.preventDefault()
        setIsDragActive(false)
    }
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragActive(false)
        if(e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(777777)
            setFiles([...e.dataTransfer.files]);
        }
    }
    return (
        <>
            <section className='fileManagerWrap'>
                <div className={'fileManager'}>
                    <FileList files={files} setFiles={setFiles} />
                    <div className={'dropFieldWrap'}>
                        <form onDrop={handleDrop} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} className={`dropField ${isDragActive? 'dropField_active': ''}`}>
                            <h2>Перетащите файлы сюда</h2>
                            <div className={'dropField__lowerText'}>
                                <p>или</p>
                                <label className={'dropField__lowerButton'}>
                                    <span>Загрузите файлы</span>
                                    <input type={'file'} className={'dropField__input'} multiple={true} onChange={handleChange}/>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FileManager;