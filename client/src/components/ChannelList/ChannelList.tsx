import "./ChannelList.css";
import "../../animations.css"

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
    <div className="channel-list slide-in-left">
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
