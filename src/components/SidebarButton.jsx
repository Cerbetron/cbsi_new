import React from 'react'

const SidebarButton = ({ onClick }) => {
  return (
    <button
      className="bg-[#cdd3fd] rounded-lg p-2 shadow-lg flex items-center justify-center"
      style={{ width: 48, height: 48 }}
      onClick={onClick}
      aria-label="Open sidebar"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="8" height="8" rx="2" fill="#2563eb"/>
        <rect x="18" y="6" width="8" height="8" rx="2" fill="#2563eb"/>
        <rect x="6" y="18" width="8" height="8" rx="2" fill="#2563eb"/>
        <rect x="18" y="18" width="8" height="8" rx="2" fill="#2563eb"/>
      </svg>
    </button>
  )
}

export default SidebarButton