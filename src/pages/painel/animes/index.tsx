import { AxiosRequestConfig } from "axios";
import MyBreadcrumbs from "components/breadcrumbs";
import ActionButtons from "components/buttons";
import MyCard from "components/card";
import Table from "components/tables";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimeService } from "services/animes";
import { Anime } from "types/anime";
import { SpringPage } from "types/springpage";

const Animes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [animes, setAnimes] = useState<SpringPage<Anime>>();
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 10;

    const handleEdit = (id: number) => {
        navigate(`/painel/animes/edit/${id}`);
    }

    const handleDelete = (id: number) => {
        const confirm = window.confirm("Deseja realmente excluir este usuário?");
        setIsLoading(true);
        if(confirm) {      
        AnimeService.delete(id)
            .then((res) => {
                toast.success("Administrador deletado com sucesso!");
            })
            .catch((err) => { toast.error(err.response.data.message); }) 
            .finally(() => {setIsLoading(false);});         
            navigate(`/painel/animes`);
        }
    }

    const columns = [
        {Header: '#',accessor: 'id'},
        {Header: 'Nome',accessor:  'title'},
        {Header: 'Nota',accessor: 'rating'},
        {Header: 'Avaliações',accessor: 'count'},
        {Header: 'Ações', accessor:(originalRow:any) => <ActionButtons handleEdit={() => handleEdit(originalRow.id)} handleDelete={() => handleDelete(originalRow.id)}  />}
    ];

    const getAnimes = useCallback(() => {
        setIsLoading(true);
        const params: AxiosRequestConfig = {
            params: {
                page: pageCount,
                size: itemsPerPage
            }
        }
        AnimeService.findAll(params)
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
                    animes && <Table columns={columns} data={animes.content} />
                                    
                }
                {
                    animes &&  
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
                }
            </MyCard>
        </>
    )
}

export default Animes;