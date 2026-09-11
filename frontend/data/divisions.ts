export interface Division {
  id: string
  title: string
  shortDescription: string
  fullDescription: string[]
  bulletPoints?: string[]
  iconName: "UsersRound" | "Landmark" | "ClipboardCheck" | "Wrench" | "TrendingUp" | "ShieldCheck" | "HardHat" | "ChartNoAxesCombined"
  className?: string
}

export const divisions: Division[] = [
  {
    id: "administration",
    title: "Administration Division",
    shortDescription:
      "Responsible for human resources, administration, institutional coordination and the effective operation of the Ministry.",
    fullDescription: [
      "Administration Division is entrusted with the prime duty of management and development of human resources of the Ministry. The responsibility of appointing officers to perform the duties in the subject of fisheries infrastructure, livelihood development of fisher fork and to perform specific task to develop inland and ornamental fisheries, through the provision of professional and institutional training, the human resource development including administration and implementation of activities of the Ministry such as communication, transport, security, maintenance and provision of sanitary facilities that would create a suitable office environment for the employees to perform their duties peacefully. The Division also coordinates the administration of the institutions operating under the purview of the Ministry."
    ],
    iconName: "UsersRound",
  },
  {
    id: "accounts",
    title: "Accounts Division",
    shortDescription:
      "Manages financial administration, budgeting, payments, accounting controls and public financial reporting.",
    fullDescription: [
      "The main focus of this Division is to via contribute the national development implementing effective financial management system in compliance with the government procumbent procedures within the legal framework.",
      "Accordingly, our prime objective of this division is to bear the expenditures incurring implementation of the development projects in collaboration with the institutions under the purview of the Ministry and maintenance of accurate accounting system through regular Audits.",
    ],
    iconName: "Landmark",
  },
  {
    id: "planning-monitoring",
    title: "Planning and Monitoring Division",
    shortDescription:
      "Coordinates sector planning, programme monitoring, policy implementation and development reporting.",
    fullDescription: [
      "Formulation of policies based on short term, medium term and long term plans that are required to pay maximum contribution from the fisheries sector to the national Plan formulated to achieve the targets of the national development policies.",
      "Prioritize programmes required to achieve desired goals in effective manner through formulated plans under an appropriate system on the issue of management of financial and physical resources which is associated with fisheries and aquatic resources sector, ensuring maximum and optimum utilization.",
      "Implementation of formulated plans with respect to relevant projects under a physical and financial management system in productive manner with constant monitoring performances and the outcome, by evaluation of the progress of those projects on weekly, monthly, quarterly and annual basis while identifying the obstacles and challenges encountered when implementation of those and to apply strategies to overcome them."
    ],
    iconName: "ClipboardCheck",
  },
  {
    id: "technical",
    title: "Technical Division",
    shortDescription:
      "Provides technical guidance and specialist support for fisheries, aquatic resources and Ministry programmes.",
    fullDescription: [
      "The Division is responsible to create avenues for local and foreign investments in Sri Lankan fisheries that would be beneficial to the satisfaction of desired goals of national development policies and to encourage the initiation of appropriative projects by recommending the most suitable investment method based on the existing state policies and to facilitate their implementation in order to ensure maximum benefits. Contribute to the foreign exchange income of the country through the increase of export income and international expansion of export market by promoting fish and aquaculture by surpassing the challenges encountered in the industry in order to ensure the maximum benefit to the country and fishers.  ",
      "Issue directives in relation to imports of aquaculture products, fish and fishing gear for the purpose of re-export and nutrition enhancement of people and to be responsible for the coordination between the Ministry and the respective institutes in this regard. Act as the coordinator in formulation and inspection of bilateral agreements and to coordinate the matters related to regional fisheries associations and United Nations Convention on the Law of the Sea in the formulation of strategies to overcome the international challenges in the fisheries industry and thereby pave the way to the betterment of the fisher community and the entire nation.",
    ],
    iconName: "Wrench",
  },
  {
    id: "development",
    title: "Development Division",
    shortDescription:
      "Supports fisheries-sector development programmes, community initiatives and livelihood improvement activities.",
    fullDescription: [
      "Social Development Division is entrusted with the duty of enhancing the standard of life of the entire fisher community including fishers who are directly engaged in fishing and the groups involved in indirect occupations in the fisheries industry. Hence the Division functions to supply related data and information plan undertaking the process of development proposals, identify the priorities, make funds available and also to implement, coordinate, guide, evaluate and conduct progress review and follow-ups of the development projects while shouldering the responsibility of sustainable implementation of related development proposals.",
    ],
    iconName: "TrendingUp",
  },
  {
    id: "internal-audit",
    title: "Internal Audit Division",
    shortDescription:
      "Reviews internal controls, financial procedures, compliance and organisational risk management.",
    fullDescription: [
      "To inspect and assess the consistency and adequacy of the internal inspections deployed in the identification and prevention of malpractices and corruption with respect to finance handling of the tasks undertaken by the Ministry or handed over to the Ministry, and report to the Chief Counting Officer with the findings of such assessments, and also to assist the Chief Counting Officer by reporting the progress achieved in the execution of development projects of the Ministry and when required, acting as the coordinator between the Chief Counting Officer and the officials engaged in the said process.",
    ],
    iconName: "ShieldCheck",
  },
  {
    id: "engineering",
    title: "Engineering Division",
    shortDescription:
      "Provides engineering support for fisheries infrastructure, harbours, facilities and development projects.",
    fullDescription: [
      "The engineering division is responsible for supervision & monitoring of all engineering-related activities of the projects that are being executed and to be executed in the future. It includes the following:"
    ],
    bulletPoints: [
      "Obtaining feasibility study reports, technical proposals, EIA, IEE etc, and evaluating them at the project planning stage.",
      "Monitoring the physical & financial progress of all construction activities.",
      "Monitoring the quality assurance aspects of all construction activities.",
      "Financial control of ongoing construction projects and approving interim & final payment certificates.",
      "Attending to variations and updating against the original designs depending on site conditions and unforeseen situations as per the contractual obligations.",
      "Coordination among consultancy/construction/client and other relevant institutions.",
      "Recommending suitable solutions or mitigatory measures during construction or vulnerable in the future."
    ],
    iconName: "HardHat",
  },
  {
    id: "statistical",
    title: "Statistical Division",
    shortDescription:
      "Collects, manages and publishes fisheries statistics and sector information for planning and decision-making.",
    fullDescription: [
      "Collection, analysis and publication of data required in formulation and progress evaluation of policies and plans and the data related to the devising of national/international estimations and indicators, with a view to sustainably developing of fisheries and aquatic resources in the accomplishment of desired goals of the Ministry.",
    ],
    iconName: "ChartNoAxesCombined",
  },
]
