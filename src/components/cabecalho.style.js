import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 112,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0F62FE"
  },
  title: {
    position: "absolute",
    left: 4.44,
    right: 72.22,
    top: 65.18,
    bottom: 18.75,

    fontFamily: "IBM Plex Sans",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: 32,
    lineHeight: 18,
    /* identical to box height, or 56% */
    letterspacing: 0.16,
    color: "#FFFFFF"
  },
  icons: {
    position: "absolute",
    left: 70.71,
    right: -26.96,
    top: 30.94,
    bottom: 12.81,

    backgroundColor: "#000000",
    transform: "rotate(45deg)"
  }
});

export default styles;
