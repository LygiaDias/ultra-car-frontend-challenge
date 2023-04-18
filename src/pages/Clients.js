import React, { useState, useEffect } from 'react';
import '../styles/contacts.css';
import { Link } from 'react-router-dom';
import { getClients, deleteClient } from '../api/clients.api';
import deletesvg from '../images/trash .svg';
import QRCodeModal from '../Components/QrCodeModal';
import logo from '../images/cabecalho.png';
import img from '../images/corner.svg';

const Clients = () => {
  const [contacts, setContacts] = useState([]);
  const [qrCodeModalIsOpen, setQRCodeModalIsOpen] = useState(false);
  const [qrCodeModalURL, setQRCodeModalURL] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      const data = await getClients();
      setContacts(data);
    };
    fetchData();
  }, []);

  const handleOpenQRCodeModal = (url) => {
    setQRCodeModalURL(url);
    setQRCodeModalIsOpen(true);
  };

  const deleteContact = (id) => {
    deleteClient(id)
    setContacts(contacts.filter((contact) => contact.id !== id));
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
          Listagem de clientes
        </h1>
      </div>

      <table data-testid="table">
        <thead>
          <tr>
            <th> # </th>
            <th> Nome </th>

            <th> Informações </th>
            <th> Ações </th>
          </tr>
        </thead>

        <tbody>
          {contacts.map(({ id, name }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>

              <td>
                <Link to={`/contacts/${id}`}>
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
                  onClick={() => handleOpenQRCodeModal(`/contacts/${id}`)}
                  className="button-detail"
                  data-testid="btn-qr"
                >
                  Gerar QR Code
                </button>
              </td>

              <td>
                {' '}
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={() => deleteContact(id)}
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

export default Clients;
