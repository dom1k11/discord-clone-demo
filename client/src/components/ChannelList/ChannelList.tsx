import "./ChannelList.css";
import type { Channel } from "../../App";

type ChannelListProps = {
  channels: Channel[];
  activeChannel: string;
  username: string;
  selectChannel: (channel: Channel) => void;
};

const ChannelList = ({
  channels,
  activeChannel,
  selectChannel,
  username,
}: ChannelListProps) => {
  return (
    <div className="channel-list">
      {channels.map((channel) => (
        <button
          key={channel.name}
          onClick={() => selectChannel(channel)}
          className={`channel-item ${
            activeChannel === channel.name ? "active" : ""
          }`}
        >
          {channel.name}
        </button>
      ))}

      <div title={username} className="channel-footer">
        Connected as: {username}
      </div>
    </div>
  );
};

export default ChannelList;
