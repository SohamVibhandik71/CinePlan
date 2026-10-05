import { useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";

import FormInput from "./FormInput";
import GoogleSignInButton from "./GoogleSignInButton";
import { useAuth } from "../context/AuthContext";

export default function LoginForm({ onLoadingChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};
    const trimmedEmail = email.trim();

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      nextErrors.password = "Password is required.";
    }

    // Stop if validation fails
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    onLoadingChange(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        {
          email: trimmedEmail,
          password,
        }
      );

      const data = response.data;

      console.log("FULL LOGIN RESPONSE:", data);
      console.log("USER DATA:", data.userData);
      console.log("TOKEN:", data.token);

      login(data.userData, data.token, rememberMe);

      console.log("login() called");

      login(data.userData, data.token, rememberMe);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);

      setErrors({
        form:
          error.response?.data?.message ||
          "Unable to connect to the server.",
      });
    } finally {
      setLoading(false);
      onLoadingChange(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-[27px]"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Email */}
      <FormInput
        id="email"
        label="EMAIL"
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);

          // Clear email error while typing
          if (errors.email) {
            setErrors((prev) => ({
              ...prev,
              email: "",
            }));
          }
        }}
        placeholder="Enter your email"
        error={errors.email}
      />

      {/* Password */}
      <FormInput
        id="password"
        label="PASSWORD"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);

          // Clear password error while typing
          if (errors.password) {
            setErrors((prev) => ({
              ...prev,
              password: "",
            }));
          }
        }}
        placeholder="Enter your password"
        error={errors.password}
        onToggleVisibility={() =>
          setShowPassword((visible) => !visible)
        }
      />

      {/* Form Error */}
      {errors.form && (
        <p className="text-sm text-red-400">
          {errors.form}
        </p>
      )}

      {/* Remember Me / Forgot Password */}
      <div className="mt-px flex items-center justify-between text-[0.78rem] text-[#99907c]">
        <label className="flex cursor-pointer items-center gap-[9px]">
          <input
            className="peer sr-only"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) =>
              setRememberMe(event.target.checked)
            }
          />

          <span
            className="
              inline-flex
              h-[15px]
              w-[15px]
              items-center
              justify-center
              border
              border-[#99907c]
              text-[#131313]

              peer-checked:border-[#f2ca50]
              peer-checked:bg-[#f2ca50]

              peer-focus-visible:outline
              peer-focus-visible:outline-2
              peer-focus-visible:outline-offset-2
              peer-focus-visible:outline-[#f2ca50]
            "
          >
            {rememberMe && (
              <Check
                size={13}
                strokeWidth={3}
              />
            )}
          </span>

          <span>Remember me</span>
        </label>

        <a
          className="
            transition-colors
            hover:text-[#f2ca50]
            focus-visible:text-[#f2ca50]
          "
          href="/forgot-password"
        >
          Forgot password?
        </a>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          mt-[3px]
          flex
          min-h-[53px]
          w-full
          items-center
          justify-center
          rounded-none
          border
          border-transparent
          bg-[#f2ca50]
          text-[0.7rem]
          font-bold
          tracking-[0.18em]
          text-[#131313]
          transition-colors

          hover:bg-[#d4af37]

          focus-visible:outline-0
          focus-visible:ring-2
          focus-visible:ring-[#f2ca50]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#131313]

          disabled:cursor-wait
          disabled:opacity-70
        "
      >
        {loading ? (
          <span
            className="
              h-[17px]
              w-[17px]
              animate-[spin_700ms_linear_infinite]
              rounded-full
              border-2
              border-[rgba(19,19,19,0.3)]
              border-t-[#131313]
            "
            aria-label="Signing in"
          />
        ) : (
          "SIGN IN"
        )}
      </button>

      {/* Divider */}
      <div
        className="
          flex
          items-center
          gap-[15px]
          text-[0.65rem]
          tracking-[0.16em]
          text-[#6f6b63]

          before:h-px
          before:flex-1
          before:bg-[#2a2a2a]

          after:h-px
          after:flex-1
          after:bg-[#2a2a2a]
        "
      >
        <span>OR</span>
      </div>

      {/* Google Login */}
      <GoogleSignInButton />

      {/* Sign Up */}
      <p className="mt-[11px] text-center text-[0.8rem] text-[#6f6b63]">
        Don't have an account?{" "}

        <a
          className="
            font-bold
            text-[#d4af37]
            transition-colors

            hover:text-[#f2ca50]
            hover:underline

            focus-visible:text-[#f2ca50]
          "
          href="/signup"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}