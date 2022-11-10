import React from "react";

export default function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start text-muted" style={{ backgroundColor: "#212529"}}>
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Información</span>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Eliberto Subias Ortega
                                </h6>
                                <p>
                                    Programador en Coppel con 3 años y medio de experencia en sistemas Clientes Web.
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                                <p><i className="fas fa-home me-3"></i> Culicán, SN 80014, MX</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    eliberto-22@hotmail.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> + 52 6674236075</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                    © 2022 Copyright:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">ElibertoSubias</a>
                </div>
            </footer>
        </>
    );
}
