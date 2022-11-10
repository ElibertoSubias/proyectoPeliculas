import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import TopMovies from "./components/TopMovies";
import EnCartelera from "./components/EnCartelera";
import Estrenos from "./components/Estrenos";
import { Circles } from 'react-loader-spinner';
import Nav from './components/NavSide/Nav'

function App() {

  const BASE_URL = "https://api.themoviedb.org/3/movie";
  const BASE_URL_SEARCH = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "ec916eb9d54632dd8ba00250a2e65265";
  const MOST_POPULAR = "/popular";
  const NOW_PALYING = "/now_playing";
  const UP_COMING = "/upcoming";
  const TOP = "/top_rated";
  const [movies, setMovies] = useState([]);
  const [moviesAux, setMoviesAux] = useState([]);
  const [pageable, setPageable] = useState(false);
  const [sizePage, setSizePage] = useState(10);
  const [numPages, setNumPages] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const [pageActive, setPageActive] = useState([]);
  const [isActiveLoading, setisActiveLoading] = useState(false);
  const [opcion, setOpcion] = useState("home");

  useEffect(() => {
    let urlOpcion = "";
    console.log(opcion);
    if (opcion == "home") {
      urlOpcion = MOST_POPULAR;
    } else if (opcion == "encartelera") {
      urlOpcion = NOW_PALYING;
    } else if (opcion == "proximosestrenos") {
      urlOpcion = UP_COMING;
    } else if (opcion == "top") {
      urlOpcion = TOP;
    } else {
      urlOpcion = MOST_POPULAR;
    }
    axios.get(`${BASE_URL + urlOpcion}?api_key=${API_KEY}`).then((response) => {
      if (response.data.errorMessage) {
        console.log(response.data.errorMessage);
      } else {
        setMovies(response.data.results);
        setMoviesAux(response.data.results);
      }

    })
    .catch((error) => {
      console.log(error);
    });
  }, [opcion]);

  useEffect(() => {
    // Obtenemos cuantas paginas se generaran
    setNumPages(Math.ceil((movies.length / sizePage)));
    setPageable(true);
    setPageActive(movies.slice(0, sizePage));
  }, [movies]);

  const cambiarOpcion = (opcion) => {
    setIsActive(0);
    console.log(opcion);
    setOpcion(opcion);
  }

  const cargarPagina = (page, prev, next) => {

    if (prev) {
      page = isActive;
      if (isActive > 0) {
        page--;
      }
    } else if (next) {
      page = isActive;
      if (isActive < numPages - 1) {
        page++;
      }
    }

    setIsActive(page);

    let puntero = 0;
    let inicio = 0;
    let arrayAuxiliar = [];
    while (inicio < numPages) {
      if (inicio == page) {
        console.log(movies.slice(puntero, (parseInt(sizePage) + parseInt(puntero))));
        setPageActive(movies.slice(puntero, (parseInt(sizePage) + parseInt(puntero))));
        break;
      }
      puntero += sizePage;
      inicio++;
    }
  }

  const mostrarCargando = () => {
    setisActiveLoading(true);
  }

  const ocultarCargando = () => {
    setisActiveLoading(false);
  }

  const filtrarPorNombre = (value) => {
    if (value.length == 0) {
      setMovies(moviesAux);
      return;
    }
    axios.get(`${BASE_URL_SEARCH}?api_key=${API_KEY}&query=${value.toLowerCase()}`).then((response) => {
      if (response.data.results.length > 0) {
        setMovies(response.data.results);
      } else {
        setMovies(moviesAux);
      }

    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <header>
        <Nav cambiarOpcion={cambiarOpcion} opcion={opcion} filtrarPorNombre={filtrarPorNombre} />
      </header>
      <Circles
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass="cargandoSpinner"
        visible={isActiveLoading}
      />
      <Routes>
        <Route path="*" element={
          <Home
            cambiarOpcion={cambiarOpcion}
            movies={pageActive}
            cargarPagina={cargarPagina}
            numPages={numPages}
            pageable={pageable}
            isActive={isActive}
            isActiveLoading={isActiveLoading}
            ocultarCargando={ocultarCargando}
            mostrarCargando={mostrarCargando}
          />}
        />
        <Route path="/home" element={<Home
          cambiarOpcion={cambiarOpcion}
          movies={pageActive}
          cargarPagina={cargarPagina}
          numPages={numPages}
          pageable={pageable}
          isActive={isActive}
          isActiveLoading={isActiveLoading}
          ocultarCargando={ocultarCargando}
          mostrarCargando={mostrarCargando}
        />} />
        <Route path="/encartelera" element={
          <EnCartelera
            cambiarOpcion={cambiarOpcion}
            movies={pageActive}
            cargarPagina={cargarPagina}
            numPages={numPages}
            pageable={pageable}
            isActive={isActive}
            isActiveLoading={isActiveLoading}
            ocultarCargando={ocultarCargando}
            mostrarCargando={mostrarCargando}
          />} />
        <Route path="/proximosestrenos" element={
          <Estrenos
            cambiarOpcion={cambiarOpcion}
            movies={pageActive}
            cargarPagina={cargarPagina}
            numPages={numPages}
            pageable={pageable}
            isActive={isActive}
            isActiveLoading={isActiveLoading}
            ocultarCargando={ocultarCargando}
            mostrarCargando={mostrarCargando}
          />} />
        <Route path="/top" element={
          <TopMovies
            cambiarOpcion={cambiarOpcion}
            movies={pageActive}
            cargarPagina={cargarPagina}
            numPages={numPages}
            pageable={pageable}
            isActive={isActive}
            isActiveLoading={isActiveLoading}
            ocultarCargando={ocultarCargando}
            mostrarCargando={mostrarCargando}
          />} />
      </Routes>
    </>
  )
}

export default App;
