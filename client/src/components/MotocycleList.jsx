import React, { useState, useEffect } from 'react';
import './motorcycleList.css';

const baseURL = 'https://moto2go-server.vercel.app/'

const MotorcycleList = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Estado para idioma
  const [showPopup, setShowPopup] = useState(false); // Estado para exibir popup
  const [currentMotorcycle, setCurrentMotorcycle] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}/api/motorcycles`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setMotorcycles(data);
      })
      .catch(error => {
        setError(error.message);
        console.error('Error to found motorcycles:', error.message);
      });
  }, []);

  const handleReservation = (motorbike) => {
    const selected = selectedDates[motorbike.name];

    if (!selected?.startDate || !selected?.endDate) {
      alert('Please select the dates.');
      return;
    }

    const reservationDate = {
      nameMoto: motorbike.name,
      startDate: selected.startDate.toISOString(),
      endDate: selected.endDate.toISOString(),
    };

    fetch(`${baseURL}/api/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationDate),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na reserva! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const whatsappNumber = "+34685532955";
        const startDate = selected.startDate.toLocaleDateString();
        const endDate = selected.endDate.toLocaleDateString();

        const whatsappMessage = `Hola, gustaria reserva la ${motorbike.name} del dia ${startDate} hasta ${endDate}.`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappLink, '_blank');

        alert('Reserva feita com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao fazer reserva:', error.message);
        alert('Dates not available:');
      });
  };

  const handleDescriptionClick = (motorbike) => {
    setCurrentMotorcycle(motorbike);
    setShowPopup(true);
  };

  const getDescription = (motorbike) => {
    return motorbike.description[selectedLanguage] || 'Descripcion no disponible!'
  };

  return (
    <div className="motorcycle-list">
      <h2>Lista de Motocicletas</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="cards-container">
        {motorcycles.map((motorcycle, index) => (
          <div className="card" key={index}>
            <img src={motorcycle.photo} alt={motorcycle.name} />
            <h2 className='motorcycle-name'>{motorcycle.name}</h2>
            <p className='motorcycle-price'>Preço: R$ {motorcycle.price}</p>

            <div className="date-inputs">
              <input
                type="date"
                onChange={e => {
                  const date = new Date(e.target.value);
                  setSelectedDates(prev => ({
                    ...prev,
                    [motorcycle.name]: {
                      ...prev[motorcycle.name],
                      startDate: date,
                      endDate: prev[motorcycle.name]?.endDate // Keep endDate unchanged
                    }
                  }));
                }}
                placeholder='Data de Início'
              />

              <input
                type="date"
                onChange={e => {
                  const date = new Date(e.target.value);
                  setSelectedDates(prev => ({
                    ...prev,
                    [motorcycle.name]: {
                      ...prev[motorcycle.name],
                      endDate: date
                    }
                  }));
                }}
                placeholder='Data de Término'
                min={selectedDates[motorcycle.name]?.startDate ? selectedDates[motorcycle.name].startDate.toISOString().split("T")[0] : undefined}
              />
            </div>
            <div className="btn">
            <button type='button' onClick={() => handleDescriptionClick(motorcycle)}>Descripcion</button>
            <button type='button' onClick={() => handleReservation(motorcycle)}>Reservar <i class="fa-brands fa-whatsapp"></i></button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && currentMotorcycle && (
        <div className="popup">
          <div className="popup-content">
          <img src={currentMotorcycle.photo} alt={currentMotorcycle.name} />
            <h2>{currentMotorcycle.name}</h2>
            <p className='p-description'>{getDescription(currentMotorcycle)}</p>
            <p className='p-deposit' >deposit: &#8364;{currentMotorcycle.deposit}</p>

            <div className="language-options">
              <button onClick={() => setSelectedLanguage('es')}>Espanhol</button>
              <button onClick={() => setSelectedLanguage('fr')}>Francês</button>
              <button onClick={() => setSelectedLanguage('en')}>Inglês</button>
            </div>

            <button id='btn-close' onClick={() => setShowPopup(false)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MotorcycleList;
