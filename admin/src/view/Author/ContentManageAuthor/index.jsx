import axios from 'axios';
import React, { useState,useEffect} from 'react'
import { Accordion,Table,Form,Button,Row,Col} from 'react-bootstrap';
import ModalEditAuthor from "../ModalEditAuthor";
let headerTable = ["Tên tác giả","Sửa"];
export default function ContentManageAuthor() {
    const [flag,setFlag] = useState(false);
    const handleEditFlag = () =>{
        if(flag){
            setFlag(false)
        }else{
            setFlag(true)
        }
    }


    const [authors,setauthors] = useState([]);
    const [validated,setValidated] = useState(false);
    const [values,setValue] = useState({
        name: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const fetchAuthor = async () =>{
            await axios.get("http://localhost:5000/authors",{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response=>{
                setauthors(response.data);
            })
        };
        fetchAuthor();
    }, [flag])
    const submitFormAdd = async (event)=>{
        const token = localStorage.getItem("accessToken");
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        else{
            event.preventDefault();
            await axios.post("http://localhost:5000/authors",values,{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response =>{
                    if(response.data.Message){
                        alert(response.data.Message)
                        handleEditFlag();
                        form.reset();
                    }  
            })
            
        }

    };

    const inputChange = (event) =>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValue((values)=> ({
            ...values,
            [name] : value
        })
        );
    }
    return (
            <div className="ContentManageVoucher">
            <Accordion defaultActiveKey="0" className="ContentManageVoucher__accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Danh sách tác giả</Accordion.Header>
                    <Accordion.Body>
                    <div className="cardTable table-wrapper-scroll-y my-custom-scrollbar">
                        <Table>
                            <thead>
                                <tr>                  
                                {headerTable.map((data,key)=>{
                                    return (
                                    <th key={key}>{data}</th>  
                                    );
                                })}
                                </tr>
                            </thead>
                            <tbody>
                                {authors.map((author,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{author.name}</td>
                                            <td><ModalEditAuthor dataModal={author} handleEdit={handleEditFlag}/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Thêm tác giả</Accordion.Header>
                    <Accordion.Body>
                        <Form noValidate validated={validated} onSubmit={(event)=>submitFormAdd(event)} className="FormAddVoucher">
                            <Row>
                                <Form.Group as={Col} controlId="formGridNameAuthor">
                                    <Form.Label>Tên tác giả</Form.Label>
                                    <Form.Control type='text' name="name" required onChange={(event)=>inputChange(event)}/>
                                    <Form.Control.Feedback type="invalid">Vui lòng nhập tên tác giả</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <div className="btnSubmit">
                                <Button variant="success" type="submit">
                                    Thêm
                                </Button>
                            </div>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
