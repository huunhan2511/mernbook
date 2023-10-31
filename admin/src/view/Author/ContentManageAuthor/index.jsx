import axios from 'axios';
import React, { useState,useEffect, useCallback} from 'react'
import { Accordion,Table,Form,Button,Row,Col} from 'react-bootstrap';
import ModalEditAuthor from "../ModalEditAuthor";
let headerTable = ["Tên tác giả","Sửa"];
export default function ContentManageAuthor() {
    const [authors,setauthors] = useState([]);
    const [validated,setValidated] = useState(false);
    const [values,setValue] = useState({
        name: ""
    });
    const fetchAuthor = async () =>{
        const token = localStorage.getItem("accessToken");
        await axios.get(process.env.REACT_APP_API_URL + "authors",{
            headers:{
                'Authorization' : `Bearer ${token}` 
            }
        }).then(response=>{
            setauthors(response.data);
        })
    };
    useEffect(() => {
        fetchAuthor();
    }, [])
    const submitFormAdd = useCallback(async (event)=>{
        const token = localStorage.getItem("accessToken");
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        else{
            event.preventDefault();
            await axios.post(process.env.REACT_APP_API_URL + "authors",values,{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response =>{
                    if(response.data.Message){
                        alert(response.data.Message)
                        fetchAuthor();
                        setValidated(false);
                        form.reset();
                    }  
            })
            
        }

    });

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
                                            <td><ModalEditAuthor dataModal={author} handleEdit={fetchAuthor}/></td>
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
                        <Form noValidate validated={validated} onSubmit={submitFormAdd} className="FormAddVoucher">
                            <Row>
                                <Form.Group as={Col} controlId="formGridNameAuthor">
                                    <Form.Label>Tên tác giả</Form.Label>
                                    <Form.Control type='text' name="name" required onChange={inputChange}/>
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
