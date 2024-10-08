const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const login = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during logout");
  }
};

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/me`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error("Error fetching user");
  }

  return responseBody;
};

export const updateUser = async (formData) => {
  const response = fetch(`${API_BASE_URL}/api/user/update-user`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return response.ok;
};

export const fetchRelevantUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/users`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error("Error fetching users");
  }

  return responseBody;
};

export const addSwipedUser = async (userId, direction) => {
  const response = await fetch(`${API_BASE_URL}/api/user/swipe`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      direction: direction,
      swipedUserId: userId,
    }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const fetchAllMatches = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/matches`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error("Error fetching matches");
  }

  return responseBody;
};

export const fetchMessages = async (chatUserId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/message/fetch-messages/${chatUserId}`,
    {
      credentials: "include",
    },
  );

  console.log("ID: ", chatUserId);

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error("Error fetching messages");
  }

  return responseBody;
};

export const sendMessage = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/message/send-message`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error("Error fetching messages");
  }

  return responseBody;
};
