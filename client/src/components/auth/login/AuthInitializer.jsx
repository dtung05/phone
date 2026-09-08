import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetMeQuery } from "../../../store/api/authApi";
import { setProfile } from "../../../store/slices/profileSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const { data } = useGetMeQuery(undefined, {
    skip: !token,
  });
  useEffect(() => {
    if (data) {
      dispatch(setProfile(data));
    }
  }, [data, dispatch]);
  return null;
};

export default AuthInitializer;
