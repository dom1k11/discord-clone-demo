import "./UserList.css";
import "../../animations.css"
import type { User } from "../../App";
type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="user-list slide-in-right">
      <div className="user-list-title">
        Online — {users.filter((u) => u.connected).length}
      </div>

      {users.map((user) => (
        <div className="user-item" key={user.userId}>
          <div className="avatar-wrapper">
            <img
              className="avatar"
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.userId}`}
              alt="avatar"
            />
            <span
              className={`status ${user.connected ? "online" : "offline"}`}
            />
          </div>

          <span
            className={`username ${user.connected ? "" : "username-offline"}`}
            title={user.username}
          >
            {user.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
