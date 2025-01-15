import { useGetAppointmentByIdQuery } from "../appointmentsApiSlice.ts";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { Link, useParams } from "react-router-dom";
import cairo from "../../../fonts/Cairo-Regular.ttf";
import { styles } from "./styles.ts";
import { IoMdReturnRight } from "react-icons/io";
import cairoBold from "../../../fonts/Cairo-Bold.ttf";

Font.register({
  family: "Cairo",
  fonts: [
    {
      src: cairo,
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      src: cairoBold,
      fontStyle: "normal",
      fontWeight: "bold",
    },
  ],
});

const PrintPrescriptions = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetAppointmentByIdQuery(Number(id!));

  return (
    <>
      <Link to={`/appointments/${id}`} className="btn btn-dark mb-5">
        <IoMdReturnRight />
      </Link>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A5" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>العيادة</Text>
              <Text style={styles.title}>العنوان</Text>
              <Text style={styles.title}>معلومات الإتصال</Text>
            </View>
            <View style={styles.info}>
              <Text>{`Patient: ${data?.appointment!.patient?.fullName}`}</Text>
            </View>
            {isSuccess ? (
              <View style={styles.content}>
                {data?.appointment!.prescriptions!.map((item) => (
                  <Text
                    key={item.id}
                  >{`- ${item.medicationName}- ${item.dosage}- ${item.frequency}`}</Text>
                ))}
              </View>
            ) : (
              <View></View>
            )}
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PrintPrescriptions;
