import React from "react";
import DashboardLayout from "~/client/layouts/DashboardLayout";
import AdminEventsTemplate from "~/client/templates/admin-events-template/AdminEventsTemplate";

export default function AdminEvents() {
  return (
    <DashboardLayout title="Events">
      <AdminEventsTemplate />
    </DashboardLayout>
  );
}
