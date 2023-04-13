import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const submit = (data) => {
        console.log(data)
        axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
        .then( resp => {
            console.log(resp.data)
            localStorage.setItem("token", resp.data?.token)
            navigate("/")
        } )
        .catch( error => {
            if (error.response?.status === 401) {
                alert("Credenciales incorrectas")
            } else {
                console.log(error.response?.data)
            }
        } )
    }
  return (
    <Form 
    className="container mt-4" 
    style={{maxWidth:500, padding: "20px 50px", border: "1px solid #000", borderRadius: 7}}
    onSubmit = {handleSubmit(submit)}
    >  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email" 
        {...register("email")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        {...register("password")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign in
      </Button>
    </Form>
  );
};

export default Login;
