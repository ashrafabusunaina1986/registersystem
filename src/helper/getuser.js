export const getToken = (req, t) => {
  const token = req.cookies.get(t)?.value || "";
  if (token) return token;
};
