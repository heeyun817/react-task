import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { PostCreateRequest } from "../../types/post";
import "./PostForm.css";
import { useNavigate } from "react-router-dom";

const parseHashtags = (input: string): string[] =>
  input
    .split(/[,]+/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

const schema = (isEdit: boolean) =>
  z.object({
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
    password: isEdit
      ? z.string().optional()
      : z
          .string()
          .min(2, "비밀번호는 2자 이상이어야 합니다.")
          .max(200, "비밀번호는 200자 이하로 입력해주세요."),
    hashtags: z.string().superRefine((value, ctx) => {
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

export type PostFormValues = z.infer<ReturnType<typeof schema>>;

type Props = {
  defaultValues?: Partial<PostFormValues>;
  onSubmit: (payload: PostCreateRequest) => Promise<void>;
  serverError?: string;
  isEdit: boolean;
};

const PostForm = ({ defaultValues, onSubmit, serverError, isEdit }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema(isEdit)),
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",
      author: "",
      password: "",
      hashtags: "",
      ...defaultValues,
    },
  });

  const submit = (values: PostFormValues) =>
    onSubmit({
      title: values.title,
      content: values.content,
      author: values.author,
      password: values.password ?? "",
      hashtags: parseHashtags(values.hashtags),
    });

  return (
    <form onSubmit={handleSubmit(submit)} className="create-form">
      <label>
        제목
        <input type="text" {...register("title")} />
        {errors.title && (
          <span className="field-error">{errors.title.message}</span>
        )}
      </label>

      <label>
        작성자
        <input type="text" {...register("author")} disabled={isEdit} />
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
          {...register("hashtags")}
        />
        {errors.hashtags && (
          <span className="field-error">{errors.hashtags.message}</span>
        )}
      </label>

      {!isEdit && (
        <label>
          비밀번호
          <input type="password" {...register("password")} />
          {errors.password && (
            <span className="field-error">{errors.password.message}</span>
          )}
        </label>
      )}

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

export default PostForm;
