import React, { useState, useEffect } from 'react';
import { getParts, getClientById } from '../api/clients.api';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import img from '../images/corner.svg';
import service from '../images/servicos.png';
import '../styles/createService.css';
import { createService } from '../api/service.api';

function CreateService() {
  const [serviceName, setServiceName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientCar, setClientCar] = useState('');
  const [budget, setBudget] = useState('');
  const [collaborator, setCollaborator] = useState('');
  const [status, _setStatus] = useState('Iniciado');
  const [autoParts, setAutoParts] = useState([]);
  const [autoPartsPrices, setAutoPartsPrices] = useState([]);
  const [finishedAt, setFinishedAt] = useState('');

  const [partsList, setPartsList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPartsData = async () => {
      const data = await getParts();
      setPartsList(data);
    };
    fetchPartsData();
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      const data = await getClientById(id);
      setClientName(data.name);
      setClientCar(data.car);
    };
    fetchClientData();
  }, [id]);

  const handlePartSelect = (e) => {
    const partId = e.target.value;
    console.log(e.target.value);
    const selectedPartData = partsList.find((part) => part.id === partId);
    setAutoParts([...autoParts, selectedPartData.partName]);
    setAutoPartsPrices([...autoPartsPrices, selectedPartData.price]);
    e.target.value = '';
  };

  const handlePartRemove = (index) => {
    setAutoParts(autoParts.filter((_, partIndex) => partIndex !== index));
    setAutoPartsPrices(
      autoPartsPrices.filter((_, partPriceIndex) => partPriceIndex !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createService(
        serviceName,
        clientName,
        clientCar,
        budget,
        autoParts,
        autoPartsPrices,
        collaborator,
        status,
        finishedAt
      );
      alert('Serviço criado com sucesso');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <div>
      <Link to={`/contacts/${id}`}>
        <button type="button" data-testid="edit-btn" className="button-edit">
          <img src={img} alt="login imagem" className="edit-imagem" />
        </button>
      </Link>

      <div className="tittle-container">
        <h1 className="create-tittle">Criar novo serviço</h1>
      </div>
      <div className="content-container">
        <img src={service} alt="login imagem" className="service-image" />
        <form className="create-service-form">
          <label className="label">Serviço:</label>
          <input
            type="text"
            value={serviceName}
            onChange={(event) => setServiceName(event.target.value)}
            className="create-input"
          />
          <label className="label" htmlFor="client-name">
            Cliente:
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            className="create-input"
            id="client-name"
          />
          <label className="label">Carro:</label>
          <input
            type="text"
            value={clientCar}
            onChange={(event) => setClientCar(event.target.value)}
            className="create-input"
          />
          <label htmlFor="email" className="label">
            Peças
            <div className="part-select-container">
              <select className="create-input" onChange={handlePartSelect}>
                <option value="">Selecione uma peça</option>
                {partsList.map((part) => (
                  <option key={part.id} value={part.id}>
                    {part.partName}
                  </option>
                ))}
              </select>
              <ul className="selected-parts-list">
                {autoParts.map((part, index) => (
                  <li key={index}>
                    {part} (Preço: {autoPartsPrices[index]})
                    <button onClick={() => handlePartRemove(index)}>x</button>
                  </li>
                ))}
              </ul>
            </div>
          </label>
          <label className="label">Colaborador:</label>
          <input
            type="text"
            value={collaborator}
            onChange={(event) => setCollaborator(event.target.value)}
            className="create-input"
          />
          <label className="label">Valor do serviço</label>
          <input
            type="text"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="create-input"
          />
          <button
            className="create-service-button"
            type="submit"
            onClick={handleSubmit}
          >
            Criar Serviço
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateService;
