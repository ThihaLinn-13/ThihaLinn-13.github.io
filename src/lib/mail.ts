/**
 * Opens Gmail's web compose page with everything pre-filled.
 * The site is statically exported, so there is no server to send mail from —
 * this hands the message to Gmail instead of the visitor's desktop mail app.
 */
export function gmailComposeUrl(options: {
  to?: string;
  subject?: string;
  body?: string;
} = {}) {
  const params = new URLSearchParams({ view: "cm", fs: "1" });

  if (options.to) params.set("to", options.to);
  if (options.subject) params.set("su", options.subject);
  if (options.body) params.set("body", options.body);

  return `https://mail.google.com/mail/?${params.toString()}`;
}
