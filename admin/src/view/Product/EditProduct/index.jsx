import React,{useEffect, useState} from 'react';
import {Card,Button, Form,Row,Col} from "react-bootstrap";
import { Upload } from 'antd';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';


export default function EditProduct() {
    const history = useHistory();
    const {id} = useParams();
    const [isDisable,setDisabled] = useState(true);
    const [validated,setValidated] = useState(false);
    const [category,setCategory] = useState([]); 
    const [publishers,setPublisher] = useState([]); 
    const [authors,setAuthor] = useState([]);
    const [product,setProduct] = useState();  
    const [values,setValue] = useState({});
    useEffect(()=>{
      const token = localStorage.getItem('accessToken');
      const config ={
        headers:{
          'Authorization' : `Bearer ${token}` 
        }
      }
      const fetchData = async () => {
        const response = await axios.get("http://localhost:5000/products/"+id);
        // headers 
        const responseCategory = await axios.get("http://localhost:5000/category",config);
        const responseAuthor = await axios.get("http://localhost:5000/authors",config);
        const responsePublisher = await axios.get("http://localhost:5000/publishers",config);
        setAuthor(responseAuthor.data);
        setCategory(responseCategory.data);
        setPublisher(responsePublisher.data);
        const data = response.data;
        setProduct(data);
    };
    fetchData();
    },[])

    const handleEdit = async (event) =>{
      
      event.preventDefault();
      var data = new FormData();
      for(var key in values){
          data.append(key,values[key])
      }
      const token = localStorage.getItem('accessToken')
      await axios.patch("http://localhost:5000/products/"+id,data,{
        headers :{
          'Authorization' : `Bearer ${token}`,
          'content-type': 'multipart/form-data'
        }
      }).then(response=>{
          if(response.data.Message==="Cập nhật sản phẩm thành công"){
            alert(response.data.Message)
            history.push("/Admin/Products")
          }else{
            alert(response.data.Message);
          }
      })
      
    }
    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };
    const handleUpload = async (info) =>{
      setDisabled(false)
      setValue((values)=>({
        ...values,
        image : info.file
      }))
    }
    const inputChange = (event) =>{
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValue((values)=> ({
        ...values,
        [name] : value
      })
      );
      setDisabled(false);
      if(value === "") {
        setDisabled(true);
      }
    }
    const selectChange = (event) =>{
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValue((values)=> ({
        ...values,
        [name] : value
      })
      );
      switch(name)
      {
        case "publisher" : {
          setDisabled(false);
          if(value === product.publisher._id) {
            setDisabled(true);
          }
          break;
        }
        case "category" : {
          setDisabled(false);
          if(value === product.category._id) {
            setDisabled(true);
          }
          break;
        }
        case "author" : {
          setDisabled(false);
          if(value === product.author._id) {  
            setDisabled(true);
          }
          break;
        }
        default : {
          return
        }
      }
      
    }
    const handleReturn= () =>{
      history.push('/Admin/Products')
    }
    const handleCheckProduct = (hot) =>{
      if(hot){
        setDisabled(false)
        setProduct((product)=>({
          ...product,
          hot : false
        }))
        setValue((values)=>({
          ...values,
          hot: false
        }))
      }else{
        setDisabled(false)
        setProduct((product)=>({
          ...product,
          hot : true
        }))
        setValue((values)=>({
          ...values,
          hot : true 
        }))
      }
      
    }
    return ( 
      <>
      <Card className="cardEditProduct mt-5">
          <Card.Body>
            <Card.Title>
              <Button className="btn-return m-1" onClick={handleReturn}><i className="fa fa-angle-left"></i></Button>
              Chi tiết sản phẩm #{id}
            </Card.Title>
            {product &&
            <Form noValidate validated={validated} className="FormEditProduct" onSubmit={(event)=>{handleEdit(event)}} enctype="multipart/form-data">
                    <Row>
                        <Form.Group as={Col} controlId="formGridId">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type='text' name="id" defaultValue={product._id} readOnly/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNameProduct">
                            <Form.Label>Tên sách</Form.Label>
                            <Form.Control type='text' name="name"  defaultValue={product.name} required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập tên sách</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group as={Col} controlId="formGridNameAuthor">
                            <Form.Label>Tác giả </Form.Label>
                            <Form.Select type='text' name="author" required onChange={(event)=>selectChange(event)}>
                              <option value={product.author._id}>{product.author.name}</option>
                              {authors.map((value,key)=>{
                                return(
                                    <option key={key} value={value._id}>{value.name}</option>
                                );
                              })}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNameCategory ">
                            <Form.Label>Thể loại </Form.Label>
                            <Form.Select type='select' name="category" required onChange={(event)=>selectChange(event)}>
                              <option value={product.category._id}>{product.category.name}</option>
                              {category.map((value,key)=>{
                                return(
                                    <option  key={key} value={value._id}>{value.name}</option>
                                );
                              })}
                            </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNamePulish ">
                            <Form.Label>Nhà xuất bản </Form.Label>
                            <Form.Select type='select' name="publisher" required onChange={(event)=>selectChange(event)}>
                              <option value={product.publisher._id}>{product.publisher.name}</option>
                              {publishers.map((publisher,key)=>{
                                return(
                                    <option key={key} value={publisher._id}>{publisher.name}</option>
                                );
                              })}
                            </Form.Select>
                    </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridQuantity">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control type='number' name="stock" min="0" defaultValue={product.stock} required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập số lượng</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Đơn giá</Form.Label>
                            <Form.Control type='number' name="price" min="0" defaultValue={product.price}  required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập đơn giá</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNumberPage">
                            <Form.Label>Số trang</Form.Label>
                            <Form.Control type='number' name="printLength" min="0" defaultValue={product.printLength} required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng số trang</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="btn-CheckHot d-flex">
                      {/* <Button className="my-2" onClick={() => handleCheckProduct(product.hot)} >{product.hot ? <i className="fa fa-times"></i> : <i className="fa fa-plus"></i> }</Button> */}
                      {product.hot ? 
                        <Button variant="danger" className="my-2" onClick={() => handleCheckProduct(product.hot)}> <i className="fa fa-times"></i> </Button> 
                        :
                        <Button variant="success" className="my-2" onClick={() => handleCheckProduct(product.hot)}> <i className="fa fa-plus"></i> </Button> 
                        
                      }
                      <h6 className="my-3 mx-2">{product.hot ? "Xóa sản phẩm khỏi danh sách nổi bật" : "Thêm sản phẩm vào danh sách nổi bật"}</h6>
                    </div>
                    <Form.Group className="uploadImage">
                      
                        <Upload
                          defaultFileList={[...product.image]}
                          listType="picture"
                          onChange={handleUpload}
                          customRequest={dummyRequest}
                          maxCount={1}
                          accept=".jpg,.png"
                          beforeUpload={() => false} 
                        >
                          <Button className="px-2" variant="secondary">
                             Chọn ảnh 
                          </Button>
                          <Form.Label className="m-3 h6">Chọn 1 ảnh (Định dạng jpg,png vd: sagologo.png)</Form.Label>
                        </Upload>
                    </Form.Group>

                    <div className="btnSubmit d-flex justify-content-end">
                          <Button variant="primary" type="submit" disabled={isDisable}>
                              Lưu
                          </Button>
                    </div>
            </Form>
            }
        </Card.Body>
      
      </Card>
      
      </>

      );
  }