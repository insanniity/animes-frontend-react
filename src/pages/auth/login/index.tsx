import { useAuth } from "contexts/AuthContext"
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

type FormState = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormState>();
    const {isAuthenticated, signIn} = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = ({username, password}: FormState) => {
        setIsLoading(true);
        signIn({username, password}).finally(() => setIsLoading(false));
    }



    return isAuthenticated() ? <Navigate to={'/painel'} /> : (
        <>            
            <form onSubmit={handleSubmit(onSubmit)} className="needs-validation text-center">
                <img src="https://via.placeholder.com/550x200.png" className="img-fluid mb-4" alt="Logo" />
                {isLoading ? <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : (
                <>
                    <h1 className="h3 fw-normal">Digite seu login</h1>
                    <div className="form-floating mb-3 mt-1">                   
                        <input 
                            type="email"     
                            placeholder="Email"                                    
                            className={`form-control bg-white ${errors.username ? 'is-invalid' : ''}`}                            
                            {...register("username", { required: true, value: "admin@admin.com" })}
                            />
                        <label htmlFor="username">Email</label>                        
                    </div>
                    <div className="form-floating mb-3 mt-1">                   
                        <input 
                            type="password" 
                            placeholder="Senha"                                              
                            className={`form-control bg-white ${errors.password ? 'is-invalid' : ''}`}                            
                            {...register("password", { required: true , value: "123456"})}
                            />
                        <label htmlFor="Senha">Senha</label>                        
                    </div>
                    {/* <Link to="/esqueci-a-senha" className="text-decoration-none fw-bold">Esqueceu a senha ?</Link> */}
                    <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Login</button>
                </>
                )}
                <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
            </form> 
        </>
    )
}


export default Login;