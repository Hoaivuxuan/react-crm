import React, { lazy } from "react";
//
const CrmDashboard = lazy(() =>
  import("../features/crm/pages/CrmDashboard/CrmDashboard")
);
const CrmAccount = lazy(() =>
  import("../features/crm/pages/CrmAccount/CrmAccount")
);
//
const Routes = (props) => [
  { path: "/crm/dashboard", component: <CrmDashboard {...props} /> },
  { path: "/crm/crm/account", component: <CrmAccount {...props} /> },
];
export { Routes };
