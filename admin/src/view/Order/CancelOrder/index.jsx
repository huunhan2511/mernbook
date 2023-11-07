import axios from 'axios';
import React,{useState} from 'react'
import {Button,Form,Modal,FloatingLabel} from "react-bootstrap";

let reasonCancel = [
  {reason: "Hết hàng"},
  {reason:"Shipper làm thất lạc đơn hàng"},
  {reason: "Khác"}
]
export default function CancelOrder({order,handleEdit,text}) {
    const [show, setShow] = useState(false);  
    const [isDisable,setDisabled] = useState(true);  
    const [disableInput,setDisableInput] = useState(true);
    const [values,setValue] = useState({
      status: 5
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const hanldeSubmit = async (event) =>{
      let token = localStorage.getItem('accessToken')
      let config = {
        headers:{
          'Authorization' : `Bearer ${token}` 
        }
      }
      event.preventDefault();
      await axios.patch("http://localhost:5000/orders/"+order._id,values,config).then(response=>{
          
            if(response.data.Message==="Cập nhật đơn hàng thành công"){
              alert(response.data.Message);
              handleClose();
              handleEdit();
            }else{
              alert(response.data.Message)
              handleClose();
            }
      })
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
      if(value === "")   {
        setDisabled(true);
      }
      if(value === "Khác"){
        setDisabled()
        setDisableInput(false)
      }else{
        setDisableInput(true)
      }
    }
    const textChange = (event) =>{
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValue((values)=> ({
        ...values,
        [name] : value
      })
      );
      setDisabled(false)
      if(value === ""){
        setDisabled(true)
      }
    }
    return (
        <>
          <Button variant="danger" onClick={handleShow} disabled={order.status._id===3||order.status._id===4||order.status._id===5 ? true : false}>
            { text ? text : <i className="fa fa-times"></i>}
          </Button>
          <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" >
            <Modal.Header closeButton>
              <Modal.Title>Lý do hủy đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate className="FormCancelOrder" onSubmit={hanldeSubmit}>
                    <Form.Group controlId="formGridNumberPage">
                        <Form.Select name="cancelreason" onChange={inputChange}>
                          <option value="">Chọn lí do hủy đơn hàng</option>
                          {reasonCancel.map((value,key)=>{
                            return (                                
                              <option key={key} value={value.reason} >{value.reason}</option>                              
                            )
                          })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formGridNumberPage" className="mt-3">
                    <FloatingLabel controlId="floatingTextarea" label="Nhập lý do khác" className="mb-3">
                        <Form.Control as="textarea" disabled={disableInput} name="cancelreason" onChange={textChange}/>
                    </FloatingLabel>
                    </Form.Group>
                    <div className="btnSubmit d-flex justify-content-end">
                      <Button variant="primary" type="submit" disabled={isDisable}>
                        Xác nhận hủy
                      </Button>
                    </div>
              </Form>
            </Modal.Body>
          </Modal>

        </>
      );
}
