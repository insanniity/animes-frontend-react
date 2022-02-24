import { AxiosRequestConfig } from "axios";
import MyBreadcrumbs from "components/breadcrumbs";
import MyCard from "components/card";
import { useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "utils/requests";

type FormData = {
    titulo: string;
    image: string;
    descricao: string;
}

const AddAnime = () => {
    const { register, handleSubmit } = useForm<FormData>();   
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const saveAnime = (data: FormData) => {
        setIsLoading(true);
        const params: AxiosRequestConfig = {
            method: "POST",
            url: `/animes`,
            withCredentials: true,
            data: {
                title: data.titulo,
                image: data.image,
                description: data.descricao
            }
        }
        makeRequest(params)
        .then((response) => {
            toast.success("Anime cadastrado com sucesso!");
            navigate("/painel/animes");
        }).catch((error) => {
            toast.error(error.response.data);
        }).finally(() => setIsLoading(false));
    }

    const onSubmit = (data: FormData) => {
        saveAnime(data);
    };

    return (
        <>
            <MyBreadcrumbs controller="Animes" action="Adicionar"/>
            <MyCard>
                {isLoading ?  
                    <Row className="text-cente justify-content-center">
                        <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
                    </Row> 
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Titulo</label>
                            <input type="text" className="form-control" {...register("titulo", {required: true})} />              
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Link Imagem</label>
                            <input type="url" className="form-control" {...register("image", {required: true})} />                    
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descrição</label>
                            <textarea rows={8} className="form-control" {...register("descricao",  {required: true})} />                 
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-success btn-lg" value="Salvar" />               
                        </div>
                    </form>
                }
            </MyCard>
        </>
    );
};

export default AddAnime;
