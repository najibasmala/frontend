import axios from 'axios'
import React, { useState ,useRef,useEffect} from "react";
import { Container, Row, Col} from "reactstrap";
import { Form, Button } from 'react-bootstrap';
import courseImg1 from "../assets/images/web-design.png";
import courseImg2 from "../assets/images/graphics-design.png";
import courseImg3 from "../assets/images/ui-ux.png";
import chimie from "../assets/images/chimie.jpeg";
import maths from "../assets/images/maths.png";
import physique from "../assets/images/physique.jpg";
import design from "../assets/courses/design.pdf"
import CourseCard from "../components/Courses-section/CourseCard";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header/Header";
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import Dropzone from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import {

    Space,
    Table,
  } from "antd";
  import Column from "antd/lib/table/Column";
import download from 'downloadjs';
import math from '../assets/courses/math.mp4'

const Video = styled.div`
 border:1px solid gray;
  margin-bottom: 20px;
  position: relative;
    margin-bottom: 0px;
    border-radius:10px ;
   // height:270px ;
   
  
`

const Text = styled.h2`
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: #1a202c;
  width: 410px;
  letter-spacing: -0.02em;
`
const Description = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 36px;
  color: #141a28;
  opacity: 0.7;
 
`
const Cards = styled.div`
  display: flex;
  column-gap: 20px;
  padding-top: 57px;
  row-gap:30px;
  align-items: flex-start;
    flex-direction: row;
    padding-top: 74px;
    flex-wrap:wrap ;
  
`
const coursesData = [
  {
    id: "01",
    title: "Web Design BootCamp-2022 for Beginners",
    url:design,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    title: "Professional Graphics Design, PhotoShop, Adobe XD, Figma",
        imgUrl: courseImg2,
  },

  {
    id: "03",
    title: "UI/UX BootCamp for Beginners in 2022",
   
    imgUrl: courseImg3,
  },
];
const videos = [
    {
      url: math,
      text:"Math courses",
      light: maths,
    },
    {
      url: '/assets/video/stc.mp4',
      text: "Physics Course",
      light: physique,
    },
    {
        url: '/assets/video/stc.mp4',
        text: "Professional Graphics Design,",
        light: courseImg3,
      },
      {
        url: '/assets/video/stc.mp4',
        text: "Chimie Course",
        light: chimie,
      },
  ]
const Courses = ({ CUId }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    const [state, setState] = useState({
      title: '',
      description: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area
    const [filesList, setFilesList] = useState([]);
  

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get("https://elearning-w-api.onrender.com/files/getAllFiles");
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
console.log("ffff",filesList);
  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`https://elearning-w-api.onrender.com/files/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };
    const handleInputChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
    };
  
    const onDrop = (files) => {
      const [uploadedFile] = files;
      setFile(uploadedFile);
  
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewSrc(fileReader.result);
      };
      fileReader.readAsDataURL(uploadedFile);
      setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
      dropRef.current.style.border = '2px dashed #e9ebeb';
    };
  
    const updateBorder = (dragState) => {
      if (dragState === 'over') {
        dropRef.current.style.border = '2px solid #000';
      } else if (dragState === 'leave') {
        dropRef.current.style.border = '2px dashed #e9ebeb';
      }
    };
  
    const handleOnSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { title, description } = state;
        if (title.trim() !== '' && description.trim() !== '') {
          if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('description', description);
  
            setErrorMsg('');
            await axios.post("https://elearning-w-api.onrender.com/files/upload", formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
           // navigate('/list');
          } else {
            setErrorMsg('Please select a file to add.');
          }
        } else {
          setErrorMsg('Please enter all the field values.');
        }
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(!open);
  };

 // const { width } = useWindowSize()
  return (
    <>
    <Header/>
    <div style={{ paddingBottom: 140 }}>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
             
</div>
<div className="course__top__left w-50">
                <h2 style={{ color: "#de5b6d" }}>Pdf  Courses</h2>
                
              </div>     
          </Col>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
             
            </Col>
          ))}
         
          <div className="course__top__left w-50">
                <h2 style={{ color: "#de5b6d" }}>Add new Course</h2>
                
              </div>   
          <br></br>
            <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ''}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <Button type="submit" style={{width:"300px",marginBottom:"50px"}}>Add new course</Button>
      </Form>
      <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Table
                className="contract-table"
                pagination={false}
                dataSource={filesList}
                scroll={{ y: 200 }}
                sticky
              >
                <Column
                  className="name-col"
                  title="title"
                  dataIndex="title"
                  key="title"
                  render={(_, filesList) => (
                    <Space size="middle">
                    
                      <span className="firstname">{filesList.title}</span>
                     
                    </Space>
                  )}
                />
                <Column
                  className="description"
                  title="description"
                  dataIndex="description"
                  key="description"
                />
                <Column
                  className="match-offer-col"
                  title="Downlaod"
                  dataIndex="matchingoffer"
                  key="matchingoffer"
                  render={(_, filesList) => (
                    <Space size="middle">
                       <a
                      href="#/"
                      onClick={() =>
                        downloadFile(filesList._id, filesList.file_path, filesList.file_mimetype)
                      }
                    >
                      Download
                    </a>
                      
                    </Space>
                  )}
                />
               
              </Table>
         </div>
  
          <div className="course__top__left w-50">
                <h2 style={{ color: "#de5b6d" }}>Videos Courses</h2>
                
              </div> 
              <br></br>
          <Cards>
            {videos.map((item, index) => (
              <Video key={index}>
                <ReactPlayer
                  key={index}
                  url={item.url}
                  light={item.light}
                  playing={true}
                  controls
                  width={'400px'}
                  height={'260px'}
                 
                  onContextMenu={(e) => e.preventDefault()}
                />
               
               <div className="course__details">
        <h6 className="course__title mb-4 ml-4">{item.text}</h6>

        
      </div>
              </Video>
            ))}
          </Cards>
        </Row>
      </Container>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Courses;



