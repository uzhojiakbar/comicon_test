"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation";

export default function ThemeToggleWithAnimation() {
  const { resolvedTheme, setTheme } = useTheme();



  // Передаём текущий режим в хук, чтобы он знал, какой сейчас режим активен.
  const { ref, toggleSwitchTheme } = useModeAnimation({
    duration: 1200,
    easing: "ease-in-out",
    animationType: ThemeAnimationType.CIRCLE, // или BLUR_CIRCLE
    isDarkMode: resolvedTheme === "dark",
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light");
    },
  });

  const handleToggle = async () => {
    await toggleSwitchTheme();
  };

  return (
    <button ref={ref} onClick={handleToggle} className="theme-toggle-btn">
      {resolvedTheme === "dark" ? (
        <Image src="/themelight.svg" alt="Light Mode" width={24} height={24} loading="lazy" />
      ) : (
        <Image src="/theme.svg" alt="Dark Mode" width={24} height={24} loading="lazy" />
      )}
      <style jsx>{`
        .theme-toggle-btn {
          position: relative;
          z-index: 20;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        }
      `}</style>
    </button>
  );
}
