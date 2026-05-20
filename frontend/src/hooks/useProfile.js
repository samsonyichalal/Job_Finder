import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useProfile() {
  return useContext(UserContext);
}
