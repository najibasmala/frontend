import { Button } from "antd";
import "./styles.scss";
function CustomButton({
  className,
  children,
  style,
  onClick,
  disabled,
  loading,
  to,
  htmlType,
}) {
  return (
    <Button
      style={style}
      className={`${className} custom-btn`}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      to={to}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
