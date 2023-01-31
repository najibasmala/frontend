import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { Button, Col, Form, Row, Input, message } from "antd";
import "./styles.scss";
const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  overflow: hidden;
`;
const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  padding: 20 px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
`;
const HeroTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

const FormWrapper = styled.div`
  width: 40%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  boder: 1px solid black;
`;
const Link = styled.a`
  margin: 20px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValide, setIsValid] = useState(true);
  const [form] = Form.useForm();
  const [authErr, setAuthErr] = useState(false);
  const [loading, setLoading] = useState(true);
  //const [message, setMessage] = useState("");

  const handleLogin = (userCheck) => {
    console.log("hello from login");
    try {
      axios
        .post("http://localhost:5000/users/login", userCheck)
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
          login(dispatch, userCheck);
          console.log("data suc");
          navigate("/dashboard");
          message.success("success authentification");
        });
    } catch {
      alert("yanlış kullanıcı ismi ve/veya şifre");
    }
  };
  const onValuesChange = (values, allValues) => {
    Object.keys(values).forEach((field) => {
      const error = form.getFieldError(field);
      if (
        !error.length &&
        allValues.email !== "" &&
        allValues.email !== undefined &&
        allValues.password !== "" &&
        allValues.password !== undefined
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setAuthErr(false);
      }
      // Clear error message of field

      form.setFields([
        {
          name: field,
          errors: [],
        },
      ]);
    });
  };
  const onFinishFailed = (errorInfo) => {
    setTimeout(() => setIsValid(true), 1500);

    console.log("Failed:", form);
  };
  return (
    <>
      <div className="login-container js-liquify-trigger">
        <Row
          //  span={12}
          style={{
            justifyContent: "center",
            width: "100vw",
            columnGap: 30,
            //flexWrap: width > 576 && "nowrap",
            flexDirection: "row",
          }}
        >
          <Col span={12} className={"login-form"}>
            <h2 className="login-form__title">Welcome !</h2>
            <p className="login-form__subtitle">
              Sign in to manage your account.
            </p>
            <Form
              className="form"
              form={form}
              onValuesChange={onValuesChange}
              onFinish={handleLogin}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                validateTrigger="onFinish"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail",
                  },
                ]}
              >
                <TextInput placeHolder={"Email"}></TextInput>
              </Form.Item>
              <Form.Item
                name="password"
                validateTrigger="onFinish"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    validateTrigger: "onSubmit",
                    pattern: "^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$",
                    message:
                      "Password must be at least 6 charachter and contain 1 uppercase, 1 number",
                  },
                ]}
              >
                <Input.Password></Input.Password>
              </Form.Item>
              <a className="login-form__forgotpsw" href="#">
                Forgot Password ?
              </a>
              <Form.Item>
                {" "}
                <CustomButton
                  htmlType="submit"
                  disabled={isValide}
                  //  loading={loading}
                  to="/dashboard"
                  className={"submit_button"}
                >
                  Sign in &nbsp;
                </CustomButton>
              </Form.Item>
              {authErr && <span className="error">{message}</span>}
            </Form>
            <p className="auth_text">
              You don't have an account ? <a href="/register">Sign up</a>
            </p>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Login;
