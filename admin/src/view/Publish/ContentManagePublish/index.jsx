
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Accordion,Form,Col,Row,Button,Table} from 'react-bootstrap';
import ModalEditPublish from '../ModalEditPublish';
const headerTable = ["Tên nhà xuất bản","Sửa"];

export default function ContentManagePublish() {
    const [flag,setFlag] = useState(false);
    const handleEditFlag = () =>{
        if(flag){
            setFlag(false)
        }else{
            setFlag(true)
        }
    }

    const [dataPublish,setDataPublish] = useState([]);
    const [values,setValue] = useState();
    const [validated,setValidated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const fetchData = async ()=>{
            await axios.get("http://localhost:5000/publishers",{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response=>{
                setDataPublish(response.data);
            })
        }
        fetchData();
    }, [flag]);
    
    const submitFormAdd = async (event)=>{
        const token = localStorage.getItem("accessToken");
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        else{
            event.preventDefault();
            await axios.post("http://localhost:5000/publishers",values,{
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
        <div className="ContentManagePublish">
            <Accordion defaultActiveKey="0" className="ContentManagePublish__accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Danh sách nhà xuất bản</Accordion.Header>
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
                                {dataPublish.map((data,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{data.name}</td>
                                            <td><ModalEditPublish dataModal={data} handleEdit ={handleEditFlag}/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Thêm nhà xuất bản</Accordion.Header>
                    <Accordion.Body>
                        <Form noValidate validated={validated} onSubmit={(event)=>submitFormAdd(event)} className="FormAddPublish">
                            <Row>
                                <Form.Group as={Col} controlId="formGridNamePublish">
                                    <Form.Label>Tên nhà xuất bản</Form.Label>
                                    <Form.Control type='text' name="name" required onChange={(event)=>inputChange(event)}/>
                                    <Form.Control.Feedback type="invalid">Vui lòng nhập tên nhà xuất bản</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <div className="btnSubmit">
                                <Button variant="success" type="submit">
                                    Thêm thể loại
                                </Button>
                            </div>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

