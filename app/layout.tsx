import { FC } from "react";
import "./app.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const RootLayout: FC = ({ children }) => {
  return (
    <>
      <html>
        <head></head>
        <body>
          <ToastContainer />
          <div className="">
            <div className="min-h-screen">{children}</div>
          </div>
        </body>
      </html>
    </>
  );
};
export default RootLayout;