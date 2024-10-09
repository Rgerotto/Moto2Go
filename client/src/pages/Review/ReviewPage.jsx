import React, { useState } from 'react';
import data from '../../../cliente.json'
import Footer from '../../components/footer'
import HeaderComp from '../../components/header'
import './clientePage.css'

const clientReview = data

function ClientePage() {

  return (
    <>
      <HeaderComp />
      <section className="container-cliente">
        {clientReview.map((review, index) => (
          <div className="card-cliente" key={index}>
            <img src={review.img} alt="" />
           <div className="text-cliente">
           <p><strong>Nombre:</strong> {review.nombre}</p>
            <p><strong>Comentario:</strong> {review.comentario}</p>
            <p><strong>Fecha:</strong> {review.fecha}</p>
           </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}

export default ClientePage;