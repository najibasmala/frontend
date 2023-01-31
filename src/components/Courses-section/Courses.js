import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../assets/images/web-design.png";
import courseImg2 from "../../assets/images/graphics-design.png";
import courseImg3 from "../../assets/images/ui-ux.png";
import "./courses.css";
import CourseCard from "./CourseCard";
import CustomButton from "../CustomButton";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const coursesData = [
  {
    id: "01",
    title: "Web Design BootCamp-2022 for Beginners",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    title: "Professional Graphics Design, PhotoShop, Adobe XD, Figma",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg2,
  },

  {
    id: "03",
    title: "UI/UX BootCamp for Beginners in 2022",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg3,
  },
];

const Courses = ({ CUId }) => {
  console.log("uuuuuuserttttt", CUId);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  return (
    <div style={{ paddingBottom: 100 }}>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2 style={{ color: "#de5b6d" }}>Our Popular Courses</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
                <CustomButton
                  className="btn"
                  onClick={
                    CUId == null
                      ? openModal
                      : () => {
                          navigate("/courses");
                        }
                  }
                >
                  See All
                </CustomButton>
              </div>

              <Modal
                //trigger={}
                title=""
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
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <h3>Please login to see courses!</h3>
                </div>
              </Modal>
            </div>
          </Col>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Courses;
