// 🔥 Firebase Config (PASTE YOUR OWN VALUES HERE)
const firebaseConfig = {
  apiKey: "AIzaSyD4rZbhA1TflUO--r8VYAdNI2QJUJcP92w",
  authDomain: "antarmukham-8a1e5.firebaseapp.com",
  projectId: "antarmukham-8a1e5",
  storageBucket: "antarmukham-8a1e5.firebasestorage.app",
  messagingSenderId: "600890681508",
  appId: "1:600890681508:web:70a1392bcc7664aa3a9e31"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// UI elements
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const editor = document.querySelector(".editor");
const entriesList = document.getElementById("entriesList");

// Google login
loginBtn.onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};

// Logout
logoutBtn.onclick = () => auth.signOut();

// Auth state
auth.onAuthStateChanged(user => {
    if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline";
        editor.style.display = "block";
        loadEntries(user.uid);
    } else {
        loginBtn.style.display = "inline";
        logoutBtn.style.display = "none";
        editor.style.display = "none";
        entriesList.innerHTML = "<p>Please sign in to see your journal.</p>";
    }
});

// Save journal
function saveEntry() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const user = auth.currentUser;

    if (!title || !content || !user) return;

    db.collection("journals").add({
        uid: user.uid,
        title,
        content,
        date: new Date().toISOString()
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

// Load journals
function loadEntries(uid) {
    entriesList.innerHTML = "";

    db.collection("journals")
      .where("uid", "==", uid)
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
          entriesList.innerHTML = "";
          snapshot.forEach(doc => {
              const e = doc.data();
              entriesList.innerHTML += `
                <div class="entry">
                    <h3>${e.title}</h3>
                    <small>${new Date(e.date).toDateString()}</small>
                    <p>${e.content.replace(/\n/g,"<br>")}</p>
                </div>
              `;
          });
      });
}