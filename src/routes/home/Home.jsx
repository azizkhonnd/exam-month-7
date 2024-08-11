import Navbar from '../../components/nav/Navbar'
import RightSidebar from '../../components/right-sidebar/RightSidebar'
import LeftSidebar from '../../components/left-sidebar/LeftSidebar'
import Hero from '../../components/hero/Hero'
import Main from '../../components/main/Main'
import Footer from '../../components/footer/Footer'

function Home() {

    return (
        <>
            <div>
                <Navbar />
                <LeftSidebar />
                <Hero />
                <Main />
                <RightSidebar />
                <Footer />
            </div>
        </>
    )
}

export default Home