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
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  error: {
    color: "red",
    marginTop: 1, 
  },
});
