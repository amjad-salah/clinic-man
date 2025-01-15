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
// @ts-ignore
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
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

const PrintTests = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGetAppointmentByIdQuery(Number(id!));

  return (
    <>
      <Link to={`/appointments/${id}`} className="btn btn-dark mb-5">
        <IoMdReturnRight />
      </Link>
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>العيادة</Text>
              <Text style={styles.title}>العنوان</Text>
              <Text style={styles.title}>معلومات الإتصال</Text>
            </View>
            <View style={styles.info}>
              <Text>{`Patient: ${data?.appointment!.patient?.fullName}`}</Text>
            </View>
            {isSuccess ? (
              <Table style={{ padding: 20 }}>
                <TH style={styles.tableHead}>
                  <TD style={styles.td}>Test</TD>
                  <TD style={styles.td}>Result</TD>
                  <TD style={styles.td}>Description</TD>
                </TH>
                {data?.appointment!.tests!.map((test) => (
                  <TR key={test.id}>
                    <TD style={styles.td}>{test.testName}</TD>
                    <TD style={styles.td}>{test.result}</TD>
                    <TD style={styles.td}>{test.description}</TD>
                  </TR>
                ))}
              </Table>
            ) : (
              <View></View>
            )}
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PrintTests;
