"use client";

import { transformGridQuery } from "@/lib/request";
import React from "react";
import { contactFormColumns } from "@/constants/columns";
import ContactDrawer from "../ContactDrawer";
import { getAllContacts } from "@/app/actions/contact";
import Overview from "../common/Overview";

const ContactPageWrapper = () => {
  const getContacts = async (params) => {
    try {
      const query = transformGridQuery({ ...params });

      const { data } = await getAllContacts(query)

      return {
        items: data.contacts,
        rowCount: data.total,
      };
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return {
        items: [],
        rowCount: 0,
      };
    }
  };

  return (
    <div>
      <Overview
        title="مدیریت فرم های تماس"
        breadcrumbs={[
          { name: "کلینیک یو پی اس" },
          { name: "داشبورد", path: "/dashboard" },
          { name: "فرم های تماس" },
        ]}
        columns={contactFormColumns}
        getMany={getContacts}
        rowActions={["details"]}
        formMode="drawer"
        FormComponent={ContactDrawer}
      />
    </div>
  );
};

export default ContactPageWrapper;
