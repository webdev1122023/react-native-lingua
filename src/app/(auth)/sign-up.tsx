import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthMascot } from "@/components/auth/AuthMascot";
import { VerificationModal } from "@/components/auth/VerificationModal";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SocialButton } from "@/components/SocialButton";
import { TextField } from "@/components/TextField";
import { verifyEmailCode } from "@/lib/verification";
import { isValidEmail } from "@/lib/validation";

const MIN_PASSWORD_LENGTH = 8;

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(null);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(null);
  };

  const handleSignUp = () => {
    const emailValid = isValidEmail(email);
    const passwordValid = password.trim().length >= MIN_PASSWORD_LENGTH;

    setEmailError(emailValid ? null : "Enter a valid email address");
    setPasswordError(
      passwordValid ? null : `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );

    if (!emailValid || !passwordValid) return;

    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        className="flex-1 px-6"
        contentContainerClassName="pb-8"
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center -ml-2 mt-2"
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={26} color="#001328" />
        </Pressable>

        <Text className="h1 mt-4">Create your account</Text>
        <Text className="text-sm font-poppins text-text-secondary mt-2">
          Start your language journey today ✨
        </Text>

        <AuthMascot />

        <View className="gap-4">
          <View>
            <TextField
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {emailError && (
              <Text className="text-xs font-poppins text-error mt-1 ml-1">{emailError}</Text>
            )}
          </View>
          <View>
            <TextField
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              isPassword
              autoComplete="password"
            />
            {passwordError && (
              <Text className="text-xs font-poppins text-error mt-1 ml-1">{passwordError}</Text>
            )}
          </View>
        </View>

        <View className="mt-6">
          <PrimaryButton label="Sign Up" onPress={handleSignUp} />
        </View>

        <View className="flex-row items-center mt-6">
          <View className="flex-1 h-px bg-border" />
          <Text className="text-xs font-poppins text-text-secondary mx-3">
            or continue with
          </Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        <View className="gap-3 mt-6">
          <SocialButton
            label="Continue with Google"
            icon={<FontAwesome name="google" size={20} color="#4285F4" />}
            disabled
          />
          <SocialButton
            label="Continue with Facebook"
            icon={<FontAwesome name="facebook" size={22} color="#1877F2" />}
            disabled
          />
          <SocialButton
            label="Continue with Apple"
            icon={<FontAwesome name="apple" size={22} color="#000000" />}
            disabled
          />
        </View>

        <View className="flex-row items-center justify-center mt-8">
          <Text className="text-sm font-poppins text-text-secondary">
            Already have an account?{" "}
          </Text>
          <Link href="/sign-in" replace className="text-sm font-poppins-semibold text-lingua-purple">
            Log in
          </Link>
        </View>
      </ScrollView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        verificationService={verifyEmailCode}
      />
    </SafeAreaView>
  );
}
