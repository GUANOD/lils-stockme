import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { IconAt } from "@tabler/icons";
import { useEffect } from "react";
import CenterContent from "../CenterContent/CenterContent";
import styles from "./Form.module.sass";

interface FormValues {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  startdate: Date | null;
  enddate: Date | null;
  endbool: boolean;
  password: string;
  passVerify: string;
}

const Form = () => {
  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      username: "",
      firstname: "",
      lastname: "",
      startdate: null,
      enddate: null,
      endbool: false,
      password: "",
      passVerify: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      enddate: (value) => {
        if (value) {
          return value > { ...form.getInputProps("startdate") }.value
            ? null
            : "End date must be higher than start date";
        }
      },
      startdate: (value) => (value ? null : "Start date must not be empty"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Password must include at least one uppercase letter, one lowercase letter, one number and special character",
      passVerify: (value) =>
        value == { ...form.getInputProps("password") }.value
          ? null
          : "Passwords must match",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const onEndboolChange = () => {
    if (!{ ...form.getInputProps("endbool") }.value) {
      form.setFieldValue("enddate", null);
    }
  };

  useEffect(onEndboolChange, [{ ...form.getInputProps("endbool") }.value]);

  return (
    <CenterContent height="100%">
      <Box mx="auto" className={styles.time}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            // labelProps={}
            required
            label="Username"
            placeholder="Your username"
            {...form.getInputProps("username")}
          />
          <TextInput
            required
            label="First name"
            placeholder="Your first name"
            {...form.getInputProps("firstname")}
          />
          <TextInput
            required
            label="Last name"
            placeholder="Your last name"
            {...form.getInputProps("lastname")}
          />
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            icon={<IconAt size={14} />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            placeholder="Your password"
            label="Password"
            description="Password must include at least one uppercase letter, one lowercase letter, one number and special character"
            required
            {...form.getInputProps("password")}
          />
          <PasswordInput
            placeholder="Please re-type your password"
            label="Password verify"
            required
            {...form.getInputProps("passVerify")}
          />
          <DatePicker
            label="Contract start date"
            placeholder="Pick start date"
            required
            {...form.getInputProps("startdate")}
          />
          <Checkbox
            mt="md"
            label="Do you have contract end date?"
            // {...form.getInputProps("endbool").onChange((e) => onEndboolChange(e))}
            {...form.getInputProps("endbool", {
              type: "checkbox",
            })}
          />
          {{ ...form.getInputProps("endbool") }.value && (
            <DatePicker
              label="Contract end date"
              placeholder="Pick end date"
              {...form.getInputProps("enddate")}
            />
          )}
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </CenterContent>
  );
};

export default Form;
