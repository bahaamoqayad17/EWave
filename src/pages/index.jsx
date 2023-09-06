import SiteLayout from "@/components/site/SiteLayout";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1>Main Page</h1>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <SiteLayout>{page}</SiteLayout>;
