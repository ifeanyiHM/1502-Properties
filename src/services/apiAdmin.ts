import supabase from "./supabase";
const API_URL = import.meta.env.VITE_API_URL;

//get all pending properties
export async function getPendingProperties() {
  const { data, error } = await supabase.from("pending_properties").select("*");

  if (error) {
    console.error(error);
    throw new Error("Properties could not be loaded");
  }

  return data;
}

//Approve property from pending properties
export async function approveProperty(propertyId: string) {
  const res = await fetch(`${API_URL}/approve-property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: propertyId }), // ✅ must send this
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to approve property");
  }

  return await res.json();
}

//Reject property from pending properties
export async function rejectProperty(propertyId: string) {
  const res = await fetch(`${API_URL}/reject-property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: propertyId }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to reject property");
  }

  return await res.json();
}

//Delete property from properties table
export async function deleteProperty(propertyId: string) {
  const res = await fetch(`${API_URL}/delete-property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: propertyId }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to delete property");
  }

  return await res.json();
}

//get all userss
export async function fetchAllUsers() {
  try {
    const res = await fetch(`${API_URL}/all-users`);
    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();
    console.log("All users:", users); // [{ id: "...", userCode: "A123" }, ...]
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
