"use server";

import { loginSchema } from "@/validations/schemas";
import { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const loginAction = async (
  _: SubmissionResult<string[]> | undefined, // 前回submit時のデータ(どう使うかは不明)
  formData: FormData,
) => {
  // server側でバリデーションを行う
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  // バリデーションエラーがある場合はそのエラーをclientに返す
  if (submission.status !== "success") {
    return submission.reply();
  }

  // バリデーションエラーがなければAPIを叩く（イメージ）(ここでは仮に叩いたとして 1秒 擬似遅延)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // BE,DB等でエラーが出た場合（イメージ）（ここでは仮に password === "123" がBEで弾かれたとする）
  if (submission.value.password === "123") {
    return submission.reply({
      fieldErrors: { password: ["Simple Password is invalid"] },
    });
  }

  // エラーがなければmyページへ遷移
  redirect("/my");
};
