import styled from "styled-components";
import logo from "../assets/logo.svg";

export const Logo = styled.div`
  @keyframes logoAnime {
    0%,
    100% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(0.9);
    }
  }
  width: ${(props) => props.theme.width};
  height: ${(props) => props.theme.height};
  background-image: url(${logo});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 34px;

  animation: ${(props) =>
    props.theme.isAnim ? "logoAnime 1.5s linear infinite" : "none"};
`;

export const Container = styled.div`
  text-align: center;
  height: 100vh;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  background-image: url("data:image/svg+xml,%3Csvg width='1280' height='720' viewBox='0 0 1280 720' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_2)'%3E%3Crect width='1280' height='720' fill='%232148C0'/%3E%3Cellipse cx='-10.026' cy='727.315' rx='367.974' ry='368.685' fill='%23264ECA'/%3E%3Cellipse cx='-10.026' cy='727.315' rx='290.72' ry='291.282' fill='%23244BC5'/%3E%3Cellipse cx='-10.026' cy='727.315' rx='222.614' ry='223.044' fill='%23274FC7'/%3E%3Cpath d='M673.572 135.585C535.734 148.622 441.979 45.9603 412.331 -7L1290.59 -3.43536V727.824H1192.5C888.766 689.122 939.896 534.825 1003.43 462.513C1040.53 411.76 1107.62 289.476 1079.16 206.369C1043.58 102.485 845.869 119.29 673.572 135.585Z' fill='%23264ECA'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1_2'%3E%3Crect width='1280' height='720' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
`;

export const TitleText = styled.p`
  font-weight: 500;
  font-size: 30px;
  margin: 5px 0;
`;

export const SecondaryTitleText = styled.p`
  opacity: 0.6;
  font-weight: 400;
  font-size: 22px;
  margin: 5px 0;
`;
