import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Card,Form } from 'react-bootstrap';
import { Line,Doughnut } from 'react-chartjs-2';
import Header from '../../components/Header';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  )
  
let labels = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
export default function Dashboard() {
    let token = localStorage.getItem('accessToken')
    let config = {
        headers:{
            'Authorization' : `Bearer ${token}` 
        }
    }
    const [revenue,setRevenue] = useState([]);
    const [orderChart,setOrderChart] = useState([])
    const [quantityOrder,setQuantityOrder] = useState([]);
    const getYear = () =>{
        return new Date().getFullYear();
    }
    const listYear = [getYear(),getYear()-1,getYear()-2];
    const [yearRevenue,setYearRevenue] = useState(getYear());
    const [yearOrder,setYearOrder] = useState(getYear());

    useEffect(() => {
        const fetchRevenue = async () =>{
            await axios.get("https://sagobook.onrender.com/orders/turnover?year="+yearRevenue,config).then(response=>{
                    setRevenue(response.data)
            })
        }
        fetchRevenue();
    }, [yearRevenue])
    useEffect(()=>{
        const fetchOrderChart = async () =>{
            await axios.get("https://sagobook.onrender.com/orders/analytics?year="+yearOrder,config).then(response=>{
                    setOrderChart(response.data)
            })
            
        }
        fetchOrderChart();
    },[yearOrder])
    useEffect(()=>{
        const fetchData = async () =>{
            await axios.get("https://sagobook.onrender.com/orders/analytics?year="+getYear(),config).then(response=>{
                    setQuantityOrder(response.data)
            })
            
        }
        fetchData()
    },[])
    
    const selectChangeRevenue = (event) =>{
        const target = event.target;
        const value = target.value;
        setYearRevenue(value)
    }
    const selectChangeOrder = (event) =>{
        const target = event.target;
        const value = target.value;
        setYearOrder(value)
    }
    return (
        <div>
            <Header title="Thống kê"/>
            <Card className="cardLabel mt-5 p-3" style={{backgroundColor: "#007bff"}}>
                    <Card.Title>Số lượng đơn hàng năm {new Date().getFullYear()}</Card.Title>
            </Card>
            <div className="quantityOrder mt-2">
                <Card className="quantityOrder__Confirm">
                    <Card.Title>Đơn hàng chờ xác nhận</Card.Title>
                    <hr></hr>
                    <p>{quantityOrder[0]} đơn hàng </p>
                </Card>
                <Card className="quantityOrder__Prepare">
                    <Card.Title>Đang chuẩn bị hàng</Card.Title>
                    <hr></hr>
                    <p>{quantityOrder[1]} đơn hàng </p>
                </Card>
                <Card className="quantityOrder__Tranport">
                    <Card.Title>Đơn hàng đang giao</Card.Title>
                    <hr></hr>
                    <p>{quantityOrder[2]} đơn hàng </p>
                </Card>
                <Card className="quantityOrder__Delivered">
                    <Card.Title>Đơn hàng thành công</Card.Title>
                    <hr></hr>
                    <p>{quantityOrder[3]} đơn hàng </p>
                </Card>
                <Card className="quantityOrder__Cancel">
                    <Card.Title>Đơn hàng bị hủy</Card.Title>
                    <hr></hr>
                    <p>{quantityOrder[4]} đơn hàng </p>
                </Card>
            </div>
            <Card className="cardRevenue mt-4">
                <Card.Title>Thống kê doanh thu</Card.Title>
                <Form.Group controlId="formYearRevenue" className="cardRevenue__selectyear">
                    <Form.Select aria-label="Default select example" onChange={(event)=>selectChangeRevenue(event)}>
                        {listYear.map((year,key)=>{
                            return(
                                <option value={year}>Năm {year}</option>
                            );
                        })}
                    </Form.Select>
                    </Form.Group>
                <Card.Body>
                    <Line 
                    data={{
                        labels : labels,
                        datasets : [
                            {
                                label: "Doanh thu ",
                                borderColor: "#3cba9f",
                                fill: false,
                                data : revenue
                            }
                        ]
                    }}
                    options={{ 
                        maintainAspectRatio: false,
                        responsive : true
                    }}
                    />
                </Card.Body>
            </Card>
            <Card className="cardOrder mt-4">
                <Card.Title>Thống kê đơn hàng</Card.Title>
                <Form.Group controlId="formYearOrder" className="cardOrder__selectyear">
                    <Form.Select aria-label="Default select example" onChange={(event)=>selectChangeOrder(event)}>
                        {listYear.map((year,key)=>{
                            return(
                                <option value={year}>Năm {year}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                <Card.Body>
                <Doughnut
                    data={{
                    labels: [
                        "Đơn hàng thành công",
                        "Đơn hàng thất bại"
                    ],
                    datasets: [
                        {
                        label: "Population (millions)",
                        backgroundColor: [
                            "#50C836",
                            "#DF0101"
                        ],
                        data: [orderChart[3],orderChart[4]]
                        }
                    ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: "Đơn hàng thành công và bị hủy"
                        }
                    }}
                />
                </Card.Body>
            </Card>
        </div>
    )
}
