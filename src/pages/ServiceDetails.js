import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import img from '../images/corner.svg';
import service from '../images/servicos.png';
import { getServiceById } from '../api/service.api';
import { formatDate } from '../utils/formatDate';

const ServiceDetails = () => {
  const [services, setServices] = useState([]);
  const [autoParts, setAutoParts] = useState([]);
  const [autoPartsPrice, setAutoPartsPrice] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchServicesData = async () => {
      const data = await getServiceById(id);
      setServices(data);
      setAutoParts(data.autoParts);
      setAutoPartsPrice(data.autoPartsPrices);
    };
    fetchServicesData();
  }, []);

  return (
    <div>
      <Link to="/services">
        <button type="button" data-testid="edit-btn" className="button-edit">
          <img src={img} alt="login imagem" className="edit-imagem" />
        </button>
      </Link>
      <div>
        <div className="tittle-container">
          <h1 data-testid="h1-edit" className="h1-edit">
            Detalhes do Serviço:
          </h1>
        </div>
      </div>
      <div className="content-container">
        <img src={service} alt="login imagem" className="service-image" />
        <div className="client-info-container">
          <div>
            <p>
              <strong>Serviço:</strong> {services.serviceName}
            </p>
            <p>
              <strong>Data da criação:</strong>{' '}
              {services.createdAt
                ? formatDate(new Date(services.createdAt))
                : 'Data indisponível'}
            </p>
            <p>
              <strong>Data de finalização: </strong>
              {services.finishedAt !== ''
                ? services.finishedAt
                : 'Serviço em andamento'}
            </p>

            <p>
              <strong>Cliente:</strong> {services.clientName}
            </p>
            <p>
              <strong>Carro:</strong> {services.clientCar}
            </p>
            <p>
              <strong>Colaborador:</strong> {services.collaborator}
            </p>
            <p>
              <strong>Valor do serviço:</strong> {services.budget}
            </p>
            <p>
              <strong>Peças:</strong>{' '}
              {autoParts.length !== 0
                ? autoParts.map((price, index) => (
                    <p key={index}>
                      {price} (Preço: {autoPartsPrice[index]})
                    </p>
                  ))
                : 'Nenhuma peça selecionada'}
            </p>
            <p>
              <strong>Status:</strong> {services.status}
            </p>
            <p>
              <strong>Observações:</strong> {services.notes}
            </p>
          </div>
        </div>
      </div>
      <Link to={`/finish-service/${id}`}>
        <button
          type="button"
          data-testid="edit-btn"
          className="finish-service-button"

        >
          Finalizar Serviço
        </button>
      </Link>

    </div>
  );
};



export default ServiceDetails;
