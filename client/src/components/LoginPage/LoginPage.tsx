import LoginForm from "./LoginForm";
import "./LoginPage.css";
import "../../animations.css";
import type { LoginPageProps } from "../../types/types";

const LoginPage = ({ username, logIn, join }: LoginPageProps) => {
  return (
    <div className="login-page">
      <div className="login-left">
        <LoginForm username={username} logIn={logIn} join={join} />
      </div>

      <div className="login-right slide-in-right">
        <h2>Welcome to Mini Discord</h2>
        <p>
          Join the server, pick a channel and start chatting in real time. No
          registration required.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
