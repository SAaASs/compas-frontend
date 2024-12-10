import {baseApi} from "../utils/Api";

function FileList({files, setFiles, fileUrl, setFileUrl}) {
    return (
        <div className="fileList">
            <h4 className={'fileList__title'}>Список выбранных файлов</h4>
            {files.length > 0 && <>
                <ul className={'fileList__list'}>
                    {files.map(({name}, id) => <li className={'fileList__fileName'} key={id}>{name}</li>)}
                </ul>
                <button onClick={(e) => {
                    e.preventDefault();
                    setFiles([])
                }}>Удалить
                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    baseApi.uploadFiles(files).then((res) => {
                        console.log(res)
                    })
                }}>Отправить
                </button>
            </>

            }
            {fileUrl.length > 0 && <>
                <p>{fileUrl}</p>
                <button onClick={(e) => {
                    e.preventDefault();
                    setFileUrl([])
                }}>Удалить
                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    baseApi.uploadFileUrl(fileUrl).then((res) => {
                        console.log(res)
                    })
                }}>Отправить
                </button>
            </>

            }
        </div>
    );
}

export default FileList;