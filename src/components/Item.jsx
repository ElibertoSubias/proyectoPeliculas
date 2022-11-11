import React, { useState } from "react";
import MovieDetalle from "./MovieDetalle";

export default function Item({ movie, ocultarCargando, mostrarCargando }) {
    const BASE_URL_IMAGES = "https://image.tmdb.org/t/p/w500/";
    const { id, title, overview, poster_path, release_date } = movie;
    const [movieSelected, setMovieSelected] = useState(null);
    const [show, setShow] = useState(false);
    const handleModal = () => {
        if (!show) {
            mostrarCargando();
            setMovieSelected(id);
        } else {
            setMovieSelected(null);
        }
        setShow(!show);
    };

    const ocultarLoading = () => {
        ocultarCargando();
    }

    return (
        <>
            <div onClick={() => handleModal() } className="card mb-4 p-0" style={{ width: "18rem", cursor: "pointer" }} data-toggle="modal" data-target=".bd-example-modal-lg">
                {poster_path !== null ? (
                    <img src={BASE_URL_IMAGES + poster_path} className="card-img-top" alt="..." />
                ) : (null)}
                <div className="card-body">
                    <h5><strong>{title}</strong></h5>
                    <p><strong>Fecha de estreno:</strong>{release_date }</p>
                    <p className="card-text">{overview}</p>
                </div>
            </div>
            {movieSelected !== null ? (
                <MovieDetalle id={id} show={show} handleModal={handleModal} ocultarLoading={ocultarLoading} />
            ) : (null)}
        </>
    );
}
