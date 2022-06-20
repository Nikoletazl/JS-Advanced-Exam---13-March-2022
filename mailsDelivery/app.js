function solve() {
    const input = {
        recipientName: document.getElementById('recipientName'),
        title: document.getElementById('title'),
        message: document.getElementById('message')
    }

    const lists = {
        listMails: document.getElementById('list'),
        sentMails: document.querySelector('.sent-list'),
        deleteMails: document.querySelector('.delete-list'),
    }

    const addBtn = document.getElementById('add')
    addBtn.addEventListener('click', add)
    const resetBtn = document.getElementById('reset')
    resetBtn.addEventListener('click', reset)

    function add(event) {
        event.preventDefault()

        let recipientName = input.recipientName.value
        let title = input.title.value
        let message = input.message.value

        if (recipientName == '' || title == '' || message == '') {
            return
        }

        let li = document.createElement('li')
        li.innerHTML = `
            <h4>Title: ${title}</h4>
            <h4>Recipient Name: ${recipientName}</h4>
            <span>${message}</span>
            <div id="list-action">
                <button type="submit" id="send">Send</buton>
                <button type="submit" id="delete">Delete</buton>
            </div>`

        let sendBtn = li.querySelector('#send')
        sendBtn.addEventListener('click', send)
        let deleteBtn = li.querySelector('#delete')
        deleteBtn.addEventListener('click', onDeleteLists)

        lists.listMails.appendChild(li)

        function send() {
            let li = document.createElement('li')
            li.innerHTML = `
                <span>To: ${recipientName}</span>
                <span>Title: ${title}</span>
                <div class="btn">
                    <button type="submit" class="delete">Delete</button>
                </div>
            `
            let deleteBtn = li.querySelector('.delete')
            deleteBtn.addEventListener('click', onDeleteSent)

            lists.sentMails.appendChild(li)

        }

        function onDeleteLists(e) {
            let li = document.createElement('li')
            li.innerHTML = `
                <span>To: ${recipientName}</span>
                <span>Title: ${title}</span>
            `
            lists.deleteMails.appendChild(li)
            lists.listMails.innerHTML = ''
            e.target.parentElement.parentElement.remove()
        }

        function onDeleteSent(e) {
            let li = document.createElement('li')
            li.innerHTML = `
                <span>To: ${recipientName}</span>
                <span>Title: ${title}</span>
            `
            lists.deleteMails.appendChild(li)
            e.target.parentElement.parentElement.remove()
        }
    }

    function reset(event) {
        event.preventDefault()

        input.recipientName.value = ''
        input.title.value = ''
        input.message.value = ''
    }
}
solve()