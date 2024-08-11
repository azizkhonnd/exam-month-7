import { Outlet, useLocation } from 'react-router-dom';
import LeftSidebar from '../left-sidebar/LeftSidebar';
import Navbar from '../nav/Navbar';
import RightSidebar from '../right-sidebar/RightSidebar';
import Hero from '../hero/Hero';
import Footer from '../footer/Footer';
import Main from '../main/Main';

const Layout = () => {
    const location = useLocation();

    return (
        <div className='layout__container'>
            <Navbar />
            {location.pathname === '/' && <Hero />}
            <div className='main__content'>
                <LeftSidebar />
                <div className='content__wrapper'>
                    {location.pathname === '/' ? (
                        <Main>
                            <Outlet />
                        </Main>
                    ) : (
                        <Outlet />
                    )}
                </div>
                <RightSidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
