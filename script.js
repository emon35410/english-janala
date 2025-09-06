const createElement = (arr)=>{
    const htmlElement = arr.map(syno => `<span class="btn btn-sm btn-outline">${syno}</span>
`) 
    return htmlElement.join(" ")
}
const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then(res => res.json()) //promise of json data
        .then(json => displayData(json.data))
}
const removeActive = () => {
    const lessonButton = document.querySelectorAll(".lesson-btn-new")
    lessonButton.forEach((btn) => btn.classList.remove("active"));

}

const loadLevelWord = (id) => {
      
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    
        .then(res => res.json())
        .then(data => {
            removeActive()
            const clickButton = document.getElementById(`lesson-level-${id}`)
            clickButton.classList.add("active")
            displayLevelWord(data.data)
        })
}
const loadWordDetails = (id) => {
    const url = (`https://openapi.programming-hero.com/api/word/${id}`)
    fetch(url)
        .then(res => res.json())
        .then(details => displayloadWoraDetails(details.data))

}
const displayloadWoraDetails = (deatil) => {
    const detailsContainer = document.getElementById("details-container")

    detailsContainer.innerHTML = `
        <div>
        <div class="border-2 border-gray-200 bg-white rounded-xl shadow-md p-5 space-y-3 mb-4 ">
            <h1 class="text-2xl font-bold">${deatil.word} (<i class="fa-solid fa-microphone-lines"></i> : ${deatil.pronunciation})</h1>
            <h2 class="text-lg font-semibold">Meaning</h2>
            <h3 class="text-base">${deatil.meaning}</h3>
            <h2 class="text-lg font-semibold">Example</h2>
            <h3 class="italic text-base">${deatil.sentence}</h3>
            <h2 class="text-lg font-semibold">সমার্থক শব্দ গুলো</h2>
             <div>
              ${createElement(deatil.synonyms)}
             </div>
        </div>
        <button class="btn btn-primary">Complete Learning</button>
    </div>
    `
    document.getElementById("word_modal_5").showModal()

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ""
    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full ">
         <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="py-6 text-sm font-medium ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class=" text-4xl font-semibold">নেক্সট Lesson এ যান </h1>
        </div>
        `
        
    }
    words.forEach(word => {
        const cardDiv = document.createElement("div")
        cardDiv.innerHTML = `
        <div class="border-2  border-white bg-white rounded-lg p-5 shadow-md   mx-auto text-center space-y-[20px]">
          <h1 class="text-3xl font-bold">${word.word ? word.word : "The word is not found"}</h1>
        <p class="text-2xl text-sm font-medium">meaning / pronunciation</p>
        <h1 class="font-bangla  text-2xl font-semibold ">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "The word pronounciation is not found"}</h1>
        <div class="flex justify-between">
                <button onclick="loadWordDetails(${word.id})" class="btn hover:cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn hover:cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
            </div>
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
    <button id="lesson-level-${lesson.level_no}" onclick ="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn-new">
    <i class="fa-solid fa-book-open"></i>
    Lessson-${lesson.level_no}</button>
    `
        // 4. append into container
        levelContainer.append(btnDiv)


    })

}
loadData()










