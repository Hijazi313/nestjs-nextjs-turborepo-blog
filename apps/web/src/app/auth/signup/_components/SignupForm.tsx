"use client";

import { useActionState } from "react";
import SubmitButton from "../../../../components/SubmitButton";
import { signup } from "../../../../actions/auth.action";
import { Input } from "../../../../components/ui/input";

const SignupForm = () => {
  const [state, action] = useActionState(signup, undefined);
  return (
    <form action={action} className="flex flex-col gap-2 bg-white ">
      {!!state?.message && (
        <p className=" text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={state?.data?.name}
        />
      </div>
      {!!state?.errors?.name && (
        <p className=" text-red-500 text-sm">{state?.errors?.name}</p>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={state?.data?.email}
        />
      </div>
      {!!state?.errors?.email && (
        <p className=" text-red-500 text-sm">{state?.errors?.email}</p>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={state?.data?.password}
        />
      </div>
      {!!state?.errors?.password && (
        <p className=" text-red-500 text-sm">
          <ul>
            {state?.errors?.password.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </p>
      )}
      <SubmitButton>Sign up</SubmitButton>
    </form>
  );
};

export default SignupForm;
