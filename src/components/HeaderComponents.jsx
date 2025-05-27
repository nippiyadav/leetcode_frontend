import { Menu } from '../constants'
import {NavLink } from 'react-router-dom'
import ProfileSection from './ProfileSection'

function HeaderComponents() {


  return (
    <div className='bg-gray-700 text-white p-2 flex justify-between px-4 items-center'>
    <div>
      {/* <img src="" alt="" /> */}
    </div>
    <div className='commanFlex grow-1 ml-4'>
      <ul className='commanFlex'>
      {Menu.map((v,i)=>(
        <NavLink key={i} to={v.href} className={({isActive,isPending})=>isActive?"text-pink-200":"text-gray-400"}>
        {v.name}
        </NavLink>
      ))}
      </ul>
    </div>

    <ProfileSection/>
  </div>
  )
}

export default HeaderComponents