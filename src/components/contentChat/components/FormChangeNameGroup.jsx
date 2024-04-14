import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*Components*/
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  message,
  Modal,
  DatePicker,
  Radio
} from "antd";
import axios from "axios";
import moment from "moment";

function FormChangeNameGroup({visible, setVisible, user, urlBackend}) {
  const { nameGroup, imageGroup } = user;
  const [form] = Form.useForm();
  const [visibleModal, setVisibleModal] = useState(false);
  useEffect(() => {
    setVisibleModal(visible);
    console.log(user);
  }, [visible]);
  const handleCancel = () => {
    form.resetFields();
    setVisibleModal(false);
    if (typeof setVisible === "function") {
      setVisible(false);
    }
  };
    return ( <Modal
        title="Đổi tên nhóm"
        open={visibleModal}
        onOk={() => handleCancel()}
        onCancel={() => handleCancel()}
        width="30%"
        footer={[
            <Button key="back" onClick={handleCancel} size="large">
              Hủy
            </Button>,
            <Button
            key="submit"
            type="primary"
            size="large"
          >
            Xác nhận
          </Button>
          ]}
        
    >
              <Form
                form={form}
                //onFinish={onFinish}
                name="form_edit_name"
                className="ant-advanced-search-form"
                initialValues={{name: nameGroup}}
              >
                <Row>
                    <Col lg={10}></Col>
                    <Col lg={4}>
                        <Form.Item
                            name="avt"
                        >
                            <img src={imageGroup=="null" || imageGroup==null ?"/public/avatardefault.png":imageGroup} style={{width : "50px", height : "50px", borderRadius: "50%"}} alt="Ảnh đại diện"/>
                        </Form.Item>  
                    </Col>
                    <Col lg={10}></Col>
                </Row>
                <Row>
                    <Col lg={24} >
                    <Form.Item style={{textAlign: "center"}} >
                    Bạn có chắc chắn muốn đổi tên nhóm, khi xác nhận tên <br/> nhóm mới sẽ hiển thị với tất cả thành viên.    
                    </Form.Item> 
                    </Col>
                </Row>
                <Row gutter={15}>
                  <Col lg={24} xs={24}>
                    <Form.Item
                      name="name"
                    >
                      <Input maxLength={100} />
                    </Form.Item>
                  </Col>             
                </Row>
              </Form>
        </Modal> );
}

export default FormChangeNameGroup;