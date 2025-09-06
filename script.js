
const loadData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then(res => res.json()) //promise of json data
        .then(json => displayData(json.data))
}
const displayData = (data) => {
    console.log(data)
    // to display 
    // 1. get the container & empty the inner HTML 



    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""
    // 2. get every product 
    data.forEach(lessson => {
        console.log(lessson)
        // 3. create Element
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
    <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lessson.level_no}</button>
    `
        // 4. append into container
        levelContainer.append(btnDiv)


    })
}
loadData()









