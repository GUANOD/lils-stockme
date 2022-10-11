import { Button, Group, Stack } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandMeta,
  IconBrandReddit,
} from "@tabler/icons";
import React from "react";
import CenterContent from "../CenterContent/CenterContent";

type Props = {};

const OAuth = (props: Props) => {
  return (
    <CenterContent height="100%">
      <Stack>
        <Button leftIcon={<IconBrandGoogle />} variant="white">
          Sign up with Google
        </Button>
        <Button leftIcon={<IconBrandFacebook />}>Sign up with Facebook</Button>
        <Button leftIcon={<IconBrandReddit />} color="orange">
          Sign up with Reddit
        </Button>
      </Stack>
    </CenterContent>
  );
};

export default OAuth;
