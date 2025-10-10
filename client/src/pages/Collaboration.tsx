import './Collaboration.css'

import React, { useEffect, useState,Fragment } from "react";

import ProjectsList from '../components/Collaboration/ProjectsList';
import NavBarHome from '../components/NavBars/NavBarHome';


const Collaboration: React.FC = () => {
    return (
        <div className='collaboration-page-container'>
            <NavBarHome />
            <ProjectsList />
        </div>
    )
}


export default Collaboration