fetch('/wheather?address=boston').then((res) => {
  res.json().then((data) => {
    if(data.error) {
      console.error(data.error)
      return
    }
    console.log(data)
  })
})

document.getElementById('input-search').addEventListener('keyup', (event) => {
  if(event.keyCode !== 13) {
    return
  }
  document.getElementById('input-result').innerText = 'Loading...'
  fetch(`/wheather?address=${event.target.value}`).then((res) => {
    res.json().then((data) => {
      if(data.error) {
        document.getElementById('input-result').innerText = data.error
        return
      }
      document.getElementById('input-result').innerText = data.forecast
    })
  })
})