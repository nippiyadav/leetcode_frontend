import { Menu } from '../constants'
import {Link, NavLink } from 'react-router-dom'
import ProfileSection from './ProfileSection'

function HeaderComponents() {
  console.log(import.meta.env.VITE_NODE_ENV);


  return (
    <div className='bg-gray-700 text-white p-2 flex justify-between px-4 items-center'>
    <div>
      {/* <img src="" alt="" /> */}
      <Link to="/"><h2 className="text-2xl font-bold text-yellow-400">LeetPro</h2></Link>
    </div>
    <div className='commanFlex flex-1 flex justify-center ml-4'>
      <ul className='commanFlex'>
      {Menu.map((v,i)=>(
        <NavLink key={i} to={v.href} className={
          ({isActive,isPending})=>{return isActive?"text-yellow-400 font-semibold":"text-gray-400 font-semibold"}}>
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