function makeParagraph() {
    let p = document.createElement('p');
    p.innerText = 'KILL YOURSELF';

    let body = document.body;
    body.appendChild(p);

    setTimeout(makeParagraph, 3000);
}


makeParagraph();