import React from 'react'
import loading from '../styles/loadingSpinners.module.css'

export default function LoadingSpinners() {
  return (
    <div className={loading.spinnerContainer}>
      <div className={loading.loadingSpinner}></div>
    </div>
  )
}
