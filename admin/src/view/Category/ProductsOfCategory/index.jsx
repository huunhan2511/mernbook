import React,{useState,useEffect} from 'react';
import {Modal,Button,Table} from "react-bootstrap";
import axios from "axios";
const headerTable = ["Tên sách","Số lượng","Đơn giá","Số trang"];
export default function ProductsOfCategory(props) {
    const [show, setShow] = useState(false);  
    const [products,setProducts] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const fetchProducts = async () =>{
            await axios.get("http://localhost:5000/products/category/"+props.id,{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response=>{
                  setProducts(response.data.products)
            })
        }
        fetchProducts();
    }, []);
    const formatCash= (str) =>{
      let text = String(str)
      return text.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
      })
   }
    
    return (
      <>
        <Button variant="secondary" onClick={handleShow}>
          <i className="fa fa-eye"></i>
        </Button>
        <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Danh sách sản phẩm của thể loại </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  {products.map((product,key)=>{
                      return (
                          <tr key={key}>
                              <td>{product.name}</td>
                              <td>{product.stock}</td>
                              <td>{formatCash(product.price)}</td>
                              <td>{product.printLength}</td>
                          </tr>
                      );
                  })}
                  
              </tbody>
            </Table>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }