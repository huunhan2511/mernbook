import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Accordion,Form,Col,Row,Button,Table} from 'react-bootstrap';
import ModalEditVoucher from '../ModalEditVoucher';
import { useAuth } from '../../../Context/AuthContext';
let headerTable = ["Mã khuyến mãi","Giảm","Số lượng","Sửa"];

export default function ContentManageVoucher() {
    const {handleLogout} = useAuth();
    const [dataVoucher,setDataVoucher] = useState([]);
    const [validated,setValidated] = useState(false);
    const [values,setValue] = useState();
    const fetchData = async ()=>{
        const token = localStorage.getItem("accessToken");
        await axios.get(process.env.REACT_APP_API_URL + "vouchers",{
            headers:{
                'Authorization' : `Bearer ${token}` 
            }
        }).then(response =>{
            
            setDataVoucher(response.data);
        }).catch(response =>{
            handleLogout();
        })
    }
    useEffect(() => {
        fetchData();
    }, []);
    const submitFormAdd = async (event)=>{
        const token = localStorage.getItem("accessToken");
        setValidated(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        else{
            event.preventDefault();
            await axios.post(process.env.REACT_APP_API_URL + "vouchers",values,{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response =>{
                    if(response.data.Message){
                        alert(response.data.Message)
                        setValidated(false);
                        fetchData();
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
                    <Accordion.Header>Danh sách mã khuyến mãi</Accordion.Header>
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
                                {dataVoucher.map((data,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{data.code}</td>
                                            <td>{data.discount}</td>
                                            <td>{data.quantity}</td>
                                            <td><ModalEditVoucher dataModal={data} handleEdit= {fetchData}/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Thêm mã khuyến mãi</Accordion.Header>
                    <Accordion.Body>
                        <Form noValidate validated={validated} onSubmit={submitFormAdd} className="FormAddVoucher">
                            <Row>
                                <Form.Group as={Col} controlId="formGridNameVoucher">
                                    <Form.Label>Mã khuyến mãi</Form.Label>
                                    <Form.Control type='text' name="code" required onChange={inputChange}/>
                                    <Form.Control.Feedback type="invalid">Vui lòng nhập mã khuyến mãi</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridDiscountVoucher">
                                    <Form.Label>Giảm giá</Form.Label>
                                    <Form.Control type='number' name="discount" required onChange={inputChange}/>
                                    <Form.Control.Feedback type="invalid">Vui lòng giảm giá</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridQuantityVoucher">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control type='number' name="quantity" required onChange={inputChange}/>
                                    <Form.Control.Feedback type="invalid">Vui lòng nhập số lượng</Form.Control.Feedback>
                                </Form.Group>
                                
                            </Row>
                            <Form.Group controlId="formDescriptionVoucher">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control as="textarea" name="description" onChange={inputChange}/>
                            </Form.Group>
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
