import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormTextField({ label, errors = [], ...rest }) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.textInput} autoCapitalize="none" {...rest} />
      {errors.map((err) => (
        <Text key={err} style={styles.error}>
          {err}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "blue",
    fontWeight: 500,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: -20,
  },
});
