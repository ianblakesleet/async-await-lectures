'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

////////////////////////////////////////
const renderCountry = (data, className = '') => {
  const html = `
            <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} Million</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>>${
                data.currencies[0].name
              }</p>
            </div>
          </article>
  `
  countriesContainer.style.opacity = 1
  countriesContainer.insertAdjacentHTML('beforeend', html)
}
// const getCountryAndNeighbour = country => {
//   //old way of making http request using XML, to show off how it is asyncronous code.
//   const request = new XMLHttpRequest()
//   request.open('GET', `https://restcountries.com/v2/name/${country}`)
//   //make request
//   request.send()
//   //send request
//   request.addEventListener('load', () => {
//     //   console.log(request.responseText)
//     //   console.log(this.responseText) this way of writing also work
//     const [data] = JSON.parse(request.responseText)
//     console.log(data)
//     //get country 1
//     renderCountry(data)
//     //now get neighbor country
//     const [neighbour] = data.borders
//     if (!neighbour) return
//     //ajax call 2 for the neighbor
//     const request2 = new XMLHttpRequest()
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`)
//     request2.send()
//     request2.addEventListener('load', () => {
//       const data2 = JSON.parse(request2.responseText)
//       console.log(data2)
//       renderCountry(data2, 'neighbour')
//     })
//   })
//   //listen for request to come or 'load' to then do something with data.
// }

// // getCountryAndNeighbour('usa')
// const request = new XMLHttpRequest()
// request.open('GET', `https://restcountries.com/v2/name/${country}`)
// //make request
// request.send()

// const request = fetch('https://restcountries.com/v2/name/portugal')
// console.log(request)

// const getCountryData = country => {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(res => {
//       console.log(res)
//       //to access data we need to call json() method, but that returns a promise, so we have
//       //to call a second .then to handle that promise and read data
//       return res.json()
//     })
//     .then(data => {
//       console.log(data)
//       renderCountry(data[0])
//     })
// }
const getJSON = (url, errorMsg = 'Something went wrong') => {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`)

    return res.json()
  })
}
const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg)
}
// const getCountryData = country => {
//   //country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(res => {
//       console.log(res)
//       //manual throw error
//       if (!res.ok) throw new Error('country not valid/found')

//       return res.json()
//     })
//     .then(data => {
//       renderCountry(data[0])
//       const neighbour = data[0].borders?.[0]
//       //country 2 (neighbour)fetch
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}😢🥵`)
//       renderError(`something went wrong 😢🥵 ${err.message} try again`)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1
//     })
// }

// const getCountryData = country => {
//   //country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'country not found')
//     .then(data => {
//       renderCountry(data[0])
//       const neighbour = data[0].borders?.[0]
//       if (!neighbour) throw new Error('no neighbour found')
//       //country 2 (neighbour)fetch
//       return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`)
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}😢🥵`)
//       renderError(`something went wrong 😢🥵 ${err.message} try again`)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1
//     })
// }

// btn.addEventListener('click', () => {
//   getCountryData('portugal')
// })

// const whereAmI = (lat, lng) => {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`)
//       return res.json()
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`)
//       getCountryData(`${data.country}`)
//     })
//     .catch(err => {
//       console.error(`${err.message} 💥💥💥`)
//     })
// }
// whereAmI('52.508', '13.381')

// const whereAmI = async country => {
//   try {
//     const res = await fetch(`https://restcountries.com/v2/name/${country}`)
//     const data = await res.json()
//     console.log(data)
//     renderCountry(data[0])
//   } catch (err) {
//     console.log(err)
//   }
// }
// console.log('1: Will get location')

// whereAmI('Portugal')

// console.log('3: Finished getting location')

/// running all three promises parrallel in a Promise.all, rather than waiting for each...
const get3Countries = async () => {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/portugal`),
      getJSON('https://restcountries.com/v2/name/japan'),
      getJSON('https://restcountries.com/v2/name/sweden'),
    ])
    console.log(data.map(item => item[0].capital))
  } catch (err) {
    console.log(err)
  }
}
get3Countries()
