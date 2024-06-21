export const getCsr = async (studentId) => {
  const res = await fetch("/api/getschedules?student=" + studentId);
  if (!res.ok) {
    const er = await res.json();
    alert(er.message);
    return;
  }
  const csr = (await res.json()).csr;
  return csr;
};
