export type StatisticRow = {
  label: string;
  value: string;
  unit?: string;
  emphasized?: boolean;
};

export type StatisticsSection = {
  id: string;
  title: string;
  description: string;
  caption: string;
  iconName:
    | "TrendingUp"
    | "Anchor"
    | "Building2"
    | "Users"
    | "ArrowLeftRight"
    | "PackageCheck"
    | "Activity";
  rows: StatisticRow[];
};

export type SummaryCard = {
  title: string;
  value: string;
  unit: string;
  year: string;
  iconName:
    | "TrendingUp"
    | "Anchor"
    | "Ship"
    | "Building2"
    | "Users"
    | "DollarSign";
};

export const summaryCards: SummaryCard[] = [
  {
    title: "Annual Fish Production",
    value: "410,000",
    unit: "Metric tonnes",
    year: "2024",
    iconName: "TrendingUp",
  },
  {
    title: "Marine Fishing Fleet",
    value: "49,271",
    unit: "Operating vessels",
    year: "2024",
    iconName: "Anchor",
  },
  {
    title: "Inland Fishing Fleet",
    value: "9,647",
    unit: "Inland craft",
    year: "2024",
    iconName: "Ship",
  },
  {
    title: "Fisheries Harbours",
    value: "25",
    unit: "Major harbours & anchorages",
    year: "2024",
    iconName: "Building2",
  },
  {
    title: "Direct Employment",
    value: "245,000",
    unit: "Active fishers & workers",
    year: "2024",
    iconName: "Users",
  },
  {
    title: "Export Value",
    value: "$320.5M",
    unit: "USD Value",
    year: "2024",
    iconName: "DollarSign",
  },
];

export const statisticsSections: StatisticsSection[] = [
  {
    id: "annual-fish-production",
    title: "Annual Fish Production (Mt)",
    description:
      "Annual national fish production figures across marine, inland, and aquaculture sectors for 2024.",
    caption:
      "National fish production breakdown by sub-sector (Metric Tonnes), 2024",
    iconName: "TrendingUp",
    rows: [
      { label: "Marine Sector", value: "308,430", unit: "Rs" },
      { label: "Inland and Aquaculture Sector", value: "102,330", unit: "Rs" },
      {
        label: "Total Fish Production (Mt)",
        value: "410,760",
        unit: "Rs",
        emphasized: true,
      },
    ],
  },
  {
    id: "fishing-fleet",
    title: "Fishing Fleet (Operating Boats) (Numbers)",
    description:
      "Official count of registered operating vessels across Sri Lanka's marine and inland waters for 2024.",
    caption: "Operating fishing fleet by vessel category, 2024",
    iconName: "Anchor",
    rows: [
      {
        label: "Multi-day Boats (Offshore Vessels) (IMUL)",
        value: "4,869",
        unit: "Rs",
      },
      { label: "Inboard Single Day Boats (IDAY)", value: "880", unit: "Rs" },
      { label: "Outboard Motor FRP Boats (OFRP)", value: "24,823", unit: "Rs" },
      {
        label: "Motorized Traditional Boats (MTRB)",
        value: "2,709",
        unit: "Rs",
      },
      {
        label: "Non-motorized Traditional Boats (NTRB)",
        value: "15,037",
        unit: "Rs",
      },
      {
        label: "Non-motorized Traditional Beach-seine Boats (NBSB)",
        value: "953",
        unit: "Rs",
      },
      {
        label: "Total Number of Marine Fishing Fleet",
        value: "49,271",
        emphasized: true,
        unit: "Rs",
      },
      {
        label: "Total Number of Inland Fishing Fleet",
        value: "9,647",
        emphasized: true,
        unit: "Rs",
      },
    ],
  },
  {
    id: "infrastructure-facilities",
    title: "Infrastructure Facilities (Marine Sector) (Numbers)",
    description:
      "Coastal infrastructure summary including major fishery harbours, anchorages, landing sites, and cold chain assets.",
    caption: "Marine sector infrastructure and processing facilities, 2024",
    iconName: "Building2",
    rows: [
      { label: "Major fishery harbours", value: "25", unit: "Harbours" },
      {
        label: "Functioning Major Fishery Harbours",
        value: "23",
        unit: "Harbours",
      },
      { label: "Anchorages", value: "19", unit: "Locations" },
      { label: "Minor Fish Landing Centres", value: "1,083", unit: "Units" },
      { label: "Active Ice Plants", value: "109", unit: "Units" },
      { label: "Ice Production Capacity", value: "4,223", unit: "Units" },
      {
        label: "Boat Manufacturing Yards (Registered)",
        value: "71",
        unit: "Units",
      },
      { label: "Fishing Gear Factories", value: "19", unit: "Units" },
    ],
  },
  {
    id: "social-information",
    title: "Social Information (Numbers)",
    description:
      "Socio-economic indicators detailing active employment, fishing households, and women's participation.",
    caption: "Socio-economic statistics of Sri Lankan fisher communities, 2024",
    iconName: "Users",
    rows: [
      {
        label: "Fisheries Inspector Divisions (Marine)",
        value: "149",
        unit: "Persons",
      },
      {
        label: "Marine Fishing Households",
        value: "188,940",
        unit: "Households",
      },
      { label: "Inland Fishing Households", value: "83,960", unit: "Fishers" },
      {
        label: "Marine Fishers (Men & women)",
        value: "225,480",
        unit: "Persons",
      },
      {
        label: "Inland Fishers (Men & women)",
        value: "94,990",
        unit: "Persons",
      },
      {
        label: "Marine Fishing Household Population",
        value: "807,550",
        unit: "Persons",
      },
      {
        label: "Inland Fishing Household Population",
        value: "223,610",
        unit: "Persons",
      },
    ],
  },
  {
    id: "exports-imports",
    title: "Exports & Imports",
    description:
      "International seafood trade balance, export valuation, import quantities, and destination markets.",
    caption: "Seafood international trade quantity and fiscal value, 2024",
    iconName: "ArrowLeftRight",
    rows: [
      { label: "Annual Export Earnings (Rs. Mn)", value: "86,241", unit: "Rs" },
      { label: "Annual Export Earnings (US$ Million)", value: "285", unit: "Rs" },
      { label: "Annual Export Volume (Mt)", value: "22,556", unit: "Rs" },
      { label: "Annual Import Expenditure (Rs. Mn)", value: "36,672", unit: "Million USD" },
      { label: "Annual Import Expenditure (US$ Million)", value: "122" , unit: "US$ Million" },
      { label: "Annual Import Volume (Mt)", value: "58,351" , unit: "Rs" },
      { label: "Balance of Fish Trade (Rs. Mn)", value: "49,569" , unit: "Rs"},
      { label: "Balance of Fish Trade (US$ Million)", value: "164" , unit: "US$ Million"},
    ],
  },
  {
    id: "canned-fish",
    title: "Canned Fish",
    description:
      "Domestic processing metrics, import volumes, operational facilities, and market consumption demand.",
    caption: "Canned fish production, import, and market statistics, 2024",
    iconName: "PackageCheck",
    rows: [
      { label: "Domestically produced volume (Mt)", value: "12,305", unit: "Mt" },
      { label: "Domestically produced volume (Millions of cans)", value: "31.1", unit: "Million" },
      { label: "No of local canned fish manufacturing companies (Numbers)", value: "16", unit: "No" },
    ],
  },
  {
    id: "fisheries-indicators",
    title: "Fisheries Indicators",
    description:
      "Key sectoral macroeconomic indicators including per capita consumption, GDP share, and self-sufficiency.",
    caption:
      "National fisheries development and macroeconomic indicators, 2024",
    iconName: "Activity",
    rows: [
      {
        label: "Contribution to GDP at Current Market Prices (%)",
        value: "0.9",
        unit: "Percentage",
      },
      {
        label: "Gross domestic product at current market price (Rs. Mn)",
        value: "29,898,564",
        unit: "Rs. Mn",
      },
    ],
  },
];
