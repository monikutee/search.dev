import React from "react";
import { Layout } from "../containers";
import Typography from "@mui/material/Typography";

export const PrivacyPolicy = () => {
  return (
    <Layout>
      <Typography color="primary" variant="h3" textAlign="center">
        Privacy Policy
      </Typography>

      <Typography color="primary" variant="body1" mt={4}>
        Your privacy is important to us. It is SEARCH.DEV policy to respect your
        privacy and comply with any applicable law and regulation regarding any
        personal information we may collect about you, including across our
        website, https://monikapetrulevic.lt/, and other sites we own and
        operate.
      </Typography>
      <Typography color="primary" variant="body1" mt={1}>
        Personal information is any information about you which can be used to
        identify you. This includes information about you as a person (such as
        name, address, and date of birth), your devices, payment details, and
        even information about how you use a website or online service.
      </Typography>
      <Typography color="primary" variant="body1" mt={1}>
        In the event our site contains links to third party sites and services,
        please be aware that those sites and services have their own privacy
        policies. After following a link to any third-party content, you should
        read their posted privacy policy information about how they collect and
        use personal information. This Privacy Policy does not apply to any of
        your activities after you leave our site.
      </Typography>
      <Typography color="primary" variant="body1" mt={2}>
        This policy is effective as of 13 February 2024.
      </Typography>
      <Typography color="primary" variant="body1">
        Last updated: 13 February 2024
      </Typography>

      <Typography color="primary" variant="h6" mt={3}>
        Information We Collect
      </Typography>
      <ul>
        <li>Names and Surnames</li>
        <li>Emails</li>
        <li>Phone numbers</li>
        <li>IP addresses when using website (security reasons)</li>
      </ul>
      <Typography color="primary" variant="h6" mt={3}>
        You have the following rights:
      </Typography>

      <ul>
        <li>Know (be informed) about your data processing (right to know)</li>
        <li>
          Access your data and know how they are processed (right of access)
        </li>
        <li>
          Request to rectify or, in the light of the purposes of the processing
          of personal data, to have incomplete personal data completed (right to
          rectify). Please note that we may need to verify the correctness of
          your new data
        </li>
        <li>
          Errase your data or restrict your data processing activities (with the
          exception of storage) (right to errase and the “right to be
          forgotten”) if there are good reasons for this. Please note that we
          may not be able to process your claim to errase data because of legal
          regulation in all cases.
        </li>
        <li>
          Right to require the data controller to restrict the processing of
          personal data for one of the legitimate reasons (right to restrict)
        </li>
        <li>
          Right to portability of the data you have provided to us (right to
          transmit)
        </li>
        <li>
          Right to file a complaint to the State Data Protection Inspectorate.
          We would be grateful if you contact us before and give us an
          opportunity to settle the dispute with you peacefully.
        </li>
      </ul>
      <Typography color="primary" variant="body1">
        You may enforce your rights under the Description of the Implementation
        of the Rights of Data Subject.
      </Typography>
    </Layout>
  );
};
