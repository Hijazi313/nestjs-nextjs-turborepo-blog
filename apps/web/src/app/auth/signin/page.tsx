import Link from "next/link";
import SigninForm from "./_components/SigninForm";
import { Button } from "../../../components/ui/button";
import { API_URL } from "../../../constants/api";

const SigninPage = () => {
  return (
    <div className="bg-white p-8 border rounded-md shadow-md w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign in Page</h1>
      <SigninForm />

      <Link href={"/auth/forgot"}>Forgot password</Link>
      <Button>
        <a href={`${API_URL}/auth/google/login`}>Sign In with Google</a>
      </Button>
      <div>
        <p>
          Not Registered{" "}
          <Link href={"/auth/signup"} className="underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
