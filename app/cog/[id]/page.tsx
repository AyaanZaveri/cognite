export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div
      style={{
        paddingLeft: 240,
      }}
    >
      <h1>{JSON.stringify(params)}</h1>
    </div>
  );
}
