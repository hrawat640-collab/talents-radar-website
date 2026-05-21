/** Radar AI — chat scenarios (chip + typed question + insights / actions) */
export const AI_SCENARIOS = [
  {
    id: 'attrition',
    chip: 'Attrition risk',
    question: 'Which teams are at the highest attrition risk right now?',
    insights: [
      'Compensation dissatisfaction rising in platform engineering',
      'Manager workload concerns mentioned in recent 1:1 signals',
      'Backend team engagement scores declining for 6 weeks',
      'External market compensation increased 14% for critical Node.js roles',
    ],
    actions: [
      'Prioritize retention review for backend engineering',
      'Refresh compensation bands for high-risk spans',
      'Schedule leadership intervention with engineering managers',
    ],
    actionLabel: 'Recommended action',
  },
  {
    id: 'hiring-plans',
    chip: 'Hiring vs revenue',
    question: 'Are current hiring plans aligned with revenue goals?',
    insights: [
      'Engineering hiring velocity trailing approved roadmap targets',
      'Product hiring demand increased beyond approved headcount plan',
      'Capacity utilization projected to exceed 112% next quarter',
    ],
    actions: [
      'Increase backend hiring allocation before Q3 expansion',
      'Shift open req prioritization toward platform infrastructure',
      'Delay lower-priority GTM hiring until engineering capacity stabilizes',
    ],
    actionLabel: 'Recommended action',
  },
  {
    id: 'compensation',
    chip: 'Compensation gaps',
    question: 'Where are compensation gaps affecting retention?',
    insights: [
      'Mid-level engineering compensation below current market movement',
      'Offer decline rate increased 18% in backend hiring',
      'Senior frontend spans showing elevated recruiter outreach activity',
    ],
    actions: [
      'Refresh compensation benchmarks for critical engineering roles',
      'Review pending offers before next hiring cycle',
      'Reassess retention packages for senior ICs',
    ],
    actionLabel: 'Recommended action',
  },
  {
    id: 'one-on-ones',
    chip: 'Upcoming 1:1s',
    question: 'What should I discuss in upcoming 1:1s?',
    insights: [
      'Workload imbalance signals increasing in platform teams',
      'Career growth concerns surfacing across L3 engineering spans',
      'Compensation fairness discussions appearing frequently',
    ],
    actions: [
      'Career progression expectations',
      'Team workload balance',
      'Compensation alignment concerns',
      'Retention risk indicators',
    ],
    actionLabel: 'Recommended discussion areas',
  },
];
