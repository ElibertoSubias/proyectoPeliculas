import React, { useState, useEffect } from "react";
import Item from "./Item";
import axios from "axios";
import datosEjemplos from "../assets/movies.json";
import { Circles } from 'react-loader-spinner';
import Footer from "./Footer";

export default function Estrenos({ cambiarOpcion, movies, cargarPagina, pageable, numPages, isActive, isActiveLoading, ocultarCargando, mostrarCargando }) {

    useEffect(() => {
        cambiarOpcion("proximosestrenos");
    }, []);

    return (
        <>
            <main className="container-fluid">
                {pageable ? (
                    <>
                        <div className="row " style={{ display: "flex", justifyContent: "space-around" }}>
                            {movies.map(movie => {
                                return (<Item key={movie.id} movie={movie} ocultarCargando={ocultarCargando} mostrarCargando={mostrarCargando} />);
                            })}
                        </div>
                        <nav aria-label="Page navigation" className="d-flex justify-content-center">
                            <ul className="pagination">
                                <li className="page-item" onClick={() => cargarPagina(null, true, false)}><a className="page-link" href="#">Previous</a></li>
                                {[...Array(numPages)].map((e, i) => {
                                    return <li key={i} onClick={() => cargarPagina(i)} className={`page-item ${isActive == i ? "active" : ""}`}><a className="page-link" href="#">{i + 1}</a></li>
                                })}
                                <li className="page-item" onClick={() => cargarPagina(null, false, true)}><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </>
                ) : (
                    <div className="row " style={{ display: "flex", justifyContent: "space-around" }}>
                        {movies.map(movie => {
                            return (<Item key={movie.id} movie={movie} ocultarCargando={ocultarCargando} mostrarCargando={mostrarCargando} />);
                        })}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
