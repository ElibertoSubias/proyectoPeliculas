import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

export default function Nav({ cambiarOpcion, opcion, filtrarPorNombre, ordenMenor, ordenMayor }) {

    const [opcionActiva, setOpcionActiva] = useState("home");
    const [enteredText, setEnteredText] = useState('');
    useEffect(() => {
        setEnteredText('');
        cambiarOpcion(opcionActiva)
    }, [opcionActiva]);

    const buscarPorNombre = (event) => {
        setEnteredText(event.target.value);
        filtrarPorNombre(event.target.value);
    }

    const ordenarPorMenor = () => {
        ordenMenor();
    }

    const ordenarPorMayor = () => {
        ordenMayor();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand" href="#">
                        <img style={{with: "50px", height: "50px"}} src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/encartelera" onClick={() => setOpcionActiva("encartelera")} className={ `nav-link ${opcion == "encartelera" ? "active" : ""}` } href="#">En Cines</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/proximosestrenos" onClick={() => setOpcionActiva("proximosestrenos")} className={`nav-link ${opcion == "proximosestrenos" ? "active" : ""}` } aria-current="page" href="#">Proximos Estrenos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/top" onClick={() => setOpcionActiva("top")} className={ `nav-link ${opcion == "top" ? "active" : ""}` } href="#">Peliculas Top</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 border rounded">
                                <li className="nav-item nav-link">
                                    <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => ordenarPorMenor()} color="white" icon={faStarHalf} />
                                </li>
                                <li className="nav-item nav-link">
                                    <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => ordenarPorMayor()} color="white" icon={faStar} />
                                </li>
                            </ul>

                            <i className="fa fa-star" aria-hidden="true">2</i>
                            <input value={enteredText} onChange={(e) => buscarPorNombre(e)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}
