






		
	


	document.addEventListener("DOMContentLoaded", () => {

	
	
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8PYJV5-E6hIYbElsgb5e7MOS0faCiLM4",
  authDomain: "quizzatopia-bdfc9.firebaseapp.com",
  projectId: "quizzatopia-bdfc9",
  storageBucket: "quizzatopia-bdfc9.appspot.com",
  messagingSenderId: "828105067102",
  appId: "1:828105067102:web:76afb989ed7c03ebb542cf",
  measurementId: "G-J3QK9V5480"
};



  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Access the necessary functions
const auth = firebase.auth();
  const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
  const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
const createUserWithEmailAndPassword = firebase.auth().createUserWithEmailAndPassword;
  const signInWithPopup = firebase.auth().signInWithPopup;

	
  // Function to handle Google sign-in
window.signInWithGoogle = function() {
    const provider = new GoogleAuthProvider();

    return auth
      .signInWithPopup(provider)
      .then((result) => {
        // Retrieve the user information
        const user = result.user;

        // Get the user's display name and email
        const displayName = user.displayName;
        const email = user.email;
        const firebaseId = user.uid;

        // Perform any additional actions or redirect the user

        // Example: Show a success message and user info
        alert('Google Login successful');
        console.log('User display name:', displayName);
        console.log('User email:', email);
        console.log('Firebase ID:', firebaseId);
      })
      .catch((error) => {
        // Handle errors during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle the error appropriately
        console.log('errorCode google:', errorCode);
        console.log('errorMessage:', errorMessage);
      });
  }

  // Function to handle Facebook sign-in
window.signInWithFacebook = function() {
    const provider = new FacebookAuthProvider();

    return auth
      .signInWithPopup(provider)
      .then((result) => {
        // Retrieve the user information
        const user = result.user;

        // Get the user's display name and email
        const displayName = user.displayName;
        const firebaseId = user.uid;
        const email = user.email;

        // Perform any additional actions or redirect the user

        // Example: Show a success message and user info
        alert('Facebook Login successful');
        console.log('User display name:', displayName);
        console.log('Firebase ID:', firebaseId);
        console.log('User email:', email);
      })
      .catch((error) => {
        // Handle errors during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle the error appropriately
        console.log('errorCode facebook:', errorCode);
        console.log('errorMessage:', errorMessage);
      });
  }


// Function to handle the sign-in process using email and password
window.signInWithUserWithEmailAndPassword = function(event) {
  event.preventDefault();

  const email = document.getElementById('lemail').value;
  const password = document.getElementById('lpassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-in successful, retrieve the user object
      const user = userCredential.user;

      // Get the user's display name and Firebase ID
      const displayName = user.displayName;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      alert('Sign-in successful');
      console.log('User display name:', displayName);
      console.log('Firebase ID:', firebaseId);
    })
    .catch((error) => {
      // Handle any errors that occurred during sign-in
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
      console.log('errorCode signInWithEmailAndPassword:', errorCode);
      console.log('errorMessage:', errorMessage);
    });
}

		
		
		
		
// Function to handle the signup form submission
window.createUserWithEmailAndPassword = function(event) {
  event.preventDefault();

  var username = document.getElementById('susername').value;
  var email = document.getElementById('semail').value;
  var password = document.getElementById('spassword').value;

  return auth
    .createUserWithEmailAndPassword(email, password) // Provide email and password as arguments
    .then((userCredential) => {
      // User creation successful, return the user object
      const user = userCredential.user;

      // Get the user's display name and Firebase ID
      const displayName = user.displayName;
      const firebaseId = user.uid;

      // Example: Show a success message and user info
      alert('Signup successful');
      console.log('Username:', username);
      console.log('User email:', email);
      console.log('Firebase ID:', firebaseId);

      return user;
    })
    .catch((error) => {
      // Handle any errors that occurred during user creation
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle the error appropriately
      console.log('errorCode e&p:', errorCode);
      console.log('errorMessage:', errorMessage);
      throw error;
    });
}

	
	
	
// Get references to the buttons
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const googleButton = document.getElementById("googleButtonC");
const facebookButton = document.getElementById("facebookButtonC");

// Add event listeners to the buttons
loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  signInWithUserWithEmailAndPassword(event);
});

signupButton.addEventListener("click", (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(event);
});

googleButton.addEventListener("click", () => {
  signInWithGoogle();
});

facebookButton.addEventListener("click", () => {
  signInWithFacebook();
});

});



	