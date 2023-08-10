const timestampDate = (timestamp: Date | undefined) => {
  const date = new Date(timestamp!);

  function formatDate(date: Date): string {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const formattedDate = formatDate(date);

  return formattedDate;
};

export default timestampDate;
