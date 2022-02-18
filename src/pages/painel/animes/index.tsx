import { AxiosRequestConfig } from "axios";
import MyBreadcrumbs from "components/breadcrumbs";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Anime } from "types/anime";
import { SpringPage } from "types/springpage";
import { AnimeEmBranco } from "utils/blankFactory";
import { makeRequest } from "utils/requests";

const Animes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [animes, setAnimes] = useState<SpringPage<Anime>>(AnimeEmBranco);
    const navigate = useNavigate();

    const getAnimes = useCallback(() => {
        setIsLoading(true);
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/animes`,
            withCredentials: true,
            params: {
                page: 0,
                size: 10
            }
        }
        makeRequest(params)
            .then((response) => {
                setAnimes(response.data);
            })
            .catch((error) => {
               toast.error(error.response.data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        getAnimes();
    }, [getAnimes]);


    return(
        <>
            <MyBreadcrumbs controller="Animes" action="Lista"/>
            <div className="p-5 rounded bg-white shadow">
                {isLoading ?  <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>: (
                    <>
                        <div className="row mb-2">
                            <Col lg={6} className="text-start">
                                <h1>Lista de animes</h1>
                            </Col>
                            <Col lg={6} className="text-end">
                                <Button variant="success" size="lg" className="mr-2" style={{width: 150}} onClick={() => navigate('/painel/animes/add')}>
                                    <i className="fas fa-plus me-2"></i>
                                    Novo
                                </Button>
                            </Col>
                        </div>
                        <table className="table table-striped table-hover fs-6 table-responsive">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Nota</th>
                                <th>Avaliações</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {animes.content.map((anime: Anime) => (
                                <tr key={anime.id}>
                                    <th scope="row">{anime.id}</th>
                                    <td>{anime.title}</td>
                                    <td>{anime.rating}</td>
                                    <td>{anime.count}</td>
                                    <td>
                                        <button className="btn btn-primary ms-2">
                                            <i className="fas fa-edit me-2"></i>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger ms-2">
                                            <i className="fas fa-trash me-2"></i>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    )
}

export default Animes;