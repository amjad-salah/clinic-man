import { useGetBillingByIdQuery } from "../../billings/billingsApiSlice.ts";
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
import cairoBold from "../../../fonts/Cairo-Bold.ttf";
import { styles } from "./styles.ts";
// @ts-ignore
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { IoMdReturnRight } from "react-icons/io";
import moment from "moment";

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

const PrintBill = () => {
  const { billId } = useParams();
  const { data, isSuccess } = useGetBillingByIdQuery(Number(billId!));

  return (
    <>
      <Link
        to={`/appointments/${data?.billing!.appointment?.id}`}
        className="btn btn-dark mb-5"
      >
        <IoMdReturnRight />
      </Link>
      {isSuccess && (
        <PDFViewer width="100%" height="100%">
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.header}>
                <Text style={styles.title}>العيادة</Text>
                <Text style={styles.title}>العنوان</Text>
                <Text style={styles.title}>معلومات الإتصال</Text>
              </View>
              <View style={styles.info}>
                <Text>{`No: ${data?.billing!.id}`}</Text>
                <Text>{`To: ${data?.billing!.patient?.fullName}`}</Text>
                <Text>{`Date: ${moment(data?.billing!.date).format("YYYY/MM/DD")}`}</Text>
              </View>
              <Table style={{ padding: 20 }}>
                <TH style={styles.tableHead}>
                  <TD style={styles.td}>Item</TD>
                  <TD style={styles.td}>Unit Price</TD>
                  <TD style={styles.td}>Quantity</TD>
                  <TD style={styles.td}>Amount</TD>
                </TH>
                {data?.billing!.billItems!.map((item) => (
                  <TR key={item.id}>
                    <TD style={styles.td}>{item.description}</TD>
                    <TD style={styles.td}>{item.unitPrice.toLocaleString()}</TD>
                    <TD style={styles.td}>{item.quantity}</TD>
                    <TD style={styles.td}>{item.total.toLocaleString()}</TD>
                  </TR>
                ))}
              </Table>
              <View
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginTop: 10,
                  padding: "8px 40px",
                }}
              >
                <View style={{ minWidth: 100 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>Subtotal:</Text>
                    <Text>{data?.billing!.subTotal.toLocaleString()}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text>{`Tax(${data?.billing!.tax}%):`}</Text>
                    <Text>
                      {(
                        (data?.billing!.subTotal! * data?.billing!.tax!) /
                        100
                      ).toLocaleString()}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Total</Text>
                    <Text style={{ fontWeight: "bold" }}>
                      {data?.billing!.total.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default PrintBill;
