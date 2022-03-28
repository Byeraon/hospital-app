import { Button, Form, Input, Menu, message } from "antd";
import React from "react";
import style from "./Auth.module.css";
import { Container, Logo } from "src/components/styles";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/configureStore";
import { setUser } from "src/redux/user";
import { useEffect } from "react";

export const Auth: React.FC = () => {
  const { data, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [currentMenu, setMenu] = useState("auth");
  const auth = getAuth();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const registerSubmit = async (userInfo: authUserField) => {
    dispatch(setUser({ data, loading: true }));
    await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    )
      .then((data) =>
        sendEmailVerification(data.user).catch(function (error) {
          message.error(error);
          console.log(error);
        })
      )
      .then(() => signOut(auth))
      .then(() => message.success("Email verification successfully sent!"))
      .catch(function (error) {
        const msg = new Error(error).message;
        message.error(msg);
      });
    dispatch(setUser({ data, loading: false }));
  };

  const authSubmit = async (userInfo: authUserField) => {
    dispatch(setUser({ data, loading: true }));
    await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((data) => {
        console.log("auth", data);
        if (data.user.emailVerified) {
          message.success("Authorization was successful");
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(setUser({ data: data.user, loading: false }));
        } else {
          message.warn("Email not verified!");
          signOut(auth);
          dispatch(setUser({ data: null, loading: false }));
        }
      })
      .catch(function (error) {
        const msg = new Error(error).message;
        message.error(msg);
        dispatch(setUser({ data: null, loading: false }));
      });
  };

  const handleChangeMenu = (element: any) => {
    setMenu(element.key);
  };

  return (
    <Container className={style.container}>
      <div className={style.formContainer}>
        <Logo theme={{ width: "130px", height: "130px" }} />
        <Menu
          disabled={loading}
          className={style.menuHeader}
          inlineCollapsed={false}
          selectedKeys={[currentMenu]}
          onClick={handleChangeMenu}
          mode="horizontal"
        >
          <Menu.Item key="register">Регистрация</Menu.Item>
          <Menu.Item key="auth">Авторизация</Menu.Item>
        </Menu>
        <Form onFinish={currentMenu !== "auth" ? registerSubmit : authSubmit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              type="email"
              prefix={
                <UserOutlined
                  style={{ color: "white", fontSize: 18, marginRight: 10 }}
                />
              }
              className={style.input}
              placeholder="EMAIL"
            ></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ marginBottom: 43 }}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: "white", fontSize: 18, marginRight: 10 }}
                />
              }
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "white", fontSize: 18 }} />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ color: "white", fontSize: 18 }}
                  />
                )
              }
              className={style.input}
              placeholder="PASSWORD"
            />
          </Form.Item>

          <Button id="grecaptcha-button" />
          <Form.Item>
            <Button
              loading={loading}
              className={style.button}
              type="primary"
              htmlType="submit"
            >
              {currentMenu !== "auth" ? "ЗАРЕГИСТРИРОВАТЬСЯ" : "ВОЙТИ"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};
