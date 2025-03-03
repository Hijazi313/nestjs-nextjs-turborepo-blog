"use server";

import { print } from "graphql";
import { fetchGraphQL } from "../lib/fetchGraphQL";
import { signinFormSchema, signupFormSchema } from "../schemas/auth.schema";
import { SignUpFormState } from "../types/form-state";
import {
  CREATE_USER_MUTATION,
  SIGN_IN_MUTATION,
} from "../graphql/mutations.graphql";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession } from "../lib/session";

export async function signup(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = signupFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    createUserInput: { ...validatedFields.data },
  });
  if (data.errors) return { message: "Something went wrong" };
  redirect("/auth/signin");
}

export const signin = async (
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> => {
  const validatedFields = signinFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    signInInput: { ...validatedFields.data },
  });
  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Something went wrong",
    };
  // TODO Session for the user
  await createSession({
    user: {
      id: data.login.id,
      name: data.login.name,
      avatar: data.login.avatar,
    },
    accessToken: data.login.access_token,
  });

  revalidatePath("/");
  redirect("/");
};
