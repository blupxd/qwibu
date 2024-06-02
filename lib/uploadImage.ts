import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (file: File) => {
  if (!file) {
    throw new Error("File is undefined");
  }

  try {
    const fileRef = ref(storage, `images/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Greška prilikom upload-a slike:", error);
    throw error; // Propagiraj grešku dalje
  }
};
