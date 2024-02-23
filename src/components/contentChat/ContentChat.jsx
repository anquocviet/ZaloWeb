import "../../sass/ContentChat.scss";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

//import icon
import { SendOutlined, EditOutlined } from "@ant-design/icons";
import { LuSticker, LuAlarmClock } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoVideocamOutline, IoSearchOutline } from "react-icons/io5";
import {
  VscLayoutSidebarRightOff,
  VscLayoutSidebarRight,
} from "react-icons/vsc";
import { BsBell, BsPinAngle } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ContentChat = ({ userId, idChat, handleChangeMessageFinal }) => {
  let chatRef = useRef(null)

  const [isClickInfo, setIsClickInfo] = useState(false);
  const [isClickSticker, setIsClickSticker] = useState(false);
  const [isClickLink, setIsClickLink] = useState(false);
  const [nameReceiver, setNameReceiver] = useState({});
  const [contentMessages, setContentMessages] = useState([]);

  const [message, setMessage] = useState("")
  const [stompClient, setStompClient] = useState(null)

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws")
    const client = Stomp.over(sock)

    client.connect({}, () => {
      client.subscribe(`/topic/messages/${userId < idChat ? `${userId}${idChat}` : `${idChat}${userId}`}`, (message) => {
        const receivedmessage = JSON.parse(message.body)
        handleChangeMessageFinal(receivedmessage);
        setContentMessages((prev) => [...prev, receivedmessage])
      })
    })

    setStompClient(client)

    return () => {
      client.disconnect()
    }
  }, [JSON.stringify(contentMessages)])

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [JSON.stringify(contentMessages)])

  let sendMessage = () => {
    if(message.trim()){
      stompClient.send(`/app/chat/${userId < idChat ? `${userId}${idChat}` : `${idChat}${userId}`}`, {}, JSON.stringify({
        message : message,
        sender : userId,
        receiver : idChat
      }))
    }
    setMessage("")
  }

  useEffect(() => {
    let getApiContentChats = async () => {
      let datas = await axios.get(
        `http://localhost:8080/chat/content-chats-between-users/${userId}-and-${idChat}`
      );
      setContentMessages(datas.data);
      setNameReceiver(
        datas.data[0].sender.id !== userId
          ? {
              name: datas.data[0].sender.name,
              image: datas.data[0].sender.image,
            }
          : {
              name: datas.data[0].receiver.name,
              image: datas.data[0].receiver.image,
            }
      );
    };
    getApiContentChats();
  }, [userId, idChat]);

  return (
    <div className="container-content-chat">
      {/* slide */}
      {idChat === "" ? (
        <div className="slides">
          <div className="slogan">
            <div className="slogan-title">
              Chào mừng đến với <b>Zalo PC</b>!
            </div>
            <p>
              Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng <br />{" "}
              người thân, bạn bè được tối ưu hóa cho máy tính của bạn
            </p>
          </div>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="slide" alt="" src="/slide1.png" />
              <div className="slide-title">
                Nhắn tin nhiều hơn, soạn thảo ít hơn
              </div>
              <div className="slide-content">
                Sử dụng <b>Tin Nhắn Nhanh </b>để lưu sẵn các tin nhắn thường
                dùng và gửi nhanh trong hội thoại bất kỳ
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="slide" alt="" src="/slide2.png" />
              <div className="slide-title">Tin nhắn tự xóa</div>
              <div className="slide-content">
                Từ giờ tin nhắn đã có thể tự động xóa sau khoảng thời gian nhất
                định.
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="slide" alt="" src="/slide4.png" />
              <div className="slide-title">
                Gọi nhóm và làm việc hiệu quả với Zalo Group Call
              </div>
              <div className="slide-content">
                Trao đổi công việc mọi lúc mọi nơi
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="slide" alt="" src="/slide5.png" />
              <div className="slide-title">Trải nghiệm xuyên suốt</div>
              <div className="slide-content">
                Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu
                luôn được đồng bộ
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="slide" alt="" src="/slide6.png" />
              <div className="slide-title">Gửi file nặng?</div>
              <div className="slide-content">
                Đã có Zalo PC &quot;xử&quot; hết
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="slide" alt="" src="/slide7.png" />
              <div className="slide-title">Chat nhóm với đồng nghiệp</div>
              <div className="slide-content">
                Tiện lợi hơn, nhờ các công cụ hỗ trợ chat trên máy tính
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img className="slide" alt="" src="/slide8.png" />
              <div className="slide-title">
                Giải quyết công việc hiệu quả hơn, lên đến 40%
              </div>
              <div className="slide-content">Với Zalo PC</div>
            </SwiperSlide>
          </Swiper>
        </div>
      ) : (
        <>
          <div
            className="content-chat"
            style={{ width: isClickInfo ? "70%" : "" }}
          >
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="chat-header-left-avt">
                  <img src={nameReceiver.image} style={{width : "50px", height : "50px"}}/>
                </div>
                <div className="chat-header-left-name">
                  <div className="user">
                    <div className="user-name">{nameReceiver.name}</div>
                    <div className="user-edit">
                      <EditOutlined />
                    </div>
                  </div>
                  <div className="is-active">Active</div>
                </div>
              </div>
              <div className="chat-header-right">
                <div className="chat-header-right-icon">
                  <AiOutlineUsergroupAdd className="icon" />
                </div>
                <div className="chat-header-right-icon">
                  <IoSearchOutline className="icon" />{" "}
                </div>
                <div className="chat-header-right-icon">
                  <IoVideocamOutline className="icon" />
                </div>
                <div
                  className="chat-header-right-icon"
                  onClick={() => setIsClickInfo(!isClickInfo)}
                  style={{
                    color: isClickInfo ? "#0068ff" : "",
                    background: isClickInfo ? "#d4e4fa" : "",
                  }}
                >
                  {isClickInfo ? (
                    <VscLayoutSidebarRight className="icon" />
                  ) : (
                    <VscLayoutSidebarRightOff className="icon" />
                  )}
                </div>
              </div>
            </div>
            <div className="chat-view">
              {contentMessages.map((message, index) => (
                <div
                  ref={index === contentMessages.length - 1 ? chatRef : null}
                  key={message.id}
                  className="message"
                  style={{
                    justifyContent:
                      message.sender.id !== userId ? "flex-start" : "flex-end",
                    marginTop: index === 0 ? "10px" : "0px",
                  }}
                >
                  {message.sender.id !== userId ? (
                    <img src={message.sender.image} className="avatar-user" />
                  ) : null}
                  <div className="content-message">
                    {message.sender.id !== userId ? (
                      <span className="info name-user">
                        {message.sender.name}
                      </span>
                    ) : null}
                    <span className="info mess">{message.message}</span>
                    <span className="info time">
                      {message.dateTimeSend.slice(11, 16)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-utilities">
              <div
                className="chat-utilities-icon"
                onClick={() => setIsClickSticker(!isClickSticker)}
                style={{
                  color: isClickSticker ? "#0068ff" : "",
                  background: isClickSticker ? "#d4e4fa" : "",
                }}
              >
                <LuSticker className="icon" />
              </div>
              <div className="chat-utilities-icon">
                <i className="fa-regular fa-image icon"></i>
              </div>
              <div
                className="chat-utilities-icon"
                onClick={() => setIsClickLink(!isClickLink)}
                style={{
                  color: isClickLink ? "#0068ff" : "",
                  background: isClickLink ? "#d4e4fa" : "",
                }}
              >
                <i className="fa-solid fa-paperclip icon"></i>
              </div>
              <div className="chat-utilities-icon">
                <i className="fa-regular fa-address-card icon"></i>
              </div>
              <div className="chat-utilities-icon">
                <i className="fa-regular fa-clock icon"></i>
              </div>
              <div className="chat-utilities-icon">
                <i className="fa-regular fa-square-check icon"></i>
              </div>
            </div>
            <div className="chat-text">
              <div className="chat-text-left">
                {/*Input Send message*/}
                <input
                  className="chat-text-input"
                  type="text"
                  placeholder="Nhập @, tin nhắn tới Le Thi Kim Ngan"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="chat-text-right">
                <div className="chat-text-icon">
                  <i className="fa-solid fa-at icon"></i>
                </div>
                {/*Send message*/}
                <div className="chat-text-icon"
                onClick={sendMessage}
                >
                  <SendOutlined className="icon" />
                </div>
              </div>
            </div>
          </div>
          {/* info chat */}
          <div
            className="chat-info"
            style={{
              width: isClickInfo ? "30%" : "",
              display: isClickInfo ? "flex" : "none",
              height: isClickInfo ? "100%" : "",
            }}
          >
            <div className="header">Thông tin hội thoại</div>
            <div className="header-info">
              <div className="header-info-avt">
                <i className="fa-solid fa-user-tie icon"></i>
              </div>
              <div className="header-info-name">
                <div className="user-name">Le Thi Kim Ngan</div>
                <div className="user-edit">
                  <EditOutlined />
                </div>
              </div>
              <div className="header-info-utilities">
                <div className="notif">
                  <BsBell className="icon" />
                  <span>
                    Tắt thông <br /> báo
                  </span>
                </div>
                <div className="pin-chat">
                  <BsPinAngle className="icon" />
                  <span>
                    Ghim hội <br /> thoại
                  </span>
                </div>
                <div className="group-chat">
                  <AiOutlineUsergroupAdd className="icon" />
                  <span>
                    Tạo nhóm <br /> trò chuyện
                  </span>
                </div>
              </div>
            </div>
            <div className="chat-info-general">
              <div className="list-remider">
                <LuAlarmClock className="icon" />
                <span>Danh sách nhắc hẹn</span>
              </div>
              <div className="group-general">
                <HiOutlineUsers className="icon" />
                <span>0 nhóm chung</span>
              </div>
            </div>
            <div className="group-media"></div>
            <div className="group-file"></div>
            <div className="group-link"></div>
            <div className="group-setting"></div>
          </div>
        </>
      )}

      {/* content chat */}
    </div>
  );
};

export default ContentChat;