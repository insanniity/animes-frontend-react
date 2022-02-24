import { AxiosRequestConfig } from "axios";
import MyBreadcrumbs from "components/breadcrumbs";
import MyCard from "components/card";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Anime } from "types/anime";
import { SpringPage } from "types/springpage";
import { AnimeEmBranco } from "utils/blankFactory";
import { makeRequest } from "utils/requests";
import ReactPaginate from "react-paginate";

const Animes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [animes, setAnimes] = useState<SpringPage<Anime>>(AnimeEmBranco);
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 10;

    const getAnimes = useCallback(() => {
        setIsLoading(true);
        const params: AxiosRequestConfig = {
            method: "GET",
            url: `/animes`,
            withCredentials: true,
            params: {
                page: pageCount,
                size: itemsPerPage
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
    }, [pageCount]);

    useEffect(() => {
        getAnimes();
    }, [getAnimes]);

    const handlePageClick = (event:any) => {
        setPageCount(event.selected);
        console.log(event);
    };


    return(
        <>
            <MyBreadcrumbs controller="Animes" action="Lista"/>
                <MyCard>
                    <div className="row mb-2">
                        <Col lg={6} sm={12} className="text-md-start">
                            <h1>Lista de animes</h1>
                        </Col>
                        <Col lg={{span: 2, offset: 4}} sm={12} className="text-md-end my-3 my-md-0">
                            <Button variant="success" size="lg" className="mr-2 w-100" style={{width: 150}} onClick={() => navigate('/painel/animes/add')}>
                                <i className="fas fa-plus me-2"></i>
                                Novo
                            </Button>
                        </Col>
                    </div>
                    {isLoading ?  
                        <Row className="text-cente justify-content-center">
                            <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
                        </Row> 
                        :
                        <table className="table table-striped table-hover fs-6 table-responsive">
                            <thead>
                            <tr>
                                <th className="d-none d-md-block">#</th>
                                <th>Nome</th>
                                <th>Nota</th>
                                <th className="d-none d-md-block">Avaliações</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {animes.content.map((anime: Anime) => (
                                <tr key={anime.id}>
                                    <th scope="row" className="d-none d-md-table-cell">{anime.id}</th>
                                    <td>{anime.title}</td>
                                    <td>{anime.rating}</td>
                                    <td className="d-none d-md-table-cell">{anime.count}</td>
                                    <td>
                                        <button className="btn btn-primary ms-2">
                                            <i className="fas fa-edit me-2"></i>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger ms-2 mt-2 mt-md-0">
                                            <i className="fas fa-trash me-2"></i>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    }
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={animes.totalPages}
                        previousLabel="<"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        activeClassName="active"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        disabledClassName="disabled"
                        renderOnZeroPageCount={() => null}
                    />
                </MyCard>
        </>
    )
}

export default Animes;