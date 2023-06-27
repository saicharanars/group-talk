var api = "http://localhost:4000/";
var msglength = 0;
const storedchatslength = 10;
document.addEventListener("DOMContentLoaded", async () => {
  // const resp = await axios.get(`${api}get-messages`);
  // const newMessages = resp.data.data;
  // console.log(newMessages,"after api call")
  // const chats=newMessages.splice(newMessages.length-storedchatslength);
  // localStorage.setItem("chats", JSON.stringify(chats));
  try {
    // Retrieve messages from local storage
    const storedMessages = JSON.parse(localStorage.getItem("chats")) || [];
    console.log(storedMessages);
    const lastStoredMessage =
      storedMessages.length > 0
        ? storedMessages[storedMessages.length - 1]
        : -1;
    console.log(lastStoredMessage, ">>>>>>>");
    //console.log(storedMessages,"local storage")
    // Make a request to the server for new messages
    const resp = await axios.get(
      `${api}get-messages?after=${lastStoredMessage.id}`
    );
    const newMessages = resp.data.data;
    console.log(newMessages, "after api call");
    const allmessages = [...storedMessages, ...newMessages];
    const chats = allmessages.splice(allmessages.length - storedchatslength);
    console.log(allmessages, "allmesg>>>>", chats, "chats>>>>>");
    //localStorage.setItem("chats", JSON.stringify(chats));
    console.log(chats);
    chats.forEach((chat) => {
      const parent = document.getElementById("chatui");
      const child = document.createElement("div");
      child.className = "col-start-1 col-end-8 p-3 rounded-lg";
      const innerchild = document.createElement("div");
      innerchild.className = "flex flex-row items-center";
      const avatar = document.createElement("div");
      avatar.className =
        "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0";
      avatar.innerText = "A";
      const messageouter = document.createElement("div");
      messageouter.className =
        "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl";
      const messagetext = document.createElement("div");
      messagetext.textContent = chat.message;
      messageouter.appendChild(messagetext);
      innerchild.append(avatar);
      innerchild.append(messageouter);
      child.append(innerchild);
      parent.append(child);
      msglength = chat.id;
    });
    console.log(JSON.stringify([...storedMessages, ...newMessages]), ">>>>>>");
    console.log(msglength);
  } catch (error) {
    console.error("An error occurred:", error);
  }

  setInterval(async () => {
    try {
      // Retrieve messages from local storage
      const storedMessages = JSON.parse(localStorage.getItem("chats")) || [];
      const lastStoredMessage =
        storedMessages.length > 0
          ? storedMessages[storedMessages.length - 1]
          : -1;
      console.log(lastStoredMessage.id, "lastStoredMessage>>>>>>");
      // Make a request to the server for new messages
      const resp = await axios.get(
        `${api}get-messages?after=${lastStoredMessage.id}`
      );
      const newMessages = resp.data.data;
      console.log(newMessages, "after api call");
      const allmessages = [...storedMessages, ...newMessages];
      const chats = allmessages.splice(allmessages.length - storedchatslength);
      console.log(allmessages, "allmesg>>>>", chats, "chats>>>>>");
      localStorage.setItem("chats", JSON.stringify(chats));

      chats.forEach((chat) => {
        if (chat.id > msglength) {
          // const messageElement = document.getElementById("msg");
          // const head = document.createElement("h1");
          // head.innerText = chat.message;
          // console.log(chat.message);
          // messageElement.appendChild(head);

          const parent = document.getElementById("chatui");
          const child = document.createElement("div");
          child.className = "col-start-1 col-end-8 p-3 rounded-lg";
          const innerchild = document.createElement("div");
          innerchild.className = "flex flex-row items-center";
          const avatar = document.createElement("div");
          avatar.className =
            "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0";
          avatar.innerText = "A";
          const messageouter = document.createElement("div");
          messageouter.className =
            "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl";
          const messagetext = document.createElement("div");
          messagetext.textContent = chat.message;
          messageouter.appendChild(messagetext);
          innerchild.append(avatar);
          innerchild.append(messageouter);
          child.append(innerchild);
          parent.append(child);
          msglength = chat.id;
        } else {
          console.log("no new messages");
        }
      });
      //console.log(JSON.stringify([...storedMessages, ...newMessages]),">>>>>>");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, 5000);
});


async function message(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const msg = document.getElementById("message").value;

  const msg1 = {
    message: msg,
  };

  try {
    const resp = await axios.post(`${api}message`, msg1, {
      headers: {
        Authorization: token,
      },
    });
    console.log(resp.data);

    // const messageElement = document.getElementById("msg");
    // const head = document.createElement("h1");
    // head.innerText = msg;
    // messageElement.appendChild(head);
  } catch (error) {
    console.log("Error while sending message:", error);
  }
}
async function creategroup(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const groupname = document.getElementById("groupname").value;
  
    const groupname1 = {
        groupname: groupname,
    };
  
    try {
      const resp = await axios.post(`${api}add-group`, groupname1, {
        headers: {
          Authorization: token,
        },
      });
      console.log(resp.data,"add group>>>>");
  
      
    } catch (error) {
      console.log("Error while sending message:", error);
    }
  }

// Assign event listener to form submit event
document.getElementById("myForm").addEventListener("submit", message);
