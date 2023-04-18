import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import '../styles/clientDetail.css';
import { Link } from 'react-router-dom';
import img from '../images/corner.svg';
import ficha from '../images/ficha.png'
import { getCollaboratorById } from '../api/clients.api';
import { getServices } from '../api/service.api';

const CollaboratorDetail = () => {
  const [collaborator, setCollaborator] = useState([]);

  const [services, setServices] = useState([])

  const { id } = useParams();

  useEffect(() => {
    const fetchCollaboratorData = async () => {
      const data = await getCollaboratorById(id);
      setCollaborator(data);
    };
    fetchCollaboratorData();
  }, [id]);


  useEffect(() => {
    const fetchServicesData = async () => {
      const data = await getServices();
      const filteredServices = data.filter(service => service.collaborator === collaborator.name);
      setServices(filteredServices);
    };
    fetchServicesData();
  }, [collaborator.name]);



  return (
    <>
      <Link to="/collaborators">
        <button
          type="button"
          data-testid="edit-btn"
          className="button-edit"
        >
          <img src={ img } alt="login imagem" className="edit-imagem" />
        </button>
      </Link>
      <div className="client-tittle">
        <h1 data-testid="h1-edit" className="h1-edit"> Ficha do Colaborador</h1>
      </div>

      <div className='header-container'>
        <img src={ ficha } alt="login imagem" className="detail-image" />
        <div className='client-info-container'>
            <div>
              <h2>Dados Pessoais</h2>
              <p><strong>Name:</strong> {collaborator.name}</p>
              <p><strong>Email:</strong> {collaborator.email}</p>
              <p><strong>Phone:</strong> {collaborator.phone}</p>
              <p><strong>Address:</strong> {collaborator.address}</p>

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
                <th>Cliente</th>
                <th>Informações</th>
              </tr>
            </thead>
            <tbody>
              {services.map(({ id, serviceName, clientName }, ) => (
                <tr >
                  <td>{ id}</td>
                  <td>{serviceName}</td>
                  <td>{clientName}</td>
                  <td>
                    <Link to={`/contacts/${id}`}>
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
      <Link to={`/test/${id}`} >
        <button type="button" data-testid="edit-btn" className="create-service-button">
          Criar Serviço
        </button>
      </Link>

     </div>
    </>
  );
};

export default CollaboratorDetail;
