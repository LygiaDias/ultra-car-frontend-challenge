import React from 'react';
import Modal from 'react-modal';
import QRCode from 'qrcode.react';
import '../styles/qrCode.css'

const QRCodeModal = ({ isOpen, closeModal, url }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div className="qr-code-modal">
        <h2>QR Code </h2>
        <QRCode value={url} />
        <button className="modal-button" onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
