var api = "http://localhost:4000/";
document.addEventListener('DOMContentLoaded', async() => {
    const token = localStorage.getItem('token');
    console.log(token);
    const resp = await axios.get(`${api}get-messages`);
    const msgs=resp.data.data;
    if (msgs.length > 0) {
        for (let i = 0; i < msgs.length; i++) {
            const messageElement = document.getElementById("msg");
            const head = document.createElement("h1");
            head.innerText = msgs[i].message;
            messageElement.appendChild(head);
        }
    } else {

        const messageElement = document.getElementById("msg");
        const head = document.createElement("h1");
        head.innerText = "no messages";
        messageElement.appendChild(head);
    }
  });
  
  async function message(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const msg = document.getElementById('message').value;
  
    const msg1 = {
      message: msg,
    };
  
    try {
      const resp = await axios.post(`${api}message`, msg1, {
        headers: {
          'Authorization': token
        }
      });
      console.log(resp.data);
  
      const messageElement = document.getElementById('msg');
      const head = document.createElement('h1');
      head.innerText = msg;
      messageElement.appendChild(head);
    } catch (error) {
      console.log('Error while sending message:', error);
    }
  }
  
  // Assign event listener to form submit event
  document.getElementById('myForm').addEventListener('submit', message);
  