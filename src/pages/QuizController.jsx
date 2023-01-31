/*import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "../components/quizHandler/Quiz";
import { useParams, useNavigate } from 'react-router-dom'
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Countdown from 'react-countdown';
import CountDownTimer from "../components/CountDownTimer";

const QuizController = (CUId) => {

    const userId = CUId.CUId
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [exam_id, setExam_id] = useState("");
    const [timerData, setTimerData] = useState(0);

    const navigate = useNavigate()
    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();
    }, [])

    const getExams = async () => {
        const { data } = await axios.get('https://elearning-w-api.onrender.com/examquestions/' + id.id);
        setQuestions(data);
        userCheck();
    }

    const securityData = async () => {
        axios.all([
            await axios.get('https://elearning-w-api.onrender.com/users/' + CUId.CUId),
            await axios.get('https://elearning-w-api.onrender.com/exam/exam/' + id.id)
        ]).then(axios.spread((data, data2) => {
            if (data2.data[0].creatorUserId === CUId.CUId) {
                setTimerData(data2.data[0].time)
                console.log("timmmme",data2.data[0].time)
                alert("You are in preview mode that means your question data will not be saved")
                setExam_id(params.id)
            } else {
                console.log("DATTTTTTA",data.data);
                const dummyData = {
                    userId: CUId.CUId,
                    examId: id.id,
                    userInfo: {
                        username: data.data[0].firstname + " " + data.data[0].lastname,
                        examname: data2.data[0].examname,
                        score: 0,
                    }
                };
                axios.post("https://elearning-w-api.onrender.com/userexams", dummyData).then((response) => {
                    
                   
                    setExam_id(response.data._id)
                });
                setTimerData(data2.data[0].time)
            }
            setTimeout(() => {
                navigate("/result/" + id.id)
            }, ((data2.data[0].time) * 60) + "000");
        }))
    }

    const userCheck = async () => {
        console.log("yyyyyyy",CUId);
        try {
            const { data } = await axios.get('https://elearning-w-api.onrender.com/userexams/' + CUId.CUId);
            console.log("rrrrrrrr",data);
            const myData = await Promise.all(data.map((d) => d.examId))
            for (let i = 0; i <= myData.length; i++) {
                if (myData[i] === id.id) {
                    navigate("/dashboard")
                    alert("you have already took this exam")
                    return
                }
            }
            securityData();
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            alert("you have already took this exam")
        }
    }

    const hoursMinSecs = {hours:0, minutes: timerData, seconds: 0}
    if (isLoading) {
        return (
            <>
                <Header />
                <div style={{ verticalAlign: "middle", display: "flex", border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", WebkitAnimation: "spin 2s linear infinite" }}></div>
                <Footer />
            </>)
    }
    console.log("rrrrrrrrrrrrrrrrUUU",exam_id);
    return (
        <div>
            <Header />
            <CountDownTimer hoursMinSecs={hoursMinSecs}/>
            <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                userId={userId}
                exam_id={exam_id}
            />
            <Footer />
        </div>
    );
}

export default QuizController;*/
import axios from "axios";
import { useEffect, useState } from "react";
import Quiz from "../components/quizHandler/Quiz";
import { useParams, useNavigate } from 'react-router-dom'
import LoginNavbar from "../components/LoginNavbar";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header"
import Countdown from 'react-countdown';
import CountDownTimer from "../components/CountDownTimer";

const QuizController = (CUId) => {

    const userId = CUId.CUId
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [exam_id, setExam_id] = useState("");
    const [timerData, setTimerData] = useState(0);

    const navigate = useNavigate()

    const params = useParams();
    const id = params;

    useEffect(() => {
        console.log(id)
        setExam_id(id.id)
        getExams();
    }, [])

    const getExams = async () => {
        const { data } = await axios.get('https://elearning-w-api.onrender.com/examquestions/' + id.id);
        console.log('data',data)
        setQuestions(data);
        userCheck();
    }

    const securityData = async () => {
        axios.all([
            await axios.get('https://elearning-w-api.onrender.com/users/' + CUId.CUId),
            await axios.get('https://elearning-w-api.onrender.com/exam/exam/' + id.id)
        ]).then(axios.spread((data, data2) => {
            if (data2.data[0].creatorUserId == CUId.CUId) {
                setTimerData(data2.data[0].time)
                console.log(data2.data[0].time)
                alert("You are in preview mode that means your question data will not be saved")
            } else {
                const dummyData = {
                    userId: CUId.CUId,
                    examId: id.id,
                    userInfo: {
                        username: data.data[0].firstname + " " + data.data[0].lastname,
                        examname: data2.data[0].examname,
                        score: 0,
                    }
                };
                axios.post("https://elearning-w-api.onrender.com/userexams/", dummyData).then((response) => {
                    console.log(response.status);
                    console.log(response.data,"rrrrrr");
                  //  setExam_id(response.data._id)
                });
                setTimerData(data2.data[0].time)
            }
            setTimeout(() => {
               // navigate("/result/" + id.id)
                navigate(
                    `/result/${id.id}`,
                    {
                      state: {
                     score
                      }
                    }
                  )
            }, ((data2.data[0].time) * 60) + "000");
        }))
    }

    const userCheck = async () => {
        try {
            /*const { data } = await axios.get('https://elearning-w-api.onrender.com/userexams/' + CUId.CUId);
            const myData = await Promise.all(data.map((d) => d.examId))
            for (let i = 0; i <= myData.length; i++) {
                if (myData[i] === id.id) {
                    navigate("/dashboard")
                    alert("you have already took this exam")
                    return
                }
            }*/
            securityData();
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            alert("you have already took this exam")
        }
    }

    const hoursMinSecs = {hours:0, minutes: timerData, seconds: 0}
    if (isLoading) {
        return (
            <>
                <LoginNavbar />
                <div style={{ verticalAlign: "middle", display: "flex", border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", WebkitAnimation: "spin 2s linear infinite" }}></div>
                <Footer />
            </>)
    }
    return (
        <div>
           <Header/>
            <CountDownTimer hoursMinSecs={hoursMinSecs}/>
            <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                userId={userId}
                exam_id={exam_id}
            />
            <Footer />
        </div>
    );
}

export default QuizController;
