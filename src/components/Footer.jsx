import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Footer = () => (
  <footer className="w-full">
    {/* Blue bar at the top */}
    <div className="md:w-full h-2 bg-[#1761ac] " />
    <div className="bg-[#142938] w-full py-6 md:px-4 px-14">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-evenly gap-6">
        {/* Email Section */}
        <div className="flex items-center">
          <div
            className="flex items-center bg-[#CB3525] border border-white rounded-r-full rounded-l-full"
            style={{
              maxWidth: "357px",
              maxHeight: "73px",
              border: "2px solid #fff",
              background: "#CB3525",
              paddingLeft: "0px",
              paddingRight: "32px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Icon circle */}
            <span
              className="flex items-center justify-center"
              style={{
                width: "73px",
                height: "73px",
                minWidth: "73px",
                minHeight: "73px",
                background: "#CB3525",
                borderRadius: "50%",
                border: "2px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "18px",
                marginLeft: "0px",
                position: "relative",
              }}
            >
              {/* Mail SVG, bold, centered */}
              <svg
                width="44"
                height="36"
                viewBox="0 0 44 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: "block",
                }}
              >
                <rect width="44" height="36" rx="0" fill="none" />
                <path
                  d="M4 8C4 5.79086 5.79086 4 8 4H36C38.2091 4 40 5.79086 40 8V28C40 30.2091 38.2091 32 36 32H8C5.79086 32 4 30.2091 4 28V8Z"
                  fill="white"
                />
                <path
                  d="M4 8L22 20L40 8"
                  stroke="#CB3525"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {/* Text */}
            <div className="flex flex-col justify-center text-white" style={{lineHeight: 1.1}}>
              <span
                className="opacity-80  leading-tight"
                style={{ fontWeight: 400, marginBottom: "0.1em" }}
              >
                Please email us at:
              </span>
              <span
                className="font-semibold leading-tight"
                style={{ marginTop: "0.1em" }}
              >
                info@CBSICareresource.org
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-white text-center text-sm opacity-90">
          © Copyrights 2025 CFPIC.In All Rights Reserved.
        </div>

        {/* Socials */}
        <div className="flex items-center md:gap-8 gap-4">
          <div className="flex flex-col items-center">
            {/* Facebook SVG */}
            <span className="mb-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6502 6.99998C13.6502 3.31998 10.667 0.333317 6.9912 0.333317C3.31544 0.333317 0.332214 3.31998 0.332214 6.99998C0.332214 10.2266 2.62291 12.9133 5.6594 13.5333V8.99998H4.32761V6.99998H5.6594V5.33332C5.6594 4.04665 6.70487 2.99998 7.99005 2.99998H9.6548V4.99998H8.323C7.95676 4.99998 7.6571 5.29998 7.6571 5.66665V6.99998H9.6548V8.99998H7.6571V13.6333C11.0199 13.3 13.6502 10.46 13.6502 6.99998Z" fill="white"/>
              </svg>
            </span>
            <span className="text-white text-sm">FACEBOOK</span>
          </div>                                                          
          <div className="flex flex-col items-center">
            {/* Instagram SVG */}
            <span className="mb-1">
              <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.23867 6.99998C8.23867 7.39555 8.1215 7.78223 7.90199 8.11112C7.68248 8.44002 7.37049 8.69637 7.00545 8.84774C6.64042 8.99912 6.23875 9.03873 5.85124 8.96155C5.46372 8.88438 5.10777 8.6939 4.82838 8.4142C4.549 8.13449 4.35874 7.77813 4.28166 7.39016C4.20458 7.0022 4.24414 6.60007 4.39534 6.23462C4.54654 5.86916 4.80259 5.55681 5.13111 5.33705C5.45963 5.11728 5.84586 4.99998 6.24097 4.99998C6.77028 5.00163 7.27745 5.21288 7.65173 5.58759C8.02602 5.96231 8.23702 6.47006 8.23867 6.99998ZM12.4838 4.24998V9.74998C12.4838 10.6782 12.1154 11.5685 11.4598 12.2249C10.8042 12.8812 9.91499 13.25 8.9878 13.25H3.49414C2.56695 13.25 1.67774 12.8812 1.02211 12.2249C0.366493 11.5685 -0.00183105 10.6782 -0.00183105 9.74998V4.24998C-0.00183105 3.32173 0.366493 2.43149 1.02211 1.77511C1.67774 1.11873 2.56695 0.749985 3.49414 0.749985H8.9878C9.91499 0.749985 10.8042 1.11873 11.4598 1.77511C12.1154 2.43149 12.4838 3.32173 12.4838 4.24998ZM9.23751 6.99998C9.23751 6.40664 9.06177 5.82662 8.7325 5.33327C8.40324 4.83993 7.93524 4.45541 7.3877 4.22835C6.84015 4.00128 6.23765 3.94187 5.65637 4.05763C5.0751 4.17338 4.54117 4.45911 4.12209 4.87866C3.70302 5.29822 3.41763 5.83277 3.302 6.41471C3.18638 6.99666 3.24572 7.59986 3.47252 8.14803C3.69932 8.69621 4.0834 9.16475 4.57618 9.49439C5.06896 9.82404 5.64831 9.99998 6.24097 9.99998C7.0357 9.99998 7.79788 9.68391 8.35985 9.1213C8.92181 8.5587 9.23751 7.79563 9.23751 6.99998ZM10.2364 3.74998C10.2364 3.60165 10.1924 3.45664 10.1101 3.33331C10.0278 3.20997 9.91079 3.11384 9.77391 3.05707C9.63702 3.00031 9.48639 2.98546 9.34108 3.0144C9.19576 3.04333 9.06227 3.11476 8.95751 3.21965C8.85274 3.32454 8.78139 3.45818 8.75248 3.60367C8.72358 3.74915 8.73841 3.89995 8.79511 4.037C8.85181 4.17404 8.94783 4.29118 9.07103 4.37359C9.19422 4.456 9.33906 4.49998 9.48723 4.49998C9.68591 4.49998 9.87645 4.42097 10.0169 4.28031C10.1574 4.13966 10.2364 3.9489 10.2364 3.74998Z" fill="white"/>
              </svg>
            </span>
            <span className="text-white text-sm">INSTAGRAM</span>
          </div>
          <div className="flex flex-col items-center">
            {/* X (Twitter) SVG */}
            <span className="mb-1">
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7657 0H13.9099L9.22529 5.08367L14.7367 12H10.4215L7.04206 7.80473L3.17435 12H1.02899L6.03988 6.5623L0.752808 0.0005532H5.17754L8.23243 3.83515L11.7657 0ZM11.0135 10.7819H12.2015L4.53195 1.15447H3.25709L11.0135 10.7819Z" fill="white"/>
              </svg>
            </span>
            <span className="text-white text-sm">TWITTER</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;