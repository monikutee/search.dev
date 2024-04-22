import { Layout } from "../containers";
import Typography from "@mui/material/Typography";

export const EmailVerification = () => {
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="d-flex align-items-center justify-content-center">
          <Typography color="primary" variant="h4" textAlign={"center"} mt={5}>
            Please check your provided email to continue
          </Typography>
        </div>
      </div>
    </Layout>
  );
};
