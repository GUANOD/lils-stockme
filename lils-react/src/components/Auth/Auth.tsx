import { Divider, Group } from "@mantine/core";
import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import LoginForm from "../AuthForm/LoginForm";
import "./Auth.scss";
import OAuth from "./OAuth";

type Props = {};

const Auth = (props: Props) => {
  const [login, setLogin] = useState<boolean>(false);
  return (
    <div className="authContainer">
      {login ? <LoginForm /> : <AuthForm />}
      <Divider className="divider" size="sm" orientation="vertical" />
      <OAuth />
    </div>
  );
};

export default Auth;
