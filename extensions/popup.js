function makeTd(val, tooltip){
    let td = document.createElement('td');
    let p = document.createElement('p');
    //p.innerText = val;
    //td.appendChild(p);
    if(tooltip){
        td.innerText = val.slice(0,8);
        td.setAttribute('valign', 'middle')
        td.setAttribute('data-toggle', 'tooltip');
    }else{
        td.innerText = val;
    }
    td.setAttribute('title', val);
    return td;
}

function remove(name){
    let data = {};
    data[name] = [];
    chrome.storage.sync.set(data, ()=>console.log('updated.'));

}

function insertElm(data, subjectName){
    let { title , status, deadLine } = data;
    let node = document.createElement('tr');
    let btn  = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-outline-danger');
    btn.innerText='削除';
    btn.setAttribute('data-key', subjectName);
    btn.onclick = () => remove(subjectName)

    node.appendChild(makeTd(subjectName, true));
    node.appendChild(makeTd(title,true));
    node.appendChild(makeTd(deadLine.replace('\n','')));
    node.appendChild(makeTd(status));
    node.appendChild(btn)
    document.querySelector('tbody').appendChild(node);
}

chrome.storage.onChanged.addListener(() => {
    reload();
})

function reload(){
    chrome.storage.sync.get(null, function(result) {
        document.querySelector('tbody').innerHTML = '';
        
        Object.keys(result).forEach(key => {
            console.log(result)
            
            result[key].forEach(obj => {
                if(obj.status !== '未参照' && obj.status !== '未提出')
                    return;
                
                if(obj.deadLine.includes('公開終了'))
                    return;

                insertElm(obj, key);
            });
        })
        $('[data-toggle="tooltip"]').tooltip()
    });

}

reload()