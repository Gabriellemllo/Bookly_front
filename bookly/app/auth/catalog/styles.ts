import { StyleSheet } from 'react-native';
import { CoresEscuras } from '@/constants/Colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CoresEscuras.background
  },

  container: {
    flex: 1,
    backgroundColor: CoresEscuras.background
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: CoresEscuras.background,
  },

  titleHeader: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  },

  coverContainer: {
    alignItems: "center",
    marginTop: 20
  },

  cover: {
    width: 200,
    height: 300,
    borderRadius: 12
  },

  bookTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20
  },

  meta: {
    color: "#bdbdbd",
    textAlign: "center",
    marginTop: 3
  },

  description: {
    color: "#ddd",
    padding: 20,
    lineHeight: 20,
    textAlign: "justify"
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 10
  },

  starsRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10
  },

  rating: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
    fontSize: 16
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },

  button: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
  },

  loadingText: {
    color: "#bdbdbd",
    marginTop: 12,
    fontSize: 14
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 20
  },

  errorText: {
    color: "#ff4444",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20
  },

  coverPlaceholder: {
    backgroundColor: "#2a2d35",
    justifyContent: "center",
    alignItems: "center"
  },

  coverPlaceholderText: {
    color: "#4cd964",
    fontSize: 80,
    fontWeight: "bold"
  }
});