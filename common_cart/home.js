
// const Data = null;
async function getTabData() {
    let Url = await chrome.tabs.query({ currentWindow: true, active: true },);
    const tabURL = Url[0].url
    const title = Url[0].title
    // return [tabURL, title];
    return {
        tabURL: tabURL,
        title: title,
    };
}

async function productData(url, title) {
    console.log(url);
    const resp = await fetch(`http://localhost:3000/scraperCC/${title}?url=${url}`, {
        method: "GET"
    });

    const Data = await resp.json();

    return {
        name: Data.productName,
        price: Data.price,
        img: Data.img,

    }
}


const addNewItem = async () => {
    loader();
    let tabData = await getTabData();
    console.log(tabData);
    // console.log(pData);
    if (tabData.title.includes("Amazon.in")) {
        tabData.title = "Amazon.in"
    } else if (tabData.tabURL.includes("nike.com")) {
        tabData.title = "nike.com"
    } else if (tabData.tabURL.includes("mamaearth.in")) {
        tabData.title = "mamaearth.in"

    }
    let product = await productData(tabData.tabURL, tabData.title);
    let newItem = {
        id: "",
        img: product.img,
        name: product.name,
        price: product.price,
        url: tabData.tabURL,
        title: tabData.title,
    }
    await loadData(newItem);
    showData();
}
const addBtn = document.getElementById('addbtn');
addBtn.addEventListener("click", () => {
    addNewItem();
})
const deletebtn = document.getElementById('deletebtn');
deletebtn.addEventListener("click", () => {
    deleteData();
})

const loadData = async (newItem) => {

    let data = await JSON.parse(localStorage.getItem("mainData"));
    newItem.id = data.length;
    data.push(newItem)
    // console.log(data.length);
    localStorage.setItem("mainData", JSON.stringify(data));
    // console.log(data)
    // Retrieve
};

const loader = () => {
    let container = document.getElementById('container');
    let card = document.createElement("card");
    card.innerHTML = `<div class="card">
    
    <div class="img"><img  class="cardimage skeleton"></div>
    <div class="Pdetails">
    <div class="title skeleton">
        
    </div>

    <div class="skeleton p" style="width:80px"> </div>
    <div class="skeleton p"> </div>
    <div class="skeleton p"> </div>
    <div class="skeleton p" style="width:40px"> </div>
</div>
<div class="icon">
<button class="deleteOne" value="" ><img class="i1" 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC90lEQVR4nO1bu24TQRSdBBCQHvgA8gFEfAXPmhC+AbAdKQ1ot6QAChASCRIBQgHbebXnrF1tQ2kJaHkEKVAA4iHyA4OuvIlGKwvZsw/v4jnSLWfm3jv3cey5q1SJ6PV6iyRXSa5ZyqrsoZoKAB9I6pzyTjUVAN7PtAN6vd4igJsAbtlIFEU3SJ6cth0ODrOOMAwX4ji+CKCdo6VVJS3RVXTObbjWeg5Ah+TvAqp51SI6t8SGPMY/r4EhuQTAlpUTMLx5c7OPANZtW1qFIjpuZ3S/PpHxYRguZML+cZIkR1RDILoC2DT0/xUEwdGxNyB5wbz5JhmfccJ+JMRxfG7sxRz+gNnLoYeqoSC5YdjRtsp/AOuqoSD5yLCjM9MpAOC8dREEsNkkJ6TGPzH0/zExMSLZyvTT7TSn1mouGwA+5WqDBhHamjaRKUCeep43r2ygtZ4T70kfbSAD/BnH8VVrKmxCSIQUEUmLGjC9kULylUncJiI+/wMA+Mbt+2rWAOcAlBsBnufNk7wiUkhhaVoEcGj8XpFZUbPmANQ8x2rpAM8ybWzW1dIBtEwbm3W1dAAslaryrLHhHAAXAb5LAboaoF0RpOsC2rVBOB7gl8UdquYcY8PxADge4DseQMcDtOMBdDxAOx4AxwP8srhD1ZxjbDgeAMcDfMcDONs8oGP8V3+7bu8CJO9YjcSNiziOlw2lXkwwYbIC4PIkL0M26wAEhn6XVNGIoui0ccBX67mbEhAEwQEA3w39lgo/RA9v5YsRZmdUTSBjsIZeO6U93wO4a3j5dZIkB9WUMRgMDgF4O2l9sgLJYwD+GN6+p6YMAA8M43e73e6Jsg9sZ0bS7k8jEtKbN42XC7lW+sF6xJckAN6QPCvFqOzz5QzJ+UzYizxTVYHk4VGf0wD4RvJlWisKHYGVPaXVZar9vvGik6oSetgVZJ54N89EZx6RelRJ2P8L/X7/uLAwAJ8rNHxHqr0UZVUX6GFELKWMsfCR2vR7wOUoik4V2ef/Angnau8re8+eAAAAAElFTkSuQmCC">
        </button>
        <a " target="_blank"><img class="i1"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nO3WsUpDMRQG4FAQJzdB6OTgAzjo6NSpq130HayvkMH6EE76CMn5/9w7WboIFu4zCApO4iaCKCoXKoTjak7l0h8yf+TkJDnOrfKfAmBK8mux5iGEDROYZJPB7Yre+15xuK7rbZJPOQ5g4iwC4IDkWwZ/kjw2wUmOVclfRWTfCr9Q+GMIoV8cbppmjeRMnfdNVVXrxXER2SR5p3Z+5SxCchfAi8LHVvjhort/4I+U0tAEBzBR5/0cY9wpDnvve+1Lpko+7y5M8ty81CmlUd5cAN5FZGB+nQCcFEVjjFskHxR62c0nk78/ifu2AqXRU/0tppT2iqIiMmi7Nh8EABwtY/Q5c50d9gBcZzu9NRtvV3F/kG/aapiWGs1bXgAAAABJRU5ErkJggg==">
        </a>
        </div>
    </div>`

    container.appendChild(card);
}

const showData = async (animation) => {
    let container = document.getElementById('container');
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    let data = await JSON.parse(localStorage.getItem("mainData"));
    data.map((element, i) => {

        const card = document.createElement("card");
        card.innerHTML = `<div class="card ${animation}">
<div class="img">
    <img src="${element.img}" alt="img not support" class="cardimage">
</div>
<div class="Pdetails">
    <span class="title">
        ${element.title}
    </span>

    <P>${element.name}<br><span>${element.id}</span></P><span>${element.price}</span>
</div>
<div class="icon">
<button class="deleteOne" value="${i}" ><img class="i1" 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC90lEQVR4nO1bu24TQRSdBBCQHvgA8gFEfAXPmhC+AbAdKQ1ot6QAChASCRIBQgHbebXnrF1tQ2kJaHkEKVAA4iHyA4OuvIlGKwvZsw/v4jnSLWfm3jv3cey5q1SJ6PV6iyRXSa5ZyqrsoZoKAB9I6pzyTjUVAN7PtAN6vd4igJsAbtlIFEU3SJ6cth0ODrOOMAwX4ji+CKCdo6VVJS3RVXTObbjWeg5Ah+TvAqp51SI6t8SGPMY/r4EhuQTAlpUTMLx5c7OPANZtW1qFIjpuZ3S/PpHxYRguZML+cZIkR1RDILoC2DT0/xUEwdGxNyB5wbz5JhmfccJ+JMRxfG7sxRz+gNnLoYeqoSC5YdjRtsp/AOuqoSD5yLCjM9MpAOC8dREEsNkkJ6TGPzH0/zExMSLZyvTT7TSn1mouGwA+5WqDBhHamjaRKUCeep43r2ygtZ4T70kfbSAD/BnH8VVrKmxCSIQUEUmLGjC9kULylUncJiI+/wMA+Mbt+2rWAOcAlBsBnufNk7wiUkhhaVoEcGj8XpFZUbPmANQ8x2rpAM8ybWzW1dIBtEwbm3W1dAAslaryrLHhHAAXAb5LAboaoF0RpOsC2rVBOB7gl8UdquYcY8PxADge4DseQMcDtOMBdDxAOx4AxwP8srhD1ZxjbDgeAMcDfMcDONs8oGP8V3+7bu8CJO9YjcSNiziOlw2lXkwwYbIC4PIkL0M26wAEhn6XVNGIoui0ccBX67mbEhAEwQEA3w39lgo/RA9v5YsRZmdUTSBjsIZeO6U93wO4a3j5dZIkB9WUMRgMDgF4O2l9sgLJYwD+GN6+p6YMAA8M43e73e6Jsg9sZ0bS7k8jEtKbN42XC7lW+sF6xJckAN6QPCvFqOzz5QzJ+UzYizxTVYHk4VGf0wD4RvJlWisKHYGVPaXVZar9vvGik6oSetgVZJ54N89EZx6RelRJ2P8L/X7/uLAwAJ8rNHxHqr0UZVUX6GFELKWMsfCR2vR7wOUoik4V2ef/Angnau8re8+eAAAAAElFTkSuQmCC">
        </button>
        <a href="${element.url}" target="_blank"><img class="i1"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nO3WsUpDMRQG4FAQJzdB6OTgAzjo6NSpq130HayvkMH6EE76CMn5/9w7WboIFu4zCApO4iaCKCoXKoTjak7l0h8yf+TkJDnOrfKfAmBK8mux5iGEDROYZJPB7Yre+15xuK7rbZJPOQ5g4iwC4IDkWwZ/kjw2wUmOVclfRWTfCr9Q+GMIoV8cbppmjeRMnfdNVVXrxXER2SR5p3Z+5SxCchfAi8LHVvjhort/4I+U0tAEBzBR5/0cY9wpDnvve+1Lpko+7y5M8ty81CmlUd5cAN5FZGB+nQCcFEVjjFskHxR62c0nk78/ifu2AqXRU/0tppT2iqIiMmi7Nh8EABwtY/Q5c50d9gBcZzu9NRtvV3F/kG/aapiWGs1bXgAAAABJRU5ErkJggg==">
        </a>
        </div>`
        container.appendChild(card);
    })
    hello()
}
showData("add");
const deleteData = async () => {
    let data = await JSON.parse(localStorage.getItem("mainData"));
    data.length = 0;
    // console.log(data.length);
    localStorage.setItem("mainData", JSON.stringify(data));

    showData();
    // Retrieve
}
function hello() {

    const deleteOnebtn = document.querySelectorAll(".deleteOne");
    // console.log(deleteOnebtn)
    for (let i = 0; i < deleteOnebtn.length; i++) {
        deleteOnebtn[i].addEventListener("click", () => {
            deleteOne(deleteOnebtn[i].value);
        })
    }
}

const deleteOne = async (index) => {
    let data = await JSON.parse(localStorage.getItem("mainData"));
    data.splice(index, 1);
    localStorage.setItem("mainData", JSON.stringify(data));
    showData();
}

