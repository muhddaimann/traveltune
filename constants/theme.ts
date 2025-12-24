import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from "react-native-paper";

const make = (
  family: string,
  weight: "400" | "500" | "600" | "700",
  fontSize: number,
  lineHeight: number,
  letterSpacing = 0
) => ({
  fontFamily: family,
  fontWeight: weight,
  fontSize,
  lineHeight,
  letterSpacing,
});

const tokenMap = {
  displayLarge: make("PlusJakartaSans_700Bold", "700", 57, 64),
  displayMedium: make("PlusJakartaSans_700Bold", "700", 45, 52),
  displaySmall: make("PlusJakartaSans_700Bold", "700", 36, 44),

  headlineLarge: make("PlusJakartaSans_700Bold", "700", 32, 40),
  headlineMedium: make("PlusJakartaSans_700Bold", "700", 28, 36),
  headlineSmall: make("PlusJakartaSans_600SemiBold", "600", 24, 32),

  titleLarge: make("PlusJakartaSans_600SemiBold", "600", 22, 28),
  titleMedium: make("PlusJakartaSans_600SemiBold", "600", 16, 24, 0.1),
  titleSmall: make("PlusJakartaSans_600SemiBold", "600", 14, 20, 0.1),

  labelLarge: make("Inter_600SemiBold", "600", 14, 20, 0.1),
  labelMedium: make("Inter_500Medium", "500", 12, 16, 0.5),
  labelSmall: make("Inter_400Regular", "400", 11, 16, 0.5),

  bodyLarge: make("Inter_400Regular", "400", 16, 24),
  bodyMedium: make("Inter_400Regular", "400", 14, 20),
  bodySmall: make("Inter_400Regular", "400", 12, 16),
} as const;

const fonts = tokenMap as unknown as MD3Theme["fonts"];

export const requiredFontNames = {
  jakartaSemiBold: "PlusJakartaSans_600SemiBold",
  jakartaBold: "PlusJakartaSans_700Bold",
  interRegular: "Inter_400Regular",
  interMedium: "Inter_500Medium",
  interSemiBold: "Inter_600SemiBold",
};

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  fonts,
  colors: {
    ...MD3LightTheme.colors,

    // 🎵 Deep Purple — Music & Emotion (muted, premium)
    primary: "#3E2A5F",
    onPrimary: "#FFFFFF",
    primaryContainer: "#E2DAF0",
    onPrimaryContainer: "#1E1233",

    // 🌅 Warm Orange — Travel & Energy
    secondary: "#FF8A3D",
    onSecondary: "#2A1400",
    secondaryContainer: "#FFD9C2",
    onSecondaryContainer: "#3A1E00",

    // 🌿 Support / Calm
    tertiary: "#2F9E62",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#CDEFD9",
    onTertiaryContainer: "#0F3D24",

    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",

    background: "#F9F7F4",
    onBackground: "#1A1A1A",
    surface: "#FFFFFF",
    onSurface: "#1A1A1A",

    surfaceVariant: "#E4E0EC",
    onSurfaceVariant: "#4A4654",
    outline: "#7C7787",
    outlineVariant: "#C9C4D3",

    inverseSurface: "#2B2833",
    inverseOnSurface: "#F2F2F4",
    inversePrimary: "#B9A7DD",

    shadow: "#000000",
    scrim: "#000000",
    surfaceDisabled: "rgba(26,26,26,0.12)",
    onSurfaceDisabled: "rgba(26,26,26,0.38)",
    backdrop: "rgba(26,26,26,0.4)",

    elevation: { ...MD3LightTheme.colors.elevation },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 12,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,

    // 🎵 Deep Purple — darker, less glow
    primary: "#B9A7DD",
    onPrimary: "#241436",
    primaryContainer: "#3A2556",
    onPrimaryContainer: "#E2DAF0",

    // 🌅 Warm Orange
    secondary: "#FFB37A",
    onSecondary: "#3A1E00",
    secondaryContainer: "#663A00",
    onSecondaryContainer: "#FFD9C2",

    // 🌿 Support
    tertiary: "#79D39B",
    onTertiary: "#0B2A18",
    tertiaryContainer: "#1A5A37",
    onTertiaryContainer: "#BDECCF",

    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",

    background: "#0E0C14",
    onBackground: "#E6E6EB",
    surface: "#15131B",
    onSurface: "#E6E6EB",

    surfaceVariant: "#3E3A4A",
    onSurfaceVariant: "#C9C5D6",
    outline: "#948FA1",
    outlineVariant: "#3E3A4A",

    inverseSurface: "#E6E6EB",
    inverseOnSurface: "#23212A",
    inversePrimary: "#3E2A5F",

    shadow: "#000000",
    scrim: "#000000",
    surfaceDisabled: "rgba(230,230,235,0.12)",
    onSurfaceDisabled: "rgba(230,230,235,0.38)",
    backdrop: "rgba(0,0,0,0.4)",

    elevation: { ...MD3DarkTheme.colors.elevation },
  },
};

export default {
  lightTheme,
  darkTheme,
  fonts,
  requiredFontNames,
};
