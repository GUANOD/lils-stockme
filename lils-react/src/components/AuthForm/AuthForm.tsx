import {
  TextInput,
  Checkbox,
  Button,
  Group,
  PasswordInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, UseFormReturnType } from "@mantine/form";
import { IconAt, IconKeyOff, IconLockAccessOff } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ErrorContext } from "../../context/ErrorContext";
import { Theme, ThemeContext } from "../../context/ThemeContext";
import { signIn } from "../../service/auth/auth.service";
import "./AuthForm.scss";

interface FormValues {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  startdate: Date | undefined;
  enddate: Date | undefined;
  endbool: boolean;
  password: string;
  passVerify: string;
}
const AuthForm = () => {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const errorContext = useContext(ErrorContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(true);

  const signUpForm: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      username: "",
      firstname: "",
      lastname: "",
      startdate: undefined,
      enddate: undefined,
      endbool: false,
      password: "",
      passVerify: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      enddate: (value: Date) => {
        if (value) {
          return value > { ...signUpForm.getInputProps("startdate") }.value
            ? null
            : "End date must be higher than start date";
        }
      },
      startdate: (value: Date) =>
        value ? null : "Start date must not be empty",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Password must include at least one uppercase letter, one lowercase letter, one number and special character",
      passVerify: (value) =>
        value == { ...signUpForm.getInputProps("password") }.value
          ? null
          : "Passwords must match",
    },
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
  });

  const logInForm: UseFormReturnType<Partial<FormValues>> = useForm<
    Partial<FormValues>
  >({
    initialValues: {
      // email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: Partial<FormValues>) => {
    if (login) {
      const signinData: signInDto = {
        user_username: values.username as string,
        user_password: values.password as string,
      };

      try {
        const token = await signIn(signinData);
        auth?.setToken(token.accessToken);
        auth?.setRole(token.role);
        errorContext?.resetError();
        navigate("/dashboard");
      } catch (error) {
        let errorDto: errorDto = error as errorDto;
        errorContext?.setError({
          message: errorDto.message,
          icon: <IconLockAccessOff />,
        });
      }
    } else {
      // const signupData: signUpDto = {
      //   user_username: values.username,
      //   user_firstname: values.firstname,
      //   user_lastname: values.lastname,
      //   user_email: values.email,
      //   user_password: values.password,
      //   user_startContract: values.startdate as Date,
      //   user_endContract: values.enddate,
    }
  };

  const onEndboolChange = () => {
    if (!{ ...signUpForm.getInputProps("endbool") }.value) {
      signUpForm.setFieldValue("enddate", undefined);
    }
  };

  useEffect(onEndboolChange, [
    { ...signUpForm.getInputProps("endbool") }.value,
  ]);

  return (
    <div className="formContainer">
      <form
        onSubmit={
          login ? logInForm.onSubmit(onSubmit) : signUpForm.onSubmit(onSubmit)
        }
      >
        {!login ? (
          <>
            <TextInput
              className="persInput"
              // labelProps={}
              required
              label="Username"
              placeholder="Your username"
              {...signUpForm.getInputProps("username")}
            />
            <TextInput
              className="persInput"
              required
              label="First name"
              placeholder="Your first name"
              {...signUpForm.getInputProps("firstname")}
            />
            <TextInput
              className="persInput"
              required
              label="Last name"
              placeholder="Your last name"
              {...signUpForm.getInputProps("lastname")}
            />
            <TextInput
              className="persInput"
              required
              label="Email"
              placeholder="your@email.com"
              icon={<IconAt size={14} />}
              {...signUpForm.getInputProps("email")}
            />
            <PasswordInput
              className="persInput"
              placeholder="Your password"
              label="Password"
              description="Password must include at least one uppercase letter, one lowercase letter, one number and special character"
              required
              {...signUpForm.getInputProps("password")}
            />
            <PasswordInput
              className="persInput"
              placeholder="Please re-type your password"
              label="Password verify"
              required
              {...signUpForm.getInputProps("passVerify")}
            />
            <DatePicker
              className="persInput"
              label="Contract start date"
              placeholder="Pick start date"
              required
              {...signUpForm.getInputProps("startdate")}
            />
            <Checkbox
              className="persInput"
              mt="md"
              label="Do you have contract end date?"
              // {...form.getInputProps("endbool").onChange((e) => onEndboolChange(e))}
              {...signUpForm.getInputProps("endbool", {
                type: "checkbox",
              })}
            />
            {{ ...signUpForm.getInputProps("endbool") }.value && (
              <DatePicker
                className="persInput"
                label="Contract end date"
                variant={theme?.theme == Theme.dark ? "filled" : "default"}
                placeholder="Pick end date"
                {...signUpForm.getInputProps("enddate")}
              />
            )}
          </>
        ) : (
          <>
            <TextInput
              className="persInput"
              // labelProps={}
              required
              label="Username"
              placeholder="Your username"
              {...logInForm.getInputProps("username")}
            />
            <PasswordInput
              className="persInput"
              placeholder="Your password"
              label="Password"
              description="Password must include at least one uppercase letter, one lowercase letter, one number and special character"
              required
              {...logInForm.getInputProps("password")}
            />
          </>
        )}

        <Group position="center" mt="md">
          <Button className="btnPrimary" type="submit">
            {login ? "Login" : "Create account"}
          </Button>
          <Button
            variant="outline"
            className="btnSecondary"
            onClick={() => setLogin(!login)}
          >
            {!login ? "Login" : "Create account"}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default AuthForm;
