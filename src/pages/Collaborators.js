import React, { useState, useEffect } from 'react';

import '../styles/contacts.css';
import { Link } from 'react-router-dom';
import { getCollaborators } from '../api/clients.api';
import { deleteCollaborator} from '../api/collaborator.api';

import deletesvg from '../images/trash .svg';
import QRCodeModal from '../Components/QrCodeModal';
import logo from '../images/cabecalho.png';
import img from '../images/corner.svg';


const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [qrCodeModalIsOpen, setQRCodeModalIsOpen] = useState(false);
  const [qrCodeModalURL, setQRCodeModalURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollaborators();
      setCollaborators(data);
    };
    fetchData();
  }, []);

  const handleOpenQRCodeModal = (url) => {
    setQRCodeModalURL(url);
    setQRCodeModalIsOpen(true);
  };

  const deleteCollaborators = (id) => {
    deleteCollaborator(id);
    setCollaborators(
      collaborators.filter((collaborator) => collaborator.id !== id)
    );
  };

  return (
    <div className="div-forms">
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
          Listagem de colaboradores
        </h1>
      </div>

      <table data-testid="table">
        <thead>
          <tr>
            <th> # </th>
            <th> Nome </th>
            <th> Telefone </th>
            <th> Informações </th>
          </tr>
        </thead>

        <tbody>
          {collaborators.map(({ id, name, phone }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{phone}</td>

              <td>
                <Link to={`/collaborator/${id}`}>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="button-detail"
                  >
                    Detalhes
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenQRCodeModal(`/collaborator/${id}`)}
                  className="button-detail"
                >
                  Gerar QR Code
                </button>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={() => deleteCollaborators(id)}
                  className="delete"
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
          ))}
        </tbody>
      </table>
      <QRCodeModal
        isOpen={qrCodeModalIsOpen}
        closeModal={() => setQRCodeModalIsOpen(false)}
        url={qrCodeModalURL}
      />
    </div>
  );
};

export default Collaborators;
