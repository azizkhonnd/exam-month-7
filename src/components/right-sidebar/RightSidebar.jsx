import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import './RightSidebar.scss';
import UserLogo from './img/user-blue-right.svg';
import RightUnion from './img/union-right.svg';

const RightSidebar = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <button className="hamburger__btn" onClick={toggleSidebar}>
                <AiOutlineMenu size={25} />
            </button>
            <div className={`right__side__container ${isSidebarVisible ? 'open' : ''}`}>
                <div className="right__side__items">
                    <div className="right__side__item">
                        <div className="right__side__element">
                            <div className="item-title">
                                <h3 className="right__side__title">Friend Activity</h3>
                            </div>
                            <div className="right__side__buttons">
                                <div>
                                    <button className="user__btn-right">
                                        <AiOutlineUserAdd size={32} />
                                    </button>
                                </div>
                                <div>
                                    <button className="close__btn" onClick={toggleSidebar}>
                                        <CgClose />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="right__side__subtitle">
                            Let friends and followers on Spotify see what you’re listening to.
                        </p>
                    </div>
                </div>
                <div className="right__side___col-items">
                    <div className="union">
                        <div>
                            <img src={UserLogo} alt="user logo" />
                        </div>
                        <div>
                            <img src={RightUnion} alt="union" />
                        </div>
                    </div>
                    <div className="union">
                        <div>
                            <img src={UserLogo} alt="user logo" />
                        </div>
                        <div>
                            <img src={RightUnion} alt="union" />
                        </div>
                    </div>
                    <div className="union">
                        <div>
                            <img src={UserLogo} alt="user logo" />
                        </div>
                        <div>
                            <img src={RightUnion} alt="union" />
                        </div>
                    </div>
                    <div>
                        <p className="right__side__text__bottom">
                            Go to Settings, Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.
                        </p>
                    </div>
                    <div className="settings__btn-wrap">
                        <button className="settings__btn">SETTINGS</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightSidebar;
