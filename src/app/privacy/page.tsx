import LegalPageLayout from "@/components/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>
        Your privacy is critically important to us. At AgreeWise.ai, we have a
        few fundamental principles:
      </p>
      <ul>
        <li>
          We are thoughtful about the personal information we ask you to provide
          and the personal information that we collect about you through the
          operation of our services.
        </li>
        <li>
          We store personal information for only as long as we have a reason to
          keep it.
        </li>
        <li>
          We aim for full transparency on how we gather, use, and share your
          personal information.
        </li>
      </ul>
      <p>
        This Privacy Policy applies to information that we collect about you
        when you use our website, AgreeWise.ai.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We only collect information about you if we have a reason to do so—for
        example, to provide our Services, to communicate with you, or to make
        our Services better.
      </p>
      <ul>
        <li>
          <strong>Content You Provide for Analysis:</strong> When you submit a
          URL, text, or a file for analysis, we process this content to provide
          our service. We do not store this content after the analysis is
          complete. The content is sent to our AI service provider (Groq) for
          processing and is subject to their privacy policies. We do not link
          this content to any personal user account.
        </li>
        <li>
          <strong>Log Information:</strong> Like most online service providers,
          we collect information that web browsers, mobile devices, and servers
          typically make available, such as the browser type, IP address, unique
          device identifiers, language preference, referring site, the date and
          time of access, and operating system. We do this for analytics and to
          improve our service.
        </li>
      </ul>

      <h2>2. How and Why We Use Information</h2>
      <p>We use information about you for the purposes listed below:</p>
      <ul>
        <li>
          <strong>To provide our Services.</strong> For example, to receive and
          analyze the content you submit.
        </li>
        <li>
          <strong>To monitor and improve our Services.</strong> For example, by
          analyzing server logs to fix bugs and understand user traffic
          patterns.
        </li>
      </ul>

      <h2>3. How We Share Information</h2>
      <p>We do not sell our users&apos; private personal information.</p>
      <p>
        We share information about you in the limited circumstances spelled out
        below and with appropriate safeguards on your privacy:
      </p>
      <ul>
        <li>
          <strong>Third-Party Vendors:</strong> We may share information with
          third-party vendors who need the information to provide their services
          to us. This includes the AI service providers (like Groq) that power
          our analysis engine. We have contracts in place that require them to
          maintain the confidentiality of the information we share with them.
        </li>
        <li>
          <strong>Legal Requests:</strong> We may disclose information about you
          in response to a subpoena, court order, or other governmental request.
        </li>
      </ul>

      <h2>4. Your Rights</h2>
      <p>
        You have several rights regarding your information, including the right
        to access or delete your data. As we do not link analysis content to
        user accounts, this primarily applies to our server logs. If you have
        any questions, please contact us.
      </p>

      <p>
        <strong>Contact Us:</strong> You can contact us at [Your Contact Email
        Here, e.g., privacy@agreewise.ai]
      </p>
    </LegalPageLayout>
  );
}
