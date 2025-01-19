import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetBillingByIdQuery } from "../../billings/billingsApiSlice.ts";
import { Document, Page, Text, View, PDFViewer, Font, } from "@react-pdf/renderer";
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
    const { data, isSuccess } = useGetBillingByIdQuery(Number(billId));
    return (_jsxs(_Fragment, { children: [_jsx(Link, { to: `/appointments/${data?.billing.appointment?.id}`, className: "btn btn-dark mb-5", children: _jsx(IoMdReturnRight, {}) }), isSuccess && (_jsx(PDFViewer, { width: "100%", height: "100%", children: _jsx(Document, { children: _jsxs(Page, { size: "A4", style: styles.page, children: [_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: styles.title, children: "\u0627\u0644\u0639\u064A\u0627\u062F\u0629" }), _jsx(Text, { style: styles.title, children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx(Text, { style: styles.title, children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u062A\u0635\u0627\u0644" })] }), _jsxs(View, { style: styles.info, children: [_jsx(Text, { children: `No: ${data?.billing.id}` }), _jsx(Text, { children: `To: ${data?.billing.patient?.fullName}` }), _jsx(Text, { children: `Date: ${moment(data?.billing.date).format("YYYY/MM/DD")}` })] }), _jsxs(Table, { style: { padding: 20 }, children: [_jsxs(TH, { style: styles.tableHead, children: [_jsx(TD, { style: styles.td, children: "Item" }), _jsx(TD, { style: styles.td, children: "Unit Price" }), _jsx(TD, { style: styles.td, children: "Quantity" }), _jsx(TD, { style: styles.td, children: "Amount" })] }), data?.billing.billItems.map((item) => (_jsxs(TR, { children: [_jsx(TD, { style: styles.td, children: item.description }), _jsx(TD, { style: styles.td, children: item.unitPrice.toLocaleString() }), _jsx(TD, { style: styles.td, children: item.quantity }), _jsx(TD, { style: styles.td, children: item.total.toLocaleString() })] }, item.id)))] }), _jsx(View, { style: {
                                    display: "flex",
                                    alignItems: "flex-end",
                                    marginTop: 10,
                                    padding: "8px 40px",
                                }, children: _jsxs(View, { style: { minWidth: 100 }, children: [_jsxs(View, { style: {
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 8,
                                            }, children: [_jsx(Text, { children: "Subtotal:" }), _jsx(Text, { children: data?.billing.subTotal.toLocaleString() })] }), _jsxs(View, { style: {
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 8,
                                            }, children: [_jsx(Text, { children: `Tax(${data?.billing.tax}%):` }), _jsx(Text, { children: ((data?.billing.subTotal * data?.billing.tax) /
                                                        100).toLocaleString() })] }), _jsxs(View, { style: {
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 8,
                                            }, children: [_jsx(Text, { style: { fontWeight: "bold" }, children: "Total" }), _jsx(Text, { style: { fontWeight: "bold" }, children: data?.billing.total.toLocaleString() })] })] }) })] }) }) }))] }));
};
export default PrintBill;
