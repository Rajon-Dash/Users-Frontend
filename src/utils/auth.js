
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    // ✅ Decode JWT payload to check expiration
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now(); // Ensure token is not expired
  } catch (error) {
    return false;
  }
};

// ✅ Logout function (Removes token & redirects securely)
export const logout = (navigate) => {
  localStorage.removeItem("token");
  navigate("/login", { replace: true }); // Prevent back navigation
};


