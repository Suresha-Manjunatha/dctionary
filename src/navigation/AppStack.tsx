import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";

import Home from "../screens/Home";
import ParkingSpace from "../screens/ParkingSpace";

export type routesType = {
  ParkingSpace: {
    lots: number;
  };
};

const AppStack: FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ParkingSpace" component={ParkingSpace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
