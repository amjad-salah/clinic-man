import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useGetAppointmentByIdQuery } from "../appointmentsApiSlice.ts";
import { Document, Page, Text, View, PDFViewer, Font, } from "@react-pdf/renderer";
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
    const { data, isSuccess } = useGetAppointmentByIdQuery(Number(id));
    return (_jsxs(_Fragment, { children: [_jsx(Link, { to: `/appointments/${id}`, className: "btn btn-dark mb-5", children: _jsx(IoMdReturnRight, {}) }), _jsx(PDFViewer, { width: "100%", height: "100%", children: _jsx(Document, { children: _jsxs(Page, { size: "A5", style: styles.page, children: [_jsxs(View, { style: styles.header, children: [_jsx(Text, { style: styles.title, children: "\u0627\u0644\u0639\u064A\u0627\u062F\u0629" }), _jsx(Text, { style: styles.title, children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), _jsx(Text, { style: styles.title, children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u062A\u0635\u0627\u0644" })] }), _jsx(View, { style: styles.info, children: _jsx(Text, { children: `Patient: ${data?.appointment.patient?.fullName}` }) }), isSuccess ? (_jsx(View, { style: styles.content, children: data?.appointment.prescriptions.map((item) => (_jsx(Text, { children: `- ${item.medicationName}- ${item.dosage}- ${item.frequency}` }, item.id))) })) : (_jsx(View, {}))] }) }) })] }));
};
export default PrintPrescriptions;
