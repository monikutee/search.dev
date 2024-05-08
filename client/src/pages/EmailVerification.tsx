import { Layout } from "../containers";
import Typography from "@mui/material/Typography";

export const CheckEmail = () => {
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="d-flex align-items-center justify-content-center">
          <Typography color="primary" variant="h4" textAlign={"center"} mt={5}>
            Please check your provided email to continue (If you did not receive
            it, please try to login in order to push new email )
          </Typography>
        </div>
      </div>
    </Layout>
  );
};
