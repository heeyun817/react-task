import { useForm } from "react-hook-form";
import type { PostSearchCondition, PostSearchType } from "../../types/post";
import "./PostSearchBar.css";

type SearchForm = {
  postSearchType: PostSearchType | "";
  keyword: string;
  startDate: string;
  endDate: string;
};

type Props = {
  onSearch: (condition: PostSearchCondition) => void;
};

const PostSearchBar = ({ onSearch }: Props) => {
  const { register, handleSubmit, reset } = useForm<SearchForm>({
    defaultValues: {
      postSearchType: "",
      keyword: "",
      startDate: "",
      endDate: "",
    },
  });

  const submit = (values: SearchForm) => {
    onSearch({
      postSearchType: values.postSearchType || undefined,
      keyword: values.keyword.trim() || undefined,
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
    });
  };

  const onReset = () => {
    reset();
    onSearch({});
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit(submit)}>
      <select {...register("postSearchType")}>
        <option value="">검색 기준</option>
        <option value="TITLE">제목</option>
        <option value="AUTHOR">작성자</option>
        <option value="CONTENT">본문</option>
        <option value="HASHTAG">해시태그</option>
      </select>

      <input type="text" placeholder="검색어" {...register("keyword")} />

      <input type="date" {...register("startDate")} />
      <span>~</span>
      <input type="date" {...register("endDate")} />

      <button type="submit">검색</button>
      <button type="button" onClick={onReset}>
        초기화
      </button>
    </form>
  );
};

export default PostSearchBar;
