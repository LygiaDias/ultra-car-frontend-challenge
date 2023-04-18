import React, { useState, useEffect } from 'react';
import { getParts, getClientById } from '../api/clients.api';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import img from '../images/corner.svg';
import service from '../images/servicos.png';
import '../styles/createService.css';
import { createPart } from '../api/parts.api';

function RegisterParts() {

  const [status, _setStatus] = useState('Finalizado');
  const [partName, setPartName] = useState('');
  const [price, setPrice] = useState('')



 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createPart(
       partName,
       price
      );
      alert('Peça registrada com sucesso');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div>
      <Link to="/">
        <button type="button" data-testid="edit-btn" className="button-edit">
          <img src={img} alt="login imagem" className="edit-imagem" />
        </button>
      </Link>

      <div className="tittle-container">
        <h1 className="create-tittle">Registrar peça</h1>
      </div>
      <div className="content-container">
        <img src={service} alt="login imagem" className="service-image" />
        <form className="create-service-form">
          <label className="label">Nome da Peça:</label>
          <input
            type="text"
            value={partName}
            onChange={(event) => setPartName(event.target.value)}
            className="create-input"
          />
          <label className="label" htmlFor="client-name">
            Preço
          </label>
          <input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="create-input"
            id="client-name"
          />

          <button
            className="create-service-button"
            type="submit"
            onClick={handleSubmit}
          >
            Registrar Peça
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterParts;
