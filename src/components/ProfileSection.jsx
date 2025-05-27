import { useState } from 'react'
import ProfileInfo from './ProfileInfo';
import { CircleUser } from 'lucide-react';

function ProfileSection() {
      const [profileShow,setProfileShow] = useState(false);

  return (
   <div className='commanFlex relative'>
      <CircleUser onClick={()=> setProfileShow((prev)=> !prev)} color='white' fontSize={20} size={30} />
      {profileShow && <ProfileInfo/> }
      <button className="CommonBtnStyle" style={{color:"#fee685"}}>Premium</button>
    </div>
  )
}

export default ProfileSection