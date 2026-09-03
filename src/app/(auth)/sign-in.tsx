import { useSignIn } from "@clerk/expo";
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
import { posthog } from "@/lib/posthog";
import { isValidEmail } from "@/lib/validation";

export default function SignIn() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(null);
  };

  const handleLogIn = async () => {
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
    if (error) return;

    posthog?.capture("sign_in_code_requested", { method: "email_code" });
    setModalVisible(true);
  };

  const handleVerifyEmailCode = async (_email: string, code: string) => {
    const { error } = await signIn.emailCode.verifyCode({ code });
    if (error) throw new Error(error.longMessage ?? error.message);

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) throw new Error(finalizeError.longMessage ?? finalizeError.message);
      posthog?.capture("sign_in_completed", { method: "email_code" });
      return;
    }

    throw new Error("Additional verification is required. Please try again.");
  };

  const handleSSOSignIn = async (strategy: "oauth_google" | "oauth_facebook" | "oauth_apple") => {
    try {
      const { createdSessionId } = await startSSOFlow({ strategy });
      if (createdSessionId) {
        posthog?.capture("sso_sign_in_completed", { provider: strategy });
        router.replace("/");
      }
    } catch (err) {
      console.error(`${strategy} sign-in error:`, err);
    }
  };

  const emailErrorMessage =
    emailError ?? errors.fields.identifier?.longMessage ?? errors.fields.identifier?.message ?? null;

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

        <Text className="h1 mt-4">Welcome back</Text>
        <Text className="text-sm font-poppins text-text-secondary mt-2">
          Continue your language journey ✨
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
        </View>

        <View className="mt-6">
          <PrimaryButton
            label="Log In"
            onPress={handleLogIn}
            disabled={fetchStatus === "fetching"}
          />
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
            onPress={() => handleSSOSignIn("oauth_google")}
          />
          <SocialButton
            label="Continue with Facebook"
            icon={<FontAwesome name="facebook" size={22} color="#1877F2" />}
            onPress={() => handleSSOSignIn("oauth_facebook")}
          />
          <SocialButton
            label="Continue with Apple"
            icon={<FontAwesome name="apple" size={22} color="#000000" />}
            onPress={() => handleSSOSignIn("oauth_apple")}
          />
        </View>

        <View className="flex-row items-center justify-center mt-8">
          <Text className="text-sm font-poppins text-text-secondary">
            Don&apos;t have an account?{" "}
          </Text>
          <Link href="/sign-up" replace className="text-sm font-poppins-semibold text-lingua-purple">
            Sign up
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
