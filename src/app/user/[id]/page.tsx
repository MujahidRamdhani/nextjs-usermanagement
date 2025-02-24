"use client";
import FormSkeleton from "@/app/fragment/FormSkeleton";
import FormUser from "@/app/fragment/FormUser";
import React, { useEffect, useState } from "react";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return <div className="">{isLoading ? <FormSkeleton /> : <FormUser />}</div>;
};

export default page;
