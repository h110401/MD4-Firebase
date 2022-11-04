import {
    getDownloadURL,
    getMetadata,
    getStorage,
    ref,
    uploadBytesResumable
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js'
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

export class Firebase {
    firebaseConfig = {
        apiKey: "AIzaSyCv92i9iTTNcxmITnRxqmMyU8Tb3FoMems",
        authDomain: "fir-ab66e.firebaseapp.com",
        projectId: "fir-ab66e",
        storageBucket: "fir-ab66e.appspot.com",
        messagingSenderId: "454923513169",
        appId: "1:454923513169:web:28576806f8ae73ec073770",
        measurementId: "G-BTRSJCR1EV"
    };
    storage;

    progress;
    url;
    location;

    constructor() {
        const app = initializeApp(this.firebaseConfig);
        this.storage = getStorage(app)
    }

    upload(file) {
        let location = ref(this.storage, this.location);
        const uploadTask = uploadBytesResumable(location, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
                $(this.progress).val(progress);
            }, (error) => {
                console.log("error ===>")
                console.log(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadUrl) => {
                        $(this.url).val(downloadUrl);
                    }
                )
            }
        )
    }

    setProgress(id) {
        this.progress = id;
    }

    setDownloadUrl(url) {
        this.url = url;
    }

    setLocation(location) {
        this.location = location;
    }

}
