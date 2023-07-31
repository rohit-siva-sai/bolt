import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";

const LogoIcon = () => {
  return (
    <Link href="/" >
      {/* <Image src={LogoDark} alt={LogoDark} /> */}
      Codeswear Admin
    </Link>
  );
};

export default LogoIcon;
