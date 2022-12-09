import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Table,Accordion } from 'react-bootstrap';
const headerTable = ["Username","Email"];

export default function ContentManageUser() {
    const [dataUser,setDataUser] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const fetchData = async ()=>{
            await axios.get("http://localhost:5000/accounts",{
                headers:{
                    'Authorization' : `Bearer ${token}` 
                }
            }).then(response=>{
                setDataUser(response.data);
            })
        }
        fetchData();
    }, []);
    return (
        <div className="ContentManageUser">
            <Accordion defaultActiveKey="0" className="ContentManageUser__accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Danh sách tài khoản khách hàng</Accordion.Header>
                    <Accordion.Body>
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
                                {dataUser.map((data,key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{data.username}</td>
                                            <td>{data.email}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
