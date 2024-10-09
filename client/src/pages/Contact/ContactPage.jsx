import React, { useState } from 'react';
/* import { APIProvider, Map } from '@vis.gl/react-google-maps'; */
import './ContactPage.css'

function Contact() {
    const position = { lat: 41.23635632831617, lng: 1.8056280831165197 };
    //const [open, setOpen] = useState(false)
    const whatsappNumber = +34611788889;
    const whatsappMessage = 'Hola, me gustaría saber más sobre sus servicios.';
    //const dataJson = data;
    return (
        <div>
            <section className='contacto-page'>
                <div className='container-title'>
                    <h2 className='h2-class'>Contacto</h2>
                </div>

                <div className="container-ubicacion">
                    <div className="contacto-ubicacion">
                        <p>Plaza España, 25, 08870 Sitges, Barcelona </p>
                        <p>teléfono: +34611788889</p>
                        <p>correo electrónico: email@email.com</p>
                        <div>
                        <a href="https://maps.app.goo.gl/UH9Q6hvPZvU4yzN87" target="_blank" rel="noopener noreferrer">
                            <img src="../../../img/map_moto2Go.png" alt="" />
                        </a>
                        </div>
                    </div>
                    <div className="contacto-ubicacion">
                    <p>Plaça de l'Estació, 08860 Castelldefels, Barcelona</p>
                        <p>teléfono: +34611788889</p>
                        <p>correo electrónico: email@email.com</p>
                        <div>
                        <a href="https://maps.app.goo.gl/UH9Q6hvPZvU4yzN87" target="_blank" rel="noopener noreferrer">
                            <img src="../../../img/map_moto2Go.png" alt="" />
                         </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Contact;