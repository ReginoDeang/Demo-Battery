import { useEffect, useState, useCallback } from "react";
import * as Battery from "expo-battery";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const _subscribe = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel);

    setSubscription(
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
        console.log("batteryLevel changed!", batteryLevel);
      })
    );
  };

  const _unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [_unsubscribe]);

  return (
    <View style={styles.container}>
      <Text style={styles.batteryText}>
        Current Battery Level:{" "}
        {batteryLevel ? `${(batteryLevel * 100).toFixed(2)}%` : "N/A"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  batteryText: {
    fontSize: 50,
  },
});
