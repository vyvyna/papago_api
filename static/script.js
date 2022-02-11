const textAreaArray = document.querySelectorAll('textarea');

const [source_textArea, target_textArea] = textAreaArray;

const select = document.querySelectorAll('select')[1];

// 번역할 언어 타입
let target_language = "en";

// 번역할 언어가 바뀔 때마다 값 변경
select.addEventListener('change', () => {
    // 화살표 함수
    const selectedIndex = select.selectedIndex;
    // console.log(select.options[selectedIndex].value);
    target_language = select.options[selectedIndex].value;
});

let debouncer;

source_textArea.addEventListener('input', (event) => {
    // console.log('keyboard input 이벤트 발생.');
    // console.log(event.target.value);

    if(debouncer) {
        clearTimeout(debouncer);
    }

    // debouncer = setTimeout(() => {}, 1000); // 1000ms = 1s
    debouncer = setTimeout(() => {
        const text = event.target.value;
        const Xhttp = new XMLHttpRequest();
        const url = "/translate"

        Xhttp.open("POST", url);
        Xhttp.setRequestHeader("Content-type", "application/json");

        // 받아온 데이터를 html 화면에 추가하는 부분.
        Xhttp.onreadystatechange = () => {
            if (Xhttp.readyState == 4 && Xhttp.status == 200) {
                console.log(typeof Xhttp.responseText);

                const data = Xhttp.responseText;
                console.log('데이터', data);
                console.log(typeof data);

                const parsedToJSON = JSON.parse(data);
                console.log(typeof parsedToJSON, parsedToJSON);

                target_textArea.value = decodeURIComponent(unescape(parsedToJSON.translated_text)); // unescape
            }
        }

        const data = {
            text,
            target_language
        }

        json_to_str = JSON.stringify(data);
        console.log(typeof json_to_str);
        Xhttp.send(json_to_str);

    }, 3000);
}); 