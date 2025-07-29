import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { logout, setCredentials, setLoading } from "../features/auth/authSlice";
import {
  LOGIN_MUTATION,
  REFRESH_TOKEN_MUTATION,
  SIGNUP_MUTATION,
} from "../graphql/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { LoginFormData, SignupFormData } from "../validations/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const [loginMutation, { loading: loginLoading }] =
    useMutation(LOGIN_MUTATION);
  const [signupMutation, { loading: signupLoading }] =
    useMutation(SIGNUP_MUTATION);
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

  const login = async (data: LoginFormData) => {
    try {
      dispatch(setLoading(true));
      console.log("Attempting login with:", { email: data.email });

      const response = await loginMutation({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });

      console.log("Login response:", response);

      if (response.data?.login) {
        const { user, accessToken, refreshToken } = response.data.login;
        console.log("Login successful, setting credentials:", {
          user,
          hasAccessToken: !!accessToken,
        });

        dispatch(setCredentials({ user, accessToken, refreshToken }));
        router.push("/dashboard");
        return { success: true };
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (data: SignupFormData) => {
    try {
      dispatch(setLoading(true));
      const response = await signupMutation({
        variables: {
          input: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
          },
        },
      });

      if (response.data?.signup) {
        const { user, accessToken, refreshToken } = response.data.signup;
        dispatch(setCredentials({ user, accessToken, refreshToken }));
        router.push("/dashboard");
        return { success: true };
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Signup failed";
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logoutUser();
      return false;
    }

    try {
      const response = await refreshTokenMutation({
        variables: {
          input: {
            refreshToken,
          },
        },
      });

      if (response.data?.refreshToken) {
        const {
          user,
          accessToken,
          refreshToken: newRefreshToken,
        } = response.data.refreshToken;
        dispatch(
          setCredentials({ user, accessToken, refreshToken: newRefreshToken })
        );
        return true;
      }
    } catch (error: unknown) {
      console.error("Token refresh error:", error);
      logoutUser();
      return false;
    }
  };

  const logoutUser = () => {
    console.log("Logging out user");
    dispatch(logout());
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loginLoading || signupLoading,
    login,
    signup,
    logout: logoutUser,
    refreshToken,
  };
};
