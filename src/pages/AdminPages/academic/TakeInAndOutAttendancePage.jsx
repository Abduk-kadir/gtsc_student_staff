import React from 'react'
import TakeAttendance from '../../../components/child/academic/TakeAttendance'
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'
import InAndOutDetailReportPage from './InAndOutDetailReportPage'
import { Icon } from '@iconify/react/dist/iconify.js'
import '../../../assets/css/staffdasoard.css'
const TakeInAndOutAttendancePage = () => {
  const Navigate=useNavigate()
  const [isShowView,setIsShowView]=useState(false)
  const handleView=(flag)=>{
    
    if(flag==true){
      setIsShowView(true)
    }
    if(flag==false){
      setIsShowView(false)
    }
  }
  return (
    <section className="staff-dashboard take-in-out-attendance-page">
      <h3 className="sd-section-title">In / Out Attendance</h3>

      <div className="sd-mode-grid" role="group" aria-label="Attendance mode">
        <button
          type="button"
          className={`sd-mode-btn sd-mode-btn--view ${isShowView ? 'sd-mode-btn--active' : ''}`}
          onClick={()=>handleView(true)}
        >
          <span className="sd-mode-btn__icon sd-mode-btn__icon--sky">
            <Icon icon="solar:eye-bold-duotone" aria-hidden />
          </span>
          <span className="sd-mode-btn__body">
            <span className="sd-mode-btn__label">View</span>
            <span className="sd-mode-btn__hint">See attendance report</span>
          </span>
        </button>

        <button
          type="button"
          className={`sd-mode-btn sd-mode-btn--take ${!isShowView ? 'sd-mode-btn--active' : ''}`}
          onClick={()=>handleView(false)}
        >
          <span className="sd-mode-btn__icon sd-mode-btn__icon--emerald">
            <Icon icon="solar:clipboard-check-bold-duotone" aria-hidden />
          </span>
          <span className="sd-mode-btn__body">
            <span className="sd-mode-btn__label">Take</span>
            <span className="sd-mode-btn__hint">Mark in / out attendance</span>
          </span>
        </button>
      </div>

      <div className="take-in-out-attendance-page__content">
        {isShowView ? <InAndOutDetailReportPage /> : <TakeAttendance />}
      </div>
    </section>
  )
}

export default TakeInAndOutAttendancePage