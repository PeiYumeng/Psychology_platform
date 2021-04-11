import React, { useEffect, useContext } from 'react';
import '../../App.css';
import AdverSection from './AdverSection';
import DocSection from './DocSection';
import Footer from '../Footer';
import LogInFormHome from '../SignUp/LogInFormHome';
import { SocketContext } from '../../SocketContext';

function Home (){
    const { hasUser, setHasUser, setOnlyShowRoom } = useContext(SocketContext);

    useEffect(()=>{
        if(window.localStorage.length == 0){
            setHasUser(false);
            setOnlyShowRoom(true);
        }else{
            setHasUser(true);
            setOnlyShowRoom(false);
        }
    }, []);

    return(
        <>
            {hasUser && 
            <>
            <AdverSection />
            <DocSection />
            <Footer />
            </>}
            {!hasUser && <LogInFormHome />}
        </>
    )
}

export default Home;