import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Appbar,
  Avatar,
  Card,
  Text,
  TextInput,
  Button,
  Chip,
  Switch,
  FAB,
  Provider as PaperProvider,
} from "react-native-paper";

export default function Index() {
  const [text, setText] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn((s) => !s);

  return (
    <PaperProvider>
      <>
        <Appbar.Header>
          <Appbar.Content title="Paper Demo" subtitle="TravelTune" />
        </Appbar.Header>

        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.card}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
            />
            <Card.Content>
              <Text>This is a demo of React Native Paper components.</Text>
              <TextInput
                label="Email"
                value={text}
                onChangeText={(t) => setText(t)}
                mode="outlined"
                style={styles.input}
              />
            </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>

          <Chip icon="information" style={styles.chip} onPress={() => {}}>
            Information Chip
          </Chip>
          <Chip icon="heart" mode="outlined" style={styles.chip} selected>
            Outlined Chip
          </Chip>

          <Button
            icon="camera"
            mode="contained"
            onPress={() => {}}
            style={styles.button}
          >
            Contained Button
          </Button>
          <Button
            icon="plus"
            mode="outlined"
            onPress={() => {}}
            style={styles.button}
          >
            Outlined Button
          </Button>

          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          <Text>Switch is {isSwitchOn ? "On" : "Off"}</Text>

          <FAB icon="plus" style={styles.fab} onPress={() => {}} />
        </ScrollView>
      </>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginTop: 12,
  },
  button: {
    marginVertical: 8,
  },
  chip: {
    marginVertical: 4,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
