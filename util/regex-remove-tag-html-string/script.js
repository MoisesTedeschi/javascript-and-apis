let htmlString = `<font style='vertical-align: inherit;'>
                    <font style='vertical-align: inherit;'>var animais = ['cachorro', 'gato', 'galinha'];</font>
                    <font style='vertical-align: inherit;'>animais[100] = 'raposa';</font>
                    <font style='vertical-align: inherit;'>console.log(animais.length);</font>
                </font>`;

let removeTags = htmlString.replace(/(<([^>]+)>)/gi, "");

console.log(removeTags);