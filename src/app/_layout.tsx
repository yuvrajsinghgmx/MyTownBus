import { Slot,Stack} from "expo-router";
import "../../global.css";
import { View } from "react-native";
import Navbar from "./components/Navbar";

// export default Slot;

export default function RootLayout(){
    // return (
    //     <Stack>
    //         <Stack.Screen name="index" options={{title:'Home Screen'}}/>
    //     </Stack>
    // );
    return (
        <View className="flex-1 bg-gray-100">
          <Slot />
          <Navbar />
        </View>
      );
}