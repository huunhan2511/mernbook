import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Card,Table,Button } from 'react-bootstrap';
import { useParams,useHistory,useRouteMatch } from 'react-router'

import CancelOrder from '../CancelOrder';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import image from "../../../Image/header.png"
let headerTable = ["Tên sản phẩm","Số lượng","Giá"];
export default function OrderDetail() {
    const history = useHistory();
    let token = localStorage.getItem('accessToken');
    let config ={
        headers:{
        'Authorization' : `Bearer ${token}` 
        }
    }
    const {id} = useParams();
    const [flag,setFlag] = useState(true)
    const [order,setOrder] = useState();
    const [orderDetail,setOrderDetail] = useState();
    const handleEditFlag= () =>{
        if(flag){
            setFlag(false);
        }else{
            setFlag(true);
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
    }, [flag])
    const formatCash= (str) =>{
        let text = String(str)
        return text.split('').reverse().reduce((prev, next, index) => {
          return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    const handleReturn= () =>{
        history.push('/Admin/Orders')
    }
    const handleConfirm = async (order) =>{
        const status = {
            status : order.status._id+1
        }
        await axios.patch("http://localhost:5000/orders/"+order._id,status,config).then(response=>{
                alert(response.data.Message);
                handleEditFlag()
        })
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
    const printDocument = () =>{
        const input = document.getElementById('billOrder');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            var pdf = new jsPDF('p', 'mm', 'a5');
              const imgProps= pdf.getImageProperties(imgData);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
              pdf.addImage(image, 'PNG',10, 2 ,127,0,{ baseline: 'top' });
              pdf.addImage(imgData, 'PNG', 0, 26, pdfWidth,pdfHeight );
            pdf.save("download.pdf");
          })
        ;
      }
    return (
        <>
        <div className="divOrderDetail">
            <Card className="cardOrderDetail">
                <Card.Body >
                    <div className="headerOrderDetail d-flex"> 
                    <Button className="btn-return" onClick={handleReturn}><i className="fa fa-arrow-left"></i></Button>
                    <h5 className="flex-grow-1">
                        Chi tiết đơn hàng #{id}
                    </h5>
                    {order &&
                    <div className="btnExport">
                        <Button variant="secondary" onClick={()=>printDocument()}>Xuất hóa đơn</Button>
                    </div>
                    }
                    </div>
                    {order &&
                    <>
                        <div className="cardOrderDetail__Details" id="billOrder">
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Mã đơn hàng : </label>
                            <p >{order._id}</p>
                        </div>
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label>Tên người nhận hàng : </label>
                            <p >{order.customer}</p>
                        </div>
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Số điện thoại : </label>
                            <p >{order.phone}</p>
                        </div>
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Địa chỉ : </label>
                            <p >{order.address}</p>
                        </div>
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Trạng thái : </label>
                            {printStateOrder(order.status._id+"")}
                        </div>
                        {/* <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Ghi chú : </label>
                            <p >{order.note}</p>
                        </div> */}
                        <hr className="m-2 "></hr>
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Tổng giá : </label>
                            <p >{formatCash(order.totalPrice)} VNĐ</p>
                        </div>
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Phí vận chuyển : </label>
                            <p >{formatCash(order.shipping)} VNĐ</p>
                        </div>
                        <div className="cardOrderDetail__Details--rowDetail">
                            <label  >Tổng cộng : </label>
                            <p >{formatCash(order.grandTotal)} VNĐ</p>
                        </div>
                        <hr className="m-2 "></hr>
                        {orderDetail &&
                        <div className="DivTableCart">
                            <h5>Sản phẩm</h5>
                        <Table className="TableCart">
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
                            </div>
                        }
                        </div>
                        <div className="btnConfirmOrder d-flex justify-content-between px-3 py-1">
                            <div className="btnCancel">
                                <CancelOrder order={order} handleEdit={handleEditFlag} text="Hủy đơn hàng"/>
                            </div>
                            <div className="btnConfirm">
                                <Button variant="success" 
                                        onClick={()=>handleConfirm(order)}
                                        disabled= {order.status._id===4||order.status._id===5 ? true : false}
                                >
                                    Xác nhận đơn hàng
                                </Button>
                            </div>
                        </div>
                    </>
                }
                </Card.Body>        
            </Card>
        </div>
    </>
    );
}
