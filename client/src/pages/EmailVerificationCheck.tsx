import React, { useContext } from "react";
import { Layout } from "../containers";
import { useParams, useNavigate } from "react-router-dom";
import { RouteList } from "../routes";
import Api from "../api";
import Loader from "../components/Global/Loader";
import { UserContext } from "../helpers/UserStore";
import { toast } from "react-toastify";

export const EmailVerificationCheck = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  React.useEffect(() => {
    if (token) {
      Api.user
        .verifyEmail(token)
        .then((res) => {
          setUserId(res.data.id);
          toast.success("Successfully logged in", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(RouteList.MY_JOB_OFFERS_LIST);
        })
        .catch((e) => {
          toast.error(
            "Email verification expired, try to login in order to send verification again",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          navigate(RouteList.HOME);
        });
    } else {
      navigate(RouteList.HOME);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      </div>
    </Layout>
  );
};
