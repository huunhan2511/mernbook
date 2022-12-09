import React,{useState} from 'react'
import logo from "../../Image/SAGOBooK.png";
import { Card,Form,Button,Image } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';
export default function Login({handleLogin}) {
    let history = useHistory();
    const [login,setLogin] = useState({
        username : "",
        password : ""
    })
    const inputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setLogin(login=>({
            ...login,
            [name] : value
        }))
    }
    const Login = async (event) =>{
        event.preventDefault();
        const reponse = await axios.post("http://localhost:5000/admin/login",login);
        
        if(reponse.data.accessToken){
            handleLogin(reponse.data.accessToken)
            history.push("/Admin/Home")
        }else{
            alert(reponse.data.Message)
        }
    }
    return (
        <div className="divLogin">
            <Card className="cardLogin">
                    <Image src={logo} className="logoLogin"/>
                    <Form onSubmit={(e)=>Login(e)}>
                        <Form.Group controlId="formBasicUsername" className="grUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={(event) => inputChange(event)} name="username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="grPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(event) => inputChange(event)} name="password"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Đăng nhập
                        </Button>
                    </Form>
            </Card>
        </div>
    )
}
