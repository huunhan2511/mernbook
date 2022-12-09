import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Table,Button } from 'react-bootstrap';

import {useRouteMatch,useHistory } from 'react-router-dom';
import CancelOrder from '../CancelOrder';
let headerTable = ["Mã đơn hàng","Tên người dùng","Số điện thoại","Tổng tiền","Thanh toán","Chi tiết","Hủy","Xác nhận"];
export default function OrderConfirm({flag,handleEdit}) {
    const match = useRouteMatch();
    const [orders,setOrders] = useState([])
    let token = localStorage.getItem("accessToken")
    let config = {
        headers: {
            'Authorization' : `Bearer ${token}` 
        }
    }
    const history = useHistory();
    const handleSeeDetail = (id)=>{
        history.push(`${match.url}/${id}`)
    }
   
    const handleConfirm = async (id) =>{
        let status = {
            status : 2
        }
        let config = {
            headers:{
                'Authorization' : `Bearer ${token}` 
              }
        }
        await axios.patch("http://localhost:5000/orders/"+id,status,config).then(response=>{
                alert(response.data.Message);
                handleEdit()
        })
        
    }
    useEffect(()=>{
        
        const fetchData = async ()=>{
            await axios.get("http://localhost:5000/orders?status=1",config).then(response=>{
                setOrders(response.data)
            })
        }
        fetchData();
    },[flag])
    const formatCash= (str) =>{
        let text = String(str);
        return text.split('').reverse().reduce((prev, next, index) => {
          return ((index % 3) ? next : (next + ',')) + prev
        })
    }
    return (
        <div className="cardTable table-wrapper-scroll-y my-custom-scrollbar" >
            <Table >
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
                    {orders.map((order,key)=>{
                            return (
                                <tr key={key}>
                                    <td>{order._id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.phone}</td>
                                    <td>{formatCash(order.grandTotal)}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td><Button variant="secondary" onClick={()=>handleSeeDetail(order._id)}><i className="fa fa-eye"></i></Button></td>
                                    <td><CancelOrder order={order} handleEdit={handleEdit}/></td>
                                    <td><Button 
                                            disabled = {order.paymentMethod==="Online" ? true : false}
                                            variant="success" 
                                            onClick={()=>handleConfirm(order._id)}
                                        >
                                            <i className="fa fa-check"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
        </div>
    )
}
