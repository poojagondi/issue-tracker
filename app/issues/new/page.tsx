"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      setError("Oh no an unexpected error occured 😦");
    }
  });
  const nav = useMemo(() => navigator, []);
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          {error}
        </Callout.Root>
      )}

      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) =>
            nav ? <SimpleMDE placeholder="Description" {...field} /> : <></>
          }
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} style={{ cursor: "pointer" }}>
          Submit new Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
