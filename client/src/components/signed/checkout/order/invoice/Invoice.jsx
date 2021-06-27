import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 90,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const logoSrc =
  "https://res.cloudinary.com/dzwabkqxt/image/upload/v1624368076/ShoppingNV/instagram_profile_image_j74lto.jpg";

const Invoice = ({ receiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logoSrc} />
      <InvoiceTitle title="Invoice" />
      <BillTo invoice={receiptData} />
      <InvoiceItemsTable invoice={receiptData} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);
export default Invoice;
