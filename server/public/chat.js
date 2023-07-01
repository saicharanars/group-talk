https://3.109.101.125:4000/
var msglength = 0;
const storedchatslength = 10;
document.addEventListener("DOMContentLoaded", async () => {
  // const resp = await axios.get(`${api}get-messages`);
  // const newMessages = resp.data.data;
  // console.log(newMessages,"after api call")
  // const chats=newMessages.splice(newMessages.length-storedchatslength);
  // localStorage.setItem("chats", JSON.stringify(chats));
  //console.log(res.body);

  try {
    // Retrieve messages from local storage
    getGroups();
    activegroups();
    chatheader();
    adduserbutton();
    getuserbutton();
    //     const storedMessages = JSON.parse(localStorage.getItem("chats")) || [];
    //     console.log(storedMessages);
    //     const lastStoredMessage =
    //       storedMessages.length > 0
    //         ? storedMessages[storedMessages.length - 1]
    //         : -1;
    //     console.log(lastStoredMessage, ">>>>>>>");
    //     //console.log(storedMessages,"local storage")
    //     // Make a request to the server for new messages
    //     const resp = await axios.get(
    //       `${api}get-messages?after=${lastStoredMessage.id}`
    //     );
    //     const newMessages = resp.data.data;
    //     console.log(newMessages, "after api call");
    //     const allmessages = [...storedMessages, ...newMessages];
    //     const chats = allmessages.splice(allmessages.length - storedchatslength);
    //     console.log(allmessages, "allmesg>>>>", chats, "chats>>>>>");
    //     //localStorage.setItem("chats", JSON.stringify(chats));
    //     console.log(chats);
    //     chats.forEach((chat) => {
    //       const parent = document.getElementById("chatui");
    //       const child = document.createElement("div");
    //       child.className = "col-start-1 col-end-8 p-3 rounded-lg";
    //       const innerchild = document.createElement("div");
    //       innerchild.className = "flex flex-row items-center";
    //       const avatar = document.createElement("div");
    //       avatar.className =
    //         "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0";
    //       avatar.innerText = "A";
    //       const messageouter = document.createElement("div");
    //       messageouter.className =
    //         "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl";
    //       const messagetext = document.createElement("div");
    //       messagetext.textContent = chat.message;
    //       messageouter.appendChild(messagetext);
    //       innerchild.append(avatar);
    //       innerchild.append(messageouter);
    //       child.append(innerchild);
    //       parent.append(child);
    //       msglength = chat.id;
    //     });
    //     console.log(JSON.stringify([...storedMessages, ...newMessages]), ">>>>>>");
    //     console.log(msglength);
  } catch (error) {
    console.error("An error occurred:", error);
  }

  //   setInterval(async () => {
  //     try {
  //       // Retrieve messages from local storage
  //       const storedMessages = JSON.parse(localStorage.getItem("chats")) || [];
  //       const lastStoredMessage =
  //         storedMessages.length > 0
  //           ? storedMessages[storedMessages.length - 1]
  //           : -1;
  //       console.log(lastStoredMessage.id, "lastStoredMessage>>>>>>");
  //       // Make a request to the server for new messages
  //       const resp = await axios.get(
  //         `${api}get-messages?after=${lastStoredMessage.id}`
  //       );
  //       const newMessages = resp.data.data;
  //       console.log(newMessages, "after api call");
  //       const allmessages = [...storedMessages, ...newMessages];
  //       const chats = allmessages.splice(allmessages.length - storedchatslength);
  //       console.log(allmessages, "allmesg>>>>", chats, "chats>>>>>");
  //       localStorage.setItem("chats", JSON.stringify(chats));

  //       chats.forEach((chat) => {
  //         if (chat.id > msglength) {
  //           // const messageElement = document.getElementById("msg");
  //           // const head = document.createElement("h1");
  //           // head.innerText = chat.message;
  //           // console.log(chat.message);
  //           // messageElement.appendChild(head);

  //           const parent = document.getElementById("chatui");
  //           const child = document.createElement("div");
  //           child.className = "col-start-1 col-end-8 p-3 rounded-lg";
  //           const innerchild = document.createElement("div");
  //           innerchild.className = "flex flex-row items-center";
  //           const avatar = document.createElement("div");
  //           avatar.className =
  //             "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0";
  //           avatar.innerText = "A";
  //           const messageouter = document.createElement("div");
  //           messageouter.className =
  //             "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl";
  //           const messagetext = document.createElement("div");
  //           messagetext.textContent = chat.message;
  //           messageouter.appendChild(messagetext);
  //           innerchild.append(avatar);
  //           innerchild.append(messageouter);
  //           child.append(innerchild);
  //           parent.append(child);
  //           msglength = chat.id;
  //         } else {
  //           console.log("no new messages");
  //         }
  //       });
  //       //console.log(JSON.stringify([...storedMessages, ...newMessages]),">>>>>>");
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   }, 5000);
  //});
});
async function message(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const msg = document.getElementById("message").value;
  const ele = document.getElementById("sendmessage");
  const span = ele.querySelector("span");
  console.log(msg, ">>>>", span.id);
  const groupId = span.id;
  const msg1 = {
    message: msg,
    groupid: groupId,
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
    console.log(resp.data, "add group>>>>");
  } catch (error) {
    console.log("Error while sending message:", error);
  }
}
async function getGroups() {
  const grouparrayString = localStorage.getItem("group");
  const grouparray = JSON.parse(grouparrayString);
  console.log(grouparray);
  grouparray.forEach((group) => {
    console.log(group);
    const groupbutton = document.createElement("button");
    groupbutton.className =
      "flex flex-row items-center hover:bg-gray-100 rounded-xl p-2";
    groupbutton.id = group.id;
    const ava = document.createElement("div");
    ava.className =
      "flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full";
    ava.innerText = group.groupname[0];
    const text = document.createElement("div");
    text.className = "ml-2 text-sm font-semibold";
    text.innerText = group.groupname;
    groupbutton.append(ava);
    groupbutton.append(text);
    const handleClick = (event) => {
      const groupId = event.currentTarget.closest("button").id;
      console.log("Clicked button with groupId:", groupId);
      // Perform your desired action with the groupId
    };

    groupbutton.addEventListener("click", handleClick);
    ava.addEventListener("click", handleClick);
    text.addEventListener("click", handleClick);
    const groupele = document.getElementById("activegroup");
    groupele.append(groupbutton);
  });
}
// Assign event listener to form submit event
document.getElementById("myForm").addEventListener("submit", message);
function activegroups() {
  const buttons = document.querySelectorAll("#activegroup button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const groupId = event.target.id;
      // Call your API with the groupId parameter
      const ele = document.getElementById("sendmessage");
      const span = ele.querySelector("span");
      span.id = groupId;

      // You can make an API call here or call a separate function with the groupId as a parameter
      // Example:
      // myAPIFunction(groupId);
      fetchmessages(groupId);
      console.log("Clicked button with groupId:", groupId);
    });
  });
}
async function fetchmessages(id) {
  try {
    const response = await axios.get(`${api}get-groupchat/${id}`);
    const newmessages = response.data;
    console.log(newmessages);
    console.log(newmessages.groupmessaghes);
    console.log(newmessages.groupmessaghes[0].groupname);
    const messages = newmessages.groupmessaghes[0].chats;
    const groupnameactive = newmessages.groupmessaghes[0].groupname;
    const groupnameid = newmessages.groupmessaghes[0].id;
    changechatheader(groupnameactive, groupnameid);

    if (messages && messages.length > 0) {
      chatui(messages);
    } else {
      nomessages();
    }
  } catch (error) {
    console.error(error);
  }
}
function chatui(chats) {
  const parent = document.getElementById("chatui");

  // Remove existing children
  parent.innerHTML = "";
  if (chats && chats.length > 0) {
    chats.reverse().forEach((chat) => {
      const child = document.createElement("div");
      child.className = "col-start-1 col-end-8 p-3 rounded-lg";
      const innerchild = document.createElement("div");
      innerchild.className = "flex flex-row items-center";
      const avatar = document.createElement("div");
      avatar.className =
        "flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0";
      avatar.innerText = "a";
      const messageouter = document.createElement("div");
      messageouter.className =
        "flex flex-col justify-between items-end relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl";
      const messagetext = document.createElement("div");
      messagetext.className = "self-end";
      const messagetextp = document.createElement("p");

      messagetextp.textContent = chat.groupuser.username;
      messagetextp.className = "self-end";
      messagetext.append(messagetextp);

      const usernametext = document.createElement("div");
      usernametext.textContent = chat.message;

      messageouter.appendChild(usernametext);
      messageouter.appendChild(messagetext);
      innerchild.append(avatar);
      innerchild.append(messageouter);
      //innerchild.append(username)
      child.append(innerchild);
      parent.append(child);
      msglength = chat.id;
    });
  } else {
    console.log("no messages");
  }
}
function nomessages() {
  const parent = document.getElementById("chatui");

  // Remove existing children
  parent.innerHTML = "";
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
  messagetext.textContent = "no messages";
  messageouter.appendChild(messagetext);
  innerchild.append(avatar);
  innerchild.append(messageouter);
  child.append(innerchild);

  parent.append(child);
}
function chatheader() {
  const header = document.getElementById("chatheader");
  const innerdiv = document.createElement("div");
  innerdiv.className =
    "flex flex-row  align-content-start items-center justify-center justify-around bg-indigo-400";
  const groupavatar = document.createElement("div");
  groupavatar.className =
    "flex items-center justify-center  h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0";
  groupavatar.innerText = "b";
  const groupouter = document.createElement("div");
  groupouter.className =
    "relative ml-3 text-2xl font-bold text-indigo-700 bg-blue-200 py-2 px-4  rounded-sm";
  const groupname = document.createElement("div");
  groupname.textContent = "click on active conversations";
  groupname.id = "headergroupname";
  const addbutton = document.createElement("button");
  addbutton.id = "addusersingroup";
  addbutton.type = "button";
  addbutton.className =
    "flex justify-self-center align-items-center border rounded-xl focus:outline-none bg-blue-500 hover:bg-blue-600 text-2xl font-bold text-white px-4 py-1 flex-shrink-0";

  addbutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>`;
  const usersbutton = document.createElement("button");
  usersbutton.id = "groupuserscheck";
  usersbutton.className =
    "flex justify-self-center align-items-center border rounded-xl focus:outline-none bg-blue-500 hover:bg-blue-600 text-2xl font-bold text-white px-4 py-1 flex-shrink-0";

  usersbutton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
</svg>`;

  groupouter.appendChild(groupname);
  innerdiv.append(groupavatar);
  innerdiv.append(groupouter);
  innerdiv.append(addbutton);
  innerdiv.append(usersbutton);
  //header.append(innerdiv);
  header.insertBefore(innerdiv, header.firstChild);
}
function changechatheader(groupnameactive, id) {
  const header = document.getElementById("headergroupname");
  header.textContent = groupnameactive;
  const adduserbutton = document.getElementById("addusersingroup");
  adduserbutton.setAttribute("data-group-id", id);
  const groupuserscheck = document.getElementById("groupuserscheck");
  groupuserscheck.setAttribute("data-group-id", id);
}
function adduserbutton() {
  document
    .getElementById("addusersingroup")
    .addEventListener("click", async () => {
      createadminui("add");
      createadminui("remove");
      createadminui("admin");
    });
}

async function createadminui(admintype) {
  const group = document.getElementById("addusersingroup");
  const groupid = group.getAttribute("data-group-id");
  console.log(groupid);

  const parent = document.getElementById("chatui");
  parent.className = "grid grid-cols-12 gap-y-2 bg-white ";
  parent.innerHTML = "";

  const child = document.createElement("div");
  child.className = "col-start-1 col-end-8 p-3 rounded-lg";
  const inner = document.createElement("h1");
  inner.className = "text-2xl font-bold";
  inner.textContent = admintype;
  const form = document.createElement("form");
  form.type = "submit";
  form.id = "adduserform";
  form.className =
    "col-start-1 col-end-10 p-3 flex flex-row justify-center justify-items-center content-center items-center place-content-center place-items-center";

  const select = document.createElement("select");
  select.name = "users";
  select.placeholder = "Select a user";
  select.className =
    "w-full cursor-default  bg-grey-500 py-1.5 pl-3 pr-10 text-left  text-2xl ";
  form.append(select);

  // Add options to the select element

  const getusers = await axios.get(`${api}usersnotingroup/${groupid}`);
  console.log(getusers.data.users);
  const usersforselect = getusers.data.users;
  usersforselect.forEach((user) => {
    const option1 = document.createElement("option");
    option1.textContent = user.username;
    option1.id = user.id;

    select.appendChild(option1);
  });
  if (admintype !== "remove") {
    const select2 = document.createElement("select");
    select2.name = "admin type";
    select2.placeholder = "is admin";
    if (admintype === "add") {
      select2.id = "addid";
    } else {
      select2.id = "adminid";
    }
    select2.className =
      "w-full cursor-default  bg-grey-500 py-1.5 pl-3 pr-10 text-left  text-2xl ";

    const option1 = document.createElement("option");
    option1.textContent = "true";
    const option2 = document.createElement("option");
    option2.textContent = "false";
    select2.appendChild(option1);
    select2.appendChild(option2);
    form.append(select2);
  }

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = admintype;
  submit.className =
    "flex items-center  justify-center bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0";
  submit.addEventListener("click", async (event) => {
    event.preventDefault();

    const selectedUsername = select.value;
    const selectedUserId = select.options[select.selectedIndex].id;
    console.log(
      "Selected User ID:",
      selectedUserId,
      "Selected Username:",
      selectedUsername,
      "Group ID:",
      groupid
    );
    const add = document.getElementById("addid").value;
    const admin = document.getElementById("adminid").value;
    console.log(add, "options<<<<<", admin);

    // Make API call to upload the selected user ID
    if (admintype === "add") {
      const response = await axios.post(`${api}addmember/${groupid}`, {
        userId: selectedUserId,
        isAdmin: admin,
      });
      console.log(response.data.message);
      responsedata(response.data);
    } else if (admintype === "remove") {
      console.log(selectedUserId, "udfy");
      user = {
        userId: selectedUserId,
      };
      const response = await axios.delete(
        `${api}deleteGroupMember/${groupid}`,
        { data: user }
      );
      console.log(response.data);
      console.log("remove");
      responsedata(response.data);
    } else {
      const response = await axios.post(`${api}makeadmin/${groupid}`, {
        userId: selectedUserId,
        isAdmin: admin,
      });
      console.log(response.data);

      console.log("admin");
      console.log(response.data.message);
      responsedata(response.data);
    }
    function responsedata(data) {
      const child3 = document.createElement("div");
      child3.className = "col-start-1 col-end-8 p-3 rounded-lg";
      const inner3 = document.createElement("h3");
      inner3.className = "text-2xl font-bold";
      inner3.textContent = data.message;
      child3.append(inner3);
      parent.append(child3);
    }

    // Handle the API response as needed
  });

  form.append(submit);

  child.append(inner);
  child.append(form);
  parent.append(child);
}
function getuserbutton() {
    document
    .getElementById("groupuserscheck")
    .addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("gnj");
    checkusers()
  });
}
async function checkusers() {
    const group = document.getElementById("groupuserscheck");
    const groupid = group.getAttribute("data-group-id");
    console.log(groupid);
    const getusers = await axios.get(`${api}getgroupmembers/${groupid}`);
    const usersarray = getusers.data.users[0].groupusers;
    console.log(usersarray);
    
    const parent = document.getElementById("chatui");
    parent.className = "grid grid-cols-12 gap-y-2 bg-white ";
    parent.innerHTML = ""; // Clear previous content before appending new users.
  
    usersarray.forEach((user) => {
      const child = document.createElement("div");
      child.className = "col-start-1 col-end-8 p-3 rounded-lg";
      
      const inner = document.createElement("h1");
      inner.className = "text-2xl font-bold";
      inner.textContent = user.username;
      
      child.append(inner);
      parent.append(child); // Append the current user's div to the parent div.
    });
  }
  
