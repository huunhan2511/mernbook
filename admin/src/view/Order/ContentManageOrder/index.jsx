import React from 'react';
import { Accordion} from 'react-bootstrap';
import OrderCanceled from '../OrderCanceled';
import OrderConfirm from '../OrderConfirm';
import OrderDelivered from '../OrderDelivered';
import OrderPrepare from '../OrderPrepare';
import Orders from '../Orders';
import OrderTranport from '../OrderTranport';
export default function ContentManageOrder() {
    const [flag,setFlag] = React.useState(true);
    const handleEditFlag = () => {
        if(flag){
            setFlag(false)
        }else{
            setFlag(true)
        }
      }
    return (
        <div className="ContentManageOrder">
            <Accordion defaultActiveKey="0" className="ContentManageUser__accordion">
                {/* Orders */}
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Tất cả đơn hàng</Accordion.Header>
                    <Accordion.Body>
                        <Orders flag={flag} handleEdit={handleEditFlag}/>
                    </Accordion.Body>
                </Accordion.Item>
                 {/* Orders waiting comfirm */}
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Đơn hàng chờ xác nhận</Accordion.Header>
                    <Accordion.Body>
                        <OrderConfirm flag={flag} handleEdit={handleEditFlag}/>
                    </Accordion.Body>
                </Accordion.Item>
                {/* Orders prepare product */}
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Đang chuẩn bị hàng</Accordion.Header>
                    <Accordion.Body>
                        <OrderPrepare flag={flag} handleEdit={handleEditFlag}/>
                    </Accordion.Body>
                </Accordion.Item>
                {/* Orders transport*/}
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Đơn hàng đang giao</Accordion.Header>
                    <Accordion.Body>
                        <OrderTranport flag={flag} handleEdit={handleEditFlag}/>
                    </Accordion.Body>
                </Accordion.Item>
                {/* Orders Delivered */}
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Đơn hàng thành công</Accordion.Header>
                    <Accordion.Body>    
                        <OrderDelivered flag={flag}/>
                    </Accordion.Body>
                </Accordion.Item>
                {/* Orders Canceled */}
                <Accordion.Item eventKey="5">
                    <Accordion.Header>Đơn hàng bị hủy</Accordion.Header>
                    <Accordion.Body>    
                        <OrderCanceled flag={flag}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
