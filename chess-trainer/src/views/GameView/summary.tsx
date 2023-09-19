import React from 'react'

interface SummaryProps {
  summary: string;
}

const SummaryComponent: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <div>
      <p>{summary}</p>
    </div>
  )
}

export default SummaryComponent