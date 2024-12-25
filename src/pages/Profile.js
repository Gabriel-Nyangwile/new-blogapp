import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import upload from "../components/upload";
import assets from "../assets/assets";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexte/AuthContext";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const { handleSubmit } = useForm();
  const { setUserData} = useAuth();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserData(userData);

          if (userData.firstName) {
            setFirstName(userData.firstName);
          }
          if (userData.lastName) {
            setLastName(userData.lastName);
          }
          if (userData.bio) {
            setBio(userData.bio);
          }
          if (userData.avatar) {
            setPrevImage(userData.avatar);
          }
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe;
  }, [setUserData, navigate]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const profileUpdate = async () => {
    try {
      if (!prevImage && !image) {
        alert("Upload profile picture");
        return;
      }
      const updateData = {
        firstName: firstName || "",
        lastName: lastName || "",
        bio: bio || "",
      };
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        updateData.avatar = imgUrl;
      }

      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, updateData);
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/blogs"); 
    } catch (error) {
      console.error("Erreur à la saisie du profil : ", error);
    }
  };

  
  return (
    <div className="w-auto relative overflow-hidden  bg-gray-400 border-none py-10">
      <form
        className="bg-zinc-50 flex flex-col items-center gap-[20px] p-[40px] w-[500px] m-[20px_auto] rounded-3xl"
        onSubmit={handleSubmit(profileUpdate)}
      >
        <h3 className="font-medium">Profile Details</h3>
        <label className="flex items-center gap-[10px] text-gray-500 cursor-pointer">
          <input
            label="avatar"
            className="mb-4"
            onChange={handleImageChange}
            type="file"
            accept=".png, .jpg, .jpeg"
            hidden
          />
          <img
            src={image ? URL.createObjectURL(image) : assets.avatar_icon}
            className="w-[50px] aspect-square rounded-full"
            alt=""
          />
          <p>upload profile image</p>
        </label>
        <Input
          label="Firstname"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          placeholder="Your firstname"
          className="mb-4 p-2 border-gray-300 rounded"
          required
        />
        <Input
          label="lastname"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder="Your lastname"
          className="mb-4 p-2 border-gray-300 rounded"
          required
        />
        <textarea
          className="w-full p-2 border-gray-300 rounded"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          placeholder="Write your profile bio"
          required
        />
        <Button
          className="w-60 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded"
          type="submit"
        >
          Save
        </Button>
      </form>
      <img
        className="max-w-[160px] aspect-square m-[20px_auto] rounded-full"
        src={
          image
            ? URL.createObjectURL(image)
            : prevImage
            ? prevImage
            : assets.logo_icon
        }
        alt=""
      />
    </div>
  );
};

export default ProfileUpdate;

