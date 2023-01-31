import styled from "styled-components";
import LoginNavbar from "../../components/LoginNavbar";
import Footer from "../../components/Footer/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BarChart, Delete, Edit, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { Link } from "react-router-dom";
import { Spin, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";
import CustomButton from "../../components/CustomButton";
import "./styles.scss";

const Container = styled.table`
  //: 100%;
  // height: 40vh;
  border-collapse: collapse;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 80px;
  margin-right: 80px;
`;
const Wrapper = styled.caption`
  width: 90%;
  margin: 5%;
`;
const Button = styled.button`
  background-color: #eeeeee;
  color: #393e46;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
`;
const CreateButton = styled.button`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 3%;
  padding: 15px 25px;
  border: none;
  border-radius: 10px;
  background-color: #00adb5;
  color: #eeeeee;
  cursor: pointer;
  &:hover {
    background-color: #55b4ba;
  }
`;
const Dashboard = (CUId) => {
  console.log("UUUUUUUUrrrrr", CUId);
  const notify = () =>
    toast.success("Link successfully  copied to the clipboard");

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [examName, setExamName] = useState("");
  const [examNameStorage, setExamNameStorage] = useState([]);
  const [dummy, setDummy] = useState(0);

  const getExamNames = async () => {
    // const { data } = await axios.get(`http://localhost:5000/exam/${CUId.CUId}`);
    const { data } = await axios.get(`http://localhost:5000/exam`);
    setExamNameStorage(data);
    setIsLoading(false);
    console.log(data, "data");
  };

  const deleteExam = (id) => {
    axios.delete(`http://localhost:5000/exam/${id}`).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });
    setDummy(dummy + 1);
  };

  useEffect(() => {
    getExamNames();
  }, [examName, dummy]);

  const handleName = (e) => {
    e.preventDefault();
    if (examName == "") {
      alert("If you want to create an exam you have to give it a name");
    } else {
      const newExam = {
        creatorUserId: CUId.CUId,
        examname: examName,
      };
      console.log(newExam);
      axios.post("http://localhost:5000/exam/", newExam).then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
      setDummy(dummy + 1);
    }
  };

  // if (isLoading) {
  //   return (
  //     <>
  //       <Spin />
  //     </>
  //   );
  // }

  const openModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header />
      <Container style={{ marginTop: "50px" }}>
        <CustomButton
          className={"custom_button"}
          style={{ marginBottom: "70px", width: "200px" }}
          onClick={openModal}
        >
          Create Exam{" "}
        </CustomButton>
        <Modal
          //trigger={}
          title="Add Exam"
          modal
          nested
          open={open}
          closable={true}
          width={780}
          height={420}
          footer={null}
          onCancel={openModal}
        >
          <div
            style={{
              fontSize: "12px",
              backgroundColor: "#fff",
              width: "400px",
              height: "200px",
            }}
          >
            <form onSubmit={handleName}>
              <div
                style={{
                  width: "100",
                  borderBottom: "1px solid gray",
                  fontSize: "18px",
                  padding: "5px",
                  color: "white",
                }}
              >
                New Exam
              </div>
              <div
                style={{
                  width: "100%",
                  padding: "10px 5px",
                  marginBottom: "50px",
                }}
              >
                <input
                  type="text"
                  style={{
                    width: "90%",
                    padding: "15px",
                    borderRadius: "6px",
                    border: "solid rgba(222, 91, 109,0.6)",
                  }}
                  placeholder="Enter title for your exam"
                  onChange={(e) => setExamName(e.target.value)}
                  required
                />
                <br />
              </div>
              <div
                style={{
                  width: "100%",
                  padding: "10px 5px",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <Popup
                  trigger={
                    <Button
                      className="formQButton"
                      style={{
                        width: "30%",
                        marginRight: "10px",
                        backgroundColor: "rgb(222, 91, 109)",
                        color: "white",
                        height: "50px",
                      }}
                    >
                      {" "}
                      Confirm{" "}
                    </Button>
                  }
                  position="top center"
                  nested
                ></Popup>
                <Button
                  className="formQButton"
                  onClick={openModal}
                  style={{
                    width: "30%",
                    backgroundColor: "#478ba2",
                    color: "white",
                    height: "50px",
                  }}
                >
                  {" "}
                  Close
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "whitesmoke" }}>
                <TableCell>Quizzes</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examNameStorage.map((name) => (
                <TableRow
                  key={name.examname}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "http://localhost:5000/quiz/" + name._id
                      );
                    }}
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        notify();
                      }}
                    >
                      {" "}
                      {name.examname}{" "}
                      <span style={{ color: "#CC0000" }}>
                        {"=>"} Click for quiz link
                      </span>{" "}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/anlyze/${name._id}`}>
                      <Button>
                        <BarChart
                          style={{ verticalAlign: "middle", padding: "5px" }}
                        />
                        Analyze
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/quiz/${name._id}`}>
                      <Button>
                        <Visibility
                          style={{ verticalAlign: "middle", padding: "5px" }}
                        />
                        Preview
                      </Button>
                    </Link>
                  </TableCell>
                  {CUId?.user?.user.role === 1 && (
                    <TableCell align="right">
                      <Link to={`/create/${name._id}`}>
                        <Button>
                          <Edit
                            style={{ verticalAlign: "middle", padding: "5px" }}
                          />
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  )}
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        deleteExam(name._id);
                      }}
                    >
                      <Delete
                        style={{ verticalAlign: "middle", padding: "5px" }}
                      />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Dashboard;
