import "./Header.css";
type HeaderProps = {
  activeChannel: string;
};

const Header = ({ activeChannel }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="channel-hash">#</span>
        <span className="channel-name">{activeChannel || "welcome"}</span>
      </div>

      <div className="header-center">Discord Clone</div>
      <div className="header-right" />
    </header>
  );
};

export default Header;
