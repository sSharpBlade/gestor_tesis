import { FloatButton } from "antd";
import {
  BarsOutlined,
  DisconnectOutlined,
  DiffOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

const Menu: React.FC = () => (
  <>
    <FloatButton.Group
      trigger="hover"
      type="default"
      style={{ top: 25, left: 25 }}
      icon={<BarsOutlined />}
      shape="square"
    >
      <FloatButton
        tooltip={<div>Añadir Estudiante</div>}
        icon={<DiffOutlined />}
        onClick={() => {
          console.log("Añadiendo estudiante...");
        }}
      />
      <FloatButton
        tooltip={<div>Cambiar contraseña</div>}
        icon={<UnlockOutlined />}
        onClick={() => {
          console.log("Cambiando contraseña...");
        }}
      />
      <FloatButton
        tooltip={<div>Cerrar Sesión</div>}
        icon={<DisconnectOutlined />}
        onClick={() => {
          console.log("Cerrando sesión...");
        }}
      />
    </FloatButton.Group>
  </>
);

export default Menu;
