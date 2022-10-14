import { TextInput, Button, Group, PasswordInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { IconAt } from "@tabler/icons";
import { useEffect } from "react";
import "./AuthForm.scss";

interface FormValues {
  // email: string;
  username: string;
  password: string;
}

const LoginForm = () => {
  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      // email: "",
      username: "",

      password: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        )
          ? null
          : "Password must include at least one uppercase letter, one lowercase letter, one number and special character",
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
    <div className="formContainer">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          className="persInput"
          // labelProps={}
          required
          label="Username"
          placeholder="Your username"
          {...form.getInputProps("username")}
        />
        {/* <TextInput
          className="persInput"
          required
          label="Email"
          placeholder="your@email.com"
          icon={<IconAt size={14} />}
          {...form.getInputProps("email")}
        /> */}
        <PasswordInput
          className="persInput"
          placeholder="Your password"
          label="Password"
          description="Password must include at least one uppercase letter, one lowercase letter, one number and special character"
          required
          {...form.getInputProps("password")}
        />
        <Group position="center" mt="md">
          <Button className="btnPrimary" type="submit">
            Login
          </Button>
          <Button className="btnPrimary" type="submit">
            Create Account
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default LoginForm;
