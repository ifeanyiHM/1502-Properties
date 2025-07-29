import { fetchAllUsers } from "../services/apiAdmin";

interface UserProps {
  id: string;
  userCode: string | null;
}

//generate user code for each signup user
function generateUserCode(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  const number = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${letter}${number}`;
}

//check for uniqueness to ensure code is not already assigned
export async function generateUniqueUserCode(): Promise<string> {
  let isUnique = false;
  let code = "";

  const users = await fetchAllUsers(); // fetch all users first
  const existingCodes = new Set(
    users.map((user: UserProps) => user.userCode).filter(Boolean)
  );

  while (!isUnique) {
    code = generateUserCode();

    if (!existingCodes.has(code)) {
      isUnique = true;
    }
  }

  return code;
}
