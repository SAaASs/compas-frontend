import {useState} from "react";
import FileList from "./FileList";
import {baseApi} from "../utils/Api";
import SearchResult from "./SearchResult";

function FileManager() {
    const [files, setFiles] = useState([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [searchResults, setSearchResults] = useState({results: []});
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            console.log(777777)
            setFiles([...e.dataTransfer.files]);
        }
    }
    const handleUrlInputChange = (e) => {
        e.preventDefault();
        setFiles([])
        setFileUrl(document.querySelector('.dropField__urlInput').value)

    }
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        baseApi.searchSomething(e.target.querySelector('input').value, setSearchResults);
    }
    return (
        <>
            <section className='main'>
                <section className={'fileManager'}>
                    <FileList fileUrl={fileUrl} setFileUrl={setFileUrl} files={files} setFiles={setFiles}/>
                    <div className={'dropFieldWrap'}>
                        <form onDrop={handleDrop} onDragEnter={handleDrag} onDragOver={handleDrag}
                              onDragLeave={handleLeave}
                              className={`dropField ${isDragActive ? 'dropField_active' : ''}`}>
                            <h2>Перетащите файлы сюда</h2>
                            <div className={'dropField__lowerText'}>
                                <input onChange={handleUrlInputChange} placeholder={'Вставьте URL файла...'} className={'dropField__urlInput'}/>
                                <p>или</p>
                                <label className={'dropField__lowerButton'}>
                                    <span>Загрузите файлы</span>
                                    <input type={'file'} className={'dropField__input'} multiple={false}
                                           onChange={handleChange}/>
                                </label>
                            </div>
                        </form>
                    </div>
                </section>
                <section className={'searchField'}>
                    <form onSubmit={handleSearchSubmit} className={'searchField__form'}>
                        <input placeholder={'Введите поисковый запрос...'} className={'searchField__input'}/>
                        <button type={'submit'} className={'searchField__button'}>Найти</button>
                    </form>
                    <div className={'searchField__results'}>
                        {searchResults.results.map((result, i) => (
                            <SearchResult result={result} key={i} />
                        ))}
                    </div>
                </section>
            </section>
        </>
    );
}

export default FileManager;