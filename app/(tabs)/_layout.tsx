import { Tabs } from "expo-router";
import { Compass, BookOpen, Map, Library } from "lucide-react-native";
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
            title: "Journal",
            tabBarIcon: ({ color, size }) => (
              <BookOpen color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="d"
          options={{
            title: "Library",
            tabBarIcon: ({ color, size }) => (
              <Library color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </TabProvider>
  );
}
