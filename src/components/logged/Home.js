import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { useAuth } from "../../context/authContext";
import logo from "../../assets/LOGO.png";
import admin_F from "../../assets/admin_F.png";
import NavbarCom from "./NavbarCom"
import { GiftedChat } from 'react-gifted-chat';
// import {
//   collection,
//   addDoc,
//   orderBy,
//   query,
//   onSnapshot,
//   doc
// } from 'firebase/firestore';
// import { auth, db } from '../../utils/firebase';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import ChatDataService from "../../services/chats.service"

export function Home() {
  const [messages, setMessages] = useState([]);

//   useLayoutEffect(() => {

//     const collectionRef = collection(db, 'chats');
//     const q = query(collectionRef, orderBy('createdAt', 'desc'));

// const unsubscribe = onSnapshot(q, querySnapshot => {
//     console.log('querySnapshot unsusbscribe');
//       setMessages(
//         querySnapshot.docs.map(doc => ({
//           _id: doc.data()._id,
//           createdAt: doc.data().createdAt.toDate(),
//           text: doc.data().text,
//           user: doc.data().user
//         }))
//       );
//     });
// return unsubscribe;
//   }, []);

// const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages)
//     );
//     // setMessages([...messages, ...messages]);
//     const { _id, createdAt, text, user } = messages[0];    
//     addDoc(collection(db, 'chats'), {
//       _id,
//       createdAt,
//       text,
//       user
//     });
//   }, []);


useEffect(() => {
  getChats();
}, []);

const getChats = async () => {
  const data = await ChatDataService.getAllChats();
  console.log(data.docs);
  setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

  return (
  <div className="container-fluid">
    <NavbarCom/>
    <div class="text-center mt-5">
        {/* <img
          class="img-responsive"
          src={admin_F}
          alt="logo"
          width="300"
          opacity={0.4}
          padding="60px"
        /> */}
        <Container>
          <Row>
            <Col><h2>Mensajes</h2></Col>
          </Row>
          {messages.map((doc ) => {
            return (
          <Row>
          <Card className="text-center">
     
      <Card.Body>
        <Card.Title>{doc.user._id}</Card.Title>
        <Image src={doc.user.avatar} width="30px"/>
        <Card.Text>
         {doc.text}
        </Card.Text>
      </Card.Body>
    </Card>
          </Row>
         ) })}
        </Container>
        
      </div>

  </div>

  );
}


export default Home;
