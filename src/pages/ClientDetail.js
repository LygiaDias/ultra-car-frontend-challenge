import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import '../styles/clientDetail.css';
import { Link } from 'react-router-dom';
import img from '../images/corner.svg';
import ficha from '../images/ficha.png'
import { getClientById} from '../api/clients.api';
import { getServices } from '../api/service.api';

const ClientDetail = () => {
  const [client, setClient] = useState([]);
  const [services, setServices] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchClientData = async () => {
      const data = await getClientById(id);
      setClient(data);
    };
    fetchClientData();
  }, [id]);

  useEffect(() => {
    const fetchServicesData = async () => {
      const data = await getServices();
      const filteredServices = data.filter(service => service.clientName === client.name);
      setServices(filteredServices);
    };
    fetchServicesData();
  }, [client.name]);

  return (
    <>
      <Link to="/clients">
        <button
          type="button"
          data-testid="edit-btn"
          className="button-edit"
        >
          <img src={ img } alt="login imagem" className="edit-imagem" />
        </button>
      </Link>
      <div className="client-tittle">
        <h1 data-testid="h1-edit" className="h1-edit"> Ficha do Cliente</h1>
      </div>

      <div className='header-container'>
        <img src={ ficha } alt="login imagem" className="detail-image" />
        <div className='client-info-container'>
            <div>
              <h2>Dados Pessoais</h2>
              <p><strong>Name:</strong> {client.name}</p>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Phone:</strong> {client.phone}</p>
              <p><strong>Address:</strong> {client.address}</p>
            </div>

            <div>
              <h2>Dados do Veículo</h2>
              <p><strong>Modelo:</strong> {client.car}</p>
              <p><strong>Cor:</strong> {client.carColor}</p>
            </div>
        </div>
      </div>
      <div>
        <div className="client-tittle">
          <h1 data-testid="h1-edit" className="h1-edit"> Serviços</h1>
        </div>
        {services.length === 0 ? (
          <p>Nenhum serviço encontrado.</p>
        ) : (
          <table data-testid="table" className='detail-table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Serviço</th>
                <th>Colaborador</th>
                <th>Status</th>
                <th>Informações</th>
              </tr>
            </thead>
            <tbody>
              {services.map(({ id, serviceName, collaborator, status }, ) => (
                <tr >
                  <td>{ id}</td>
                  <td>{serviceName}</td>
                  <td>{collaborator}</td>
                  <td>{status}</td>
                  <td>
                    <Link to={`/services/${id}`}>
                      <button type="button" data-testid="edit-btn" className="button-edit">
                        Detalhes
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
     <div className='button-container'>
      <Link to={`/create/${id}`} >
        <button type="button" data-testid="edit-btn" className="create-service-button">
          Criar Serviço
        </button>
      </Link>

     </div>
    </>
  );
};

export default ClientDetail;
