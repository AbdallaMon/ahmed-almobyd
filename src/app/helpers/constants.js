import {
  AiOutlineEdit,
  AiOutlineFileText,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiNote, BiTransfer } from "react-icons/bi";
import { MdAttachMoney, MdCall } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import React from "react";

export const NotificationType = {
  NEW_LEAD: "New Lead",
  LEAD_ASSIGNED: "Lead Assigned",
  LEAD_STATUS_CHANGED: "Lead Status Changed",
  LEAD_TRANSFERRED: "Lead Transferred",
  LEAD_UPDATED: "Lead Updated",
  LEAD_CONTACT: "Lead Contact",
  NOTE_ADDED: "Note Added",
  NEW_NOTE: "New Note",
  NEW_FILE: "New File",
  CALL_REMINDER_CREATED: "Call Reminder Created",
  CALL_REMINDER_STATUS: "Call Reminder Status",
  PRICE_OFFER_SUBMITTED: "Price Offer Submitted",
  PRICE_OFFER_UPDATED: "Price Offer Updated",
  FINAL_PRICE_ADDED: "Final Price Added",
  FINAL_PRICE_CHANGED: "Final Price Changed",
  OTHER: "Other",
};
export const PaymentStatus = {
  PENDING: "Pending",
  PARTIALLY_PAID: "Partially paid",
  FULLY_PAID: "Fully paid",
  OVERDUE: "Overdue",
};
export const PaymentLevels = {
  LEVEL_1: "First Payment",
  LEVEL_2: "Second Payment",
  LEVEL_3: "Third Payment",
  LEVEL_4: "Fourth Payment",
  LEVEL_5: "Fifth Payment",
  LEVEL_6: "Sixth Payment",
  LEVEL_7_OR_MORE: "Seventh Payment or more",
};
export const LeadCategory = {
  CONSULTATION: "Consultation",
  DESIGN: "Design",
  OLDLEAD: "Lead via excel",
};
export const LeadType = {
  ROOM: "Room",
  PLAN: "Plan",
  CITY_VISIT: "City Visit",
  APARTMENT: "Apartment",
  CONSTRUCTION_VILLA: "Construction Villa",
  UNDER_CONSTRUCTION_VILLA: "Villa Under Construction",
  PART_OF_HOME: "Part of Home",
  COMMERCIAL: "Commercial",
  NONE: "None",
};
export const dictionary = {
  Consultation: "استشارة",
  Design: "تصميم",
  "Interior design": "تصميم داخلي",
  "How can we serve you?": "كيف يمكننا مساعدتك؟",
  "Choose from options": "اختر من الخيارات",
  "Complete your register": "اكمل بياناتك للتسجيل",
  Room: "غرفة",
  Plan: "مخطط",
  "City Visit": "زيارة ميدانية",
  Apartment: "شقة",
  "Construction Villa": "فيلا مسكونة",
  "Villa Under Construction": "فيلا تحت الإنشاء",
  "Part of Home": "جزء من المنزل",
  Commercial: "تجاري",
  "39 dollars – fully deducted upon contracting.":
    "٣٩ دولار تُخصم بالكامل عند التعاقد",
  "Book Now 39 DOLLAR": "احجز الان ٣٩ دولار",

  "Success!": "نجاح!",
  "Your time and ours is valuable. If we are unable to provide a suitable solution for you, the full amount will be refunded.":
    "وقتك ووقتنا ثمين، في حال لم نتمكن من تقديم الحل المناسب لك، سيتم استرجاع المبلغ المدفوع بالكامل.", // Emirates
  "Out side emirates": "خارج الإمارات",
  Dubai: "دبي",
  "Abu Dhabi": "أبو ظبي",
  Sharjah: "الشارقة",
  Ajman: "عجمان",
  "Umm Al Quwain": "أم القيوين",
  "Ras Al Khaimah": "رأس الخيمة",
  Fujairah: "الفجيرة",
  "Khor Fakkan": "خورفكان",
  // Price Ranges

  //   "400,000 AED or less": "أقل من  400,000 درهم اماراتي",
  "300,000 AED or less": "أقل من  300,000 درهم اماراتي",
  "300,000 to 400,000 AED": "من 300,000 إلى 400,000  درهم اماراتي",
  "400,000 to 600,000 AED": "من 400,000 إلى 600,000  درهم اماراتي",
  "600,000 to 800,000 AED": "من 600,000 إلى 800,000 درهم اماراتي",
  "800,000 AED and above": "اكثر من 800,000 درهم اماراتي",
  "25,000 AED or less": "أقل من 25,000 درهم اماراتي",
  "25,000 to 45,000 AED": "من 25,000 إلى 45,000 درهم اماراتي",
  "45,000 to 65,000 AED": "من 45,000 إلى 65,000 درهم اماراتي",
  "65,000 to 85,000 AED": "من 65,000 إلى 85,000 درهم اماراتي",
  "85,000 AED and above": "اكثر من 85,000 درهم اماراتي",
  // Additional phrases
  "Please fill all the fields.": "يرجى ملء جميع الحقول.",
  "Minimum price cannot be greater than maximum price.":
    "لا يمكن أن يكون الحد الأدنى للسعر أكبر من الحد الأقصى للسعر.",
  "Uploading file": "جارٍ تحميل الملف",
  Submitting: "جارٍ الإرسال",
  "Complete Your Request": "أكمل طلبك",
  Name: "الاسم",
  Phone: "الهاتف",
  "Select Location": "اختر الموقع",
  "Price Range": "نطاق السعر",
  Min: "الحد الأدنى",
  Max: "الحد الأقصى",
  "Add an attachment": "أضف مرفقًا",
  Submit: "تسجيل",
  "Submit Now": "سجل الأن",
  "Book a meeting": "احجز اجتماع",
  "With eng ahmed": "مع م.أحمد المبيض",
  "Planning - Design - Implementation - Consulting":
    "تخطيط - تصميم - تنفيذ - استشارات",
  Success: "تم بنجاح!",
  "Thank you for your submission. We will contact you soon.":
    "شكرًا لك على تقديم طلبك. سنتواصل معك قريبًا.",
  "You got a 10% discount!": "لقد حصلت على خصم 10٪",
  "Sorry!": "عذرًا!",
  Budget: "الميزانية",
  "We do not provide services outside the UAE.":
    "نحن لا نقدم خدمات خارج الإمارات العربية المتحدة.",
  "We do not provide services outside the UAE, But we will contact you soon.":
    "نحن لا نقدم خدمات خارج الإمارات العربية المتحدة, لكن سنتواصل معك قريبا.",
  "Add an attachment (optional)": "اضف مرفقا (اختياري)",
  "Date of birth": "تاريخ الميلاد",
  Email: "البريد الالكتروني",
  "Select a price ranges": "اختر نطاق سعر",
  "Inside UAE": "داخل الامارات",
  "Out side UAE": "خارج الامارات",
  "How much would you like to invest in your dream home?":
    "كم حابب تستثمر في منزل احلامك؟",
  "Additional information (optional)": "معلومات اضافية (اختياري)",
  "Choose a time to contact you? (optional)":
    "اختيار وقت للتواصل معك (اختياري)",
  Country: "الدولة",
  "Invalid phone": "رقم الهاتف غير صحيح",
  Courses: "الدورات",
  "Engineers courses": "دورات للمهندسين",
  Books: "الكتب",
  Store: "المتجر",
  "Coming Soon": "سيتوفر قريبًا",
  "Choose a time between 10 AM to 7 PM.":
    "اختر وقت بين الساعة 10 صباحًا و 7 مساءً.",
  "Book Your Consultation": "احجز استشارتك",
  "Make your home your personal brand": "اجعل منزلك براندك الخاص",
  "You're just one step away from starting your project!":
    "خطوة واحدة تفصلنا عن بدء العمل على مشروعك!",
  "Where did you hear about us?": "من وين تعرفت علينا؟",
  "Please tell us how you found us.": "يرجى إخبارنا كيف عثرت علينا.",
};

export const MediaType = {
  IMAGE: "Image",
  VIDEO: "Video",
};

export const Emirate = {
  DUBAI: "Dubai",
  ABU_DHABI: "Abu Dhabi",
  SHARJAH: "Sharjah",
  AJMAN: "Ajman",
  UMM_AL_QUWAIN: "Umm Al Quwain",
  RAS_AL_KHAIMAH: "Ras Al Khaimah",
  FUJAIRAH: "Fujairah",
  KHOR_FAKKAN: "Khor Fakkan",
};

export const UserRole = {
  ADMIN: "Admin",
  STAFF: "Staff",
};

export const ClientLeadStatus = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  INTERESTED: "Interested",
  NEEDS_IDENTIFIED: "Needs Identified",
  NEGOTIATING: "Negotiating",
  REJECTED: "Rejected",
  FINALIZED: "Finalized",
  CONVERTED: "Converted",
  ON_HOLD: "On Hold",
};

// Work Stages for 3D Designer
export const ThreeDWorkStages = {
  CLIENT_COMMUNICATION: "Client Communication",
  DESIGN_STAGE: "Design Stage",
  FIRST_MODIFICATION: "First Modification",
  SECOND_MODIFICATION: "Second Modification",
  THIRD_MODIFICATION: "Third Modification",
  THREE_D_APPROVAL: "3D Approval",
};

// Work Stages for 2D Designer
export const TwoDWorkStages = {
  DRAWING_PLAN: "Drawing Plan",
  QUANTITY: "Quantity",
  FINAL_DELIVERY: "Final Delivery",
};
export const TwoDExacuterStages = {
  PROGRESS: "Progress",
  PRICING: "Pricing",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const KanbanLeadsStatus = {
  IN_PROGRESS: "In Progress",
  INTERESTED: "Interested",
  NEEDS_IDENTIFIED: "Needs Identified",
  NEGOTIATING: "Negotiating",
  FINALIZED: "Finalized",
  REJECTED: "Rejected",
};

// Projects

export const PROJECT_TYPES = [
  "3D_Designer",
  "3D_Modification",
  "2D_Study",
  "2D_Final_Plans",
  "2D_Quantity_Calculation",
];
export const PROJECT_TYPES_ENUM = {
  ThreeD: {
    DESIGNER: "3D_Designer",
    MODIFICATION: "3D_Modification",
  },
  TwoD: {
    STUDY: "2D_Study",
    FINAL_PLANS: "2D_Final_Plans",
    QUANTITY_CALCULATION: "2D_Quantity_Calculation",
  },
};
export const PROJECT_STATUSES = {
  "3D_Designer": [
    "To Do",
    "3D",
    "Render",
    "Delivery",
    "Hold",
    "Modification",
    "Completed",
  ],
  "3D_Modification": ["To Do", "Modification", "Completed"],
  "2D_Study": [
    "To Do",
    "Studying",
    "Delivery",
    "Hold",
    "Modification",
    "Completed",
  ],
  "2D_Final_Plans": ["To Do", "Started", "In Progress", "Completed"],
  "2D_Quantity_Calculation": ["To Do", "Started", "In Progress", "Completed"],
};

export const PRIORITY = ["VERY_LOW", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];
export const TASKSTATUS = ["TODO", "IN_PROGRESS", "DONE"];
export const statusColors = {
  IN_PROGRESS: "#0d9488",
  INTERESTED: "#10b981",
  NEEDS_IDENTIFIED: "#f59e0b",
  NEGOTIATING: "#3b82f6",
  REJECTED: "#ef4444",
  FINALIZED: "#0f766e",
  CLIENT_COMMUNICATION: "#3b82f6",
  DESIGN_STAGE: "#10b981",
  THREE_D_STAGE: "#f59e0b",
  THREE_D_APPROVAL: "#0d9488",
  DRAWING_PLAN: "#f97316",
  FINAL_DELIVERY: "#0f766e",
  FIRST_MODIFICATION: "#3b82f6",
  SECOND_MODIFICATION: "#10b981",
  THIRD_MODIFICATION: "#f59e0b",
  PROGRESS: "#0d9488",
  PRICING: "#3b82f6",
  ACCEPTED: "#10b981",
  REJECTED: "#ef4444",
  QUANTITY: "#f97316",
  LEVEL_1: "#f97316", // First Payment - Orange
  LEVEL_2: "#f59e0b", // Second Payment - Yellow
  LEVEL_3: "#10b981", // Third Payment - Green
  LEVEL_4: "#3b82f6", // Fourth Payment - Blue
  LEVEL_5: "#0d9488", // Fifth Payment - Teal
  LEVEL_6: "#0f766e", // Sixth Payment - Dark Teal
  LEVEL_7_OR_MORE: "#ef4444", // Seventh

  VERY_LOW: "#d1d5db", // Light Gray
  LOW: "#f59e0b", // Yellow
  MEDIUM: "#3b82f6", // Blue
  HIGH: "#10b981", // Green
  VERY_HIGH: "#ef4444", // Red
  TODO: "#f97316", // Orange
  IN_PROGRESS: "#0d9488", // Teal
  DONE: "#10b981", // Green

  "To Do": "#f59e0b", // Yellow
  "3D": "#10b981", // Green
  Render: "#3b82f6", // Blue
  Delivery: "#0d9488", // Teal
  Hold: "#ef4444", // Red
  Completed: "#10b981", // Green
  Modification: "#f97316", // Orange
  Studying: "#3b82f6", // Blue
  Delivery: "#0d9488", // Teal
  Started: "#3b82f6", // Blue
  "In Progress": "#0d9488", // Teal
};

export const KanbanStatusArray = [
  "IN_PROGRESS",
  "INTERESTED",
  "NEEDS_IDENTIFIED",
  "NEGOTIATING",
  "FINALIZED",
  "REJECTED",
];
export const AccountantKanbanStatusArray = [
  "IN_PROGRESS",
  "INTERESTED",
  "NEEDS_IDENTIFIED",
  "NEGOTIATING",
  "FINALIZED",
  "REJECTED",
];

export const initialPageLimit = 10;
export const totalLimitPages = [10, 20, 50, 100];
export const simpleModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  overflow: "auto",
  width: {
    xs: "95%",
    sm: "80%",
    md: "60%",
  },
  maxWidth: {
    md: "600px",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export const notificationIcons = {
  NEW_LEAD: <AiOutlineUserAdd size={24} />,
  LEAD_ASSIGNED: <AiOutlineUserAdd size={24} />,
  LEAD_STATUS_CHANGE: <AiOutlineFileText size={24} />,
  LEAD_TRANSFERRED: <BiTransfer size={24} />,
  LEAD_UPDATED: <AiOutlineEdit size={24} />,
  LEAD_CONTACT: <MdAttachMoney size={24} />,
  NOTE_ADDED: <BiNote size={24} />,
  NEW_NOTE: <BiNote size={24} />,
  NEW_FILE: <FaFileUpload size={24} />,
  CALL_REMINDER_CREATED: <MdCall size={24} />,
  CALL_REMINDER_STATUS: <MdCall size={24} />,
  PRICE_OFFER_SUBMITTED: <MdAttachMoney size={24} />,
  PRICE_OFFER_UPDATED: <MdAttachMoney size={24} />,
  FINAL_PRICE_ADDED: <MdAttachMoney size={24} />,
  FINAL_PRICE_CHANGED: <MdAttachMoney size={24} />,
  OTHER: <AiOutlineFileText size={24} />,
};

export const userRoles = [
  { value: "STAFF", label: "Staff" },
  { value: "THREE_D_DESIGNER", label: "3D Designer" },
  { value: "TWO_D_DESIGNER", label: "2D Designer" },
  { value: "ACCOUNTANT", label: "Accountant" },
  { value: "TWO_D_EXECUTOR", label: "Two d executor" },
  { value: "SUPER_ADMIN", label: "Admin" },
];
export const userRolesEnum = {
  STAFF: "Staff",
  THREE_D_DESIGNER: "3D Designer",
  TWO_D_DESIGNER: "2D Designer",
  ACCOUNTANT: "Accountant",
  TWO_D_EXECUTOR: "Two d executor",
  SUPER_ADMIN: "Admin",
};

export const countriesByRegion = {
  Asia: [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "Cyprus",
    "Georgia",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Turkey",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
  ],
  Europe: [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
    "United Kingdom",
    "Vatican City",
  ],
  Africa: [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ],
  "North America": [
    "Antigua and Barbuda",
    "Bahamas",
    "Barbados",
    "Belize",
    "Canada",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "Grenada",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Trinidad and Tobago",
    "United States",
  ],
  "South America": [
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ],
  Oceania: [
    "Australia",
    "Fiji",
    "Kiribati",
    "Marshall Islands",
    "Micronesia",
    "Nauru",
    "New Zealand",
    "Palau",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Tonga",
    "Tuvalu",
    "Vanuatu",
  ],
};

export const LEAD_SOURCE_LABELS = {
  INSTAGRAM: { en: "Instagram", ar: "انستغرام" },
  TIKTOK: { en: "TikTok", ar: "تيك توك" },
  TV: { en: "TV", ar: "تلفاز" },
  FACEBOOK: { en: "Facebook", ar: "فيسبوك" },
  YOUTUBE: { en: "YouTube", ar: "يوتيوب" },
  GOOGLE: { en: "Google", ar: "جوجل" },
  INTERIOR_MAGAZINE_SITE: {
    en: "Interior design magazine/site",
    ar: "مجلة/موقع تصميم داخلي",
  },
  REFERRAL: {
    en: "Referral from friend or previous client",
    ar: "توصية من صديق أو عميل سابق",
  },
  OTHER: { en: "Other", ar: "أخرى" },
};
