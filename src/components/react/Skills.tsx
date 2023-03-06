import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from 'recharts';
import Blinker from './Blinker';

import styles from './Skills.module.css';

type TTooltipPayload = { payload: (typeof data)[number] }[] | undefined;
type TCustomTooltipProps = {
  active: boolean | undefined;
  payload: TTooltipPayload;
};

const data = [
  {
    name: 'TS',
    value: 85,
  },
  {
    name: 'React',
    value: 85,
  },
  { name: 'HTML', value: 85 },
  { name: 'CSS', value: 80 },
  { name: 'Python', value: 70 },
  { name: 'AWS', value: 70 },
  { name: 'Bash', value: 60 },
  { name: 'Java', value: 50 },
  { name: 'Kotlin', value: 50 },
];

export function CustomTooltip(props: TCustomTooltipProps) {
  const { active, payload } = props;

  if (!active || !payload || !payload.length) return null;

  const { name, value } = payload[0].payload;

  return (
    <div style={{ padding: '1rem', maxWidth: 400 }}>
      <h2>
        {name}: {value}%
      </h2>
    </div>
  );
}

export default function Skills() {
  return (
    <div className={styles.skillsWrapper}>
      <h1>
        Skills
        <Blinker />
      </h1>
      <p>
        &gt; I'm a frontend developer with full-stack experience.
        <br />
        &gt; I primarily use TypeScript, React and HTML/CSS in my day to day.
        &gt; I also have wide ranging experiences with orchestrating
        infrastructure in the AWS ecosystem.
        <br />
        &gt; Additionally, I also have experience with Python, Java, Kotlin
        building backend services.
        <br />
      </p>
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <ResponsiveContainer height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" hide tick />
            <YAxis
              type="category"
              width={150}
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
              wrapperStyle={{ backgroundColor: '#333' }}
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
