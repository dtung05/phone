import Profile from "../../pages/customer/profile/Profile";
import AuthLogin from "../middleware/AuthLogin";

const profile = [
  {
    Component: AuthLogin,
    children: [
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
];

export default profile;
