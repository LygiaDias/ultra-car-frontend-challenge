import React, { useState, useEffect } from 'react';

import '../styles/contacts.css';
import { Link } from 'react-router-dom';
import { getServices, deleteService } from '../api/service.api';

import deletesvg from '../images/trash .svg';
import img from '../images/corner.svg';
import logo from '../images/cabecalho.png';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchData();
  }, []);

  const deleteServices = (id) => {
    deleteService(id);
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div>
      <div>
        <Link to="/">
          <button type="button" data-testid="edit-btn" className="button-edit">
            <img src={img} alt="login imagem" className="edit-imagem" />
          </button>
        </Link>
      </div>

      <img src={logo} alt="login imagem" className="header-image" />

      <div className="tittle">
        <h1 data-testid="h1-contact" className="h1-contact">
          Listagem de Serviços
        </h1>
      </div>

      <table data-testid="table">
        <thead>
          <tr>
            <th> # </th>
            <th> Serviço </th>
            <th> Cliente </th>
            <th> Colaborador </th>
            <th> Status </th>
            <th> Informações </th>
            <th> Ações </th>
          </tr>
        </thead>

        <tbody>
          {services.map(
            ({ id, serviceName, clientName, collaborator, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{serviceName}</td>
                <td>{clientName}</td>
                <td>{collaborator}</td>
                <td>{status}</td>

                <td>
                  <Link to={`/services/${id}`}>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      className="button-detail"
                    >
                      Detalhes
                    </button>
                  </Link>
                </td>
                <td>
                  {' '}
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={() => deleteServices(id)}
                    className="button-detail"
                  >
                    <img
                      src={deletesvg}
                      alt="login imagem"
                      className="delete-image"
                    />
                    Excluir
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
