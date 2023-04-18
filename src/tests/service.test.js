import { render, screen } from  '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Service from '../pages/Services';



    it('Testa se a página possui o título h1', () => {
      render(<Service />);
        const h1 = screen.getByTestId('h1-contact');
        expect(h1).toBeInTheDocument();
      });


     test('Testa se a página possui uma tabela de clientes', () => {
        render(<Service />);
        const button = screen.getByTestId('table');

        expect(button).toBeInTheDocument();
      });
