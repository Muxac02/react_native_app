import { Slot } from "expo-router";
import { HoldMenuProvider } from "react-native-hold-menu";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <HoldMenuProvider theme="light" paddingBottom={48}>
      <Slot />
    </HoldMenuProvider>
  );
}
