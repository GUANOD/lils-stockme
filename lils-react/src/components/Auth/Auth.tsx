import { Divider, Group } from "@mantine/core";
import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import LoginForm from "../AuthForm/LoginForm";
import "./Auth.scss";
import OAuth from "./OAuth";

type Props = {};

const Auth = (props: Props) => {
  return (
    <div className="authGrid">
      <div className="authContainer">
        <AuthForm />
        <Divider className="divider" size="sm" orientation="vertical" />
        <OAuth />
      </div>
    </div>
  );
};

export default Auth;
