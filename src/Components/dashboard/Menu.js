import { useState } from 'react'
import { AiOutlineSetting, AiOutlineLogin } from 'react-icons/ai'
import { CgLastpass } from 'react-icons/cg'

const Menu = ({setmode, changeSetKeyMode}) => {

    const [showmenu, setshowmenu] = useState(false);

    function showMenuFunc() {
        var currState = showmenu;
        setshowmenu(!currState);
    }
    function logout() {
        setmode("login");
    }

    return (
        <div className="setting-wrapper">
                <div className="settingsIcon" onClick={showMenuFunc}>
                    <AiOutlineSetting widths="2 rem"/>
                </div>
                <div className={showmenu?"settingsMenu":"settingsMenu hide"}>
                    <div className="menu-items" onClick={changeSetKeyMode}>
                        <div className="item-icon">
                            <CgLastpass/>
                        </div>
                        <div className="item-name">
                            Change Master Key
                        </div>
                    </div>
                    <div className="menu-items" onClick={logout}>
                        <div className="item-icon">
                            <AiOutlineLogin/>
                        </div>
                        <div className="item-name">
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Menu
