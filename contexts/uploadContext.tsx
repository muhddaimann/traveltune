// contexts/uploadContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "react-native";

type UploadContextType = {
  isUploading: boolean;
  upload: (payload: any) => Promise<void>;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function useUploadContext() {
  const ctx = useContext(UploadContext);
  if (!ctx) {
    throw new Error("useUploadContext must be used within UploadProvider");
  }
  return ctx;
}

type Props = {
  children: ReactNode;
};

export function UploadProvider({ children }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  function upload(payload: any) {
    return new Promise<void>((resolve, reject) => {
      Alert.alert(
        "Upload",
        "Do you want to upload this item?",
        [
          { text: "Cancel", style: "cancel", onPress: () => reject() },
          {
            text: "Upload",
            onPress: async () => {
              try {
                setIsUploading(true);
                await new Promise((res) => setTimeout(res, 1200));
                Alert.alert("Success", "Upload completed successfully");
                resolve();
              } catch {
                Alert.alert("Upload failed", "Something went wrong");
                reject();
              } finally {
                setIsUploading(false);
              }
            },
          },
        ],
        { cancelable: true }
      );
    });
  }

  return (
    <UploadContext.Provider value={{ isUploading, upload }}>
      {children}
    </UploadContext.Provider>
  );
}
