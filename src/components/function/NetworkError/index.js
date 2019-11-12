import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../../store/url";

const NetworkError = (value, Store) => {
  const notify = value => {
    toast.error(value);
  };

  if (value) {
    if (value.data.code * 1 === 419) {
      axios
        .post(`${URL}/admin/auth/token`, {
          Data: { adminSecretKey: Store.auth.adminSecretKey }
        })
        .then(res => {
          Store.actions.setAuth({
            ...Store.auth,
            accessToken: res.data.Data.token
          });
        })
        .catch(err => {
          console.log(err.response);
          notify("토큰 재발급 실패, 재시도..");
        });
    } else {
      notify(value.data.message);
    }
  } else {
    notify("[서버] 접속 실패");
  }
};

export default NetworkError;
