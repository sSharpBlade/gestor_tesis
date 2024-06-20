import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import banner from "../../images/banner.jpeg";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
});

function Header({ student, numero, tipo }) {
  return (
    <View style={styles.section}>
      <Image src={banner}></Image>
      <Text style={styles.title}>Anexo {numero}</Text>
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
