import { Divider, Group } from "@mantine/core";
import React from "react";
import CenterContent from "../CenterContent/CenterContent";
import Form from "../Form/Form";
import styles from "./Auth.module.scss";
import OAuth from "./OAuth";

type Props = {};

const Auth = (props: Props) => {
  return (
    <CenterContent width="100vw" height="100vh">
      <div className={styles.authContainer}>
        <Form />
        <div className={styles.dividerContainer}>
          <Divider size="sm" orientation="vertical" />
        </div>
        <OAuth />
      </div>
    </CenterContent>
  );
};

export default Auth;
