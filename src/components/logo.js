import assets from '../assets/assets';

function Logo({width = "100%"}) {
  return (
    <img 
        src={assets.Scofex_logo} 
        style={{width}} 
        alt=""
    />
  )
}

export default Logo;
