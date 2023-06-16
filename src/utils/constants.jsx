import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { MdSpaceDashboard } from "react-icons/md";
import { MdSettingsInputComponent } from "react-icons/md";

import { Link } from "react-router-dom";

export const menuItems = [
  {
    label: <Link to="/">Գլխավոր</Link>,
    key: "1",
    icon: <MdSpaceDashboard />,
  },
  {
    label: "Օժանդակ",
    key: "sub1",
    icon: <MdSettingsInputComponent />,
    children: [
      { label: <Link to="/shops">Խանութներ</Link>, key: "5" },
      getItem("Option 6", "6"),
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ],
  },
  getItem("Navigation Two", "sub2", <UploadOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
