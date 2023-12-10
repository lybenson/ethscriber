export default function Logger(props: { logs: string[] }) {
  return (
    <div>
      {props.logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  )
}
