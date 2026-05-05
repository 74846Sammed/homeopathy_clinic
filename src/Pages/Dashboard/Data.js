// ── data.js ─────────────────────────────────────────────

export const dailyData = [
  { t: "8AM",  patients: 12, admitted: 5,  discharged: 3  },
  { t: "9AM",  patients: 24, admitted: 8,  discharged: 6  },
  { t: "10AM", patients: 38, admitted: 15, discharged: 10 },
  { t: "11AM", patients: 45, admitted: 18, discharged: 12 },
  { t: "12PM", patients: 52, admitted: 22, discharged: 15 },
  { t: "1PM",  patients: 48, admitted: 20, discharged: 18 },
  { t: "2PM",  patients: 56, admitted: 25, discharged: 20 },
  { t: "3PM",  patients: 60, admitted: 28, discharged: 22 },
  { t: "4PM",  patients: 55, admitted: 24, discharged: 25 },
  { t: "5PM",  patients: 42, admitted: 18, discharged: 28 },
];

export const monthlyData = [
  { t: "Jan", patients: 1240, admitted: 520,  discharged: 480  },
  { t: "Feb", patients: 1380, admitted: 580,  discharged: 540  },
  { t: "Mar", patients: 1520, admitted: 640,  discharged: 600  },
  { t: "Apr", patients: 1680, admitted: 700,  discharged: 660  },
  { t: "May", patients: 1820, admitted: 760,  discharged: 720  },
  { t: "Jun", patients: 1960, admitted: 820,  discharged: 780  },
  { t: "Jul", patients: 2100, admitted: 880,  discharged: 840  },
  { t: "Aug", patients: 2240, admitted: 940,  discharged: 900  },
  { t: "Sep", patients: 2080, admitted: 860,  discharged: 820  },
  { t: "Oct", patients: 2320, admitted: 970,  discharged: 930  },
  { t: "Nov", patients: 2480, admitted: 1040, discharged: 1000 },
  { t: "Dec", patients: 2560, admitted: 1080, discharged: 1040 },
];

export const yearlyData = [
  { t: "2019", patients: 18400, admitted: 7200,  discharged: 6800  },
  { t: "2020", patients: 15200, admitted: 5800,  discharged: 5400  },
  { t: "2021", patients: 19800, admitted: 8200,  discharged: 7800  },
  { t: "2022", patients: 22600, admitted: 9400,  discharged: 9000  },
  { t: "2023", patients: 26800, admitted: 11200, discharged: 10800 },
  { t: "2024", patients: 29200, admitted: 12200, discharged: 11800 },
  { t: "2025", patients: 31400, admitted: 13100, discharged: 12700 },
];

export const deptData = [
  { name: "Cardiology",  value: 28, color: "#06B6D4" },
  { name: "Orthopedics", value: 22, color: "#8B5CF6" },
  { name: "Neurology",   value: 18, color: "#22C55E" },
  { name: "Pediatrics",  value: 15, color: "#F59E0B" },
  { name: "Emergency",   value: 12, color: "#EF4444" },
  { name: "Others",      value: 5,  color: "#94A3B8" },
];

export const growthData = [
  { m: "Jan", revenue: 285, expenses: 210, profit: 75  },
  { m: "Feb", revenue: 312, expenses: 225, profit: 87  },
  { m: "Mar", revenue: 298, expenses: 218, profit: 80  },
  { m: "Apr", revenue: 345, expenses: 240, profit: 105 },
  { m: "May", revenue: 378, expenses: 258, profit: 120 },
  { m: "Jun", revenue: 412, expenses: 275, profit: 137 },
  { m: "Jul", revenue: 445, expenses: 292, profit: 153 },
  { m: "Aug", revenue: 468, expenses: 305, profit: 163 },
  { m: "Sep", revenue: 432, expenses: 285, profit: 147 },
  { m: "Oct", revenue: 498, expenses: 320, profit: 178 },
  { m: "Nov", revenue: 524, expenses: 338, profit: 186 },
  { m: "Dec", revenue: 556, expenses: 355, profit: 201 },
];

export const topDoctors = [
  { name: "Dr. Mitchell", patients: 142, color: "#06B6D4" },
  { name: "Dr. Patel",    patients: 128, color: "#8B5CF6" },
  { name: "Dr. Chen",     patients: 115, color: "#22C55E" },
  { name: "Dr. Okafor",   patients: 98,  color: "#F59E0B" },
  { name: "Dr. Kowalski", patients: 87,  color: "#EF4444" },
  { name: "Dr. Kumar",    patients: 76,  color: "#64748B" },
];

export const appointments = [
  { time: "09:00", doctor: "Dr. Sarah Mitchell", dept: "Cardiology",  patient: "John Anderson", type: "Consultation", status: "done"     },
  { time: "10:30", doctor: "Dr. Raj Patel",      dept: "Neurology",   patient: "Maria Santos",  type: "Follow-up",    status: "done"     },
  { time: "11:45", doctor: "Dr. Emily Chen",     dept: "Pediatrics",  patient: "Tom Wilson",    type: "Check-up",     status: "active"   },
  { time: "13:00", doctor: "Dr. James Okafor",   dept: "Orthopedics", patient: "Lisa Brown",    type: "Surgery",      status: "upcoming" },
  { time: "14:30", doctor: "Dr. Anna Kowalski",  dept: "Emergency",   patient: "Robert Lee",    type: "Emergency",    status: "upcoming" },
  { time: "16:00", doctor: "Dr. Sarah Mitchell", dept: "Cardiology",  patient: "Priya Sharma",  type: "Review",       status: "upcoming" },
];

export const kpiData = [
  { label: "Total Patients Today", value: "284",    change: "+12.5%", trend: "up",   colorKey: "cyan",   sub: "vs yesterday 252"    },
  { label: "Today's Revenue",      value: "₹4.28L", change: "+8.3%",  trend: "up",   colorKey: "green",  sub: "vs yesterday ₹3.95L" },
  { label: "New Admissions",       value: "67",     change: "+5.1%",  trend: "up",   colorKey: "purple", sub: "vs yesterday 64"     },
  { label: "Critical Cases",       value: "12",     change: "-3.2%",  trend: "down", colorKey: "red",    sub: "ICU occupancy 78%"   },
];

export const kpiColors = {
  cyan:   { icon: "#06B6D4", bg: "#ECFEFF" },
  green:  { icon: "#22C55E", bg: "#F0FDF4" },
  purple: { icon: "#8B5CF6", bg: "#F5F3FF" },
  red:    { icon: "#EF4444", bg: "#FFF1F2" },
};

export const statusMap = {
  done:     { bg: "#F0FDF4", color: "#16A34A", label: "Done"        },
  active:   { bg: "#EFF6FF", color: "#2563EB", label: "In Progress" },
  upcoming: { bg: "#FFF7ED", color: "#EA580C", label: "Upcoming"    },
};

export const APRIL_START = 3;   // April 2026 starts on Wednesday
export const APRIL_DAYS  = 30;
export const APPT_DAYS   = [8, 15, 22, 24, 27];