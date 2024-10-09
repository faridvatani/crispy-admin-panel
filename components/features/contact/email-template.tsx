import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div className="text-center text-muted">
    <h1 className="text-2xl font-semibold text-primary md:text-3xl lg:text-4xl">
      Welcome, {firstName}!
    </h1>
    <p className="text-sm text-muted mt-2">
      We&apos;re excited to have you on board. If you have any questions, feel
      free to reach out to us.
    </p>

    <p className="mt-4">Best regards,</p>
    <p className="mt-2">The Crispy Panel Team</p>
    <a
      className="text-primary mt-4"
      href="https://github.com/faridvatani/crispy-admin-panel"
    >
      Crispy Admin Panel
    </a>
  </div>
);
