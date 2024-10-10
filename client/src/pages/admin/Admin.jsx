import React, { useState, useEffect } from 'react';
import './Admin.css';

const baseURL = 'https://moto2go-server.vercel.app/'

const AdminPage = () => {
    const [motorcycles, setMotorcycles] = useState([]);
    const [newMotorcycle, setNewMotorcycle] = useState({
        nome: '',
        descricao: '',
        preco: '',
    });
    const [message, setMessage] = useState(''); // Mensagem de feedback

    useEffect(() => {
        fetchMotorcycles();
    }, []);

    // Função para buscar motocicletas
    const fetchMotorcycles = async () => {
        try {
            const response = await fetch(`${baseURL}/api/motorcycles`);
            const data = await response.json();
            console.log("fetch para admin:", data);
            setMotorcycles(data);
        } catch (error) {
            console.log("Erro ao buscar motos:", error);
        }
    };

    // Função para adicionar um novo produto
    const handleAddMotorcycle = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/motorcycles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMotorcycle),
            });

            if (!response.ok) throw new Error('Erro ao adicionar moto');

            const data = await response.json();
            setMotorcycles([...motorcycles, data]); // Adiciona a nova moto à lista
            setNewMotorcycle({ nome: '', descricao: '', preco: '' }); // Reseta o formulário
            setMessage('Moto adicionada com sucesso!'); // Mensagem de sucesso
        } catch (error) {
            console.log("Erro ao adicionar moto:", error);
            setMessage('Erro ao adicionar moto. Tente novamente.'); // Mensagem de erro
        }
    };

    // Função para remover um produto
    const handleRemoveMotorcycle = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/motorcycles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erro ao remover moto');

            setMotorcycles(motorcycles.filter(moto => moto._id !== id)); // Remove a moto da lista
            setMessage('Moto removida com sucesso!'); // Mensagem de sucesso
        } catch (error) {
            console.log("Erro ao remover moto:", error);
            setMessage('Erro ao remover moto. Tente novamente.'); // Mensagem de erro
        }
    };

    // Função para verificar se o período cobre o dia atual
    const isTodayInPeriod = (startDate, endDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        return today >= start && today <= end;
    };

    return (
        <>
            <div className='container-admin'>
                {motorcycles.map((moto) => (
                    <div className="card-admin" key={moto._id}>
                        <p><strong>Nome:</strong> {moto.name}</p>
                        {/* <p><strong>Descrição:</strong> {moto.descricao}</p> */}
                        <p><strong>Preço:</strong> {moto.price}</p>
                        <h4>Reservas:</h4>
                        {moto.reservation && moto.reservation.length > 0 ? (
                            moto.reservation.map((reserva, index) => (
                                <div key={index} className={isTodayInPeriod(reserva.startDate, reserva.endDate) ? 'highlight' : ''}>
                                    <p>
                                        Data Início: {new Date(reserva.startDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        Data Fim: {new Date(reserva.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Sem reservas</p>
                        )}
                    </div>
                ))}
            </div>

            {/* <div className='add-motorcycle-container'>
                <h1>Gerenciamento de Motocicletas</h1>
                <h2>Adicionar Nova Motocicleta</h2>
                <form onSubmit={handleAddMotorcycle}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={newMotorcycle.nome}
                        onChange={(e) => setNewMotorcycle({ ...newMotorcycle, nome: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={newMotorcycle.descricao}
                        onChange={(e) => setNewMotorcycle({ ...newMotorcycle, descricao: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        value={newMotorcycle.preco}
                        onChange={(e) => setNewMotorcycle({ ...newMotorcycle, preco: e.target.value })}
                        required
                    />
                    <button type="submit">Adicionar Moto</button>
                </form>
                {message && <p className="feedback-message">{message}</p>}
            </div> */}
        </>
    );
};

export default AdminPage;
