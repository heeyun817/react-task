import { useState } from "react";
import "./PasswordModal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
};

const PasswordModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await onConfirm(password);
      handleClose();
    } catch {
      setError("비밀번호가 일치하지 않습니다.");
    }
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
