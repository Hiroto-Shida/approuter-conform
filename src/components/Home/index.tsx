"use client";

import { loginAction } from "@/actions/login";
import { loginSchema } from "@/validations/schemas";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

const Home: React.FC = () => {
  const [formState, action, isPending] = useActionState<
    SubmissionResult<string[]> | undefined,
    FormData
  >(loginAction, undefined);

  const [form, fields] = useForm({
    lastResult: formState,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    defaultValue: {
      email: "",
      password: "",
    },
    shouldValidate: "onInput",
  });

  return (
    <form
      id={form.id}
      // onSubmitとactionの両方を設定することで、clientとserverの両方でバリデーション処理を行なう
      // 万が一client側でjsが無効化されていても、server側でバリデーションが行われる
      onSubmit={form.onSubmit}
      action={action}
      className="flex w-full max-w-[400px] flex-col gap-4 border p-4"
    >
      <div>
        <label htmlFor={fields.email.id} className="block w-full">
          Email
        </label>
        <input
          className="w-full border"
          name={fields.email.name}
          id={fields.email.id}
          // defaultValueを設定することで、submit時のフォームの値リセットを回避
          defaultValue={fields.email.value}
        />
        <p className="text-red-500">{fields.email.errors?.join(", ")}</p>
      </div>
      <div>
        <label htmlFor={fields.password.id} className="block w-full">
          Password
        </label>
        <input
          name={fields.password.name}
          id={fields.password.id}
          className="w-full border"
          defaultValue={fields.password.value}
        />
        <p className="text-red-500">{fields.password.errors?.join(", ")}</p>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        submit
      </button>
    </form>
  );
};

export default Home;
