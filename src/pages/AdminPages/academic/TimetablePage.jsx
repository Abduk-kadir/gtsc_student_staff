import CommonSendDataStudent from "../../../components/child/academic/CommonSendDataStudent"
import { useState } from "react"
import TimetableReportPage from "./TimetableReportPage"
import { Icon } from "@iconify/react/dist/iconify.js"
import "../../../assets/css/staffdasoard.css"

const TimetablePage = () => {
  const [isShowView, setIsShowView] = useState(false)

  const handleView = (flag) => {
    if (flag === true) {
      setIsShowView(true)
    }
    if (flag === false) {
      setIsShowView(false)
    }
  }

  return (
    <section className="staff-dashboard staff-dashboard-page">
      <h3 className="sd-section-title">TimeTable</h3>

      <div className="sd-mode-grid" role="group" aria-label="Timetable mode">
        <button
          type="button"
          className={`sd-mode-btn sd-mode-btn--view ${isShowView ? "sd-mode-btn--active" : ""}`}
          onClick={() => handleView(true)}
        >
          <span className="sd-mode-btn__icon sd-mode-btn__icon--sky">
            <Icon icon="solar:eye-bold-duotone" aria-hidden />
          </span>
          <span className="sd-mode-btn__body">
            <span className="sd-mode-btn__label">View</span>
            <span className="sd-mode-btn__hint">See timetable report</span>
          </span>
        </button>

        <button
          type="button"
          className={`sd-mode-btn sd-mode-btn--take ${!isShowView ? "sd-mode-btn--active" : ""}`}
          onClick={() => handleView(false)}
        >
          <span className="sd-mode-btn__icon sd-mode-btn__icon--emerald">
            <Icon icon="solar:calendar-mark-bold-duotone" aria-hidden />
          </span>
          <span className="sd-mode-btn__body">
            <span className="sd-mode-btn__label">Take</span>
            <span className="sd-mode-btn__hint">Send timetable</span>
          </span>
        </button>
      </div>

      <div className="staff-dashboard-page__content">
        {isShowView ? (
          <TimetableReportPage />
        ) : (
          <CommonSendDataStudent formType="timetable" />
        )}
      </div>
    </section>
  )
}

export default TimetablePage
