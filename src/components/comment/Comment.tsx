interface CommentProps {
  postId: number;
}

const Comment = ({ postId }: CommentProps) => {
  return (
    <>
      {postId}
      {/* <CommentForm /> */}
      {/* <CommentList id={postId} /> */}
    </>
  );
};

export default Comment;
