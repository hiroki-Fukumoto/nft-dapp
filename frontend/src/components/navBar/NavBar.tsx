import { Navbar, Typography } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTE } from '@/RouteConfig'

export const NavBar = () => {
  const navigate = useNavigate()

  const handleOnSelectMenu = (route: string) => {
    navigate(route)
  }

  const [openNav, setOpenNav] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="white" className="p-1 font-normal">
        <div className="flex items-center cursor-pointer" onClick={() => handleOnSelectMenu(ROUTE.wallet)}>
          Wallet
        </div>
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
      </div>
    </Navbar>
  )
}
