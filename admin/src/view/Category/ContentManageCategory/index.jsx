
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Accordion,Form,Col,Row,Button,Table} from 'react-bootstrap';
import ModalEditCategory from '../ModalEditCategory';
import ProductsOfCategory from '../ProductsOfCategory';
let headerTable = ["Tên thể loại","Sản phẩm","Xóa","Sửa"];

export default function ContentManageCategory() {
    const [flag,setFlag] = useState(false);
    const handleEditFlag = () =>{
        if(flag){
            setFlag(false)
        }else{
            setFlag(true)
        }
    }

    const [dataCategory,setDataCategory] = useState([]);
    const [values,setValue] = useState();
    const [validated,setValidated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const fetchData = async () =>{
            await axios.get("http://localhost:5000/category",{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response=>{
                setDataCategory(response.data);
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
            await axios.post("http://localhost:5000/category",values,{
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
    const deleteCategory = async (data) =>{
        const token = localStorage.getItem("accessToken");
        await axios.delete("http://localhost:5000/category/"+data,
        {
            headers:{
                'Authorization' : `Bearer ${token}` 
            }
        }).then(response =>{
                if(response.data.Message === "Xóa thể loại thành công" ){
                    handleEditFlag();
                }else{
                    alert(response.data.Message)
                }
        })
    }
    return (
        <div className="ContentManageCategory">
            <Accordion defaultActiveKey="0" className="ContentManageCategory__accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Danh sách thể loại</Accordion.Header>
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
                                {dataCategory.map((data,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{data.name}</td>
                                            <td><ProductsOfCategory id={data._id}/></td>
                                            <td><Button variant="danger" onClick={()=>deleteCategory(data._id)}><i className="fa fa-trash"></i></Button></td>
                                            <td><ModalEditCategory dataModal={data} handleEdit = {handleEditFlag}/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Thêm thể loại</Accordion.Header>
                    <Accordion.Body>
                        <Form noValidate validated={validated} onSubmit={(event)=>submitFormAdd(event)} className="FormAddCate">
                            <Row>
                                <Form.Group as={Col} controlId="formGridNameCategory">
                                    <Form.Label>Tên thể loại</Form.Label>
                                    <Form.Control type='text' name="name" required onChange={(event)=>inputChange(event)}/>
                                    <Form.Control.Feedback type="invalid">Vui lòng nhập tên thể loại</Form.Control.Feedback>
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

