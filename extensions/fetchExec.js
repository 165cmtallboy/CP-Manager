let title = document.querySelector(".courseName").innerText.replace(/\s/g, '');

// 教材取得
let elms = document.querySelectorAll(".kyozai_table > table .tableFixedSet > tbody > tr");

let subjects = [];

elms.forEach(elm => {
    // タイトルを弾く
    if(!elm.getAttribute("id")?.includes("ryogyoCheck")) 
        return;
    
    // レポート以外を弾く
    if(!elm.querySelector(".kyozaititleCell").getAttribute("id").includes("REP"))
        return;

    subjects.push(elm)
});

let resuslts = [];

subjects.forEach(elm => {
    let title = elm.querySelector(".kyozaititleCell");
    let [deadLine, status] = elm.querySelectorAll(".jyugyeditCell");
    resuslts.push({
        deadLine: deadLine.innerText,
        status: status.innerText.replace(/\s/g, ''),
        title: title.innerText.replace(/\s/g, '')
    })
})

console.log(resuslts);

let result = {};
result[title] = resuslts;
chrome.storage.sync.set(result, () => console.log('updated.'));