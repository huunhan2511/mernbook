import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Accordion,Table,Button } from 'react-bootstrap';

import {useRouteMatch,useHistory } from 'react-router-dom';
import CreateProduct from '../CreateProduct';
const headerTable = ["Tên sách","Số lượng","Đơn giá","Tác giả","Thể loại","Số trang","Chi tiết"];

export default function ContentManageProduct() {
    const [dataProduct, setDataProduct] = useState([]);
    const match = useRouteMatch();
    const history = useHistory();
    
    const [flag,setFlag] = useState(true);
    const handleEditFlag = () => {
        if(flag){
          setFlag(false)
        }else{
          setFlag(true)
        }
      }
    const handleEditProduct = (data)=>{
        history.push(`${match.url}/${data._id}`)
    }
    useEffect(()=>{
        const fetchProduct = async () =>{
            const reponse = await axios.get("http://localhost:5000/products");
            setDataProduct(reponse.data);
        };
        fetchProduct();
    },[flag])
    const formatCash= (str) =>{
        return str.split('').reverse().reduce((prev, next, index) => {
          return ((index % 3) ? next : (next + ',')) + prev
        })
     }
    return (
        <div className="ContentManageProduct">
            <Accordion defaultActiveKey="0" className="ContentManageProduct__accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Danh sách sản phẩm</Accordion.Header>
                    <Accordion.Body>
                        <div className="cardTable table-wrapper-scroll-y my-custom-scrollbar">
                            <Table responsive="md" >
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
                                    {dataProduct.map((data,key)=>{
                                        return (
                                            <tr key={key}>
                                                <td>{data.name}</td>
                                                <td>{data.stock}</td>
                                                <td>{formatCash(data.price+"")}</td>
                                                <td>{data.author.name} </td>
                                                <td>{data.category.name} </td>
                                                <td>{data.printLength}</td>
                                                <td><Button variant="secondary" onClick={()=>handleEditProduct(data)}><i className="fa fa-eye"></i></Button></td>
                                            </tr>
                                        );
                                    })}
                                    
                                </tbody>
                            </Table>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Tạo sản phẩm</Accordion.Header>
                    <Accordion.Body>
                        <CreateProduct handleAdd={handleEditFlag}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
