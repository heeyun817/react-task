import { useState } from "react";
import { verifyPassword } from "../../apis/post";
import "./PasswordModal.css";
import { useNavigate } from "react-router-dom";

type Props = {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
};

const PasswordModal = ({ postId, isOpen, onClose }: Props) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await verifyPassword({ password }, postId);
      navigate(`/post/${postId}/update`);
      handleClose();
    } catch {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <div className="modal">
      <h2>비밀번호 확인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          autoFocus
        />
        {error && <p className="modal-error">{error}</p>}
        <div className="modal-buttons">
          <button type="button" onClick={handleClose}>
            취소
          </button>
          <button type="submit" disabled={!password}>
            확인
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordModal;
