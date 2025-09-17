import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BotonSbt } from './Botones/index';

describe('Componente BotonSbt', () => {
    
    test('debe renderizar el texto que se le pasa', () => {
        render(<BotonSbt>Hola Mundo</BotonSbt>);
        
        const boton = screen.getByRole('button', { name: /Hola Mundo/i });
        expect(boton).toBeInTheDocument();
    });

    test('debe llamar a la función onClick cuando se hace clic', () => {
        const handleClickMock = jest.fn();
        
        render(<BotonSbt onClick={handleClickMock}>Hacer Clic</BotonSbt>);
        
        const boton = screen.getByRole('button', { name: /Hacer Clic/i });
        fireEvent.click(boton);
        
        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });
});