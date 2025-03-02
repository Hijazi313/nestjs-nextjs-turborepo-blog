import Link from "next/link";
import SignupForm from "./_components/SignupForm";

const SignUp = () => {
  return (
    <div className="container p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center bg-white ">
      <h2 className="text-center text-2xl font-bold mb-4">Signup Page</h2>
      <SignupForm />
      <div>
        <p>Already have an account </p>
        <Link href={"/auth/signin"} className="underline">
          Signin
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
