import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import Header from "./Header";

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

const Anexo11 = ({ student }) => (
  <Document>
    <Page size="A4">
      <Header
        student={student}
        tipo={"INFORME FINAL DEL AVANCE DEL TRABAJO DE TITULACIÓN"}
        numero={"11"}
      />
    </Page>
  </Document>
);

export default Anexo11;
