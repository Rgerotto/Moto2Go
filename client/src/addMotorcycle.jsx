import React, { useState } from 'react';
import './addMotorcycle.css';

const AddMotorcycle = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMotorcycle = { nombre, descripcion, precio }
        fetch('http://localhost:3000/api/motorcycles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMotorcycle),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar motocicleta');
            }
            return response.json();
        })
        .then(data => {
            console.log('Motocicleta adicionada:', data);
            setMessage('Motocicleta adicionada com sucesso!');
            setNombre('');
            setDescripcion('');
            setPrecio('');
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Erro ao adicionar motocicleta. Tente novamente.');
        });
    };

    return (
        <div>
            <h2>Adicionar nova motocicleta</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <textarea placeholder='Descrição' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                {/* <input type="text" placeholder='Tipo' value={tipo} onChange={(e) => setTipo(e.target.value)} required /> */}
                {/* <input type="number" placeholder='Fiança' value={fianza} onChange={(e) => setFianza(e.target.value)} required /> */}
                <input type="number" placeholder='Preço' value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                {/* <input type="text" placeholder='URL da foto 1' value={foto[1]} onChange={(e) => setFoto({ ...foto, 1: e.target.value })} />
                <input type="text" placeholder='URL da foto 2' value={foto[2]} onChange={(e) => setFoto({ ...foto, 2: e.target.value })} /> */}
                <button type='submit'>Adicionar Motocicleta</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddMotorcycle;
