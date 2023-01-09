import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import HomeNavMenu from "../HomeNavMenu/HomeNavMenu"
import BodyText from "../BodyText/BodyText"
import Button from "../Button/Button"
import { IconLoader } from "../IconLoader"
import "./AppNavbar.scss"
import { ConnectionContext } from "../../contexts/connection"
import copy from 'copy-to-clipboard'
import CollectionAutoComplete from "../CollectionAutoComplete/CollectionAutoComplete"
import { CollectionContext } from "../../contexts/collections"

interface AppNavbarProps {
  setOpenSidebar: Function
  dailyVolume: number
  totalVolume: number
  showVolBar: boolean
}
const AppNavbar = (props: AppNavbarProps) => {
  const walletOptionsRef = useRef(null)
  const { collections } = useContext(CollectionContext)

  const [expandSearchBox, setExpandSearchBox] = useState(false)
  const [showMobileNavMenu, setShowMobileNavMenu] = useState(false)
  const { wallet, signIn, signOut } = useContext(ConnectionContext)
  const walletAddress = wallet?.getAccountId()
  const [hideWalletOptions, setHideWalletOptions] = useState(true)

  const navLinks = [
    {
      name: "Apply",
      link: "/#",
    },
    {
      name: "Browse",
      link: "/collections",
    },
    {
      name: "Sell",
      link: "/profile",
    },
  ]

  useEffect(() => {
    window.onclick = (event) => {
      if (!hideWalletOptions && event.target !== walletOptionsRef.current) {
        setHideWalletOptions(true)
      }
    }
    return () => {
      window.onclick = null
    }
  }, [setHideWalletOptions, hideWalletOptions, walletOptionsRef])

  return (
    <>
      <nav className="app-navbar">
        {/* <VolumeAndLangBar
          dailyVolume={props.dailyVolume}
          totalVolume={props.totalVolume}
        /> */}
        <div className="main-navbar">
          <div
            onClick={() => props.setOpenSidebar(true)}
            className={`sidebar-open-btn ${expandSearchBox ? "hide-mobile" : ""
              }`}
          >
            <IconLoader icon="menu" />
          </div>
          <Link to="" className="brand-container">
            <img
              src={require("../../assets/images/desmarketLogo.png")}
              alt="brand logo"
            />
            <div className="Public-Beta">
              <span>Public Beta</span>
            </div>
            <BodyText bold>Galacticway</BodyText>
          </Link>
          <div
            className={`search-bar-container ${expandSearchBox ? "show" : ""}`}
          >
            {collections.length !== 0 &&
              <CollectionAutoComplete collections={collections} />
            }
          </div>

          <div
            onClick={() => setExpandSearchBox((current) => !current)}
            className={`search-icon-btn ${!expandSearchBox ? "search" : "cancel"
              }`}
          >
            <IconLoader icon={!expandSearchBox ? "search" : "cancel"} />
          </div>
          {!walletAddress &&
            <div
              onClick={() => setShowMobileNavMenu(true)}
              className={`nav-toggler ${showMobileNavMenu ? "hidden" : ""}`}
            >
              <IconLoader icon="more" />
            </div>
          }
          {/* <ul className="nav-links">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <Link to={link.link} style={{ color: "#b3b9c4" }}>{link.name}</Link>
              </li>
            ))}
          </ul> */}
          {walletAddress ? (
            <div className="wallet-options-container">
              <Button
                secondary
                disabled={false}
                title={`
                ${walletAddress.slice(0, 4)}...${walletAddress.slice(
                  walletAddress.length - 4,
                  walletAddress.length
                )}
              `}
                className="wallet-address-btn"
                onClick={() => setHideWalletOptions(!hideWalletOptions)}
              />
              <ul
                className={`dropdown-options ${hideWalletOptions ? "hidden" : "visible"
                  }`}
              >
                <li onClick={() => copy(walletAddress)}>
                  <Link to={"/profile/@" + walletAddress} style={{ color: "#b3b9c4" }}>
                    <BodyText light>Profile</BodyText>
                  </Link>
                </li>
                <li onClick={() => copy(walletAddress)}>
                  <BodyText light>Copy address</BodyText>
                </li>
                <li onClick={() => signOut()}>
                  <BodyText light>Disconnect</BodyText>
                </li>
              </ul>
            </div>
          ) : (
            <Button
              className="connect-wallet-btn"
              title="Connect wallet"
              disabled={false}
              icon="wallet"
              onClick={signIn}
            />
          )}
        </div>
      </nav>
      {walletAddress ?
        <>
        </>
        :
        <HomeNavMenu
          signIn={()=>signIn()}
          showMobileNavMenu={showMobileNavMenu}
          links={navLinks}
          setShowMobileNavMenu={setShowMobileNavMenu}
        />
      }
    </>
  )
}

export default AppNavbar
