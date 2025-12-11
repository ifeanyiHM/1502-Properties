import supabase, { supabaseUrl } from "./supabase";

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
  profilePhoto: string;
  userCode: string;
}

export interface UpdateUserProps {
  password?: string;
  fullName?: string;
  profilePhoto?: File | null;
  userType?: "agent" | "client" | "admin";
}

export async function signup({
  fullName,
  email,
  phone,
  userType,
  password,
  profilePhoto,
  userCode,
}: SignupProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        phone,
        userType,
        profilePhoto,
        userCode,
      },
    },
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return { data, error };
}

export async function handleGoogleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    console.error("Google sign-in error:", error.message);
  }
}

export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function updatePassword({ email }: { email: string }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://1502properties.com/reset-password",
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  profilePhoto,
  userType,
}: UpdateUserProps) {
  const updateData: {
    password?: string;
    data?: Record<string, string>;
  } = {};

  if (password) {
    updateData.password = password;
  }

  if (fullName || userType) {
    updateData.data = {
      ...(fullName && { fullName }),
      ...(userType && { userType }),
    };
  }

  if (!password && !fullName && !userType && !profilePhoto) return;

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!profilePhoto) return data;

  const fileName = `profiePhoto-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profilephotos")
    .upload(fileName, profilePhoto);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/profilephotos/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}

// export async function updateCurrentUser({
//   password,
//   fullName,
//   profilePhoto,
//   userType,
// }: UpdateUserProps) {
//   let updateData;
//   if (password) updateData = { password };
//   if (fullName) updateData = { data: { fullName } };
//   if (userType) updateData = { data: { userType } };

//   if (!updateData) return;

//   const { data, error } = await supabase.auth.updateUser(updateData);

//   if (error) throw new Error(error.message);
//   if (!profilePhoto) return data;

//   const fileName = `profiePhoto-${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("profilephotos")
//     .upload(fileName, profilePhoto);

//   if (storageError) throw new Error(storageError.message);

//   const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/profilephotos//${fileName}`,
//     },
//   });

//   if (error2) throw new Error(error2.message);
//   return updatedUser;
// }
