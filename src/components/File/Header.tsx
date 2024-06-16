import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import banner from "../../images/banner.jpeg";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
});

function Header({ student, numero, tipo }) {
  return (
    <View>
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
