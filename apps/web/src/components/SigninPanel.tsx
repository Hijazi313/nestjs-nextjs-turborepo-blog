import Link from "next/link";
import { AppNavigation } from "../constants/app";

const SigninPanel = () => {
  return (
    <>
      <Link href={AppNavigation.signin}>Sign in</Link>
      <Link href={AppNavigation.signup}>Sign Up</Link>
    </>
  );
};

export default SigninPanel;
