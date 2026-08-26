import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../assets/css/staffdasoard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffData } from "../redux/slices/registrationNo";
import baseURL from "../utils/baseUrl";

const DASHBOARD_CARDS = [
  {
    slug: "my-attendance",
    label: "My Attendance",
    icon: "solar:user-check-rounded-bold-duotone",
    accent: "emerald",
    stat: "95%",
    statHint: "Present this month",
  },
  {
    slug: "staff-attendance",
    label: "Staff Attendance",
    icon: "solar:users-group-rounded-bold-duotone",
    accent: "emerald",
    stat: "48",
    statHint: "Marked today",
  },
  {
    slug: "student-attendance",
    label: "Student Attendance",
    icon: "solar:clipboard-check-bold-duotone",
    accent: "sky",
    stat: "92%",
    statHint: "Class average",
  },
  {
    slug: "diary",
    label: "Diary",
    icon: "solar:notebook-bookmark-bold-duotone",
    accent: "rose",
    stat: "12",
    statHint: "Entries this week",
  },
  {
    slug: "notification",
    label: "Notification",
    icon: "solar:bell-bing-bold-duotone",
    accent: "violet",
    stat: "5",
    statHint: "Unread messages",
  },
  {
    slug: "timetable",
    label: "TimeTable",
    icon: "solar:calendar-mark-bold-duotone",
    accent: "amber",
    stat: "8",
    statHint: "Periods today",
  },
  {
    slug: "fee-report",
    label: "Fee Report",
    icon: "solar:wallet-money-bold-duotone",
    accent: "amber",
    stat: "₹2.4L",
    statHint: "Collected this month",
  },
  {
    slug: "assignment",
    label: "Assignment",
    icon: "solar:document-text-bold-duotone",
    accent: "lime",
    stat: "5",
    statHint: "Pending review",
  },
  {
    slug: "notes",
    label: "Notes",
    icon: "solar:notebook-bold-duotone",
    accent: "cyan",
    stat: "12",
    statHint: "Subject notes",
  },
  {
    slug: "student-list",
    label: "Student List",
    icon: "solar:users-group-two-rounded-bold-duotone",
    accent: "orange",
    stat: "240",
    statHint: "Total students",
  },
  {
    slug: "syllabus-trackin",
    label: "Syllabus Tracking",
    icon: "solar:checklist-bold-duotone",
    accent: "teal",
    stat: "68%",
    statHint: "Syllabus completed",
  },
  {
    slug: "about-school",
    label: "About School",
    icon: "solar:buildings-2-bold-duotone",
    accent: "slate",
    stat: "25+",
    statHint: "Years of excellence",
  },
  {
    slug: "profile",
    label: "Profile",
    icon: "solar:user-circle-bold-duotone",
    accent: "indigo",
    stat: "100%",
    statHint: "Profile complete",
  },
  {
    slug: "emergency-contact",
    label: "Emergency call to Institute",
    icon: "solar:phone-calling-bold-duotone",
    accent: "red",
    stat: "24×7",
    statHint: "Tap to call",
  },
];

const getStaffFullName = (staff) => {
  if (!staff) return "Staff Member";
  const parts = [
    staff.surname,
    staff.firstname || staff.first_name,
    staff.lastname || staff.last_name,
  ].filter(Boolean);
  if (parts.length) return parts.join(" ");
  return staff.name || staff.staff_name || "Staff Member";
};

const getStaffPhotoUrl = (staff) => {
  if (!staff) return null;
  const raw =
    staff.staff_photo ||
    staff.profile_image ||
    staff.profileImage ||
    staff.image ||
    staff.photo ||
    staff.avatar;
  if (!raw) return null;
  if (raw.startsWith("http")) return raw;
  return `${baseURL}${raw.startsWith("/") ? "" : "/"}${raw}`;
};

const DashBoardLayerThree = () => {
  const dispatch = useDispatch();
  const staff = useSelector((state) => state.registrationNo.staff?.data);
  const staffLoading = useSelector(
    (state) => state.registrationNo.staffLoading
  );
  const [photoError, setPhotoError] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false);

  const fullName = getStaffFullName(staff);
  const photoUrl = getStaffPhotoUrl(staff);
  const designation =
    staff?.designationInfo?.designation_name || staff?.designation || "—";
  const department =
    staff?.departmentInfo?.department_name || staff?.department || "—";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getStaffData({ token }));
    }
  }, [dispatch]);

  useEffect(() => {
    setPhotoError(false);
    setPhotoVisible(false);
  }, [photoUrl]);

  return (
    <section className="staff-dashboard">
      <div className={`sd-profile${staffLoading ? " sd-profile--loading" : ""}`}>
        <div className="sd-profile__info">
          <p className="sd-profile__greeting">Welcome back</p>
          <h2 className="sd-profile__name">{fullName}</h2>
          <p className="sd-profile__designation">{designation}</p>
          <div className="sd-profile__details">
            <p className="sd-profile__detail">
              <Icon icon="solar:buildings-2-bold-duotone" aria-hidden />
              {department}
            </p>
          </div>
        </div>

        {photoUrl && !photoError ? (
          photoVisible ? (
            <div
              className="sd-profile__avatar-wrap"
              aria-label={`${fullName} profile`}
            >
              <img
                src={photoUrl}
                alt={fullName}
                className="sd-profile__avatar"
                onError={() => {
                  setPhotoError(true);
                  setPhotoVisible(false);
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              className="sd-profile__avatar-wrap sd-profile__avatar-wrap--empty"
              onClick={() => setPhotoVisible(true)}
              aria-label="View photo"
            >
              <span className="sd-profile__view-photo">
                <Icon icon="solar:eye-bold-duotone" aria-hidden />
                View photo
              </span>
            </button>
          )
        ) : (
          <div
            className="sd-profile__avatar-wrap"
            aria-label={`${fullName} profile`}
          >
            <div
              className="sd-profile__avatar sd-profile__avatar--placeholder"
              aria-hidden
            >
              <Icon
                icon="solar:user-circle-bold-duotone"
                className="sd-profile__avatar-icon"
                aria-hidden
              />
            </div>
          </div>
        )}
      </div>

      <h3 className="sd-section-title">Quick Access</h3>

      <div className="sd-grid">
        {DASHBOARD_CARDS.map(
          ({ slug, label, icon, accent, stat, statHint }) => (
            <Link key={slug} to={slug} className="sd-tile">
              <span className="sd-tile__stat">{stat}</span>
              <div className={`sd-tile__icon-wrap sd-tile__icon-wrap--${accent}`}>
                <Icon icon={icon} aria-hidden />
              </div>
              <div className="sd-tile__body">
                <p className="sd-tile__label">{label}</p>
                <span className="sd-tile__hint">{statHint}</span>
              </div>
              <Icon
                icon="solar:alt-arrow-right-linear"
                className="sd-tile__chevron"
                aria-hidden
              />
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default DashBoardLayerThree;
