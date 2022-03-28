import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputRef,
  Menu,
  message,
  Select,
} from "antd";
import { Option } from "antd/lib/mentions";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  SecondaryTitleText,
  TitleText,
} from "src/components/styles";
import { RootState } from "src/redux/configureStore";
import { setLoader } from "src/redux/loader";
import { setUser, setUserCard } from "src/redux/user";
import { Loader } from "../Loader/Loader";
import style from "./ProtectedRoute.module.css";

export const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, medCard } = useSelector(
    (state: RootState) => state.user
  );
  const { loader } = useSelector((state: RootState) => state.loader);
  const auth = getAuth();
  const firestore = getFirestore();

  const signOut = () => {
    auth.signOut();
    dispatch(setUser({ loading: false, data: null }));
    localStorage.removeItem("user");
  };

  const medcardsRef = collection(firestore, "medcards");

  const onSubmitForm = async (submitData: any) => {
    dispatch(setUserCard({ medCard, loading: true }));
    await setDoc(doc(medcardsRef, data ? data.uid : ""), {
      ...submitData,
      dateBth: submitData.dateBth.format("YYYY-MM-DD"),
      verifed: false,
      uid: data?.uid,
    })
      .then(() => {
        message.success("Medical card added/updated!");
        getDoc(doc(firestore, "medcards", data ? data.uid : ""))
          .then((data) => data.data())
          .then((data: any) =>
            dispatch(setUserCard({ medCard: data, loading: false }))
          )
          .catch(function (error) {
            dispatch(setUserCard({ medCard, loading: false }));
            message.error(error);
            console.log(error);
          });
      })
      .catch(function (error) {
        dispatch(setUserCard({ medCard, loading: false }));
        message.error(error);
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    dispatch(setLoader({ loader: true }));
    dispatch(setUserCard({ medCard, loading: true }));
    getDoc(doc(firestore, "medcards", data ? data.uid : ""))
      .then((data) => data.data())
      .then((data: any) => {
        dispatch(setUserCard({ medCard: data, loading: false }));
        dispatch(setLoader({ loader: false }));
      })
      .catch(function (error) {
        dispatch(setUserCard({ medCard, loading: false }));
        dispatch(setLoader({ loader: false }));
        message.error(error);
        console.log(error);
      });
  }, [data, firestore]);

  const logoutButton = (
    <Menu>
      <Menu.Item onClick={signOut}>
        <LogoutOutlined
          style={{
            fontSize: 14,
            marginRight: 7,
          }}
        />
        SignOut
      </Menu.Item>
    </Menu>
  );

  return !loader ? (
    !medCard?.verifed ? (
      <Container>
        <div className={style.CardModal}>
          <Dropdown overlay={logoutButton}>
            <div className={style.StyledHeader}>
              <UserOutlined style={{ fontSize: 20, marginRight: 5 }} />
              <p>{data?.email}</p>
              <DownOutlined style={{ fontSize: 10, marginLeft: 3 }} />
            </div>
          </Dropdown>
          <TitleText>
            {!medCard ? "У вас нет карточки!" : "Карточка заведена, ожидайте!"}
          </TitleText>
          <SecondaryTitleText>
            {!medCard
              ? " Создайте карточку, чтобы пользоваться всеми преимуществами нашей системы."
              : "Вы можете изменить отправленные данные, в случае ошибки."}
          </SecondaryTitleText>
          <div className={style.formContainer}>
            <Form
              onFinish={onSubmitForm}
              layout="horizontal"
              className={style.cardForm}
            >
              <Form.Item
                initialValue={medCard?.lastName}
                name="lastName"
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <Input disabled={loading} placeholder="Фамилия"></Input>
              </Form.Item>
              <Form.Item
                initialValue={medCard?.firstName}
                name="firstName"
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <Input disabled={loading} placeholder="Имя"></Input>
              </Form.Item>
              <Form.Item
                initialValue={medCard?.lastName}
                name="secondName"
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <Input disabled={loading} placeholder="Отчество"></Input>
              </Form.Item>
              <Form.Item
                initialValue={moment(medCard?.dateBth)}
                name="dateBth"
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <DatePicker
                  disabled={loading}
                  style={{ width: "100%" }}
                  placeholder="Дата Рождения"
                />
              </Form.Item>
              <Form.Item
                initialValue={medCard?.snils}
                name="snils"
                style={{ width: "100%" }}
                rules={[{ required: true, len: 11 }]}
              >
                <Input
                  disabled={loading}
                  type="number"
                  style={{ width: "100%" }}
                  placeholder="СНИЛС"
                />
              </Form.Item>
              <Form.Item
                initialValue={medCard?.polis}
                name="polis"
                style={{ width: "100%" }}
                rules={[{ required: true, len: 11 }]}
              >
                <Input
                  disabled={loading}
                  type="number"
                  style={{ width: "100%" }}
                  placeholder="Полис"
                />
              </Form.Item>
              <Form.Item
                initialValue={medCard?.gender}
                name="gender"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select disabled={loading} placeholder="Выберите свой пол">
                  <Option value="male">Мужчина</Option>
                  <Option value="female">Женщина</Option>
                </Select>
              </Form.Item>
              <Form.Item
                initialValue={medCard?.height}
                name="height"
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <Input
                  disabled={loading}
                  type="number"
                  style={{ width: "100%" }}
                  placeholder="Рост, см"
                />
              </Form.Item>
              <Form.Item
                initialValue={medCard?.weight}
                name="weight"
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <Input
                  disabled={loading}
                  type="number"
                  style={{ width: "100%" }}
                  placeholder="Вес, кг"
                />
              </Form.Item>
              <Form.Item
                initialValue={medCard?.bloodGroup}
                name="bloodGroup"
                style={{ width: "100%" }}
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select disabled={loading} placeholder="Выберите группу крови">
                  <Option value="I">I</Option>
                  <Option value="II">II</Option>
                  <Option value="III">III</Option>
                  <Option value="IV">IV</Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ width: "100%" }}>
                <Button
                  loading={loading}
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Отправить
                </Button>
              </Form.Item>
            </Form>
            <div className={style.graph}></div>
          </div>
        </div>
      </Container>
    ) : (
      <></>
    )
  ) : (
    <Loader />
  );
};
