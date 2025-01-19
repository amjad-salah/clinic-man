import { jsx as _jsx } from "react/jsx-runtime";
const Loader = () => {
    return (_jsx("div", { className: "d-flex justify-content-center align-items-center", children: _jsx("div", { className: "spinner-border", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }) }));
};
export default Loader;
