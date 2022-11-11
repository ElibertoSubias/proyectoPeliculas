import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import datosJson from '../assets/detalles.json'

export default function MovieDetalle({ id, show, handleModal, ocultarLoading }) {

    const [movie, setMovie] = useState(null);
    const BASE_URL_IMAGES = "https://image.tmdb.org/t/p/w500/";
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ec916eb9d54632dd8ba00250a2e65265`).then((response) => {
            if (response.data.errorMessage) {
                console.log(response.data.errorMessage);
                setMovie(datosJson);
                ocultarLoading();
            } else {
                ocultarLoading();
                setMovie(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            {movie !== null ? (
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => handleModal()}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {movie.title} - {movie.release_date }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {movie.poster_path !== null ? (
                            <img style={{ height: "500px", display: "block", margin: "auto" }} src={BASE_URL_IMAGES + movie.poster_path} alt="movie.title" />
                        ) : (
                            null
                        )}
                        <p>{movie.overview}</p>
                        <p><strong>Total de votos:</strong> {movie.vote_count }</p>
                        <strong>Genero</strong>
                        <ul>
                            {movie.genres ? (
                                movie.genres.map(item => {
                                    return <li key={item.id}>{ item.name }</li>
                                })
                            ): (null)}
                        </ul>
                    </Modal.Body>
                </Modal>
            ) : (null)}
        </>
    );
}
