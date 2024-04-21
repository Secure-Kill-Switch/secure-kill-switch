export const shortenId = (id: string) => {
  return id.slice(0, 8) + "..." + id.slice(-8);
};
