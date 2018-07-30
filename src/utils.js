export const setChartSize = () => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return vw > vh ? vh / 3.5 : vw / 3.5
}
