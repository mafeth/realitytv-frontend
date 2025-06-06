import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { GlobalProvider } from "../GlobalContext";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: 0 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GlobalProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarLabelStyle: {
          marginTop: 2,
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopColor: Colors[colorScheme ?? "light"].background,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopColor: Colors[colorScheme ?? "light"].background,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Aktuelles",
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper-o" color={color} />,
          // headerRight: () => (
          //   // <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="refresh"
          //           size={25}
          //           color={Colors[colorScheme ?? "light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   // </Link>
          // ),

        }}
      />
      <Tabs.Screen
        name="find"
        options={{
          title: "Durchsuchen",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
        }}
      />
    </Tabs>
    </GlobalProvider>
  );
}
