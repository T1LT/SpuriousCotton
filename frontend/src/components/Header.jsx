import { useContext } from "react";
import NavBar from "./NavBar";
import AuthContext from "../context/AuthContext";
import ProfileModal from "./ProfileModal";

const Header = ({ open, handleClose, handleOpen }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user && (
        <>
          <NavBar handleOpen={handleOpen} />
          <ProfileModal open={open} handleClose={handleClose} />
        </>
      )}
    </>
  );
};

export default Header;
