import { useContext } from "react";
import AuthContext from "../context/auth-context";

const CheckPerExist = (permission) => {
  const ctx = useContext(AuthContext);
  const permissions = ctx.permission;
  const findPer = permissions.findIndex((array) => array.name === permission);
  if (findPer === -1) return false;
  else return true;
};

export default CheckPerExist;
