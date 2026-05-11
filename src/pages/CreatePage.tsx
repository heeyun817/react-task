import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../apis/post";
import "./CreatePage.css";

const parseHashtags = (input: string): string[] =>
  input
    .split(/[,]+/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

const schema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요.")
    .max(100, "제목은 100자 이하로 입력해주세요."),
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
  hashtagInput: z.string().superRefine((value, ctx) => {
    const tags = parseHashtags(value);
    if (tags.length > 5) {
      ctx.addIssue({
        code: "custom",
        message: "해시태그는 최대 5개까지 등록 가능합니다.",
      });
    }
    if (tags.some((tag) => tag.length > 50)) {
      ctx.addIssue({
        code: "custom",
        message: "해시태그는 각 50자 이하로 입력해주세요.",
      });
    }
  }),
});

type CreateForm = z.infer<typeof schema>;

const CreatePage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",
      author: "",
      password: "",
      hashtagInput: "",
    },
  });

  const onSubmit = async (values: CreateForm) => {
    setSubmitError(null);
    try {
      const postId = await createPost({
        title: values.title,
        content: values.content,
        author: values.author,
        password: values.password,
        hashtags: parseHashtags(values.hashtagInput),
      });
      navigate(`/post/${postId}`);
    } catch {
      setSubmitError("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <main className="create-page">
      <h1>게시글 작성</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-form">
        <label>
          제목
          <input type="text" {...register("title")} />
          {errors.title && (
            <span className="field-error">{errors.title.message}</span>
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
          내용
          <textarea {...register("content")} />
          {errors.content && (
            <span className="field-error">{errors.content.message}</span>
          )}
        </label>

        <label>
          해시태그
          <input
            type="text"
            placeholder="예: 해시, 태그"
            {...register("hashtagInput")}
          />
          {errors.hashtagInput && (
            <span className="field-error">{errors.hashtagInput.message}</span>
          )}
        </label>

        <label>
          비밀번호
          <input type="password" {...register("password")} />
          {errors.password && (
            <span className="field-error">{errors.password.message}</span>
          )}
        </label>

        {submitError && <p className="create-error">{submitError}</p>}

        <section className="create-actions">
          <Link to="/">목록</Link>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </section>
      </form>
    </main>
  );
};

export default CreatePage;
