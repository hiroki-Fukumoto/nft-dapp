import { Icon, iconStyle } from '@components/icon/Icon'
import { Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTE } from '@/RouteConfig'

export const NavBar = () => {
  const navigate = useNavigate()

  const [openNav, setOpenNav] = useState(false)

  const handleOnSelectMenu = (route: string) => {
    navigate(route)
  }

  const handleOnSelectAccountMenu = () => {
    setOpenNav(!openNav)
  }

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="white" className="p-1 font-normal">
        <div className="flex items-center cursor-pointer">menu1</div>
      </Typography>
      <Typography as="li" variant="small" color="white" className="p-1 font-normal">
        <div className="flex items-center cursor-pointer">menu2</div>
      </Typography>
      <Typography as="li" variant="small" color="white" className="p-1 font-normal">
        <div className="flex items-center cursor-pointer">menu3</div>
      </Typography>
    </ul>
  )

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4" color="blue">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="div"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
          onClick={() => handleOnSelectMenu(ROUTE.home)}
        >
          NFT
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex text-white">
          <div className="mr-4 cursor-pointer" onClick={() => handleOnSelectMenu(ROUTE.wallet)}>
            <Icon type={iconStyle.type.wallet} size={iconStyle.size.lg} />
          </div>
          <div className="mr-4 cursor-pointer">
            <div className="relative">
              <Icon type={iconStyle.type.cart} size={iconStyle.size.lg} />
              <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold bg-red-500 rounded-full">
                {/* TODO */}
                10
              </div>
            </div>
          </div>
          <div className="cursor-pointer">
            <Menu>
              <MenuHandler>
                <div>
                  <Icon type={iconStyle.type.user} size={iconStyle.size.lg} />
                </div>
              </MenuHandler>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>xxxx</MenuItem>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </Navbar>
  )
}
