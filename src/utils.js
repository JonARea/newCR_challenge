export const setChartSize = () => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return vw > vh ? vh / 3.5 : vw / 3.5
}

const isJSON = (data) => {
  try {
    const object = JSON.parse(data)
    return object && typeof object === 'object'
  } catch (error) {
    return false
  }
}

export const fetchUserData = () => {
  const file = document.getElementById('UploadJSONFile').files[0]

  const pastedData = document.getElementById('json').value
  if (file || isJSON(pastedData)) {
    return fetch('/api/data', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: file ? file : pastedData
    }).then(res => res.json())
  } else {
    return 'Not JSON'
  }
}
