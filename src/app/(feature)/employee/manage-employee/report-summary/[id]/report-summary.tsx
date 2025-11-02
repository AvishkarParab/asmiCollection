"use client";

import React from "react";
import {
  Page,
  PDFViewer,
  View,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { IEmployeeReportDetails } from "@/types";

interface EmployeeReportSummaryProps {
  employee: IEmployeeReportDetails;
}

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "80vh",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  header: {
    marginBottom: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  // Table Layout
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    padding: 6,
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    fontSize: 12,
    padding: 6,
  },
});

export default function EmployeeReportSummaryComponent({
  employee,
}: EmployeeReportSummaryProps) {
  if (!employee) {
    return <p className="text-center mt-10">Employee not found.</p>;
  }

  // PDF Document component
  // const EmployeeReportDocument = () => (
  //   <Document>
  //     <Page size="A4" style={styles.page}>
  //       {/* HEADER */}
  //       <View style={styles.header}>
  //         <Text style={styles.title}>Employee Report Summary</Text>
  //       </View>

  //       {/* BASIC INFO */}
  //       <View style={styles.section}>
  //         <Text style={styles.label}>Name:</Text>
  //         <Text style={styles.text}>{employee.name}</Text>

  //         <Text style={styles.label}>Email:</Text>
  //         <Text style={styles.text}>{employee.email}</Text>

  //         <Text style={styles.label}>Age:</Text>
  //         <Text style={styles.text}>{employee.age}</Text>
  //       </View>

  //       {/* REFERRAL INFO */}
  //       <View style={styles.section}>
  //         <Text style={styles.title}>Referral Details</Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Referred From: </Text>
  //           {employee.referredFrom || "N/A"}
  //         </Text>
  //         <Text style={styles.text}>
  //           <Text style={styles.label}>Referral Code: </Text>
  //           {employee.referralCode || "N/A"}
  //         </Text>
  //       </View>

  //       {/* COMMISSION STATUS */}
  //       <View style={styles.section}>
  //         <Text style={styles.title}>Commission Paid</Text>
  //         <Text style={styles.text}>
  //           {employee.isCommissionPaid === "Yes"
  //             ? "Commission has been paid."
  //             : "Commission pending."}
  //         </Text>
  //       </View>
  //     </Page>
  //   </Document>
  // );

  const EmployeeReportDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Asmi Collection Report Summary</Text>
        </View>

        {/* BASIC INFO TABLE */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Name</Text>
            <Text style={styles.tableCol}>{employee.name}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Email</Text>
            <Text style={styles.tableCol}>{employee.email}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Age</Text>
            <Text style={styles.tableCol}>{employee.age}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Referred From</Text>
            <Text style={styles.tableCol}>
              {employee.referredFrom?.name || "N/A"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Referral Code</Text>
            <Text style={styles.tableCol}>
              {employee.referralCode || "N/A"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Commission Status</Text>
            <Text style={styles.tableCol}>
              {employee.isCommissionPaid === "yes" ? "Paid" : "Pending"}
            </Text>
          </View>

          {employee.refereeSummary?.map((refereeSum, index) => {
            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{refereeSum.level}</Text>
                <Text style={styles.tableCol}>{refereeSum.names}</Text>
              </View>
            );
          })}

          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Total Commission</Text>
            <Text style={styles.tableCol}>Rs. {employee.totalCommission}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col w-full h-full p-4">
      <PDFViewer style={styles.viewer}>
        <EmployeeReportDocument />
      </PDFViewer>
    </div>
  );
}
