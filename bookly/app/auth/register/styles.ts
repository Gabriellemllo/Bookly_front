import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1218",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#0f1218",
    borderWidth: 1,
    borderColor: "#3a3f4b",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3a3f4b",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#00FF99",
    borderColor: "#00FF99",
  },
  checkboxText: {
    color: "#fff",
    fontSize: 14,
  },

  button: {
    backgroundColor: "#3db0ff",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
  },
});

