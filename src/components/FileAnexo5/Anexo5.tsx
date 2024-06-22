import { useEffect, useState } from "react";
import { Page, Document, StyleSheet, View, Text, Font } from "@react-pdf/renderer";
import { ActivityType } from "../Activities/activityType";
import Header from "../File/Header";
import { request } from "../Activities/activity.hooks";

Font.register({
  family: "Times New Roman",
  src: "/src/assets/times_new_roman.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

const styles = StyleSheet.create({
  section: {
    marginBottom: 10,
    fontFamily: "Times New Roman",
  },
  tutor: {
    fontSize: 10,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Times New Roman",
  },
  subtitle: {
    textTransform: "uppercase",
    fontSize: 10,
    marginBottom: 10,
    marginLeft: 15,
    fontFamily: "Times New Roman",
  },
  table: {
    flexDirection: "column",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 50,
    fontFamily: "Times New Roman",
  },
  tableRow: {
    flexDirection: "row",
    fontFamily: "Times New Roman",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    fontFamily: "Times New Roman",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textTransform: "uppercase",
    fontFamily: "Times New Roman",
  },
  activityList: {
    marginLeft: 10,
    fontFamily: "Times New Roman",
  },
  activityItem: {
    fontSize: 10,
    margin: 5,
    textTransform: "uppercase",
    fontFamily: "Times New Roman",
  },
  teacherName: {
    textAlign: "center",
    fontSize: 10,
    textTransform: "uppercase",
    fontFamily: "Times New Roman",
  },
  signatureLine: {
    marginHorizontal: 150,
    marginTop: 30,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontFamily: "Times New Roman",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 15,
    right: 15,
    fontSize: 5,
    textAlign: "left",
    borderTopWidth: 1,
    borderTopColor: "#8B0000",
    paddingTop: 5,
    fontFamily: "Times New Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 10,
    right: 15,
    fontFamily: "Times New Roman",
  },
});

const Anexo5 = ({ student,idReport }) => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const getActivities = async () => {
      const data = await request(idReport);
      setActivities(data);
      console.log("Estas actividades : "+data)
    };
    getActivities();
  },[idReport]);

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      setCurrentDate(`${year}-${month}-${day}`);
    };

    getCurrentDate();
  }, []);

  return (
    <Document>
      <Page size="A4">
        <Header
          student={student}
          tipo={"INFORME MENSUAL DEL AVANCE DEL TRABAJO DE TITULACIÓN"}
          numero={"5"}
        />
        <View style={styles.section}>
          <Text style={styles.subtitle}>{`FECHA: ${currentDate}`}</Text>
          <Text style={styles.subtitle}>
            {"NOMBRE DEL ESTUDIANTE: " + student.name}
          </Text>
          <Text style={styles.subtitle}>
            {"MODALIDAD DE TITULACIÓN: TESIS"}
          </Text>
          <Text style={styles.subtitle}>
            {"TEMA DEL TRABAJO DE TITULACIÓN: " + student.issue}
          </Text>
          <Text style={styles.subtitle}>
            {"FECHA DE APROBACIÓN DE LA PROPUESTA EN CONSEJO DIRECTIVO: " +
              student.approvalDate}
          </Text>
          <Text style={styles.subtitle}>
            {"PORCENTAJE FINAL DE AVANCE DE ACUERDO AL CRONOGRAMA: " +
              student.percentage +
              "%"}
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>FECHA</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ACTIVIDAD</Text>
              </View>
            </View>
            {activities.map((activity) => (
              <View style={styles.tableRow} key={activity.idActivity}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{activity.dateActivity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{activity.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.signatureLine}></View>
          <Text
            style={[styles.teacherName]}
          >{`Ing. ${student.nameTeacher}`}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Anexo5;
