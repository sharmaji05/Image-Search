const accessKey = 'oiokzJulYRM58EOD5IQFx0zH_Sv4WP66mddA8dNw1uI'
const accesskey2 = 'https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY'
const searchForm = document.querySelector('form')
const imageContainer = document.querySelector('.images-container')
const searchInput = document.querySelector('.search-input')
const loadMoreButton = document.querySelector('.loadMoreButton')

let page = 1
const fetchImages = async (query,pageNo)=>{
    // const url = `https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY`
    if(pageNo==1){
        imageContainer.innerHTML = ''

    }
    const url = `https://api.unsplash.com/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()
  

    data.forEach(photo =>{
        const imageElement = document.createElement('div')
        imageElement.classList.add('imageDiv')
        imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`

        const overlayElement = document.createElement('div')
        overlayElement.classList.add('overlay')

        imageElement.appendChild(overlayElement)
        imageContainer.appendChild(imageElement)
    })
   
    if(data.total_pages === pageNo){
        loadMoreButton.style.display = "none"
    }
    else{
        loadMoreButton.style.display = "block"
    }
}


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
     const inputText = searchInput.value.trim()
     if(inputText !==''){
        page = 1
        fetchImages(inputText,page)
     }
     else{
        imageContainer.innerHTML = `<h2>Please enter a search query.</h2>`
     }
})
loadMoreButton.addEventListener('click',()=>{
    fetchImages(searchInput.value.trim(), ++page)
})