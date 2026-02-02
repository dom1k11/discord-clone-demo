import "./LoginForm.css";
import "../../animations.css";

type LoginFormProps = {
  username: string;
  logIn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  join: () => void;
};

const LoginForm = ({ username, logIn, join }: LoginFormProps) => {
  return (
    <div className="login-container slide-in-left">
      <h1>Join server</h1>

      <label>
        Username
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={logIn}
        />
      </label>

      <button
        className="btn btn-primary"
        onClick={join}
        disabled={!username.trim()}
      >
        Join
      </button>
    </div>
  );
};

export default LoginForm;
