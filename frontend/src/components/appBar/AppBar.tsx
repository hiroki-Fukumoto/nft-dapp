import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

import { ROUTE } from '@/RouteConfig'

export const AppBar = () => {
  const navigate = useNavigate()

  const handleOnSelectDropdownMenu = (route: string) => {
    navigate(route)
  }

  return (
    <Navbar fluid={true} rounded={false} className="!bg-blue-700">
      <Navbar.Brand href="https://flowbite.com/">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold">Flowbite</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => handleOnSelectDropdownMenu(ROUTE.wallet)}>Wallet</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true} className="!text-white">
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="!text-white">
          About
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="!text-white">
          Services
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="!text-white">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="/navbars" className="!text-white">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
