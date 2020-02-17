$(document).ready(function () {
  activeRoute()
  $('.nav__link').click(({ target }) => {
    const page = $(target)
      .text()
      .toLowerCase()
    activeRoute(`#${page}`)
  })
})

function activeRoute (page = location.hash) {
  changeRoute(page)
}

function changeRoute (page) {
  switch (page) {
    case '#films':
      RouterFilms()
      break
    case '#people':
      RouterPeople()
      break
    case '#starships':
      RouterStarsShips()
      break
    default:
      RouterFilms()
      break
  }
}

// ROUTERS FUNCTION

async function RouterFilms () {
  loading()
  let items = []
  location.hash = '#films'
  showActiveLink(location.hash)
  const data = await getItems(location.hash.slice(1))
  items = [...data]
  createListItems(items)
}
async function RouterPeople () {
  loading()
  let items = []
  location.hash = '#people'
  showActiveLink(location.hash)
  const data = await getItems(location.hash.slice(1))
  items = [...data]
  createListItems(items)
}
async function RouterStarsShips () {
  loading()
  let items = []
  location.hash = '#starships'
  showActiveLink(location.hash)
  const data = await getItems(location.hash.slice(1))
  items = [...data]
  createListItems(items)
}

// FETCH API

const BASE_URL = 'https://swapi.co/api/'
const typesCategory = {
  people: 'people/',
  starships: 'starships/',
  films: 'films/'
}
const search = '?search='

async function getItems (category, searchValue = '') {
  const response = await axios
    .get(`${BASE_URL}${typesCategory[category]}${search}${searchValue}`)
    .then(data => data.data.results)
  return await response
}

// CHANGE LINK STYLES

function showActiveLink (activeCategory) {
  $('.active').removeClass('active')
  $(`${activeCategory}`).addClass('active')
  $('#input-search-js').val('')
}

function createListItems (items) {
  $('#root').html('')

  let ul = document.createElement('ul')
  $(ul).addClass('list')
  $(ul).appendTo('#root')
  items.map(item => {
    const li = document.createElement('li')
    $(li).addClass('list__item')
    if (item.name) {
      li.innerText = item.name
    }
    if (item.title) {
      li.innerText = item.title
    }
    $(li).appendTo(ul)
  })
}

// SEARCH BY VALUE

$('#button-search-js').click(function (e) {
  e.preventDefault()
  loading()
  const value = $('#input-search-js').val()
  searchItem(value)
})

async function searchItem (value) {
  let items = []
  let category = location.hash.slice(1)
  let data = await getItems(category, value)
  items = [...data]
  createListItems(items)
}

// LOADING

function loading () {
  $('#root').html('')
  let loading = document.createElement('h3')
  loading.innerText = 'Loading...'
  $(loading).addClass('loading')
  $(loading).appendTo('#root')
}
