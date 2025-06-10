import { Slot } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HoldMenuProvider } from "react-native-hold-menu";
import { PaperProvider } from "react-native-paper";
import { ReportsProvider } from "@/contexts/ReportsContext";
import { RecordsProvider } from "@/contexts/RecordsContext";
import { SelectProvider } from "@/contexts/SelectContext";
import { SearchRecordsProvider } from "@/contexts/SearchRecordsContext";
import { SplashScreenController } from "@/components/Splash";
import { FavoriteRecordsProvider } from "@/contexts/FavoriteRecordsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

export default function Root() {
  NavigationBar.setBackgroundColorAsync("#025EA1");
  return (
    <AuthProvider>
      <SearchRecordsProvider>
        <ReportsProvider>
          <FavoriteRecordsProvider>
            <RecordsProvider>
              <SelectProvider>
                <GluestackUIProvider mode="light">
                  <HoldMenuProvider theme="light" paddingBottom={48}>
                    <PaperProvider>
                      <StatusBar
                        style="light"
                        backgroundColor="#025EA1"
                        translucent={false}
                      />
                      <SplashScreenController />
                      <RootNavigator />
                    </PaperProvider>
                  </HoldMenuProvider>
                </GluestackUIProvider>
              </SelectProvider>
            </RecordsProvider>
          </FavoriteRecordsProvider>
        </ReportsProvider>
      </SearchRecordsProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  return <Slot />;
}
