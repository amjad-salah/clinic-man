import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    fontFamily: "Cairo",
    fontSize: 10,
    padding: "30px 30px",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
    textAlign: "right",
    writingMode: "horizontal-tb",
    direction: "rtl",
    borderBottom: 0.5,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
  },
  info: {
    marginBottom: 20,
    fontSize: 12,
    marginLeft: 20,
  },
  content: {
    flexDirection: "column",
    gap: 2,
  },

  tableHead: {
    backgroundColor: "#c1c1c1",
  },
  td: {
    padding: 4,
  },
});
