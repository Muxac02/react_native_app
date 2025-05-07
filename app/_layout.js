import { Slot } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HoldMenuProvider } from "react-native-hold-menu";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <GluestackUIProvider mode="light">
      <HoldMenuProvider theme="light" paddingBottom={48}>
        <Slot />
      </HoldMenuProvider>
    </GluestackUIProvider>
  );
}
