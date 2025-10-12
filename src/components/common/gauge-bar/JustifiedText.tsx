const JustifiedText = ({ text }: { text: string }) => (
  <>
    {[...text].map((char, index) => (
      <span className="inline-block" key={index}>
        {char}
      </span>
    ))}
  </>
)

export default JustifiedText
