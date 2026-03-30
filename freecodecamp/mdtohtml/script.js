const input = document.getElementById("markdown-input");
const output = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown(textInput){
    let html = textInput;

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

    return html;
}

input.addEventListener('input', function(){
    const text = input.value;

    const html = convertMarkdown(text);
    console.log(html);

    output.textContent = html;
    preview.innerHTML = html;
})