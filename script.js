const Data = ["heart-1.svg","heart.svg"];
const main = document.querySelector(".main");
const previewer = document.querySelector(".previewer");
const previewerExit = document.querySelector(".previewer__exit");
const previewerPreviewer = document.querySelector(".previewer__previewer img");
const previewerPreviewerName = document.querySelector(".previewer__previewer p");
const optionPrevious = document.querySelector("#previous");
const optionNext = document.querySelector("#next");

let currentIndex = Data.length -1;



function clickedItem(e, index) {
    currentIndex = index;

    // show previewer
    fPreviewer();
    previewer.classList.add("show");
};


async function fMain() {
    // generating html add uploading
    main.innerHTML = await Data.map(item => `
        <div class="main__item">
            <img src="./svg/${item}"/>
            <p>${item}</p>
        </div>`
    ).join('\n');

    // adding item click event
    document.querySelectorAll(".main__item")
        .forEach((item, index)=> item.addEventListener("click", (e) => clickedItem(e, index)));
    
        // previewer hide event
    [previewerPreviewer, previewerExit].forEach(element => element.addEventListener("click", () => previewer.classList.remove("show")));
};



function fPreviewer() {
    // Update Screen
    updatePreviewerScreen(Data, currentIndex);

    // Previous
    optionPrevious.addEventListener("click", () => {
        // are we in the box
        (currentIndex > 0) ?
            currentIndex -= 1
            :currentIndex = Data.length -1;
        updatePreviewerScreen(Data, currentIndex);
    });
    // Next 
    optionNext.addEventListener("click", () => {
        // are we in the box
        (currentIndex < Data.length-1) ?
            currentIndex += 1
            :currentIndex = 0;
        updatePreviewerScreen(Data, currentIndex);
    });
};

function updatePreviewerScreen(data, index) {
    previewerPreviewer.src = `http://127.0.0.1:5500/svg/${data[index]}`;
    previewerPreviewerName.innerText = data[index];
};

fMain();