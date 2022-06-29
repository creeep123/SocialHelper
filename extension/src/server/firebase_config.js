import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB5EHPX9Nxk6HFzDY5krH9CS4FpaLWSaB4',
  authDomain: 'web-extension-project.firebaseapp.com',
  projectId: 'web-extension-project',
  storageBucket: 'web-extension-project.appspot.com',
  messagingSenderId: '776496815363',
  appId: '1:776496815363:web:358336e52ee86a60325d36',
  measurementId: 'G-BHLDGPVNH8',
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
