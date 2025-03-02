"use client";
import SubmitButton from "../../../../components/SubmitButton";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { signin } from "../../../../actions/auth.action";
import { useActionState } from "react";

const SigninForm = () => {
  const [state, action] = useActionState(signin, undefined);
  return (
    <form action={action} className="flex flex-col gap-4">
      {!!state?.message && (
        <p className=" text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="jane@example.com"
          type="email"
        />
        {!!state?.errors?.email && (
          <p className=" text-red-500 text-sm">{state?.errors?.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
        />
        {!!state?.errors?.password && (
          <p className=" text-red-500 text-sm">{state?.errors?.password}</p>
        )}
      </div>
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
};

export default SigninForm;
