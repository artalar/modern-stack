import type { Article } from '#entities/article/model/types'

export const articlesMockData = [
	{
		id: '1',
		title: 'Quarterly report',
		description: 'Revenue overview and growth metrics for Q3 across all regions.',
		status: 'done',
		content: [
			'Regional performance remained strongest in North America, where subscription renewals outpaced forecast by 6%.',
			'EMEA showed stable retention but slower new-customer acquisition in mid-market accounts due to longer procurement cycles.',
			'APAC growth accelerated in the second half of the quarter after onboarding two strategic channel partners.',
			'Gross margin improved as infrastructure costs declined after database workload rebalancing in production.',
			'The next planning cycle should prioritize conversion optimization in self-serve and pricing tests for annual plans.',
		],
	},
	{
		id: '2',
		title: 'Hiring plan',
		description: 'Engineering headcount proposal for the next two quarters.',
		status: 'in-progress',
		content: [
			'The proposal focuses on backend platform capacity first, then a second wave for product-facing full-stack teams.',
			'Staffing assumptions are based on current attrition trends and expected onboarding throughput from the recruiting team.',
			'Priority roles include staff-level backend engineers, one data engineer, and two product designers for core workflows.',
			'Interview loop timelines should be compressed to under 14 days to reduce offer-loss in competitive markets.',
			'Budget impact remains within target if start dates are phased across two quarters as planned.',
		],
	},
	{
		id: '3',
		title: 'Roadmap draft',
		description: 'Feature priorities and timeline estimates for the next product cycle.',
		status: 'draft',
		content: [
			'The roadmap draft groups work into reliability, onboarding, and collaboration themes to reduce parallel complexity.',
			'Reliability milestones include queue observability improvements and automated rollback guards for critical deploy paths.',
			'Onboarding work is centered around first-value time, with a guided setup flow and clearer sample data entry points.',
			'Collaboration scope includes comments, assignment metadata, and lightweight activity history in the detail panel.',
			'Any scope added after kickoff should be traded against lower-impact backlog items to preserve delivery confidence.',
		],
	},
	{
		id: '4',
		title: 'Security audit',
		description: 'Findings from the external penetration test and remediation steps.',
		status: 'in-progress',
		content: [
			'The external audit reported one high-severity issue tied to stale session invalidation across multiple tabs.',
			'Two medium findings were identified in API rate-limit behavior and missing hardening headers on legacy routes.',
			'The high-severity item is already mitigated in staging and awaiting final verification in production.',
			'Medium findings are queued for the next sprint with test coverage requirements added to the definition of done.',
			'Follow-up recommendations include recurring dependency review cadence and quarterly tabletop incident drills.',
		],
	},
	{
		id: '5',
		title: 'Design system update',
		description: 'Component inventory refresh and new token definitions.',
		status: 'draft',
		content: [
			'The inventory refresh identified duplicate button variants and inconsistent spacing tokens across form layouts.',
			'New semantic tokens are proposed for border emphasis, muted foreground states, and status badge contrast.',
			'Migration guidance will include codemods for deprecated props and examples for slot-based composition patterns.',
			'Documentation updates should ship with visual regression snapshots and accessibility notes per component.',
			'Adoption will be tracked with lint rules and monthly reporting for deprecated API usage.',
		],
	},
] satisfies Article[]
