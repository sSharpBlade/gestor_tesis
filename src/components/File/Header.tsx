import { View, Text, StyleSheet, Image, Font } from "@react-pdf/renderer";
import banner from "../../images/banner.jpeg";

Font.register({
  family: "Times New Roman",
  src: "/src/assets/times_new_roman.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times New Roman",
  },
  section: {
    marginBottom: 20,
    fontFamily: "Times New Roman",
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "Times New Roman",
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    fontFamily: "Times New Roman",
  },
  Anexo: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "Times New Roman",
  },
});

function Header({ student, numero, tipo }) {
  return (
    <View style={styles.section}>
      {/* <Image src={banner}></Image> */}
      <Text style={styles.Anexo}>Anexo {numero}</Text>
      <Text style={styles.title}>{tipo}</Text>
      <Text style={styles.title}>Universidad Técnica de Ambato</Text>
      <Text style={styles.title}>
        Facultad de ingeniería en Sistemas Electronica e Industrial
      </Text>
      <Text style={styles.title}>Carrera de {student.career}</Text>
    </View>
  );
}

export default Header;
