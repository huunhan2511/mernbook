import React,{useState,useEffect} from 'react';
import axios from "axios";
import {Button, Form,Row,Col} from "react-bootstrap";
import { Upload } from 'antd';


export default function CreateProduct({handleAdd}) {
    const [values,setValue] = useState();
    const [images,setImage] = useState([]);
    const [validated,setValidated] = useState(false);
    const [category,setCategory] = useState([]); 
    const [publishers,setPublisher] = useState([]); 
    const [authors,setAuthor] = useState([]);
    const [hotProduct,setHotProduct] = useState(false);
    useEffect(()=>{
      
      const token = localStorage.getItem('accessToken');
      const config ={
        headers:{
          'Authorization' : `Bearer ${token}` 
        }
      }
      const fetchData = async () => {
        const responseCategory = await axios.get(process.env.REACT_APP_API_URL + "category",config);
        const responseAuthor = await axios.get(process.env.REACT_APP_API_URL + "authors",config);
        const responsePublisher = await axios.get(process.env.REACT_APP_API_URL + "publishers",config);
        setAuthor(responseAuthor.data);
        setCategory(responseCategory.data);
        setPublisher(responsePublisher.data);
    };
    fetchData();
    },[])
    const uploadImage = async (imagesList) => {
      const configImgur = {
        Authorization: 'Client-ID ' + process.env.REACT_APP_CLIENT_ID_IMGUR
      };
      var images = [];
      for (const img of imagesList) {
        let data = new FormData();
        data.append('image', img);
        const response = await axios.post(process.env.REACT_APP_API_IMGUR, data, {
          headers: configImgur
        });
        images.push(response.data.data.link);
      }
      return images;
    }
    
    const handleEdit = async (event) => {
      const form = event.currentTarget;
      setValidated(true);
      if (form.checkValidity() === false) {
        event.preventDefault();
      } else {
        event.preventDefault();
          const imagesList = await uploadImage(images);
          const data = {...values, image: imagesList}
          const token = localStorage.getItem('accessToken');
          const response = await axios.post(process.env.REACT_APP_API_URL + "products", data, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
    
          if (response.data.Message === "Tạo sản phẩm thành công") {
            alert(response.data.Message);
            setValidated(false);
            form.reset();
            handleAdd();
          } else {
            alert(response.data.Message);
          }
      }
    }
    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };

   
    const handleUpload = (info) =>{
      let images = []
      info.fileList.map(file =>{
        images.push(file.originFileObj)
      })
      setImage(images);
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

    }
    const handleCheckProduct = () =>{
      setHotProduct(!hotProduct)
        setValue((values)=>({
          ...values,
          hot : !hotProduct
        }))
    }
    return (
      <>
            <Form noValidate validated={validated} className="FormEditProduct" onSubmit={(event)=>{handleEdit(event)}}>
                    <Row>
                        <Form.Group as={Col} controlId="formGridNameProduct">
                            <Form.Label>Tên sách</Form.Label>
                            <Form.Control type='text' name="name" required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập tên sách</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group as={Col} controlId="formGridNameAuthor">
                            <Form.Label>Tác giả </Form.Label>
                            <Form.Select type='text' name="author" required onChange={(event)=>selectChange(event)}>
                              <option value="">Chọn tác giả</option>
                              {authors.map((author,key)=>{
                                return <option key={key} value={author._id}>{author.name}</option>
                              })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn tác giả</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNameCategory ">
                            <Form.Label>Thể loại </Form.Label>
                            <Form.Select type='select' name="category" required onChange={(event)=>selectChange(event)}>
                              <option value="">Chọn thể loại</option>
                              {category.map((cate,key)=>{
                                return <option key={key} value={cate._id}>{cate.name}</option>
                              })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn thể loại</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNamePulish ">
                            <Form.Label>Nhà xuất bản </Form.Label>
                            <Form.Select type='select' name="publisher" required onChange={(event)=>selectChange(event)}>
                              <option value="">Chọn nhà xuất bản</option>
                              {publishers.map((publisher,key)=>{
                                return <option key={key} value={publisher._id}>{publisher.name}</option>
                              })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn nhà xuất bản</Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridQuantity">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control type='number' min="0" name="stock"   required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập số lượng hợp lệ</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Đơn giá</Form.Label>
                            <Form.Control type='number' min="0" name="price"   required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng nhập đơn giá hợp lệ</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridNumberPage">
                            <Form.Label>Số trang</Form.Label>
                            <Form.Control type='number' min="0" name="printLength" required onChange={(event)=>inputChange(event)}/>
                            <Form.Control.Feedback type="invalid">Vui lòng số trang hợp lệ</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className="btn-CheckHot mt-2 d-flex">
                      {/* <Button onClick={handleCheckProduct}>{hotProduct ? <i className="fa fa-times"></i> : <i className="fa fa-plus"></i> }</Button>*/}
                      {hotProduct ? 
                        <Button variant="danger" onClick={handleCheckProduct}> <i className="fa fa-times"></i> </Button> 
                        :
                        <Button variant="success" onClick={handleCheckProduct}> <i className="fa fa-plus"></i> </Button> 
                        
                      }
                      <h6 className="my-2 mx-3">{hotProduct ? "Xóa sản phẩm khỏi danh sách nổi bật" : "Thêm sản phẩm vào danh sách nổi bật"}</h6>
                    </div>
                    <Form.Group className="uploadImage">
                      
                        <Upload
                          listType="picture"
                          onChange={handleUpload}
                          customRequest={dummyRequest}
                          maxCount={5}
                          accept=".jpg,.png"
                          beforeUpload={() => false} 
                        >
                          <Button variant="secondary">
                            Chọn ảnh
                          </Button>
                          <Form.Label className="my-2 mx-3 h6">Chọn 1 ảnh (Định dạng jpg,png vd: sagologo.png)</Form.Label>
                        </Upload>
                        
                    </Form.Group>
                    <div className="btnSubmit d-flex justify-content-end">
                          <Button variant="success" type="submit">
                              Thêm sản phẩm
                          </Button>
                    </div>
            </Form>
      </>
    );
  }