
const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then(res => res.json()) //promise of json data
        .then(json => displayData(json.data))
}

const loadLevelWord =(id)=>{
    const url =`https://openapi.programming-hero.com/api/level/${id}`
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayLevelWord(data.data))
}
const displayLevelWord = (words)=>{
    console.log(words)

    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ""
    words.forEach(word =>{
        console.log(word)
        const cardDiv = document.createElement("div")
        cardDiv.innerHTML=`
        <div class="border-2  border-white bg-white rounded-lg p-5 shadow-md   mx-auto text-center space-y-[20px]">
          <h1 class="text-3xl font-bold">${word.word}</h1>
        <p class="text-2xl font-medium">${word.pronunciation}</p>
        <h1 class="font-bangla text-2xl font-semibold ">${word.meaning}</h1>
      </div>
        `
        wordContainer.append(cardDiv)
    })
}
const displayData = (data) => {
    console.log(data)
    // to display 
    // 1. get the container & empty the inner HTML 
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""
    // 2. get every product 
    data.forEach(lesson => {
        // 3. create Element
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
    <button onclick ="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>
    Lessson-${lesson.level_no}</button>
    `
        // 4. append into container
        levelContainer.append(btnDiv)


    })
    
}
loadData()










