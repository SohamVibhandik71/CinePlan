import { useState } from "react";
import axios from "axios";

import FormInput from "./FormInput";
import GoogleSignInButton from "./GoogleSignInButton";
import { useAuth } from "../context/AuthContext";

export default function SignupForm({ onLoadingChange }) {
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [visibleFields, setVisibleFields] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // =====================================================
  // UPDATE FORM FIELD
  // =====================================================

  function updateField(field) {
    return (event) => {
      const value = event.target.value;

      setForm((current) => ({
        ...current,
        [field]: value,
      }));

      // Clear field error while typing
      if (errors[field]) {
        setErrors((current) => ({
          ...current,
          [field]: "",
        }));
      }

      // Clear general form error
      if (errors.form) {
        setErrors((current) => ({
          ...current,
          form: "",
        }));
      }
    };
  }

  // =====================================================
  // TOGGLE PASSWORD VISIBILITY
  // =====================================================

  function toggleVisibility(field) {
    setVisibleFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();

    // Name validation
    if (!name) {
      nextErrors.name = "Name is required.";
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (form.password.length < 8) {
      nextErrors.password =
        "Password must be at least 8 characters.";
    }

    // Confirm password validation
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword =
        "Passwords do not match.";
    }

    // Show validation errors
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    onLoadingChange(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/signup`,
        {
          name,
          email,
          password: form.password,
        }
      );

      const data = response.data;

      console.log("Signup successful:", data);

      /*
       * Signup automatically creates a persistent login.
       *
       * This uses the same AuthContext used by LoginForm.
       */
      login(
        data.user,
        data.token,
        true
      );

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup error:", error);

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
      className="flex flex-col gap-[22px]"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* =================================================
          NAME
      ================================================= */}

      <FormInput
        id="name"
        label="NAME"
        type="text"
        value={form.name}
        onChange={updateField("name")}
        placeholder="Enter your name"
        error={errors.name}
      />

      {/* =================================================
          EMAIL
      ================================================= */}

      <FormInput
        id="email"
        label="EMAIL"
        type="email"
        value={form.email}
        onChange={updateField("email")}
        placeholder="Enter your email"
        error={errors.email}
      />

      {/* =================================================
          PASSWORD
      ================================================= */}

      <FormInput
        id="password"
        label="PASSWORD"
        type={
          visibleFields.password
            ? "text"
            : "password"
        }
        value={form.password}
        onChange={updateField("password")}
        placeholder="Create a password"
        error={errors.password}
        onToggleVisibility={() =>
          toggleVisibility("password")
        }
      />

      {/* =================================================
          CONFIRM PASSWORD
      ================================================= */}

      <FormInput
        id="confirmPassword"
        label="CONFIRM PASSWORD"
        type={
          visibleFields.confirmPassword
            ? "text"
            : "password"
        }
        value={form.confirmPassword}
        onChange={updateField("confirmPassword")}
        placeholder="Repeat your password"
        error={errors.confirmPassword}
        onToggleVisibility={() =>
          toggleVisibility("confirmPassword")
        }
      />

      {/* =================================================
          FORM ERROR
      ================================================= */}

      {errors.form && (
        <p className="text-sm text-red-400">
          {errors.form}
        </p>
      )}

      {/* =================================================
          CREATE ACCOUNT
      ================================================= */}

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
            aria-label="Creating account"
          />
        ) : (
          "CREATE ACCOUNT"
        )}
      </button>

      {/* =================================================
          DIVIDER
      ================================================= */}

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

      {/* =================================================
          GOOGLE SIGN IN
      ================================================= */}

      <GoogleSignInButton />

      {/* =================================================
          LOGIN LINK
      ================================================= */}

      <p className="mt-[5px] text-center text-[0.8rem] text-[#6f6b63]">
        Already have an account?{" "}

        <a
          className="
            font-bold
            text-[#d4af37]
            transition-colors

            hover:text-[#f2ca50]
            hover:underline

            focus-visible:text-[#f2ca50]
          "
          href="/login"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}