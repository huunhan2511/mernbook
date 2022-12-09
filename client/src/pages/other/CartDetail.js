import PropTypes from "prop-types";
import React, { useState,useEffect } from "react";
import { Modal,Table } from "react-bootstrap";
import axios from "axios";
let headerTable = ["Tên sản phẩm","Số lượng","Giá"]
const CartDetail = ({id,handleEdit}) =>{
    const [flag,setFlag] = useState(true);
    const [show, setShow] =useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [orderDetail,setOrderDetail] = useState();
    const [order,setOrder] = useState();
    let token = localStorage.getItem('accessToken');
    let config ={
        headers:{
        'Authorization' : `Bearer ${token}` 
        }
    }
    const handleEditFlag=()=>{
        if(flag){
            setFlag(false)
        }else{
            setFlag(true)
        }
    }
    const printStateOrder = (stateOrder) =>{
        switch(stateOrder){
            case "1" : {
                return <p style={{color : "#D7DF01", fontWeight: "bold"}}>Chờ xác nhận</p>  
            }
            case "2" : {
                return <p style={{color : "#FE8000", fontWeight: "bold"}}>Đang chuẩn bị hàng</p>  
            }
            case "3" : {
                return <p style={{color : "#0404B4", fontWeight: "bold"}}>Đang giao hàng</p>  
            }
            case "4" : {
                return <p style={{color : "#50C836", fontWeight: "bold"}}>Đơn hàng thành công </p>  
            }
            case "5" : {
                return <p style={{color : "#DF0101", fontWeight: "bold"}}>Đơn hàng bị hủy</p>
            }
            default : {
                break;
                }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:5000/orders/"+id,config).then(response =>{
                    setOrder(response.data.Order)
                    setOrderDetail(response.data.OrderDetail)
            })
          };
          fetchData();
    }, [flag]);
    const formatCash= (str) =>{
        let text = String(str)
        return text.split('').reverse().reduce((prev, next, index) => {
          return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    const handleCancel = async ({id}) =>{
        //HTTTP://LOCALHOST:5000/ACCOUNTS/ORDERS/:ID PATCH
        //body{status:5}
        var data = {
            status : 5
        }
        var answer = window.confirm("Bạn chắc chắn muốn xóa đơn hàng");
        if (answer) {
           await axios.patch(`http://localhost:5000/accounts/orders/${id}`,data,config).then((res)=>{
               alert(res.data.Message);
               handleClose();
               handleEdit();
               handleEditFlag();
           }).catch((err)=>{
               console.log(err);
           }) 
        }
        else {
            
        }
    }
    return (
        <>
          <button className="btnDetailCart" onClick={handleShow}>
            <i className="pe-7s-note2"></i>
          </button>
          <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
              <Modal.Title>Chi tiết đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    {order &&
                        <>
                            <div className="cardOrderDetail" id="billOrder">
                                <div className="cardOrderDetail__rowDetail">
                                    <label  >Mã đơn hàng : </label>
                                    <p >{order._id}</p>
                                </div>
                                <div className="cardOrderDetail__rowDetail">
                                    <label>Tên người nhận hàng : </label>
                                    <p >{order.customer}</p>
                                </div>
                                <div className="cardOrderDetail__rowDetail">
                                    <label  >Số điện thoại : </label>
                                    <p >{order.phone}</p>
                                </div>
                                <div className="cardOrderDetail__rowDetail">
                                    <label  >Địa chỉ : </label>
                                    <p >{order.address}</p>
                                </div>
                                <div className="cardOrderDetail__rowDetail">
                                    <label  >Trạng thái : </label>
                                    {printStateOrder(order.status._id+"")}
                                </div>
                                <hr className="m-2 "></hr>
                                <div className="cardOrderDetail__rowDetail">
                                    <label  >Tổng giá : </label>
                                    <p >{formatCash(order.totalPrice)} VNĐ</p>
                                </div>
                                <div className="cardOrderDetail__rowDetail">
                                    <label  >Phí vận chuyển : </label>
                                    <p >{formatCash(order.shipping)} VNĐ</p>
                                </div>
                                <div className="cardOrderDetail__rowDetail">
                                    <label  >Tổng cộng : </label>
                                    <p >{formatCash(order.grandTotal)} VNĐ</p>
                                </div>
                            </div>
                        </>
                    }
                    {orderDetail && 
                        <>
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
                                    {orderDetail.products.map((prod,key)=>{
                                        return(
                                            <tr key={key}>
                                                <td>{prod.name}</td>
                                                <td>{prod.quantity}</td>
                                                <td>{prod.price}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </>
                    }
            </Modal.Body>
            <Modal.Footer>
                <button className="btnCancelOrder" onClick={()=>{handleCancel({id})}}>
                    <div className="divBtnCancel">
                    <p>Hủy đơn hàng</p>
                    </div>
                </button>
                </Modal.Footer>
          </Modal>
        </>
    )
}

CartDetail.propTypes = {
    id: PropTypes.string,
    handleEdit: PropTypes.func,
  };
  
  export default CartDetail;
  