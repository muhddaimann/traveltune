// hooks/useUpload.ts
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

const MAX_BYTES = 1 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "application/pdf"];

export function useUpload() {
  const [file, setFile] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);

  const ensurePermission = async (fn: any) => {
    const { status, canAskAgain } = await fn();
    if (status === "granted") return true;
    if (!canAskAgain) await Linking.openSettings();
    return false;
  };

  const validate = async (uri: string, name: string, type: string) => {
    if (!ALLOWED.includes(type)) return;
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists || (info.size && info.size > MAX_BYTES)) return;
    setFile({ uri, name, type });
  };

  const pickFromCamera = async () => {
    const ok = await ensurePermission(
      ImagePicker.requestCameraPermissionsAsync
    );
    if (!ok) return;

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!res.canceled) {
      const a = res.assets[0];
      await validate(a.uri, a.fileName || "camera.jpg", "image/jpeg");
    }
  };

  const pickFromGallery = async () => {
    const ok = await ensurePermission(
      ImagePicker.requestMediaLibraryPermissionsAsync
    );
    if (!ok) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!res.canceled) {
      const a = res.assets[0];
      await validate(a.uri, a.fileName || "gallery.jpg", "image/jpeg");
    }
  };

  const pickFromFiles = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      multiple: false,
    });

    if (!res.canceled) {
      const f = res.assets[0];
      await validate(
        f.uri,
        f.name || "document",
        f.mimeType || "application/pdf"
      );
    }
  };

  const openPicker = () => {
    Alert.alert(
      "Add attachment",
      "Choose source",
      [
        { text: "Camera", onPress: pickFromCamera },
        { text: "Gallery", onPress: pickFromGallery },
        { text: "Files", onPress: pickFromFiles },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return {
    file,
    openPicker,
    clear: () => setFile(null),
  };
}
