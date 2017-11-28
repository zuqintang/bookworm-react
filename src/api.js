import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/user/auth", { credentials }).then(res => res.data.user)
  }
};
