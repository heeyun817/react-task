import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useNavigate } from "react-router-dom";
import type { CommentCreateRequest } from "../../types/comment";

const schema = z.object({
  content: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(500, "내용은 500자 이하로 입력해주세요."),
  author: z
    .string()
    .min(2, "작성자명은 2자 이상이어야 합니다.")
    .max(20, "작성자명은 20자 이하로 입력해주세요."),
  password: z
    .string()
    .min(2, "비밀번호는 2자 이상이어야 합니다.")
    .max(200, "비밀번호는 200자 이하로 입력해주세요."),
});

export type CommentFormValues = z.infer<typeof schema>;

type Props = {
  defaultValues?: Partial<CommentFormValues>;
  onSubmit: (payload: CommentCreateRequest) => Promise<number>;
  serverError?: string;
};

const CommentForm = ({ defaultValues, onSubmit, serverError }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      content: "",
      author: "",
      password: "",
      ...defaultValues,
    },
  });

  const submit = (values: CommentFormValues) =>
    onSubmit({
      content: values.content,
      author: values.author,
      password: values.password ?? "",
    });

  return (
    <form onSubmit={handleSubmit(submit)} className="create-form">
      <label>
        내용
        <textarea {...register("content")} />
        {errors.content && (
          <span className="field-error">{errors.content.message}</span>
        )}
      </label>
      <label>
        작성자
        <input type="text" {...register("author")} />
        {errors.author && (
          <span className="field-error">{errors.author.message}</span>
        )}
      </label>

      <label>
        비밀번호
        <input type="password" {...register("password")} />
        {errors.password && (
          <span className="field-error">{errors.password.message}</span>
        )}
      </label>

      {serverError && <p className="create-error">{serverError}</p>}

      <section className="create-actions">
        <button onClick={() => navigate(-1)}>이전</button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </section>
    </form>
  );
};

export default CommentForm;
