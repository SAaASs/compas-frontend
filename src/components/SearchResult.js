import { useNavigate } from 'react-router-dom';
import {CurrentFileContext} from "../contexts/CurrentFileContext";
import { useContext } from 'react';
function SearchResult({result}) {
    const navigate = useNavigate();
    const currentFile = useContext(CurrentFileContext);
    return (
        <div className={'searchResult'}>
            <p className={'searchResultText'}>
                {result.text}
            </p>
            <button onClick={(event)=>{event.preventDefault(); currentFile.setCurrentFile(result);  navigate(`/viewer`)}} className={'searchResult___button'}>Открыть документ</button>
        </div>
    )

}

export default SearchResult;