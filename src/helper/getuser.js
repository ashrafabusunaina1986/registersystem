export const getToken = (req) => {
  const token = req.cookies.get("token")?.value || "";
  const token_admin = req.cookies.get("token_admin")?.value || "";
  if (token) return token;
  if (token_admin) return token_admin;
};
