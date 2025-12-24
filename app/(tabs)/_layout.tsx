import { Tabs } from "expo-router";
import { Compass, PlayCircle, Map, Settings } from "lucide-react-native";
import { TabProvider } from "../../contexts/tabContext";
import { CustomTabBar } from "../../components/shared/navBar";

export default function TabsLayout() {
  return (
    <TabProvider>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen
          name="a"
          options={{
            title: "Discover",
            tabBarIcon: ({ color, size }) => (
              <Compass color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="b"
          options={{
            title: "Maps",
            tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="c"
          options={{
            title: "Play",
            tabBarIcon: ({ color, size }) => (
              <PlayCircle color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="d"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Settings color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </TabProvider>
  );
}
