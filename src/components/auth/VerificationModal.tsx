import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  verificationService: (email: string, code: string) => Promise<void>;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  verificationService,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, [visible]);

  const handleClose = () => {
    if (isVerifying) return;
    setCode("");
    setError(null);
    onClose();
  };

  const handleChangeText = async (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    setError(null);

    if (digits.length === CODE_LENGTH && !isVerifying) {
      setIsVerifying(true);
      Keyboard.dismiss();

      try {
        await verificationService(email, digits);
        onClose();
        router.replace("/");
      } catch (verificationError) {
        const message = verificationError instanceof Error ? verificationError.message : "";
        setError(
          /expired/i.test(message)
            ? "This code has expired. Request a new code."
            : "That code is not valid. Please try again.",
        );
        setCode("");
      } finally {
        setIsVerifying(false);
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

        <View
          className="bg-white rounded-t-3xl px-6 pt-6"
          style={{ paddingBottom: insets.bottom + 24 }}
        >
          <View className="w-10 h-1.5 bg-border rounded-full self-center mb-5" />

          <Text className="h3 text-center">Verify your email</Text>
          <Text className="text-sm font-poppins text-text-secondary text-center mt-2">
            Enter the 6-digit code we sent to{"\n"}
            <Text className="font-poppins-medium text-text-primary">{email}</Text>
          </Text>

          {error ? (
            <Text className="text-sm font-poppins text-red-600 text-center mt-3">{error}</Text>
          ) : null}

          <Pressable
            className="flex-row justify-center gap-2 mt-8"
            onPress={() => inputRef.current?.focus()}
          >
            {Array.from({ length: CODE_LENGTH }).map((_, index) => (
              <View
                key={index}
                className={`w-12 h-14 rounded-2xl border items-center justify-center ${
                  index === code.length ? "border-lingua-purple" : "border-border"
                }`}
              >
                <Text className="h3">{code[index] ?? ""}</Text>
              </View>
            ))}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChangeText}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            style={styles.hiddenInput}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 1,
    width: 1,
  },
});
