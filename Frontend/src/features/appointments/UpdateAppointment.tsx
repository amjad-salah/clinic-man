// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useAppDispatch } from "../../app/hooks.ts";
// import Select from "react-select";
// import {
//   useUpdateAppointmentMutation,
//   useGetAppointmentByIdQuery,
// } from "./appointmentsApiSlice.ts";
// import { useGetPatientsQuery } from "../patients/patientsApiSlice.ts";
// import { useGetAllDoctorsQuery } from "../doctors/doctorApiSlice.ts";
// import { clearCredentials } from "../users/authSlice.ts";
// import { toast } from "react-toastify";
// import { IoMdReturnRight } from "react-icons/io";
// import { AppointmentStatus, SelectOptions } from "../../Types/Appointments.ts";
// import moment from "moment";
//
// const UpdateAppointment = () => {
//   const { id } = useParams();
//
//   const [doctorId, setDoctorId] = useState("");
//   const [patientId, setPatientId] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [status, setStatus] = useState("");
//
//   const { data, isSuccess, isLoading, error, isError } =
//     useGetAppointmentByIdQuery(parseInt(id!));
//
//   const {
//     data: patients,
//     isSuccess: patientsSuccess,
//     error: patientsError,
//   } = useGetPatientsQuery();
//   const {
//     data: doctors,
//     isSuccess: doctorsSuccess,
//     error: doctorsError,
//   } = useGetAllDoctorsQuery();
//
//   const [updateAppointment] = useUpdateAppointmentMutation();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     if (isSuccess) {
//       setDoctorId(data.appointment!.doctorId.toString());
//       setPatientId(data.appointment!.patientId.toString());
//       setDate(data.appointment!.date);
//       setTime(data.appointment!.time);
//       setReason(data.appointment!.reason!);
//       setStatus(data.appointment!.status.toString());
//     }
//
//     if (
//       patientsError &&
//       (patientsError.status === 401 || patientsError.status === 403)
//     ) {
//       dispatch(clearCredentials());
//       navigate("/login");
//     }
//
//     // @ts-ignore
//     if (
//       doctorsError &&
//       (doctorsError.status === 401 || doctorsError.status === 403)
//     ) {
//       dispatch(clearCredentials());
//       navigate("/login");
//     }
//   }, [patientsError, doctorsError, navigate, dispatch, isSuccess, data]);
//
//   const handleUpdateAppointment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await updateAppointment({
//         id: parseInt(id!),
//         doctorId: parseInt(doctorId),
//         patientId: parseInt(patientId),
//         date: moment(date).format("YYYY-MM-DD"),
//         time: moment(time, "HH:mm").format("HH:mm:ss"),
//         reason,
//         status: parseInt(status),
//       }).unwrap();
//
//       toast.success("تم تحديث الموعد بنجاح");
//       navigate("/appointments");
//     } catch (e) {
//       console.log(e);
//       // @ts-ignore
//       toast.error(e.data.error);
//     }
//   };
//
//   let doctorsOptions: SelectOptions[] = [];
//   let patientsOptions: SelectOptions[] = [];
//
//   if (doctorsSuccess) {
//     doctorsOptions = doctors!.doctors!.map((doctor) => ({
//       value: doctor.id.toString(),
//       label: doctor.user.fullName,
//     }));
//   }
//
//   if (patientsSuccess) {
//     patientsOptions = patients!.patients!.map((patient) => ({
//       value: patient.id.toString(),
//       label: patient.fullName,
//     }));
//   }
//
//   return (
//     <>
//       <Link to="/appointments" className="btn btn-dark mb-5">
//         <IoMdReturnRight />
//       </Link>
//       <div className="row align-items-center justify-content-center">
//         <div className="col-md-8">
//           <div className="card card-body shadow">
//             <h4 className="mb-2">تعديل موعد</h4>
//             <hr className="mb-3" />
//             <form onSubmit={handleUpdateAppointment}>
//               <div className="mb-3">
//                 <label htmlFor="userId" className="form-label">
//                   المريض
//                 </label>
//                 <Select
//                   options={patientsOptions}
//                   onChange={(e) => setPatientId(e!.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="userId" className="form-label">
//                   الطبيب
//                 </label>
//                 <Select
//                   options={doctorsOptions}
//                   onChange={(e) => setDoctorId(e!.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="date" className="form-label">
//                   التاريخ
//                 </label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   id="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="time" className="form-label">
//                   الزمن
//                 </label>
//                 <input
//                   type="time"
//                   id="time"
//                   value={time}
//                   className="form-control"
//                   onChange={(e) => setTime(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="reason" className="form-label">
//                   السبب
//                 </label>
//                 <input
//                   type="text"
//                   id="reason"
//                   value={reason}
//                   className="form-control"
//                   onChange={(e) => setReason(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="status">حالة الموعد</label>
//                 <select
//                   value={status}
//                   id="status"
//                   className="form-select"
//                   onChange={(e) => setStatus(e.target.value)}
//                 >
//                   <option value="" disabled selected>
//                     اختر الحالة
//                   </option>
//                   {(
//                     Object.keys(AppointmentStatus) as Array<
//                       keyof typeof AppointmentStatus
//                     >
//                   ).map((key) => (
//                     <option key={key} value={key}>
//                       {AppointmentStatus[key]}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <button type="submit" className="btn btn-primary">
//                   حفظ
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
//
// export default UpdateAppointment;
