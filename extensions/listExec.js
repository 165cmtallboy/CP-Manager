let kogList = [];

document.querySelectorAll(".courseCardName")
    .forEach(elm => {
        let link = elm.querySelector("a");
        if(!link)
            return;
        kogList.push({
            id: link.getAttribute("onclick").match(/formSubmit\('(.{16})'\)/)[1],
            name: elm.innerText
        })
    })

    