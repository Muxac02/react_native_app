import { Slot } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HoldMenuProvider } from "react-native-hold-menu";
import { PaperProvider } from "react-native-paper";
import { ReportsProvider } from "../contexts/ReportsContext";
import { RecordsProvider } from "@/contexts/RecordsContext";
import { SelectProvider } from "@/contexts/SelectContext";

export default function Root() {
  // Set up the auth context and render our layout inside of it.

  return (
    <ReportsProvider>
      <RecordsProvider>
        <SelectProvider>
          <GluestackUIProvider mode="light">
            <HoldMenuProvider theme="light" paddingBottom={48}>
              <PaperProvider>
                <Slot />
              </PaperProvider>
            </HoldMenuProvider>
          </GluestackUIProvider>
        </SelectProvider>
      </RecordsProvider>
    </ReportsProvider>
  );
}
