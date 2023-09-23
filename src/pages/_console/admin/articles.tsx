import React from "react";
import DashboardLayout from "~/client/layouts/DashboardLayout";
import AdminArticlesTemplate from "~/client/templates/admin-articles-template/AdminArticlesTemplate";

export default function admin() {
  return (
    <DashboardLayout title="Articles">
      <AdminArticlesTemplate />
    </DashboardLayout>
  );
}
