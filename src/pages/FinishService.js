import React, { useState, useEffect } from 'react';
import { getParts, getClientById } from '../api/clients.api';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import img from '../images/corner.svg';
import service from '../images/servicos.png';
import '../styles/createService.css';
import { finishService } from '../api/service.api';

function FinishService() {
  const [status, _setStatus] = useState('Finalizado');
  const [finishedAt, setFinishedAt] = useState('');
  const [notes, setNotes] = useState('');
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await finishService(id, finishedAt, notes, status);
      alert('Serviço finalizado com sucesso');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div>
      <Link to={`/services/${id}`}>
        <button type="button" data-testid="edit-btn" className="button-edit">
          <img src={img} alt="login imagem" className="edit-imagem" />
        </button>
      </Link>

      <div className="tittle-container">
        <h1 className="create-tittle">Finalizar Serviço</h1>
      </div>
      <div className="content-container">
        <img src={service} alt="login imagem" className="service-image" />
        <form className="create-service-form">
          <label className="label">Data de finalização:</label>
          <input
            type="text"
            value={finishedAt}
            onChange={(event) => setFinishedAt(event.target.value)}
            className="create-input"
          />
          <label className="label" htmlFor="client-name">
            Observações
          </label>
          <input
            type="text"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="create-input"
            id="client-name"
          />

          <button
            className="create-service-button"
            type="submit"
            onClick={handleSubmit}
          >
            Finalizar Serviço
          </button>
        </form>
      </div>
    </div>
  );
}

export default FinishService;
