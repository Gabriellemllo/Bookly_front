// app/auth/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


const ACTIVE_COLOR = "#00FF99"; // Verde (cor ativa)
const INACTIVE_COLOR = "#888"; // Cinza (cor inativa)

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: "#181B20",
          height: 60,
          borderTopWidth: 0, 
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          
          switch (route.name) {
            case "home": 
              iconName = color === ACTIVE_COLOR ? "home" : "home-outline"; 
              break;
            case "catalog": 
              iconName = color === ACTIVE_COLOR ? "book" : "book-outline";
              break;
            case "rating": 
              iconName = color === ACTIVE_COLOR ? "star" : "star-outline";
              break;
            case "profile": 
              iconName = color === ACTIVE_COLOR ? "person" : "person-outline";
              break;
            case "settings": 
              iconName = color === ACTIVE_COLOR ? "settings" : "settings-outline";
              break;
            default: 
              iconName = "alert-circle-outline";
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
    
      <Tabs.Screen name="home" options={{ title: "home" }} />
      <Tabs.Screen name="catalog" options={{ title: "catalog" }} />
      <Tabs.Screen name="rating" options={{ title: "rating" }} /> 
      <Tabs.Screen name="profile" options={{ title: "profile" }} />
      <Tabs.Screen name="settings" options={{ title: "settings" }} />
    </Tabs>
  );
}