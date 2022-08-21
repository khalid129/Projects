import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import { BiUserCircle } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai"
import logo from "../../../images/logo.png";

const Header = () => {
  return (
    <ReactNavbar
      navColor1="white"
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      logoHoverColor="#eb4034"
      nav2justifyContent="space-around"
      nav3justifyContent="space-around"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contacts"
      link4Url="/about"
      link1ColorHover="#eb4034"
      link1Color="rgba(35, 35, 35,0.8)"
      link1Size="1.3vmax"
      link1Padding="3vmax"
      profileIcon={true}
      profileIconUrl="/login"
      ProfileIconElement={BiUserCircle}
      profileIconColor="rgba(35, 35, 35,0.8)"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      searchIcon={true}
      SearchIconElement={GoSearch}
      searchIconMargin="3vmax"
      cartIcon={true}
      CartIconElement={AiOutlineShoppingCart}
      profileIconMargin="3vmax"
    />
  )
}

export default Header