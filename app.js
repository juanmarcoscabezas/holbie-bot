const chat = document.getElementById('chat');
const question = document.getElementsByName('question')[0];

window.onload = async function() {
  //Scroll chat
  chat.scrollTop = chat.scrollHeight;

  // Add chat-bot message to chat
  let botMsg = await botAPI();
  botMsg = botMsg.result.fulfillment[0].message;
  question.value = '';
  const botInput = document.createElement('p');
  botInput.value = question.value;
  botInput.innerText = botMsg;
  botInput.classList.add('bot-msg');
  chat.appendChild(botInput);

  //Scroll chat
  chat.scrollTop = chat.scrollHeight;
}


async function askBot(e) {
  if (e !== undefined) {
    e.preventDefault();
  }

  // Add user message to chat
  const userInput = document.createElement('p');
  userInput.value = question.value;
  userInput.innerText = question.value;
  userInput.classList.add('user-msg');
  chat.appendChild(userInput);


  //Scroll chat
  chat.scrollTop = chat.scrollHeight;

  // Add chat-bot message to chat
  let botMsg = await botAPI(question.value);
  console.log(botMsg);
  botMsg = botMsg.result.fulfillment[0].message;
  question.value = '';
  const botInput = document.createElement('p');
  botInput.value = question.value;
  botInput.innerText = botMsg;
  botInput.classList.add('bot-msg');
  chat.appendChild(botInput);

  //Scroll chat
  chat.scrollTop = chat.scrollHeight;
}

async function botAPI(question) {
  const data = {
    "sessionId": "1034021451",
    "storyId": "5eb30893795b7c000781fb41",
  };
  if (question !== undefined) {
    data.query = question;
  } else {
    data.trigger = "welcome";
  }

  const params = {
    method: 'POST',
    headers: {
      'authorization': 'Bearer HVY2l2_kgSpYw1igrsDH51uOdeGyIWIk',
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('https://api.chatbot.com/query', params);
  const json = await response.json();
  return json;
}