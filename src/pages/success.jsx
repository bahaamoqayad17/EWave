import { success } from "@/store/SettingSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Success = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    console.log(router);
    // dispatch(success({}));
  }, []);
  return (
    <div>
      <h1>Payment Done Successfully</h1>
    </div>
  );
};

export default Success;
