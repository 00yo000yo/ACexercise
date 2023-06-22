
const BASE_URL = 'https://webdev.alphacamp.io/api/lyrics/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}


let songHTML=''
songHTML += `<div class="d-flex align-items-start">

  <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">`

for(let i=0;i<album.tracks.length;i++){
  songHTML += `      
  <button class="nav-link text-sm-start" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">${album.tracks[i]}</button>   
    `  
}
songHTML += `  </div>
</div>`
songList.innerHTML=songHTML

songList.addEventListener('click',function(a){
  let index =album.tracks.indexOf(a.target.innerText)
  console.log(index)
   axios.get(`https://webdev.alphacamp.io/api/lyrics/Adele/${a.target.innerText}.json`)  
  .then(function(response){
     lyricsPanel.innerHTML= `
       <p class="h1">${a.target.innerText}</p>
       ${response.data.lyrics.replaceAll(/\r\n|\n\n/g,"<br>")}
       
       `

   })
  .catch(function(erroe){console.log("error")})


})
  
  
  
  

