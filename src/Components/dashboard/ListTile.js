import { FaPencilAlt, FaRegTrashAlt} from 'react-icons/fa'
import { BiShowAlt } from 'react-icons/bi'
import { decryptdata } from '../../utils/encrypt';

const ListTile = ({id, username, platform, password, editTile, showModalPwd, deleteTile, newEle}) => {

    function removeEntry(){
        deleteTile(id);
    }
    function editEntry(){
        const data = {
            "id": id,
            "username": newEle?username: decryptdata(username),
            "passwd": newEle?password: decryptdata(password),
            "platform": newEle?platform: decryptdata(platform)
        };
        editTile(data);
    }

    function showPwd() {
        var pwd;
        if (newEle) {
            pwd = password;
        } else {
            pwd = decryptdata(password);
        }
        showModalPwd(pwd)
    }

    if (newEle) {
        var tileClass = "listTile new-entry-tile";
    } else{
        tileClass = "listTile";
    }

    return (
        <div className={tileClass}>
            <div className="left">
                <div className="username">{newEle?username: decryptdata(username)}</div>
                <div className="platform">{newEle?platform: decryptdata(platform)}</div>
            </div>
            <div className="right">
                <div className="show" onClick={showPwd}><BiShowAlt color="#1BB16B"/></div>
                <div className="delete" onClick={removeEntry}><FaRegTrashAlt color="#ff3333"/></div>
                <div className="edit" onClick={editEntry}><FaPencilAlt color="#0180A7"/></div>
            </div>
        </div>
    )
}

export default ListTile
