import React, { useState } from "react";

// Partner badge color mapping (cycling through 3 colors to avoid repetition)
const partnerColorCycle = [
  "bg-[#8185E7] text-white",
  "bg-[#FF5B5B] text-white", 
  "bg-[#40B5E3] text-white"
];

// Function to get color based on index to ensure no repeated colors in the same row
const getPartnerColor = (index) => {
  return partnerColorCycle[index % partnerColorCycle.length];
};

const partnerFullNames = {
  TAH: "Tribally Approved Home (TAH)",
  RFA: "Resource Family Approval (RFA)",
  CWS: "Child Welfare Services (CWS)",
  MHP: "Mental Health Plan (MHP)",
  ASAM: "American Society of Addiction Medicine (ASAM)",
};

const INITIAL_ROWS = 5;
const LOAD_MORE_COUNT = 5;

const ResourceListing = ({ services = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);

  React.useEffect(() => { 
    if (selectedIdx >= services.length) {
      setSelectedIdx(0);
    }
  }, [services, selectedIdx]);

  // Print all results function
  const printAllResults = () => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resource Listing - All Results</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            color: #333;
          }
          h1 { 
            color: #015AB8; 
            margin-bottom: 10px;
          }
          .header-info {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #015AB8;
          }
          .resource-item {
            margin-bottom: 30px;
            padding-bottom: 30px;
            border-bottom: 1px solid #ddd;
            page-break-inside: avoid;
          }
          .resource-item:last-child {
            border-bottom: none;
          }
          .service-type {
            color: #015AB8;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .detail-section { 
            margin: 15px 0; 
          }
          .label { 
            font-weight: bold; 
            color: #333;
            margin-bottom: 5px;
          }
          .content {
            margin-left: 20px;
            line-height: 1.6;
          }
          .partner-badge { 
            display: inline-block; 
            padding: 4px 8px; 
            margin: 2px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: bold;
          }
          .partner-blue { background-color: #8185E7; color: white; }
          .partner-red { background-color: #FF5B5B; color: white; }
          .partner-cyan { background-color: #40B5E3; color: white; }
          .page-number {
            text-align: right;
            font-size: 10px;
            color: #666;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header-info">
          <h1>Resource Listing - All Results</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <p><strong>Total Results: ${services.length}</strong></p>
        </div>
        
        ${services.map((service, idx) => `
          <div class="resource-item">
            <div class="service-type">${idx + 1}. ${service.service_type}</div>
            
            <div class="detail-section">
              <p class="label">Description:</p>
              <p class="content">${service.description}</p>
            </div>
            
            <div class="detail-section">
              <p class="label">Eligibility:</p>
              <p class="content">${service.eligibility}</p>
            </div>
            
            <div class="detail-section">
              <p class="label">Partners Involved:</p>
              <p class="content">
                ${(service.partners || []).map((p, i) => 
                  `<span class="partner-badge partner-${i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'red' : 'cyan'}">${partnerFullNames[p] || p}</span>`
                ).join('')}
              </p>
            </div>
            
            <div class="detail-section">
              <p class="label">Associated Direction:</p>
              <p class="content">${Array.isArray(service.direction) ? service.direction.join('<br>') : service.direction}</p>
            </div>
          </div>
        `).join('')}
      </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Print single result function
  const printSingleResult = (service) => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${service.service_type} - Resource Details</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #015AB8; }
          .detail-section { margin: 20px 0; }
          .label { font-weight: bold; color: #333; }
          .partner-badge { 
            display: inline-block; 
            padding: 4px 8px; 
            margin: 2px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: bold;
          }
          .partner-blue { background-color: #8185E7; color: white; }
          .partner-red { background-color: #FF5B5B; color: white; }
          .partner-cyan { background-color: #40B5E3; color: white; }
        </style>
      </head>
      <body>
        <h1>${service.service_type}</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        
        <div class="detail-section">
          <p class="label">Description:</p>
          <p>${service.description}</p>
        </div>
        
        <div class="detail-section">
          <p class="label">Eligibility:</p>
          <p>${service.eligibility}</p>
        </div>
        
        <div class="detail-section">
          <p class="label">Partners Involved:</p>
          <p>
            ${(service.partners || []).map((p, i) => 
              `<span class="partner-badge partner-${i % 3 === 0 ? 'blue' : i % 3 === 1 ? 'red' : 'cyan'}">${partnerFullNames[p] || p}</span>`
            ).join('')}
          </p>
        </div>
        
        <div class="detail-section">
          <p class="label">Associated Direction:</p>
          <p>${Array.isArray(service.direction) ? service.direction.join('<br>') : service.direction}</p>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div
      className="flex flex-col flex-1 bg-white rounded-xl border border-[#bfc6ea] p-0  scroll w-full"
      style={{
        // Remove fixed height and scrolling for natural expansion
        // height: "75vh",
        // minHeight: "500px",
        // maxHeight: "80vh",
        // overflowY: "auto"
      }}
    >
      {/* Sticky header with title and print button */}
      <div className="sticky top-0 z-20 bg-white flex items-center justify-between p-4 min-w-full rounded-xl">
        <span
          className="font-semibold"
          style={{
            color: "#015AB8",
            fontFamily: "'Open Sans', sans-serif"
          }}
        >
          Resource Listing
        </span>
        <button
          className="flex items-center rounded-lg px-4 py-2 text-sm font-normal uppercase transition cursor-pointer hover:opacity-90"
          style={{ background: "#CB3525", color: "#fff" }}
          onClick={printAllResults}
        >
          PRINT RESULTS
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
            <path d="M11.6667 3.89799V1.14799H4.33335V3.89799H3.41668V0.231323H12.5833V3.89799H11.6667ZM13.1471 7.10632C13.4068 7.10632 13.6247 7.01832 13.8007 6.84232C13.9767 6.66632 14.0644 6.44877 14.0638 6.18966C14.0632 5.93055 13.9755 5.71268 13.8007 5.53607C13.6259 5.35946 13.408 5.27146 13.1471 5.27207C12.8862 5.27268 12.6686 5.36068 12.4944 5.53607C12.3203 5.71146 12.2323 5.92932 12.2304 6.18966C12.2286 6.44999 12.3166 6.66755 12.4944 6.84232C12.6723 7.0171 12.8892 7.1051 13.1471 7.10632ZM11.6667 13.4167V9.25682H4.33335V13.4167H11.6667ZM12.5833 14.3333H3.41668V10.6667H0.278931V3.89799H15.7211V10.6667H12.5833V14.3333ZM14.8044 9.74999V4.81466H1.1956V9.74999H3.41668V8.34016H12.5833V9.74999H14.8044Z" fill="#fff"/>
          </svg>
        </button>
      </div>
      {/* Table */}
      <div className="w-full overflow-x-auto" style={{ minHeight: "300px" }}>
        <table
          className="w-full  min-w-full  text-sm border-separate table-fixed scroll"
          style={{
            borderSpacing: "0 4px",
            
            width: "auto",
          }}
        >
          <colgroup>
            <col style={{ width: "16%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead
            className="sticky  z-10"
            style={{
              background: "#0561c9",
              // width: "1136px", // <-- REMOVE THIS LINE
              height: "66px",
              minHeight: "66px",
              maxHeight: "66px",
            }}
          >
            <tr className="bg-[#0561c9]">
              <th
                className="text-white font-semibold py-2 px-2 text-left"
                style={{
                  height: "66px",
                  minHeight: "66px",
                  maxHeight: "66px",
                }}
              >
                Service Type
              </th>
              <th className="text-white font-semibold py-2 px-2 text-left"
                style={{
                  height: "66px",
                  minHeight: "66px",
                  maxHeight: "66px",
                }}
              >
                Description Of Service
              </th>
              <th className="text-white font-semibold py-2 px-2 text-left"
                style={{
                  height: "66px",
                  minHeight: "66px",
                  maxHeight: "66px",
                }}
              >
                Eligibility
              </th>
              <th className="text-white font-semibold py-2 px-2 text-left"
                style={{
                  height: "66px",
                  minHeight: "66px",
                  maxHeight: "66px",
                }}
              >
                Partners Involved
              </th>
              <th className="text-white font-semibold py-2 px-2 text-left"
                style={{
                  height: "66px",
                  minHeight: "66px",
                  maxHeight: "66px",
                }}
              >
                Associated Direction
              </th>
              <th className="text-white font-semibold py-2 px-2 text-left"
                style={{
                  height: "66px",
                  minHeight: "66px",
                  maxHeight: "66px",
                }}
              >
                {/* Empty header for actions */}
              </th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400" style={{ 
                  height: "200px", 
                  minWidth: "700px", 
                  width: "100%"
                }}>
                  No resources found.
                </td>
              </tr>
            ) : (
              services.slice(0, visibleRows).map((res, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <tr
                    key={res.id || idx}
                    className={[
                      "cursor-pointer",
                      "align-top",
                      "transition-colors",
                      "rounded-xl",
                      "overflow-hidden",
                      "resource-row",
                      "hover:opacity-95",
                      isSelected
                        ? "bg-[#fff8ee] border-l-4 border-[#ffb84d]"
                        : "bg-[#f6f8fc]",
                    ].join(" ")}
                    style={{
                      borderBottom: "8px solid #fff",
                    }}
                    onClick={() => setSelectedIdx(idx)}
                  >
                    <td
  className={`py-3 px-2 align-top font-semibold ${isSelected ? "text-[#d14b3a]" : "text-[#1B4AA4]"}`}
  style={{
    fontFamily: "Roboto, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "124%",
    letterSpacing: "1%",
  }}
>
  {res.service_type}
</td>
                    <td className="py-3 px-2 align-top text-[#222]" style={{ position: "relative", overflow: "visible" }}>
                      <div
                        style={{
                          wordBreak: "break-word",
                          maxWidth: "100%",
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "124%",
                          letterSpacing: "1%",
                        }}
                      >
                        {isSelected
                          ? (
                            <>
                              
                              {/* Expanded details only in Description column */}
                              <div
                                className="rounded transition-all duration-300 text-sm text-[#222]"
                                style={{
                                  width: "100%",
                                  maxWidth: "100%",
                                  wordBreak: "break-word",
                                  overflowWrap: "break-word",
                                  overflow: "hidden",
                                }}
                              >
                                {res.description}
                              </div>
                            </>
                          )
                          : res.shortDescription
                            ?? (typeof res.description === "string"
                              ? res.description.length > 120
                                ? res.description.slice(0, 120) + "..."
                                : res.description
                              : "")}
                      </div>
                    </td>
                    <td
  className="py-3 px-2 align-top text-[#222]"
  style={{
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "124%",
    letterSpacing: "1%",
  }}
>
  {isSelected
    ? res.eligibility
    : res.shortEligibility
      ?? (typeof res.eligibility === "string"
        ? res.eligibility.length > 80
          ? res.eligibility.slice(0, 80) + "..."
          : res.eligibility
        : "")}
</td>
                    <td className="py-3 px-2 align-top" 
    style={{
      fontFamily: "Roboto, sans-serif",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "124%",
      letterSpacing: "1%",
    }}
>
  <div className="flex flex-wrap gap-2">
    {(res.partners || []).map((p, i) => (
      <span
        key={p + i}
        className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${getPartnerColor(i)}`}
      >
        {partnerFullNames[p] || p}
      </span>
    ))}
  </div>
</td>
                    <td className="py-3 px-2 align-top text-black">
                      {Array.isArray(res.direction)
                        ? res.direction.map((d, i) => <div key={i}>{d}</div>)
                        : res.direction}
                    </td>
                    {/* Action buttons column */}
                    <td className="py-3 px-2 align-top">
                      <div
                        className="flex flex-col gap-2"
                        style={{
                          alignItems: "flex-end",
                          maxWidth: "100%",
                          overflow: "hidden",
                          wordBreak: "break-word",
                        }}
                      >
                        {/* Add/Remove Button */}
                        {isSelected ? (
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center bg-[#faa9a0] rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            title="Remove"
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedIdx(null);
                            }}
                            style={{ boxShadow: "none", border: "none" }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                              <rect x="4" y="4" width="24" height="24" rx="8" fill="#faa9a0"/>
                              {/* Removed inner white border, made center line thinner and longer */}
                              <rect x="10" y="15" width="12" height="2" rx="1" fill="white"/>
                            </svg>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center bg-[#eaf8fe] rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            title="Add"
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedIdx(idx);
                            }}
                            style={{ boxShadow: "none", border: "none" }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#0561c9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke="currentColor" strokeWidth="2" d="M12 5v14m7-7H5"/>
                            </svg>
                          </button>
                        )}
                        {/* Print Button */}
                        <button
                          type="button"
                          className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                            isSelected ? "bg-[#fff8ee]" : "bg-[#f6f8fc]"
                          }`}
                          title="Print"
                          onClick={e => { 
                            e.stopPropagation(); 
                            printSingleResult(res);
                          }}
                          style={{ boxShadow: "none", border: "none", padding: 0 }}
                        >
                          <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ display: "block", margin: "auto" }}
                          >
                            <path d="M11.6667 3.89799V1.14799H4.33335V3.89799H3.41668V0.231323H12.5833V3.89799H11.6667ZM13.1471 7.10632C13.4068 7.10632 13.6247 7.01832 13.8007 6.84232C13.9767 6.66632 14.0644 6.44877 14.0638 6.18966C14.0632 5.93055 13.9755 5.71268 13.8007 5.53607C13.6259 5.35946 13.408 5.27146 13.1471 5.27207C12.8862 5.27268 12.6686 5.36068 12.4944 5.53607C12.3203 5.71146 12.2323 5.92932 12.2304 6.18966C12.2286 6.44999 12.3166 6.66755 12.4944 6.84232C12.6723 7.0171 12.8892 7.1051 13.1471 7.10632ZM11.6667 13.4167V9.25682H4.33335V13.4167H11.6667ZM12.5833 14.3333H3.41668V10.6667H0.278931V3.89799H15.7211V10.6667H12.5833V14.3333ZM14.8044 9.74999V4.81466H1.1956V9.74999H3.41668V8.34016H12.5833V9.74999H14.8044Z" fill="#4766C3"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Load More Button */}
      {visibleRows < services.length && (
        <div className="flex justify-end py-4 pr-4">
          <button
            className="bg-[#CB3525] text-white rounded-md px-4 py-2 flex items-center gap-2 font-semibold shadow-sm hover:bg-[#b53e2f] transition cursor-pointer"
            style={{
              boxShadow: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
              border: "none",
              fontSize: "14px",
              lineHeight: "20px",
              minWidth: "auto",
              minHeight: "auto",
            }}
            onClick={() => setVisibleRows(v => Math.min(v + LOAD_MORE_COUNT, services.length))}
          >
            Load More
            <span
              className="ml-2 flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.10)",
                borderRadius: "4px",
                border: "1px solid #fff",
                width: "20px",
                height: "20px",
                display: "inline-flex",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <polygon points="6,7 9,12 12,7" fill="#fff" />
              </svg>
            </span>
          </button>
        </div>
      )}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default ResourceListing;