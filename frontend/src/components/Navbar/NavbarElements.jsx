import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Nav = styled.nav`
  width: 100vw;
  max-width: 100%;
  z-index: 10;
  height: 82px;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(20px);
  background-color: #ffffff50;
  -webkit-box-shadow: 0px 8px 26px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 8px 26px 0px rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
    padding-left: 10px;
  }
`;
export const Container = styled.div`
  height: 82px;
  width: 1140px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 10;
  display: flex;
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
`;
export const NavLink = styled(Link)`
  align-self: center;
  text-decoration: none;
  line-height: 160%;
  color: #262626;
  height: 100%;
  font-weight: 400;
  font-size: 16px;
  text-transform: capitalize;
  cursor: pointer;
  padding: 0 40px;
  font-family: 'Rubik', sans-serif;

  &.active {
    font-weight: 800;
  }

  @media screen and (max-width: 768px) {
    display: block;
    justify-content: center;
    margin: 15px 0 25px 0;
    font-size: 18px;
    color: #fff;
    width: 100%;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    color: #262626;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-flow: column-reverse;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 68px;
    width: 100%;
    background-color: #262626;
    padding: 20px 0;
    z-index: 2;
  }
`;

export const LogOut = styled.p`
  background-color: transparent;
  font-weight: 600;
  color: #ac0d0d;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 14px;
  padding: 5px 15px;
  margin: 0 10px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: rotate(360deg) scale(1.6);
  }
`;
