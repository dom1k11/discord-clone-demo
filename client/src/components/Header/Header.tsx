import "./Header.css";
type HeaderProps = {
  activeChannel: string;
  onToggleLeft: () => void;
  onToggleRight: () => void;
};

const Header = ({
  activeChannel,
  onToggleLeft,
  onToggleRight,
}: HeaderProps) => {
  return (
    <header className="header">
      <button className="header-btn header-btn-left" onClick={onToggleLeft}>
        ☰
      </button>

      <div className="header-center">#{activeChannel || "welcome"}</div>

      <button className="header-btn header-btn-right" onClick={onToggleRight}>
        👥
      </button>
    </header>
  );
};

export default Header;
