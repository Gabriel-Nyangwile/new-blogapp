import { useNavigate } from "react-router";
/* import Container from "../components/Container"; */
import Button from "../components/Button";
import LogoutBtn from "../components/LogoutBtn";
import { useAuth } from "../contexte/AuthContext";


export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if(user){
      navigate("/create")
    }else{
      navigate("/login")
    }
  }
  
  
 
  return (
    <div className="w-full relative overflow-hidden  bg-gray-400 border-none py-10">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="text-center text-2xl font-bold leading-tight mb-6">
            {!user ? (<h3>Dear Anonymous, </h3>) : (<h3>Hello {user.firstName || user.email}</h3>)}
            <br /> Welcome to The Global Blog !
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          
          <Button
            type="button"
            className="grid items-center size-18 hover:bg-green-400 text-color-white bg-color-primary mb-3"
            onClick={handleButtonClick}
          >
            {user ? "Créer un blog" : "Se connecter pour créer un blog"}
          </Button>
          {user && <LogoutBtn />}
        </div>
    </div>
  );
}
