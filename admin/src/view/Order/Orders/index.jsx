import React,{useState,useEffect} from 'react'
import axios from 'axios';

import {useRouteMatch,useHistory } from 'react-router-dom';
import {Table,Button} from 'react-bootstrap'
let headerTable = ["Tên người mua hàng","Số điện thoại","Tổng tiền","Trạng thái","Chi tiết"];
export default function Orders({flag}) {
    const [orders,setOrders] = useState([]);
    const match = useRouteMatch();
    const history = useHistory();
    const handleSeeDetail = (id)=>{
        history.push(`${match.url}/${id}`)
    }
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const config = {
            headers: {
                'Authorization' : `Bearer ${token}` 
            }
        }
        const fetchData = async ()=>{
            await axios.get("http://localhost:5000/orders",config).then(response =>{
                setOrders(response.data)
            })
        }
        fetchData();
    }, [flag])
    const formatCash= (str) =>{
        let text = String(str);
        return text.split('').reverse().reduce((prev, next, index) => {
          return ((index % 3) ? next : (next + ',')) + prev
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
                                    <td>{order.customer}</td>
                                    <td>{order.phone}</td>
                                    <td>{formatCash(order.grandTotal)}</td>
                                    <td>{printStateOrder(order.status+"")}</td>
                                    <td><Button variant="secondary" onClick={()=>handleSeeDetail(order._id)}><i className="fa fa-eye"></i></Button></td>
                                </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}
