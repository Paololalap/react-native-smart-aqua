import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import CustomDrawerContent from '../shared/CustomDrawerContent';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="SmartAqua"
          component={HomeStack}
          options={() => ({
            title: 'Smart Aqua'
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppDrawer;
