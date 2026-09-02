import { useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
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
import { isValidEmail } from "@/lib/validation";

const MIN_PASSWORD_LENGTH = 15;

export default function SignUp() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

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

  const handleSignUp = async () => {
    const emailValid = isValidEmail(email);
    const passwordValid = password.trim().length >= MIN_PASSWORD_LENGTH;

    setEmailError(emailValid ? null : "Enter a valid email address");
    setPasswordError(
      passwordValid ? null : `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    );

    if (!emailValid || !passwordValid) return;

    const { error } = await signUp.password({ emailAddress: email, password });
    if (error) return;

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) return;

    setModalVisible(true);
  };

  const handleVerifyEmailCode = async (_email: string, code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) throw new Error(error.longMessage ?? error.message);

    if (signUp.status === "complete") {
      const { error: finalizeError } = await signUp.finalize();
      if (finalizeError) throw new Error(finalizeError.longMessage ?? finalizeError.message);
      return;
    }

    throw new Error("Additional verification is required. Please try again.");
  };

  const handleSSOSignUp = async (strategy: "oauth_google" | "oauth_facebook" | "oauth_apple") => {
    try {
      const { createdSessionId } = await startSSOFlow({ strategy });
      if (createdSessionId) {
        router.replace("/");
      }
    } catch (err) {
      console.error(`${strategy} sign-up error:`, err);
    }
  };

  const emailErrorMessage =
    emailError ?? errors.fields.emailAddress?.longMessage ?? errors.fields.emailAddress?.message ?? null;
  const passwordErrorMessage =
    passwordError ?? errors.fields.password?.longMessage ?? errors.fields.password?.message ?? null;

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
            {emailErrorMessage && (
              <Text className="text-xs font-poppins text-error mt-1 ml-1">{emailErrorMessage}</Text>
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
            {passwordErrorMessage && (
              <Text className="text-xs font-poppins text-error mt-1 ml-1">{passwordErrorMessage}</Text>
            )}
          </View>
        </View>

        <View className="mt-6">
          <PrimaryButton
            label="Sign Up"
            onPress={handleSignUp}
            disabled={fetchStatus === "fetching"}
          />
        </View>

        {/* Required mount point for Clerk's bot protection on sign-up */}
        <View nativeID="clerk-captcha" />

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
            onPress={() => handleSSOSignUp("oauth_google")}
          />
          <SocialButton
            label="Continue with Facebook"
            icon={<FontAwesome name="facebook" size={22} color="#1877F2" />}
            onPress={() => handleSSOSignUp("oauth_facebook")}
          />
          <SocialButton
            label="Continue with Apple"
            icon={<FontAwesome name="apple" size={22} color="#000000" />}
            onPress={() => handleSSOSignUp("oauth_apple")}
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
        verificationService={handleVerifyEmailCode}
      />
    </SafeAreaView>
  );
}
