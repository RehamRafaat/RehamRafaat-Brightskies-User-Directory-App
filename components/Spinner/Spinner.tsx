// Spinner.tsx
import React from "react"
import "./Spinner.css" // Make sure this file contains your original CSS

const Spinner: React.FC = () => {
  return (
    <div className="preload">
      <div className="loader" id="loader2" />
      <div className="loader" id="loader3" />
      <div className="loader" id="loader4" />
      <div className="loader" id="loader5" />
    </div>
  )
}

export default Spinner
