import { IconButton, useColorMode } from "@chakra-ui/core";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "dark" ? "moon" : "sun"}
      color={colorMode === "light" ? "teal.500" : "white"}
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
    />
  );
};
