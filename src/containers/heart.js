import React from 'react';
import Navbar from '../components/navbar'
import Form from '../components/Form'
import { useHistory } from "react-router-dom";
import { authetication } from '../App'
import ParticleBackground from '../components/particleBackground'

function Heart(props) {

    const history = useHistory();
    return (
        <div>
            <Navbar login="Logout" home="Home" />
            <Form />
        </div>
    );
}

export default Heart;