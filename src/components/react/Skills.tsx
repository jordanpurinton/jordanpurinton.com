import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Cell,
	Tooltip,
} from 'recharts';
import NeonText from './NeonText';

import styles from './Skills.module.css';

type TTooltipPayload = { payload: (typeof data)[number] }[] | undefined;
type TCustomTooltipProps = {
	active: boolean | undefined;
	payload: TTooltipPayload;
};

const ADVANCED = 'Advanced';
const INTERMEDIATE_TO_ADVANCED = 'Intermediate to Advanced';
const INTERMEDIATE = 'Intermediate';
const BEGINNER_TO_INTERMEDIATE = 'Beginner to Intermediate';

const data = [
	{
		name: 'TS/JS',
		level: ADVANCED,
		value: 85,
	},
	{
		name: 'React',
		level: ADVANCED,
		value: 85,
	},
	{ name: 'HTML', level: INTERMEDIATE_TO_ADVANCED, value: 80 },
	{ name: 'CSS', level: INTERMEDIATE, value: 80 },
	{ name: 'Python', level: INTERMEDIATE, value: 70 },
	{ name: 'AWS', level: INTERMEDIATE, value: 70 },
	{ name: 'Bash', level: INTERMEDIATE, value: 60 },
	{ name: 'Java', level: BEGINNER_TO_INTERMEDIATE, value: 50 },
	{ name: 'Kotlin', level: BEGINNER_TO_INTERMEDIATE, value: 50 },
];

function CustomTooltip(props: TCustomTooltipProps) {
	const { active, payload } = props;

	if (!active || !payload || !payload.length) return null;

	const { name, value, level } = payload[0].payload;

	return (
		<div style={{ background: '#222', padding: '0.5rem', maxWidth: 400 }}>
			<b>
				{name} - {value}/100
			</b>
			<p>{level}</p>
		</div>
	);
}

export default function Skills() {
	return (
		<div>
			<h2>
				<NeonText content="Skills" />
			</h2>
			<p>
				&gt; I&apos;m a frontend developer with full-stack experience.
				<br />
				<br />
				&gt; I primarily use TypeScript, React and HTML/CSS in my day to day.
				<br />
				<br />
				&gt; I have wide ranging experiences with orchestrating infrastructure
				in the AWS ecosystem.
				<br />
				<br />
				&gt; On the backend side of things, I have experience with Python, Java,
				and Kotlin building backend services and tooling.
				<br />
				<br />
			</p>
			<div className={styles.responsiveChartContainer}>
				<ResponsiveContainer height={300}>
					<BarChart data={data} layout="vertical">
						<XAxis type="number" hide tick />
						<YAxis
							type="category"
							width={80}
							dataKey="name"
							tick={({ x, y, payload }) => (
								<text
									x={x}
									y={y}
									dy={8}
									textAnchor="end"
									fill="#666"
									fontSize="1.2rem"
								>
									{payload?.value}
								</text>
							)}
						/>
						<Tooltip
							cursor={{ fill: '#333' }}
							content={({ active, payload }) => (
								<CustomTooltip
									active={active}
									payload={payload as TTooltipPayload}
								/>
							)}
						/>
						<Bar barSize={10} dataKey="value">
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill="var(--primary-color)" />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
