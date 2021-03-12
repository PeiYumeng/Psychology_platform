import React from 'react';
import '../../App.css';
import AdverSection from './AdverSection';
import DocSection from './DocSection';
import Footer from '../Footer';

function Home (){
    return(
        <>
            <AdverSection />
            <DocSection />
            <Footer />
        </>
    )
}

export default Home;