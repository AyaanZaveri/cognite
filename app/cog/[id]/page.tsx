async function getCogs(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cog/info?id=${id}`);
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const cogs = await getCogs(id);

  return (
    <div
      style={{
        paddingLeft: 240,
      }}
    >
      <h1>{JSON.stringify(cogs)}</h1>
    </div>
  );
}
