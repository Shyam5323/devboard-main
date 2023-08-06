<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import {
		getAuth,
		signInWithEmailAndPassword,
		signOut,
		type User,
		onAuthStateChanged,
		signInWithPopup,
		GoogleAuthProvider,
		GithubAuthProvider
	} from 'firebase/auth';
	import { onMount } from 'svelte';
  import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore"; 


	let email = '';
	let password = '';
	
  let user: User | null;

	const firebaseConfig = {
            apiKey: "AIzaSyDpgPzeQx0YJCy-lXBJzdBxhouBu3q-2cY",
            authDomain: "devboard-e28d0.firebaseapp.com",
            projectId: "devboard-e28d0",
            storageBucket: "devboard-e28d0.appspot.com",
            messagingSenderId: "155961549948",
            appId: "1:155961549948:web:782d1c6fcbe70d6da2d5f9",
            measurementId: "G-XSLDDB1SN6"
        };

	const app = initializeApp(firebaseConfig);
  
	
  const login = () => {
    const auth = getAuth(app);
		signInWithEmailAndPassword(auth, email, password).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
	};

	const loginWithGoogle = () => {
		const auth = getAuth(app);
		signInWithPopup(auth, new GoogleAuthProvider());
	};

	const loginWithGithub  = async () => {
	const auth = getAuth(app);
	const provider = new GithubAuthProvider();

	try {
		const { user } = await signInWithPopup(auth, provider);
    	const { uid, displayName, email, accessToken } = user;

		// Store user data in Firestore
		
		const userRef = doc(db, 'User', user.uid);

		const userData = {
		name: displayName,
		email: email,
		githubId: uid,
		githubAccessToken: accessToken
		// Additional fields as needed
		};

		await setDoc(userRef, userData);

		// User successfully signed up with GitHub and data stored in Firestore
	} catch (error) {
		console.error(error);
		// Handle signup errors
	}
	};

	const logout = async () => {
		const auth = getAuth(app);
		signOut(auth);
	};

	onMount(async () => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (newUser) => {
			console.log(user);
			user = newUser;
		});
	});
</script>

{#if user}
	<p>Signed in with {user.providerData[0].providerId}!</p>
	<button on:click={logout}>Logout</button>
{:else}
	<input type="email" id="email" placeholder="email" bind:value={email} />
	<input type="password" id="password" placeholder="password" bind:value={password} />
	<button class="bg-teal-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={login}>Login</button>
	<button class="bg-teal-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={loginWithGoogle}>Login with Google</button>
	<button class="bg-teal-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={loginWithGithub}>Login with Github</button>
{/if}
