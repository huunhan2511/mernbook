import PropTypes from "prop-types";
import React, {useState} from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Comment from "../../components/comment/comment.js";
import { Link } from "react-router-dom";
import axios from 'axios';
const ProductDescriptionTab = ({ 
  spaceBottomClass,
   productFullDesc,
   productPrintLength,
   productID
}) => {
  const token = localStorage.getItem('accessToken')
  const [flag,setFlag] = useState(true)
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const fetchData = async () => {
    const result = await axios.get(`http://localhost:5000/comments/${productID}`);
    const data = result.data;
    setComments(data);
  };
  const handleEditFlag = () =>{
    if(flag){
      setFlag(false)
    } else {
      setFlag(true)
    }
  }
  const commentChange = (event)=>{
    const target = event.target;
    const name= target.name;
    const value = target.value;
    setNewComment((newComment)=>(
      {
        ...newComment,
        [name] : value
      }
    ))
  }
  
  const handleComment = async () =>{
    let token = localStorage.getItem("accessToken");
    let cmt = {
      product: productID,
      context: newComment.context
    }
    await axios.post('http://localhost:5000/comments',
      cmt,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((err)=>{
        alert('Bình luận đang gặp sự cố vui lòng thử lại sau')
        return
      }).then(res=>{
        handleEditFlag();
      })
  }
  
  React.useEffect(() => {
    fetchData();
  }, [flag]);
  
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="additionalInfo">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Thông tin sản phẩm
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Mô tả</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productComment">Bình luận</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Số trang</span> : {productPrintLength}
                    </li>
                    <li>
                      <span>Ngôn ngữ</span> : Tiếng Việt
                    </li>
                    <li>
                      <span>Bìa</span> : Mềm
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productComment">
                {comments.map((cmt, key) => {
                    return (
                      <Comment
                        key = {key}
                        username={cmt.account.username}
                        context={cmt.context}
                      />
                  )
                })}
                  <div className="CardComment">
                    {token===null?
                        <div className="CardComment__Login">
                          <label>Đăng nhập để bình luận </label>
                          <button>
                            <Link to={process.env.PUBLIC_URL + "/login-register"}><span>Đăng nhập</span></Link>
                          </button>
                        </div>
                        :
                        <div className="CardComment__Text">
                            <label>Để lại bình luận của bạn về sản phẩm : </label>
                            <textarea
                               name="context"
                               placeholder="Nội dung bình luận"
                               defaultValue={""}
                               onChange = {(event)=>commentChange(event)}
                            />
                            <div className="CardComment__Text--btnComment">
                            <button onClick = {(event)=>handleComment(event)}>
                              <span>Bình luận</span>
                            </button>
                            </div>
                        </div>
                      }
                  </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default ProductDescriptionTab;
