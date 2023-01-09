import React, { useContext, useEffect, useRef, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon"
import ExpandIcon from "../../assets/icons/ExpandIcon"
import { ConnectionContext } from "../../contexts/connection"
import BodyText from "../BodyText/BodyText"
import Button from "../Button/Button"
import { IconLoader } from "../IconLoader";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import "./SideBar.scss"

interface SideBarProps {
  openMobileSidebar: boolean
  setOpenMobileSidebar: Function
}
type TLinks = {
  link: string
  name: string
  icon: string
}
const links: TLinks[] = [
  {
    link: "/",
    name: "Home",
    icon: "home",
  },
  {
    link: "/collections",
    name: "Collection",
    icon: "collection",
  },
  {
    link: "/stats",
    name: "Stats",
    icon: "stats",
  },
]

const SideBar = (props: SideBarProps) => {
  const { openMobileSidebar, setOpenMobileSidebar } = props
  const { wallet, signIn } = useContext(ConnectionContext)
  const walletAddress = wallet?.getAccountId()

  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(true)
  const [communityShow, setCommunityShow] = useState(false)
  return (
    <>
      <div
        className={`desktop-sidebar side-bar ${openMobileSidebar ? "show-mobile" : ""} ${isExpanded ? "expanded" : "collapsed"
          }`}
      >
        <ul className="items-container">
          {links.map((link, i) => (
            <li key={i}>
              <Link to={link.link}>
                <IconLoader
                  icon={link.icon}
                  isIconSelected={link.link === location.pathname}
                />
                <BodyText light>{link.name}</BodyText>
              </Link>
            </li>
          ))}

          <li>
            <a href="https://galacticway.freshteam.com/jobs" target="_blank" rel="noreferrer">
              <IconLoader
                icon="job"
                isIconSelected={false}
              />
              <BodyText light>Careers</BodyText>
            </a>
          </li>

          <li>
            <a href="https://airtable.com/shrlLTChvWVKH8M99" target="_blank" rel="noreferrer">
              <IconLoader
                icon="apply"
                isIconSelected={false}
              />
              <BodyText light>Apply listing</BodyText>
            </a>
          </li>
          <li>
            <div className="sidebar-dropdown">
              <div className="sidebar-dropdown-title" onClick={() => setCommunityShow(!communityShow)}>
                <div className="title-main">
                  <IconLoader
                    icon="community"
                    isIconSelected={false}
                  />
                  {isExpanded &&
                    <BodyText light>Community</BodyText>
                  }
                </div>

                {isExpanded &&
                  <button>
                    <ChevronDownIcon />
                  </button>
                }
              </div>
              {isExpanded &&
                communityShow &&
                <div className="sidebar-dropdown-content">
                  <a href="https://twitter.com/GalacticwayNFT" target="_blank" rel="noreferrer" >Twitter</a>
                  <a href="https://discord.com/invite/yuBjY6QdR6" target="_blank" rel="noreferrer" >Discord</a>
                  <a href="https://help.galacticway.io" target="_blank" rel="noreferrer" >Help Desk</a>
                  <a href="https://galacticway.medium.com" target="_blank" rel="noreferrer" >Blog</a>
                </div>
              }
            </div>
          </li>
          <li>
            <Link to="/#">
              <IconLoader
                icon="auctions"
                isIconSelected={location.pathname === "auctions"}
              />
              {isExpanded &&
                <div className="comming-soon">
                  <BodyText light>Auctions</BodyText>
                  <span className="alert-text">Coming soon</span>
                </div>
              }
            </Link>
          </li>
          <li>
            <Link to="/#">
              <IconLoader
                icon="lanchpad"
                isIconSelected={location.pathname === "lanchpad"}
              />
              {isExpanded &&
                <div className="comming-soon">
                  <BodyText light>Lanchpad</BodyText>
                  <span className="alert-text">Coming soon</span>
                </div>
              }
            </Link>
          </li>
          {walletAddress &&
            <li className={`${location.pathname.indexOf(walletAddress) !== -1 ? "selected" : ""}`}>
              <Link to={`/profile/@${walletAddress}`}>
                <IconLoader
                  icon="profile"
                  isIconSelected={location.pathname.indexOf(walletAddress) !== -1}
                />
                <BodyText light>Profile</BodyText>
              </Link>
            </li>
          }
        </ul>
        <div className="bottom-section">
          {walletAddress ? (
            <div className="profile-container">
              <div
                onClick={() => setIsExpanded((current) => !current)}
                className={`${!isExpanded ? "expand-btn" : "expand-btn r-180"}`}
              >
                <ExpandIcon />
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={() => setIsExpanded((current) => !current)}
                className={`${!isExpanded ? "expand-btn" : "expand-btn r-180"}`}
              >
                <ExpandIcon />
              </div>
              <Button
                disabled={false}
                icon="wallet"
                className="connect-wallet"
                title="Connect wallet"
                onClick={signIn}
              />
            </>
          )}
        </div>
      </div>
      <ClickAwayListener onClickAway={() => setOpenMobileSidebar(false)}>
        <div>
          <div
            onClick={() => setOpenMobileSidebar(!openMobileSidebar)}
            className="mobile-handler"
          >
            <IconLoader icon="menu" />
          </div>
          <div
            className={`mobile-sidebar side-bar ${openMobileSidebar ? "show-mobile" : ""} ${isExpanded ? "expanded" : "collapsed"
              }`}
          >
            <ul className="items-container">
              {links.map((link, i) => (
                <li key={i}>
                  <Link to={link.link} onClick={() => setOpenMobileSidebar(false)}>
                    <IconLoader
                      icon={link.icon}
                      isIconSelected={link.link === location.pathname}
                    />
                    <BodyText light>{link.name}</BodyText>
                  </Link>
                </li>
              ))}

              <li>
                <a href="https://galacticway.freshteam.com/jobs" target="_blank" rel="noreferrer">
                  <IconLoader
                    icon="job"
                    isIconSelected={false}
                  />
                  <BodyText light>Career</BodyText>
                </a>
              </li>

              <li>
                <a href="https://airtable.com/shrlLTChvWVKH8M99" target="_blank" rel="noreferrer">
                  <IconLoader
                    icon="apply"
                    isIconSelected={false}
                  />
                  <BodyText light>Apply listing</BodyText>
                </a>
              </li>
              <li>
                <div className="sidebar-dropdown">
                  <div className="sidebar-dropdown-title" onClick={() => setCommunityShow(!communityShow)}>
                    <div className="title-main">
                      <IconLoader
                        icon="community"
                        isIconSelected={false}
                      />
                      {isExpanded &&
                        <BodyText light>Community</BodyText>
                      }
                    </div>

                    {isExpanded &&
                      <button>
                        <ChevronDownIcon />
                      </button>
                    }
                  </div>
                  {isExpanded &&
                    communityShow &&
                    <div className="sidebar-dropdown-content">
                      <a href="https://twitter.com/GalacticwayNFT" target="_blank" rel="noreferrer" >Twitter</a>
                      <a href="https://discord.com/invite/yuBjY6QdR6" target="_blank" rel="noreferrer" >Discord</a>
                      <a href="https://help.galacticway.io" target="_blank" rel="noreferrer" >Help Desk</a>
                      <a href="https://galacticway.medium.com" target="_blank" rel="noreferrer" >Blog</a>
                    </div>
                  }
                </div>
              </li>
              <li>
                <Link to="/#" onClick={() => setOpenMobileSidebar(false)}>
                  <IconLoader
                    icon="auctions"
                    isIconSelected={location.pathname === "auctions"}
                  />
                  {isExpanded &&
                    <div className="comming-soon">
                      <BodyText light>Auctions</BodyText>
                      <span className="alert-text">Coming soon</span>
                    </div>
                  }
                </Link>
              </li>
              <li>
                <Link to="/#" onClick={() => setOpenMobileSidebar(false)}>
                  <IconLoader
                    icon="lanchpad"
                    isIconSelected={location.pathname === "lanchpad"}
                  />
                  {isExpanded &&
                    <div className="comming-soon">
                      <BodyText light>Lanchpad</BodyText>
                      <span className="alert-text">Coming soon</span>
                    </div>
                  }
                </Link>
              </li>
              {walletAddress &&
                <li className={`${location.pathname.indexOf(walletAddress) !== -1 ? "selected" : ""}`}>
                  <Link to={`/profile/@${walletAddress}`} onClick={() => setOpenMobileSidebar(false)}>
                    <IconLoader
                      icon="profile"
                      isIconSelected={location.pathname.indexOf(walletAddress) !== -1}
                    />
                    <BodyText light>Profile</BodyText>
                  </Link>
                </li>
              }
            </ul>
            <div className="bottom-section">
              {walletAddress ? (
                <div className="profile-container">
                  <div
                    onClick={() => setIsExpanded((current) => !current)}
                    className={`${!isExpanded ? "expand-btn" : "expand-btn r-180"}`}
                  >
                    <ExpandIcon />
                  </div>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => setIsExpanded((current) => !current)}
                    className={`${!isExpanded ? "expand-btn" : "expand-btn r-180"}`}
                  >
                    <ExpandIcon />
                  </div>
                  <Button
                    disabled={false}
                    icon="wallet"
                    className="connect-wallet"
                    title="Connect wallet"
                    onClick={signIn}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </>
  )
}

export default SideBar
