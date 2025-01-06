import {useAddLogMutation} from "./inventoryLogsApiSlice.ts";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { clearCredentials } from "../users/authSlice.ts";

const AddLogModal = () => {
  return <div></div>;
};

export default AddLogModal;
