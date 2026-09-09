export type NavigationItem = {
  label: string
  label_si?: string
  label_ta?: string
  href: string
  children?: NavigationItem[]
}

export const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    label_si: "මුල් පිටුව",
    label_ta: "முகப்பு",
    href: "/",
  },
  {
    label: "About Us",
    label_si: "අප ගැන",
    label_ta: "எங்களைப் பற்றி",
    href: "/about",
    children: [
      {
        label: "Overview",
        label_si: "දළ විශ්ලේෂණය",
        label_ta: "கண்ணோட்டம்",
        href: "/about",
      },
      {
        label: "Hon. Minister",
        label_si: "ගරු අමාත්‍යතුමා",
        label_ta: "கௌரவ அமைச்சர்",
        href: "/about/minister",
      },
      {
        label: "Hon. Deputy Minister",
        label_si: "ගරු නියෝජ්‍ය අමාත්‍යතුමා",
        label_ta: "கௌரவ பிரதி அமைச்சர்",
        href: "/about/deputy-minister",
      },
      {
        label: "Secretary",
        label_si: "අමාත්‍යාංශ ලේකම්",
        label_ta: "அமைச்சின் செயலாளர்",
        href: "/about/secretary",
      },
      {
        label: "Divisions",
        label_si: "අමාත්‍යාංශ අංශ",
        label_ta: "அமைச்சின் பிரிவுகள்",
        href: "/about/divisions",
      },
      {
        label: "Organization Structure",
        label_si: "සංවිධාන ව්‍යුහය",
        label_ta: "நிறுவனக் கட்டமைப்பு",
        href: "/about/organization-structure",
      },
    ],
  },
  {
    label: "Opportunities & Portals",
    label_si: "අවස්ථා සහ ද්වාර",
    label_ta: "வாய்ப்புகள் & முகப்புகள்",
    href: "/local-training",
    children: [
      {
        label: "Local Fisheries Training",
        label_si: "දේශීය ධීවර පුහුණුව",
        label_ta: "உள்நாட்டுப் பயிற்சிகள்",
        href: "/local-training",
      },
      {
        label: "Foreign Training & Fellowships",
        label_si: "විදේශ පුහුණු අවස්ථා",
        label_ta: "வெளிநாட்டுப் பயிற்சிகள்",
        href: "/foreign-training",
      },
      {
        label: "Procurement & Tenders Portal",
        label_si: "ප්‍රසම්පාදන සහ ටෙන්ඩර්",
        label_ta: "கொள்முதல் & கேள்விப்பத்திரங்கள்",
        href: "/procurement",
      },
      {
        label: "Recruitment & Vacancies Portal",
        label_si: "වෘත්තීය බඳවාගැනීම්",
        label_ta: "வேலைவாய்ப்பு ஆட்சேர்ப்பு",
        href: "/recruitment",
      },
    ],
  },
  {
    label: "Media Centre",
    label_si: "මාධ්‍ය මධ්‍යස්ථානය",
    label_ta: "ஊடக மையம்",
    href: "/media-centre/news",
    children: [
      {
        label: "News",
        label_si: "පුවත්",
        label_ta: "செய்திகள்",
        href: "/media-centre/news",
      },
      {
        label: "Notices",
        label_si: "නිවේදන",
        label_ta: "அறிவித்தல்கள்",
        href: "/media-centre/notices",
      },
      {
        label: "Press Releases",
        label_si: "මාධ්‍ය නිවේදන",
        label_ta: "ஊடக வெளியீடுகள்",
        href: "/media-centre/press-releases",
      },
      {
        label: "Events",
        label_si: "විශේෂ සිදුවීම්",
        label_ta: "நிகழ்வுகள்",
        href: "/media-centre/events",
      },
      {
        label: "Photo Gallery",
        label_si: "ඡායාරූප ගැලරිය",
        label_ta: "புகைப்பட தொகுப்பு",
        href: "/media-centre/gallery",
      },
      {
        label: "Videos",
        label_si: "වීඩියෝ දර්ශන",
        label_ta: "காணொளிகள்",
        href: "/media-centre/videos",
      },
    ],
  },
  {
    label: "Statistics",
    label_si: "සංඛ්‍යාලේඛන",
    label_ta: "புள்ளிவிவரங்கள்",
    href: "/statistics/at-a-glance",
    children: [
      {
        label: "Fisheries at a Glance",
        label_si: "ධීවර ක්ෂේත්‍රය බැලූ බැල්මට",
        label_ta: "ஒரு பார்வையில் கடற்றொழில்",
        href: "/statistics/at-a-glance",
      },
      {
        label: "Weekly Fish Prices",
        label_si: "සතිපතා මත්ස්‍ය මිල ගණන්",
        label_ta: "வாராந்த மீன் விலைகள்",
        href: "/statistics/weekly-fish-prices",
      },
      {
        label: "Monthly Fish Production",
        label_si: "මාසික මත්ස්‍ය නිෂ්පාදනය",
        label_ta: "மாதாந்த மீன் உற்பத்தி",
        href: "/statistics/monthly-fish-production",
      },
      {
        label: "Annual Statistics Reports",
        label_si: "වාර්ෂික සංඛ්‍යාලේඛන වාර්තා",
        label_ta: "வருடாந்த புள்ளிவிவர அறிக்கைகள்",
        href: "/statistics/annual-reports",
      },
      {
        label: "Export and Import",
        label_si: "අපනයන සහ ආනයන",
        label_ta: "ஏற்றுமதி மற்றும் இறக்குமதி",
        href: "/statistics/export-and-import",
      },
      {
        label: "Fishery Related Information",
        label_si: "ධීවර ආශ්‍රිත තොරතුරු",
        label_ta: "கடற்றொழில் சார்ந்த தகவல்கள்",
        href: "/statistics/related-information",
      },
    ],
  },
  {
    label: "RTI",
    label_si: "තොරතුරු දැනගැනීමේ අයිතිය",
    label_ta: "தகவல் அறியும் உரிமை",
    href: "/rti",
  },
  {
    label: "Downloads",
    label_si: "බාගත කිරීම්",
    label_ta: "பதிவிறக்கங்கள்",
    href: "/downloads",
    children: [
      {
        label: "Human Resource Development Plan",
        label_si: "මානව සම්පත් සංවර්ධන සැලැස්ම",
        label_ta: "மனித வள அபிவிருத்தித் திட்டம்",
        href: "/downloads?category=hr-development",
      },
      {
        label: "Performance Report",
        label_si: "කාර්යසාධන වාර්තාව",
        label_ta: "செயல்திறன் அறிக்கை",
        href: "/downloads?category=performance-report",
      },
      {
        label: "Progress Report",
        label_si: "ප්‍රගති වාර්තාව",
        label_ta: "முன்னேற்ற அறிக்கை",
        href: "/downloads?category=progress-report",
      },
      {
        label: "Annual Statistics",
        label_si: "වාර්ෂික සංඛ්‍යාලේඛන",
        label_ta: "வருடாந்த புள்ளிவிவரங்கள்",
        href: "/downloads?category=annual-statistics",
      },
      {
        label: "Action Plan",
        label_si: "ක්‍රියාකාරී සැලැස්ම",
        label_ta: "செயற்பாட்டுத் திட்டம்",
        href: "/downloads?category=action-plan",
      },
      {
        label: "Physical and Financial Progress Report",
        label_si: "භෞතික හා මුදල් ප්‍රගති වාර්තාව",
        label_ta: "பௌதீக සහ මුදල් ප්‍රගති වාර්තාව",
        href: "/downloads?category=physical-financial-progress",
      },
      {
        label: "Others",
        label_si: "වෙනත්",
        label_ta: "மற்றவை",
        href: "/downloads?category=others",
      },
    ],
  },
  {
    label: "Contact Us",
    label_si: "සම්බන්ධ වන්න",
    label_ta: "தொடர்பு கொள்ள",
    href: "/contact",
  },
]