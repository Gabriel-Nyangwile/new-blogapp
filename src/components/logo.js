import assets from '../assets/assets';

function Logo({width = "100%"}) {
  return (
    <img 
        src={assets.Scofex_logo} 
        style={{width}} 
        alt="Logo"
        className="object-cover h-full w-full items-center justify-center rounded-full overflow-hidden "
    />
  )
}

export default Logo;
