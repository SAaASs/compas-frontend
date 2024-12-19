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
            <section className='main' style={{ display: 'none' }}>
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
            <section>
                <header>
                    <h1>Документный компас</h1>
                    <p>Загрузите документ (pdf), выполните кластеризацию и найдите нужную информацию в тексте</p>
                </header>

                <div className="wrapper">
                    <div className="container">


                        <div className="row1">
                            <div className="upload-block">
                                <h2 className="doc-upload">Загрузить документ</h2>
                                <div className="hint">Поддерживается формат .pdf</div>
                                <div className="input-group">
                                    <input onChange={handleChange} type="file" id="pdfInput" accept=".pdf"/>
                                    <button id="clusterBtn" onClick={(e) => {
                                        e.preventDefault();
                                        baseApi.uploadFiles(files).then((res) => {
                                            console.log(res)
                                        })
                                    }}>Кластеризовать</button>
                                </div>
                            </div>

                            <div className="cluster-block">
                                <h3 className="cluster-title">Результаты кластеризации</h3>
                                <div className="result_clast" id="clusterResult">
                                    <p>0: транспорт, промышленность, техника</p>
                                    <p>1: развитие, экология, труд</p>
                                    <p>2: энергетика, торговля, логистика</p>
                                </div>
                            </div>
                        </div>


                        <div className="row-full">
                            <div className="search-block">
                                <h2 className="search-text">Поиск по тексту</h2>

                                <form onSubmit={handleSearchSubmit}  className="input-group">
                                    <input type="text" id="searchQuery" placeholder="Введите слово или фразу"/>
                                    <button  id="searchBtn">Найти</button>
                                </form>
                            </div>
                        </div>


                        <div className="row-full">
                            <div className="search-result-block">
                                <h3 className="result-title">Результаты поиска</h3>
                                <div className="result" id="searchResult">
                                    {searchResults.results.length > 0? <>{searchResults.results.map((result, i) => (
                                        <SearchResult result={result} key={i} />
                                    ))}</>:<p>Здесь будут отображаться найденные фрагменты.</p>}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default FileManager;