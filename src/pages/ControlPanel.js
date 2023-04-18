import React, { useState, useEffect } from 'react';


import '../styles/controlPanel.css';
import { Link } from 'react-router-dom';
import img from '../images/logo.png';



const ControlPanel = () => {

  return (
    <div>

     <div className='image'>

      <img src={ img } alt="login imagem" className="logo" />

     </div>


      <div className='links-container'>
        <Link to="/clients">
            <button
            type="button"
            data-testid="edit-btn"
            className="button-panel"
            >
            Listagem de Clientes
            </button>
        </Link>

        <Link to="/services">
            <button
            type="button"
            data-testid="edit-btn"
            className="button-panel"
            >
            Listagem de Serviços
            </button>
        </Link>

        <Link to="/collaborators">
            <button
            type="button"
            data-testid="edit-btn"
            className="button-panel"
            >
            Listagem de Colaboradores
            </button>
        </Link>

        <Link to="/register-parts">
            <button
            type="button"
            data-testid="edit-btn"
            className="button-panel"
            >
            Registrar Peças
            </button>
        </Link>
      </div>








    </div>
  );
};

export default ControlPanel;
