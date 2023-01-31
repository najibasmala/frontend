import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LoginNavbar from "../LoginNavbar";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
`

const Result = () => {

  const [score, setScore] = useState(0);
  const [passGrade, setPassGrade] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params;
  const { state } = useLocation();
  console.log("STATATTATATATAT",state);
  useEffect(() => {
    getExamNames();
  }, [setScore])

  const getExamNames =  async () => {
    await axios.get(`https://elearning-w-api.onrender.com/userexams/exam/${id.id}`).then((response) => {
      console.log("examnnna",response);
      setScore(response.data);  getPassGrade();
    });
       
     
  

    
  
  }

  const getPassGrade = async () => {
    await axios.get(`https://elearning-w-api.onrender.com/exam/exam/${id.id}`).then((response) => {
      console.log("responnnse",response);
      setPassGrade(response.data.map(el=>el.passGrade));
    });
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <>
        <LoginNavbar />
        <div style={{ verticalAlign: "middle", display: "flex", border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", WebkitAnimation: "spin 2s linear infinite" }}></div>
        <Footer />
      </>)
  }
  console.log("SSSSS",score);
  return (
    <>
      <Header></Header>
      <Container>
        <span>Final Score : {state.score}</span> <br />
        {passGrade < state.score? (<><span>congratulations you passed the exam</span><br /><img src="https://i.ibb.co/7vPw6r4/Png-Item-30479.png" style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>) : (<><span>sorry you failed the exam</span><br /><img src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png" style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>)}
        <Link to="/dashboard">
          <button
            variant="contained"
            color="secondary"
            size="large"
            style={{ alignSelf: "center", marginTop: 20, cursor: "pointer" }}
          >
            Go to dashboard
          </button>
        </Link>
      </Container>
      <Footer />
    </>
  );
};

export default Result;