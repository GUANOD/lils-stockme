import { Button } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandReddit,
} from "@tabler/icons";
import React from "react";
import styles from "./Auth.scss";

type Props = {};

const OAuth = (props: Props) => {
  return (
    <div className="oAuth">
      <Button leftIcon={<IconBrandGoogle />} variant="white">
        Sign up with Google
      </Button>
      <Button leftIcon={<IconBrandFacebook />}>Sign up with Facebook</Button>
      <Button leftIcon={<IconBrandReddit />} color="orange">
        Sign up with Reddit
      </Button>
    </div>
  );
};

export default OAuth;
