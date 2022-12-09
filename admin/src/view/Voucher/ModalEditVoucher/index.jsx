import React,{useState} from 'react';
import axios from 'axios';
import {Modal,Button,Form,Row,Col} from "react-bootstrap";
export default function ModalEditVoucher(props) {
    const [show, setShow] = useState(false);  
    const [values,setValue] = useState({
        id: props.dataModal.id,
        quantity: ""
    });
    const [isDisable,setDisabled] = useState(true);
    const [validated,setValidated] = useState(false);
    const handleClose = () => setShow(false);
        
    const handleShow = () => setShow(true);
    const handleEdit = async (event) =>{
      const token = localStorage.getItem('accessToken');
      event.preventDefault();
      await axios.patch("http://localhost:5000/vouchers/"+props.dataModal._id,values,{
        headers:{
          'Authorization' : `Bearer ${token}` 
        }
      }).then(response=>{
          alert(response.data.Message)
          props.handleEdit();
          handleClose();
      })
    }
    const inputChange = (event) =>{
      setValidated(true);
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValue((values)=> ({
        ...values,
        [name] : value
      })
      );
      setDisabled(false);
      if(value === "" || value < 0) {
        setDisabled(true);
      } 
    }
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
          <i className="fa fa-edit"></i>
        </Button>
        <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Sửa mã khuyến mãi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                    <Form noValidate validated={validated} className="FormEditAuthor" onSubmit={(event)=> handleEdit(event)}>
                            <Row>
                                <Form.Group as={Col} controlId="formGridId">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type='text' name="id" defaultValue={props.dataModal._id} readOnly/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridNameVoucher">
                                    <Form.Label>Mã khuyến mãi</Form.Label>
                                    <Form.Control type='text' name="name" defaultValue={props.dataModal.name} readOnly/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridDiscount">
                                    <Form.Label>Giảm giá</Form.Label>
                                    <Form.Control type='text' name="discount" defaultValue={props.dataModal.discount} readOnly/>
                                </Form.Group>  
                                <Form.Group as={Col} controlId="formGridQuantity">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control type='number' min="0" name="quantity" defaultValue={props.dataModal.quantity} required onChange={(e)=>inputChange(e)}/>
                                    <Form.Control.Feedback type="invalid">Vui lòng số lượng</Form.Control.Feedback>
                                </Form.Group>  
                            </Row>
                            <Form.Group controlId="formDescriptionVoucher">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control as="textarea" name="description" defaultValue={props.dataModal.description} readOnly/>
                            </Form.Group>
                            <div className="btnSubmit d-flex justify-content-end">
                                  <Button variant="primary" type="submit" disabled={isDisable}>
                                      Lưu
                                  </Button>
                            </div>
                    </Form>
          </Modal.Body>
        </Modal>
      </>
    )
}
